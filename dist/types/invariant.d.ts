export declare class Invariant extends Error {
    constructor(message: string);
}
export declare function invariant(condition: boolean, message?: string): asserts condition;
