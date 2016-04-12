//require('../src/exportModule');
//var expect = require('chai').expect;
//
//
////spies = require('chai-spies');
////
////chai.use(spies);
//
//
//describe('exportModule', function() {
//
//  describe('allows loading by', function() {
//    var moduleName, mockModule;
//
//    beforeEach(function() {
//      delete module;
//      delete define;
//
//      moduleName = 'moduleName';
//      mockModule = jasmine.createSpyObj('mockModule', ['doSomething']);
//    });
//
//    it('global', function() {
//      exportModule(moduleName, mockModule);
//      window[moduleName].doSomething();
//      expect(window[moduleName]).toBe(mockModule);
//    });
//
//    it('CommonJS', function() {
//      module = { exports: {} };
//      exportModule(moduleName, mockModule);
//      expect(module.exports).toBe(mockModule);
//    });
//
//    it('AMD', function() {
//      var actualName = null, actualModule = null;
//      define = function(name, dependencies, moduleFactory) {
//        actualName = name;
//        actualModule = moduleFactory();
//      };
//      define.amd = {};
//      exportModule(moduleName, mockModule);
//
//      expect(actualName).toBe(moduleName);
//      expect(actualModule).toBe(mockModule);
//    });
//
//  });
//
//});
