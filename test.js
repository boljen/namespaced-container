var Container = require('./index.js');

describe('Container', function() {

  describe('basics', function() {
    it('Should exist', function() {
      Container.should.be.instanceOf(Function);
    });
    it('Should return an instance when calling New()', function() {
      Container.New().should.be.instanceOf(Container);
    });
  });

  describe('add', function() {
    var container;

    beforeEach(function() {
      container = new Container();
    });

    it('Should add a function', function() {
      var fx = function() {};
      container.add('test', fx);
      container._fx.test.should.equal(fx);
      container._fxn['test'].should.equal(fx);
    });

    it('Should add a namespaced function', function() {
      var fx =function() {};
      container.add('test.namespace', fx);
      container._fx._test.namespace.should.equal(fx);
      container._fxn['test.namespace'].should.equal(fx);
      container.add('test.namespace.test', fx);
      container._fx._test._namespace.test.should.equal(fx);
      container._fxn['test.namespace.test'].should.equal(fx);
    });

    it('Should add namespaced function without conflict', function() {
        var fx = function() {};
        container.add('test', fx);
        container.add('test.namespace', fx);
        container._fx.test.should.equal(fx);
        container._fx._test.namespace.should.equal(fx);
    });

  })

  describe('get', function() {

    var container = new Container();
    container.add('test', function() {});

    it('Should return the function', function() {
      container.get('test').should.be.instanceOf(Function);
    });

    it('Should return null if no function', function() {
      (container.get('testNull') === null).should.be.true;
    });

    it('Should throw an error if no function and throwError enabled', function() {
      (function() {container.get('testNull', true)}).should.throw();
    });

  });

  describe('getPocket', function() {

    var container = new Container();
    var fx = function() {};
    container.add('namespace.test', fx);
    container.add('namespace.test2', fx);
    container.add('namespace.ns.test', fx);

    it('Should return a copy of all the functions in said pocket', function() {
      var res = container.getPocket('namespace');
      res.should.eql({
        test: fx,
        'test2': fx,
        ns: {
          test: fx
        }
      })
    });

  });

});
