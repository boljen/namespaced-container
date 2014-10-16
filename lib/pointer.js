/**
 * This points to a certain position inside an Object.
 * @param {array} position - An ordened array with all the object keys as values
 * @param {Object} object - The actual object.
 * @param {string} cprop - The property that must be set inside new containers.
 */
var Pointer = function Pointer(position, object, cprop) {
  this.pos = position;
  this.obj = object;
  this.cprop = cprop;
};

/**
 * This sets a value to a certain position
 * @param {string|array} key
 * @param {mixed} value
 */
Pointer.prototype.set = function(key, value) {

};

/**
 * This gets a value from certain position
 * @param {string|array} key
 */
Pointer.prototype.get = function(key) {

};

/**
 * This clears a value from certain position
 * @param {string|array} key
 */
Pointer.prototype.clear = function(key) {

};

module.exports = Pointer;
