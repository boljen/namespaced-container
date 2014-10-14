# namespaced-container (NodeJS)

A container class which allows item-specific as well as namespaced retrieval.

## Installation

    npm install namespaced-container;

## Basic usage

Creating a new instance is quite simple;

    var Container = require('namespaced-container');
      , container = new Container();

Or simply do this:

    var container = require('namespaced-container').New();

Adding a task is very straight forward as well. 'something' can be anything you
want. An object, a function, ...

    container.add('test.nested.item', something);

If you want to get it back out of the container, you're only a get call away:

    something = container.get('test.item', throwErrorBoolean = false);

You can also get a pocket from the container. A pocket is an object representing
the container at a certain namespace. It's a copy, not a reference, so changes
to the pocket object or the original container won't influence each other.

    pocket = container.getPocket('test');

In the given example, your pocket would look like this;

    var pocket = {
      nested:{
        item: something
      }
    }

## API

    /**
     * Adds a new element to the container.
     *
     * @param {string} name - The name of the element that must be added.
     * @param {mixed} item - The actual element that must be added
     */
    Container.prototype.add = function(name, item)

    /**
     * Retrieves a new element from the container.
     *
     * @param  {string} name - The name of the element
     * @param  {boolean} throwError - If explicitly enabled, it will cause this
     * function call to throw an error if the element could not be found.
     * @return {element|null}
     */
    Container.prototype.get = function(name, throwError)

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
    Container.prototype.getPocket = function(path, throwError)

## Considerations

Avoid doing something like this;

    container.add('test.item', something);
    container.add('test.item.nested', something);

    container.getPocket('test');

The regular get will keep functioning but getPocket can't handle this. A fix
would be to add a prefix to every namespace and/or key. These can be given when
you generate the pocket object.

## Todo

    /**
     * Returns a reference object that works like a regular Container but only in
     * a given namespace.
     *
     * @param {string} path - The path you want to reference
     */
    Container.prototype.getReference = function(path)

    // Should be as simple as creating a new Container instance and assigning
    // the actual namespace object as it's root object.

## License

MIT.
