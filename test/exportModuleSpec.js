describe('exportModule', function() {

  describe('allows loading by', function() {
    var moduleName, mockModule;

    beforeEach(function() {
      delete module;
      delete define;

      moduleName = 'moduleName';
      mockModule = chai.spy.object(['doSomething']);
    });

    it('global', function() {
      exportModule(moduleName, mockModule);
      window[moduleName].doSomething();
      expect(window[moduleName]).to.equal(mockModule);
    });

    it('CommonJS', function() {
      module = { exports: {} };
      exportModule(moduleName, mockModule);
      expect(module.exports).to.equal(mockModule);
    });

    it('AMD', function() {
      var actualName = null, actualModule = null;
      define = function(name, dependencies, moduleFactory) {
        actualName = name;
        actualModule = moduleFactory();
      };
      define.amd = {};
      exportModule(moduleName, mockModule);

      expect(actualName).to.equal(moduleName);
      expect(actualModule).to.equal(mockModule);
    });

  });

});
