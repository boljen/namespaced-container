var Container = require('./index.js');

Container.defaultPrefix = '_';
var p = '_';

describe('Container', function() {

  describe('basics', function() {
    it('Should exist', function() {
      Container.should.be.instanceOf(Function);
    });
  });

  describe('constructor()', function() {

    it('Should construct', function() {
      var c = new Container({});
    });

  });

  describe('set()', function() {

    var c, o;

    beforeEach(function() {
      o = {};
      c = new Container(o);
    });

    it('Should set the value', function() {
      c.set('test', 'test');
      o.test.should.equal('test');
      c.set('nested.test', 'test');
      o[p+'nested'].test.should.equal('test');
    });

  });

  describe('get()', function() {

    var o, c;

    beforeEach(function() {
      o = {};
      c = new Container(o);
    });

    it('Should get the value', function() {
      o.test = 'test';
      c.get('test').should.equal('test');
    });

    it('Should get undefined if not set', function() {
      (c.get('test') === undefined).should.be.true;
    });

    it('Should return default value if given', function() {
      c.get('test', 'default').should.equal('default');
    });

  });

  describe('delete()', function() {
    var o, c;

    beforeEach(function() {
      o = {};
      o[p+'dummy'] = {
          data: 'test',
          otherData: 'test'
      };
      c = new Container(o);
    });

    it('Should delete the value', function() {
      c.delete('dummy.data');
      var t = {};
      t[p+'dummy'] = {
        otherData:'test'
      };
      o.should.eql(t);
    });

  });

  describe('deleteNamespace()', function() {

    var o, c;

    beforeEach(function() {
      o = {};
      o[p+'dummy'] = {
        data: 'test',
        testData: 'test',
      };
      o[p+'otherDummy'] = {
        test: 'ok'
      }
      c = new Container(o);
    });

    it('Should delete the namespace', function() {
      c.deleteNamespace('dummy');

      var t = {};
      t[p+'otherDummy'] = {
        test: 'ok'
      };

      o.should.eql(t);
    });
  });

  describe('deleteNamespaceContent()', function() {
    var o, c;

    beforeEach(function() {

      o = {};
      o[p+'dummy'] = {
        data: 'test',
        testData: 'test',
      };
      o[p+'otherDummy'] = {
        test: 'ok'
      }
      c = new Container(o);
    });

    it('Should delete the namespace content', function() {
      c.deleteNamespaceContent('dummy');

      var comp = {};
      comp[p+'dummy'] = {};
      comp[p+'otherDummy'] ={test:'ok'};
      o.should.eql(comp);
    });
  });

  describe('getObject()', function() {
    var c, o;

    beforeEach(function() {
      o = {};
      c = new Container(o);
    });

    it('Should return the object', function() {
      c.getObject().should.equal(o);
    });
  });

});
