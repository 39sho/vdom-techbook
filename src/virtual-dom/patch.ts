import type { Patches } from './diff';
import { VDom } from './h';

type CreateElement = (vdom: VDom) => Node;

const createElement: CreateElement = (vdom) => {
    if (vdom.type === 'VText') {
        return document.createTextNode(vdom.value);
    } else {
        const elem = document.createElement(vdom.tagName);

        for (const [key, value] of Object.entries(vdom.props)) {
            elem.setAttribute(key, value.toString());
        }

        for (const child of vdom.children) {
            elem.append(createElement(child));
        }

        return elem;
    }
};

type Patch = (root: Element, patches: Patches) => void;

const patch: Patch = (root, patches) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);

    /*
    SHOW_ELEMENTにしているからas Elementで問題ないはず
    */

    for (const ps of patches) {
        walker.nextNode();
        const currNode = walker.currentNode as Element;

        if (ps != null) {
            for (const p of ps) {
                switch (p.type) {
                    case 'Text':
                        walker.currentNode.textContent = p.value.value;
                        break;
                    case 'Replace':
                        currNode.replaceWith(createElement(p.value));
                        break;
                    case 'Props':
                        for (const [key, value] of Object.entries(p.value)) {
                            currNode.setAttribute(key, value.toString());
                        }
                        break;
                    case 'Reorder':
                        for (const move of p.value) {
                            if (move.type === 1) {
                                const elem = createElement(move.item);

                                // { Type.Remove = 0, Type.Insert = 1 }
                                currNode.childNodes[move.index - 1] == null
                                    ? currNode.prepend(elem)
                                    : currNode.childNodes[move.index - 1].after(elem);
                            } else {
                                currNode.childNodes[move.index].remove();
                            }
                        }
                        break;
                    default:
                        const _Err = p;
                        throw new Error(_Err)
                }
            }
        }
    }
};

type Init = (root: Element, vdom: VDom) => void;

const init: Init = (root, vdom) => {
    root.append(createElement(vdom));
};

export {
    init,
    patch,
}