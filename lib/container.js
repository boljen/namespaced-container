"use strict";

/**
 * This is a namespaced container class.
 *
 * @param {Object}    cfg - The configuration of the container.
 * @param {Object}    cfg.root - The root object of the container.
 * @param {function}  cfg.validate - A function which validates the data which
 * is set to the container. This is great if you have boundaries.
 * @param {string}    cfg.prefix - The prefix that is applied to namespaces.
 */
var Container = function(cfg) {
  if (!cfg) cfg = {};

  this._obj = cfg.root || {};
  this._nsPrefix = cfg.namespacePrefix || '_';
  this._separator = cfg.separator || '.';
  this._validate = cfg.validate || function() {return true};
};

Container.prototype._splitKey = function(key) {

  var split = key.split(this._separator);

  for (var i = 0; i < split.length; i++) {

    // Make sure no empty namespaces or keys are used
    if (split[i] === '')
      throw new Error('Invalid key, each namespace must have at least one character');

    // Apply the namespace prefix
    if (i !== split.length-1)
      split[i] = this._nsPrefix + split[i];
  }

  return split;

};

Container.prototype.getRoot = function() {
  return this._obj;
};

/**
 * This will set a property to the container.
 * @param {string}    key  - The key that must be set.
 * @param {mixed}     value - The value that must be set.
 */
Container.prototype.set = function(key, value) {

};

/**
 * This will attempt to retrieve avalue from the container. If no default return
 * value is set, it will throw an error.
 *
 * @param  {string}   key - The key to return
 * @param  {mixed}    defaultReturn - The default value to return.
 * @param  {boolean}  execute - If true, executes the return value.
 */
Container.prototype.get = function(key, defaultReturn, execute) {

};

/**
 * This will return an object representing the namespace.
 *
 * @param {string} namespace - The namespace in which the pocket must operate.
 * @param {object} cfg - The configuration of the namespace object.
 */
Container.prototype.getNamespace = function(namespace, cfg) {

};

/**
 * Delete a single key-value record.
 * @param  {string} key - The key to delete
 */
Container.prototype.delete = function(key) {

};

/**
 * Delete an entire namespace and all the data inside of it.
 * @param {string} namespace - The namespace to delete
 */
Container.prototype.deleteNamespace = function(namespace) {

};

module.exports = Container;
