export type SetDataMethod = (data: object, options?: UseDataOptions) => void;
export type UseDataOptions = {
    /** If the data have to be merged with the old one. */
    merge?: boolean;
};
/**
 * The useData hook allow to set the data to the item in which the hook has been called.
 * It also returns the setter method.
 *
 * @param initialData - The data.
 * @param options - The options.
 * @returns - The setter method.
 */
export declare function useData(initialData?: object, options?: UseDataOptions): SetDataMethod;
export declare namespace useData {
    var defaultOptions: {
        merge: boolean;
    };
}
