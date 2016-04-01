(function(global) {

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = Keycoder;

  } else if (typeof define === 'function' && define.amd && define.amd.Keycoder === true) {
    define('Keycoder', [], function() { return Keycoder });

  } else {
    global.Keycoder = Keycoder;
  }

})(global);