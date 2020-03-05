/**
 * Decorate a Muuri instance.
 * @param {Muuri} muuri
 */
export function decorateMuuri(muuri) {
  muuri._component = {};
  muuri.getId = function() {
    return this._component.id;
  };
  muuri.getGroupId = function() {
    return this._component.groupId;
  };
}
