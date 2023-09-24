enum Type {
    Remove = 0,
    Insert = 1,
}

type Move<T> = {
    index: number,
    type: Type,
    item: T
};

type Moves<T> = Array<Move<T>>;

type Result<T> = {
    moves: Moves<T>,
    children: Array<T>,
}

declare module 'list-diff2' {
    export default function diff<T>(oldList: Array<T>, newList: Array<T>, id?: string): Result<T>;
}

