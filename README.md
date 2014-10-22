# namespaced-container (NodeJS)

[![Build Status](https://travis-ci.org/boljen/namespaced-container.svg)](https://travis-ci.org/boljen/namespaced-container)

A class which allows namespaced object manipulation.

## Installation

    npm install namespaced-container

## Basic usage

Creating a new instance is quite simple;

    var Container = require('namespaced-container');
      , container = new Container({});

      container.set('nested.namespace.testKey', 'testValue');
      container.get('nested.namespace.testKey');
      container.delete('nested.namespace.testKey');
      container.get('nested.namespace.testKey', 'value_if_not_found');


## API

### Constructor

    /**
     * This is a namespaced container class.
     *
     * @param {Object}    root - The root object of the container.
     * @param {Object}    cfg
     * @param {function}  cfg.sanitize - Sanitize values function.
     * @param {string}    cfg.prefix - The prefix that is applied to namespaces.
     * @param {string}    cfg.separator - The namespace separator.
     */
    var Container = function(root, cfg)

The first thing you need when constructing your container is a root object. This
root object will typically be a newly created object, but it also allows an
existing object.

    // new object
    var c = new Container({})

    // Existing object
    var obj = {};
    var c = new Container(obj);

    // Will work, but remember that configuration might affect the naming.
    c.set('test', 'value');
    obj.test === 'value';

It also allows [object-pointers](https://www.npmjs.org/package/object-pointer)
as a root object.

    var obj = {
      isNew: false
    };
    var newObj = {
      isNew: true
    };

    // Pointer hooking to the original object
    var pointer = new ObjectPointer(obj);

    // Container hooking to the pointer
    var c = new Container(pointer);

    // Container retrieves obj.isNew
    c.get('test') === false;

    // Changing root object of the pointer
    pointer.setRoot(newObj);

    // Container retrieves newObj.isNew
    c.get('test') === true;

Lets take a look at the options (note that these are the default options):

    var container = new Container(yourRootObject, {

      /**
       * When setting a value, this function will be called. Use this if you
       * need to have custom value parsing embedded inside the container.
       */
      sanitize: function(value) {
        return value;
      },

      /**
       * By default the namespaces are stored inside the root object without a
       * prefix. This might mean that some namespaces might overlap with keys.
       * If you want to have equally named keys and nested namespaces, you have
       * to set a custom prefix here.
       */
      prefix: '',

      /**
       * The separator used when parsing your given string to a namespace array.
       * You can set this to anything you like. These do not affect the
       * underlying object, only the way you deal with the container wrapper.
       */
      separator: '.',

    });

### Core API

    /**
     * This will set a property to the container.
     * @param {string}    key  - The key that must be set.
     * @param {mixed}     value - The value that must be set.
     */
    Container.prototype.set = function(key, value)

    /**
     * This will attempt to retrieve avalue from the container. If no default return
     * value is set, it will throw an error.
     *
     * @param  {string}   key - The key to return
     * @param  {mixed}    defaultReturn - The default value to return.
     * @param  {boolean}  execute - If true, executes the return value.
     */
    Container.prototype.get = function(key, defaultReturn, execute)

    /**
     * Deletes a key from the container
     *
     *
     * @param  {string} key
     */
    Container.prototype.delete = function(key)

    /**
     * This deletes a namespace from the container. Note that the regular delete
     * method will also have this effect if you haven't defined a namespace
     * prefix.
     *
     * @param {string} key
     */
    Container.prototype.deleteNamespace = function(key)

    /**
     * This will delete any content inside a namespace. It will simply delete
     * the namespace and create a new one.
     *
     * @param {string} key
    Container.prototype.deleteNamespaceContent = function(key)

### Utility API

    /**
     * Returns the root object
     */
    Container.prototype.getRoot = function()

    /**
     * This will return the object on which this container is built.
     *
     * Note: It will return the actual object, not the pointer!
     */
    Container.prototype.getObject = function()

    /**
     * This will set the object on which this container is built.
     * @param {Object|ObjectPointer} obj
     */
    Container.prototype.setObject = function(obj)

## Test

    grunt test

## License

MIT.
