/**
 * Decorate a Muuri instance.
 * @param {Muuri} muuri
 */
export function decorateMuuri(muuri) {
  /**
    id,
    groupIds,
    dragFixed,
    removeController,
   */
  muuri._component = {};
  muuri.getId = function getId() {
    return this._component.id;
  };
  muuri.getGroupId = function getGroupId() {
    return this._component.groupId;
  };
}
