export const getBaseOptions = () => {
  return allowElementOrRef({}, 'dragContainer');
};

/**
 * Wrap the 'dragContainer' option.
 * Allow it to be a ref.
 *
 * @param options - The grid options.
 */
export function allowElementOrRef(
  source: unknown,
  property: string,
  defaultValue: unknown = null
) {
  let ref = {current: defaultValue};
  return Object.defineProperty(source, property, {
    get() {
      return ref.current;
    },
    set(value) {
      if (!value || value instanceof Element) {
        ref = {current: value};
      } else {
        ref = value;
      }
    },
  });
}
