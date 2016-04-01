function exportModule(name, moduleObj) {
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = moduleObj;

  } else if (typeof define === 'function' && define.amd) {
    define(name, [], function() { return moduleObj });

  } else {
    var global = typeof window === 'undefined' ? this : window;
    global[name] = moduleObj;
  }
}