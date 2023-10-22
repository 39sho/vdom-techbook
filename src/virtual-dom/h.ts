type VPropName = string;

type VPropValue = string | boolean | number;

type VProps = {
    [key: VPropName]: VPropValue;
};

type VNode = {
    type: 'VNode',
    tagName: string,
    props: VProps,
    children: Array<VDom>,
    key?: string,
}

type VText = {
    type: 'VText',
    value: string,
};

type VDom = VNode | VText;

declare namespace h.JSX {
    type Element = VDom;
    interface IntrinsicElements {
        [type: string]: VProps,
    }
}


type H = (
    tagName: string,
    props: VProps | null,
    ...children: Array<VDom | string | number | boolean | Array<VDom>> | []
) => VDom;

const h: H = (tagName, props, ...children) => {
    const newChildren = children
        .flat()
        .map(child => {
            if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
                const vtext: VText = {
                    type: 'VText',
                    value: child.toString(),
                }

                return vtext;
            }

            if (child.type === 'VNode' && child.props.key != null) {
                child.key = child.props.key.toString();
            }

            return child;
        });

    const vnode: VNode = {
        type: 'VNode',
        tagName,
        props: props ?? {},
        children: newChildren,
    };

    return vnode;
};

export default h;

export type {
    VProps,
    VNode,
    VText,
    VDom,
}
