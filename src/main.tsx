/*
import { h } from './virtual-dom/h';
import diff from './virtual-dom/diff';

const render = () => {
    return (
        <div> Hello World <br /></div >
    );
};

*/
/*
console.log(render());

console.log(diff(<div></div>, <div></div>));
console.log(diff(<div></div>, <div id="test"></div>));
console.log(diff(<div></div>, <span></span>));
console.log(diff(<div></div>, <div>hello</div>));
console.log(diff(<div></div>, <div>hello<span>world</span></div>));

console.log(diff(<div>hello<span>shota!</span></div>, <div>hello<span>world</span></div>));
console.log(diff(<div>hello<span>shota!</span></div>, <div id="test">hello<span>world</span></div>));

import listDiff from 'list-diff2';
console.log(listDiff([{ id: 1 }, { id: 2 }, { id: 3 }], [{ id: 5 }, { id: 3 }, { id: 1 }], 'id'));
*/

/*
たぶんlistDiffの戻り値のchildrenはoldListの内削除されないもの
*/

/*
console.log(diff(
    <div id="test">
        hello
        <span>world</span>
        <span>!!!</span>
    </div>,
    <div>
        hello
        <span id="hoge">shota!</span>
    </div>
));

console.log(diff(
    <div></div>,
    <div id="test">
        hello
        <span>world</span>
        <span>!!!</span>
    </div>
));

import { createElement, patch } from './virtual-dom/patch';

const root = document.querySelector('#app')!;

*/

/*
root.append(
    createElement(
        <div id="test">
            hello
            <span>world</span>
            <span>!!!</span>
        </div>
    )
);

patch(root, diff(
    <div id="test">
        hello
        <span>world</span>
        <span>!!!</span>
    </div>,
    <div>
        hello
        <span id="hoge">shota!</span>
    </div>
));
*/

/*
console.log(diff(
    <div>
        hello
        <span id="hoge">shota!</span>
    </div>,
    <div id="test">
        hello
        <span>world</span>
        <span>!!!</span>
    </div>
));

root.append(
    createElement(
        <div>
            hello
            <span id="hoge">shota!</span>
        </div>
    )
);

patch(root, diff(
    <div>
        hello
        <span id="hoge">shota!</span>
    </div>,
    <div id="test">
        hello
        <span>world</span>
        <span>!!!</span>
    </div>
));
*/

import h from './virtual-dom/h';
import diff from './virtual-dom/diff';
import { init, patch } from './virtual-dom/patch';

import styles from './main.module.css';

type State = {
    count: number,
};
const state: State = {
    count: 0,
};

declare global {
    interface Window {
        handleClick: () => void,
    }
}

window.handleClick = () => {
    state.count = 0;
};


const render = ({ count }: State) => {
    return (
        <div>
            <button type="button" onClick="handleClick();">RESET</button>
            <span class={count % 2 === 0 ? styles.red : styles.blue}>
                count:
            </span>
            {count}
            <ul>
                {
                    [...Array(10).keys()].reverse().map(n => n + state.count).map(n => (
                        <li class={styles.li} key={n}>
                            {Array(5 - n.toString().length).fill('-').join('')} {n} {Array(5).fill('-').join('')}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

const root = document.querySelector('#app')!;

let currTree = render(state);
init(root, currTree);

setInterval(() => state.count++, 1000);

const update = () => {
    const newTree = render(state)
    console.log(newTree)
    const patches = diff(currTree, newTree);
    console.log(patches)
    patch(root, patches);
    currTree = newTree;

    requestAnimationFrame(update);
};

requestAnimationFrame(update);
