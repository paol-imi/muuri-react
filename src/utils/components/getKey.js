/**
 * Get the key passed to a component.
 * @param {string} key
 * @return {string}
 */
export function getKey(key) {
  if (key.slice(0, 2) === ".$") {
    return key.slice(2);
  } else {
    return key;
  }
}
