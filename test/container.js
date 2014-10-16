var Container = require('./../lib/container');

describe('.Container', function() {

  describe('constructor()', function() {

    it('Should construct and set default properties', function() {
      var c = new Container();
      c._obj.should.eql({});
      c._nsPrefix.should.equal('_');
      c._validate.should.be.instanceOf(Function);
      c._separator.should.equal('.');
    });

    it('Should accept custom properties', function() {
      var obj = {}
        , pref = 'ù'
        , val = function() {};

      var c = new Container({
        root: obj,
        namespacePrefix: pref,
        validate: val,
        separator: '_'
      });
      c._obj.should.equal(obj);
      c._nsPrefix.should.equal(pref);
      c._validate.should.equal(val);
      c._separator.should.equal('_');
    });

  });

  describe('_splitKey()', function() {

    it('Should split the keys and apply the namespace prefix', function() {
      var c = new Container();
      c._splitKey('test.key.name').should.eql(['_test', '_key', 'name']);
      c._splitKey('test').should.eql(['test']);
    });

    it.skip('Should throw an error if the namespace prefix is used', function() {

    });

    it.skip('Should throw an error if an invalid key is used', function() {

    });

  });

  describe('getRoot', function() {
    it('Should return the root', function() {
      var root = {};
      var c = new Container({
        root: root
      });
      c.getRoot().should.equal(root);
    });
  });



  describe.skip('set()', function() {
    it('Should set the value', function() {

    });
    it('Should set the namespaced value', function() {

    });
    it('Should apply proper namespace prefixes', function() {

    });
  });

  describe.skip('get()', function() {

  });

  describe.skip('getNamespace()', function() {

  });

  describe.skip('delete()', function() {

  });

  describe.skip('deleteNamespace()', function() {

  });

});
