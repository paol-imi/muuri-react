import Muuri from 'muuri';
import {getDecoration} from './utils/decorators';

/**
 * Muuri id getter.
 *
 * @returns - The id of the instance.
 */
Muuri.prototype.getId = function getId() {
  return getDecoration(this).id;
};
/**
 * Muuri group ids getter.
 *
 * @returns - The group ids of the instance.
 */
Muuri.prototype.getGroupIds = function getGroupIds() {
  return getDecoration(this).groupIds;
};
/**
 * Muuri size element getter.
 *
 * @returns - The group ids of the instance.
 */
Muuri.prototype.getSizerElement = function getSizerElement() {
  return getDecoration(this).sizerElement;
};

/**
 * Item key getter.
 *
 * @returns - The item component key.
 */
Muuri.Item.prototype.getKey = function getKey() {
  return getDecoration(this).key;
};
/**
 * Item props getter.
 *
 * @returns - The item component props.
 */
Muuri.Item.prototype.getProps = function getProps() {
  return getDecoration(this).props;
};
/**
 * Item data getter.
 *
 * @returns - The item component data.
 */
Muuri.Item.prototype.getData = function getData() {
  return getDecoration(this).data;
};
/**
 * Item data setter.
 *
 * @param data - The data.
 */
Muuri.Item.prototype.setData = function setData(data: object) {
  getDecoration(this).data = data;
};
