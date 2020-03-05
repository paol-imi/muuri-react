/**
 * Get if the instance is decorated.
 * @param {Object} instance
 */
export function isDecorated(instance) {
  return !!instance._component;
}
