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
                    [...Array(10).keys()].map(n => n + count).map(n => (
                        <li class={(n - count) % 2 === 0 ? styles.oddLi : styles.li} key={n}>
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
    const newTree = render(state);
    // console.log(newTree);
    const patches = diff(currTree, newTree);
    // console.log(patches);
    patch(root, patches);
    currTree = newTree;

    requestAnimationFrame(update);
};

requestAnimationFrame(update);
