/**
 * Set the value in the ref.
 *
 * @param ref - The ref.
 * @param value - The value
 */
export function handleRef<T>(ref: React.Ref<T>, value: T | null): void {
  if (!ref) return;

  if (typeof ref === 'function') ref(value);
  // @ts-ignore
  else if ('current' in ref) ref.current = value;
}
