"use strict";

var Pointer = require('object-pointer');

/**
 * This is a namespaced container class.
 *
 * @param {Object}    root - The root object of the container.
 * @param {Object}    cfg
 * @param {function}  cfg.sanitize - sanitize values function.
 * @param {string}    cfg.prefix - The prefix that is applied to namespaces.
 * @param {string}    cfg.separator - The namespace separator.
 */
var Container = function(root, cfg) {
  if (!cfg)
    cfg = {};

  this.setObject(root);

  this.sanitize = cfg.sanitize || function(v) {return v};
  this.separator = cfg.separator || '.';
  this.prefix = cfg.prefix || Container.defaultPrefix;
};

// For testing purposes
Container.defaultPrefix = '';

Container.prototype.buildLocation = function(namespace, fullLength) {
  var res = namespace.split(this.separator);

  if (fullLength) {
    var rl = res.length;
  } else {
    var rl = res.length -1;
  }
  for (var i = 0; i <= rl; i++) {
    if (res[i] ==='') {
      throw new TypeError("Cannot have empty namespace");
    } else if (i !== rl) {
      res[i] = this.prefix+res[i];
    }
  }

  return res;
};

/**
 * Returns the root object
 */
Container.prototype.getRoot = function() {
  return this.root;
};

/**
 * This will return the object on which this container is built.
 */
Container.prototype.getObject = function() {
  return this.root.getLocationObject();
};

/**
 * This will set the object on which this container is built.
 * @param {Object|ObjectPointer} obj
 */
Container.prototype.setObject = function(obj) {
  if (obj.__isPointer__) {
    this.root = obj;
  } else {
    this.root = new Pointer(obj);
  }
};

/**
 * This will set a property to the container.
 *
 * @param {string}    key  - The key that must be set.
 * @param {mixed}     value - The value that must be set.
 */
Container.prototype.set = function(key, value) {
  var loc = this.buildLocation(key);
  this.root.set(loc, this.sanitize(value));
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
  var loc = this.buildLocation(key);

  if (execute) {
    return this.root.get(loc, defaultReturn)();
  } else {
    return this.root.get(loc, defaultReturn);
  }
};

/**
 * Deletes a key from the container
 *
 * @param  {string} key
 */
Container.prototype.delete = function(key) {
  var loc = this.buildLocation(key);
  this.root.clear(loc);
};

/**
 * This deletes a namespace from the container
 * @param {string} key
 */
Container.prototype.deleteNamespace = function(key) {
  var loc = this.buildLocation(key, true);
  this.root.clear(loc);
};

/**
 * This will delete any content inside a namespace, including subsidiary
 * namespaces.
 *
 * @param {string} key
 */
Container.prototype.deleteNamespaceContent = function(key) {
  var loc = this.buildLocation(key, true);
  this.root.clear(loc);
  this.root.set(loc, {});
};

module.exports =
  Container;
