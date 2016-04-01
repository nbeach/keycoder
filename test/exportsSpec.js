describe('exports', function() {

  describe('allows loading by', function() {
    var moduleName, mockModule;

    beforeEach(function() {
      delete module;
      delete define;

      moduleName = 'moduleName';
      mockModule = jasmine.createSpyObj('mockModule', ['doSomething']);
    });

    it('global scope', function() {
      exports(moduleName, mockModule);
      window[moduleName].doSomething();
      expect(window[moduleName]).toBe(mockModule);
    });

    it('CommonJS', function() {
      module = { exports: {} };
      exports(moduleName, mockModule);
      expect(module.exports).toBe(mockModule);
    });

    it('AMD', function() {
      var actualName = null, actualModule = null;
      define = function(name, dependencies, moduleFactory) {
        actualName = name;
        actualModule = moduleFactory();
      };
      define.amd = {};
      define.amd[moduleName] = true;

      exports(moduleName, mockModule);

      expect(actualName).toBe(moduleName);
      expect(actualModule).toBe(mockModule);
    });

  });

});
