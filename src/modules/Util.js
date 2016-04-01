var Util = new (function(){

  this.clone = function(object) {
    return JSON.parse(JSON.stringify(object));
  };

  this.isUndefined = function(value) {
    return typeof value === 'undefined';
  };

  this.whenUndefined = function(value, defaultVal) {
    return this.isUndefined(value) ? defaultVal : value;
  };

})();