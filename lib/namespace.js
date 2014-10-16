"use strict";

var inherits = require('util').inherits
  , Container = require('./container');

/**
 * This is a Namespace class.
 *
 * @param {Container} container - The container in which this namespace resides.
 * @param {string}    namespace - The root namespace.
 *
 * @param {Object}    cfg - The configuration of the container.
 * @param {Object}    cfg.root - The root object of the container.
 * @param {boolean}   cfg.virtual - Whether to allow pockets to operate in a
 * virtual namespace. By default this is enabled.
 * @param {function}  cfg.validate - A function which validates the data which
 * is set to the container. This is great if you have boundaries.
 * @param {string}    cfg.prefix - The prefix that is applied to namespaces.
 */
var Namespace = function(cfg) {
  this.rootContainer = cfg.root;
  this.namespace = cfg.namespace;
};

inherits(Namespace, Container);

Namespace.prototype.getRoot = function() {
  return this._obj;
};

/**
 * This will set a property to the container.
 * @param {string}    key  - The key that must be set.
 * @param {mixed}     value - The value that must be set.
 */
Namespace.prototype.set = function(key, value) {

};

/**
 * This will attempt to retrieve avalue from the container. If no default return
 * value is set, it will throw an error.
 *
 * @param  {string}   key - The key to return
 * @param  {mixed}    defaultReturn - The default value to return.
 * @param  {boolean}  execute - If true, executes the return value.
 */
Namespace.prototype.get = function(key, defaultReturn, execute) {

};

/**
 * This will return an object representing the namespace.
 *
 * @param {string} namespace - The namespace in which the pocket must operate.
 * @param {object} cfg - The configuration of the namespace object.
 */
Namespace.prototype.getNamespace = function(namespace, cfg) {

};

/**
 * Delete a single key-value record.
 * @param  {string} key - The key to delete
 */
Namespace.prototype.delete = function(key) {

};

/**
 * Delete an entire namespace and all the data inside of it.
 * @param {string} namespace - The namespace to delete
 */
Namespace.prototype.deleteNamespace = function(namespace) {

};


module.exports = Namespace;
