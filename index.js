"use strict";

/**
 * This is a namespaced container class.
 *
 * @param {Object}    cfg - The configuration of the container.
 * @param {Object}    cfg.root - The root object of the container.
 * @param {boolean}   cfg.virtual - Whether to allow pockets to operate in a
 * virtual namespace. By default this is enabled.
 * @param {function}  cfg.validate - A function which validates the data which
 * is set to the container. This is great if you have boundaries.
 * @param {string}    cfg.prefix - The prefix that is applied to namespaces.
 */
var Container = function(cfg) {
  this.obj = cfg.root || {};
  this.virtual = cfg.virtual || true;
  this.namespacePrefix = cfg.prefix || '_';
  this.validate = cfg.validate || function() {return true};
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
Container.prototpye.get = function(key, defaultReturn, execute) {

};

/**
 * This will return an object representing the namespace.
 *
 * @param {string} namespace - The namespace in which the pocket must operate.
 * @param {boolean} virtualOverride - Override the global virtual configuration.
 */
Container.prototype.getNamespace = function(namespace, virtualOverride) {

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







function validateName(name) {
  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }
  var s = name.split('.');
  for (var i = 0; i < s.length; i++) {
    if(s[i] === '') {
      throw new Error("Cannot have an empty part in the name");
    }
  }
  return s;
};

var Container = function() {
  this._fxn = {};
  this._fx = {};
  this._prefix = '_';
};

Container.New = function() {
  return new Container();
};

/**
 * Adds a new element to the container.
 *
 * @param {string} name - The name of the element that must be added.
 * @param {mixed} item - The actual element that must be added
 */
Container.prototype.add = function(name, fx) {

  var s = validateName(name)
    , o = this._fx
    , i_v = 0;

  for (var i = 0; i < s.length-1; i++) {
    if (o[this._prefix+s[i]] === undefined) {
      o[this._prefix+s[i]] = {};
      // This will prevent copying of actual content when calling getPocket
      o[this._prefix+s[i]].__isPocket__ = true;
    }
    o = o[this._prefix+s[i]];
    i_v++;
  }

  if (o[s[i_v]] !== undefined) {
    throw new Error("Already registered a function under this name");
  } else {
    o[s[i_v]] = fx;
    this._fxn[name] = fx;
  }

};

/**
 * Retrieves a new element from the container
 *
 * @param  {string} name - The name of the element
 * @param  {boolean} throwError - If explicitly enabled, it will cause this
 * function call to throw an error if the element could not be found.
 * @return {element|null}
 */
Container.prototype.get = function(name, throwError) {
  validateName(name);
  if(this._fxn[name] === undefined) {
    if (throwError) {
      throw new Error("Could not locate function "+name);
    } else {
      return null;
    }
  } else {
    return this._fxn[name];
  }
};

/**
 * This will open your container at a certain namespace, copy the content of
 * that namespace into a stand-alone object and return said object. Be careful
 * with this as this could potentially mess up your garbage collection.
 *
 * @param  {string} path - The path that must be returned
 * @param  {boolean} throwError - If explicitly enabled, it will cause this
 * function call to throw an error if the path could not be found.
 * @return {object|null}
 */
Container.prototype.getPocket = function(name, throwError) {
  var s = validateName(name)
    , r = {}
    , o = this._fx;

  // retrieve the actual reference
  for (var i = 0; i < s.length; i++) {

    var current = o[this._prefix+s[i]];

    // If it ain't set, return undefined
    if (current === undefined) {
      if (throwError) {
        throw new Error("Could not find namespace "+s[i]);
      } else {
        return null;
      }
    } else if (current.__isPocket__ === true) {
      o = current;
    } else {
      return current;
    }
  }

  return this._parsePocket(o);

};

/**
 * Returns a reference object that works like a regular Container but only in
 * a given namespace.
 *
 * @param {string} path - The path you want to reference
 */
Container.prototype.getReference = function(path) {
  throw new Error("Not yet implemented");
};

Container.prototype._parsePocket = function(pocket) {
  if (pocket instanceof Object && pocket.__isPocket__) {
    var n = {};
    for (var k in pocket) {
      if (k === '__isPocket__')
        continue;

      if (pocket[k].__isPocket__) {
        var v = this._parsePocket(pocket[k]);
        n[k.slice(this._prefix.length)] = v;
      } else {
        n[k] = pocket[k];
      }
    }
    return n;
  } else {
    return pocket;
  }
};
