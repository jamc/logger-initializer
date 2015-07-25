var should      = require('chai').should();
var sinon       = require('sinon');
var sandbox     = sinon.sandbox.create();

describe('Winston logger initializer', function() {

  afterEach(function() {
    delete require.cache[require.resolve('../index')];
    delete require.cache[require.resolve('winston')];
    sandbox.restore();
  });

  describe('returns a winston object', function() {
    describe('with warn log level', function() {
      it('when initialized with no parameters', function () {
        var logger  = require('../index')();

        logger.should.be.an.object;
        logger.level.should.equal('warn');
        logger.initialized.should.be.true;
      });
    });
    
    describe('with error log level', function() {
      it('when initialized with error log level as parameter', function () {
        var logger  = require('../index')('error');

        logger.should.be.an.object;
        logger.level.should.equal('error');
        logger.initialized.should.be.true;
      });
    });
    // @TODO More tests
  });
});