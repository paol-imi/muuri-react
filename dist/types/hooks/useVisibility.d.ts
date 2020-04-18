export declare type SetVisibilityMethod = (visible: boolean, options?: UseVisibilityOptions) => void;
export declare type UseVisibilityOptions = {
    /** If the animation should be skipped. */
    instant?: boolean;
};
/**
 * The useVisibility hook allow you to show/hide the item in which the hook has been called.
 *
 * @returns - The setter method.
 */
export declare function useVisibility(): SetVisibilityMethod;
export declare namespace useVisibility {
    var defaultOptions: {
        instant: boolean;
    };
}
