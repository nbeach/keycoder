(function(global, factory) {

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
  } else if(typeof define === 'function' && define.amd && define.amd.Keycoder === true) {
      define('Keycoder', [], factory);
  } else {
    window.Keycoder = factory();
  }

}(typeof window !== "undefined" ? window : this, function KeycoderFactory() {

  var keyData = [
    { char: "0", shift: ")", ie: 48, ascii: { norm: 48, shift: 41 } },
    { char: "1", shift: "!", ie: 49, ascii: { norm: 49, shift: 33 } },
    { char: "2", shift: "@", ie: 50, ascii: { norm: 50, shift: 64 } },
    { char: "3", shift: "#", ie: 51, ascii: { norm: 51, shift: 35 } },
    { char: "4", shift: "$", ie: 52, ascii: { norm: 52, shift: 36 } },
    { char: "5", shift: "%", ie: 53, ascii: { norm: 53, shift: 37 } },
    { char: "6", shift: "^", ie: 54, ascii: { norm: 54, shift: 94 } },
    { char: "7", shift: "&", ie: 55, ascii: { norm: 55, shift: 38 } },
    { char: "8", shift: "*", ie: 56, ascii: { norm: 56, shift: 42 } },
    { char: "9", shift: "(", ie: 57, ascii: { norm: 57, shift: 40 } },
    { char: "a", shift: "A", ie: 65, ascii: { norm: 97, shift: 65 } },
    { char: "b", shift: "B", ie: 66, ascii: { norm: 98, shift: 66 } },
    { char: "c", shift: "C", ie: 67, ascii: { norm: 99, shift: 67 } },
    { char: "d", shift: "D", ie: 68, ascii: { norm: 100, shift: 68 } },
    { char: "e", shift: "E", ie: 69, ascii: { norm: 101, shift: 69 } },
    { char: "f", shift: "F", ie: 70, ascii: { norm: 102, shift: 70 } },
    { char: "g", shift: "G", ie: 71, ascii: { norm: 103, shift: 71 } },
    { char: "h", shift: "H", ie: 72, ascii: { norm: 104, shift: 72 } },
    { char: "i", shift: "I", ie: 73, ascii: { norm: 105, shift: 73 } },
    { char: "j", shift: "J", ie: 74, ascii: { norm: 106, shift: 74 } },
    { char: "k", shift: "K", ie: 75, ascii: { norm: 107, shift: 75 } },
    { char: "l", shift: "L", ie: 76, ascii: { norm: 108, shift: 76 } },
    { char: "m", shift: "M", ie: 77, ascii: { norm: 109, shift: 77 } },
    { char: "n", shift: "N", ie: 78, ascii: { norm: 110, shift: 78 } },
    { char: "o", shift: "O", ie: 79, ascii: { norm: 111, shift: 79 } },
    { char: "p", shift: "P", ie: 80, ascii: { norm: 112, shift: 80 } },
    { char: "q", shift: "Q", ie: 81, ascii: { norm: 113, shift: 81 } },
    { char: "r", shift: "R", ie: 82, ascii: { norm: 114, shift: 82 } },
    { char: "s", shift: "S", ie: 83, ascii: { norm: 115, shift: 83 } },
    { char: "t", shift: "T", ie: 84, ascii: { norm: 116, shift: 84 } },
    { char: "u", shift: "U", ie: 85, ascii: { norm: 117, shift: 85 } },
    { char: "v", shift: "V", ie: 86, ascii: { norm: 118, shift: 86 } },
    { char: "w", shift: "W", ie: 87, ascii: { norm: 119, shift: 87 } },
    { char: "x", shift: "X", ie: 88, ascii: { norm: 120, shift: 88 } },
    { char: "y", shift: "Y", ie: 89, ascii: { norm: 121, shift: 89 } },
    { char: "z", shift: "Z", ie: 90, ascii: { norm: 122, shift: 90 } },
    { char: " ", ie: 32, ascii: { norm: 32 } },
    { char: ";", shift: ":", ie: 186, moz: 59, ascii: { norm: 59, shift: 58 } },
    { char: "=", shift: "+", ie: 187, moz: 61, ascii: { norm: 61, shift: 43 } },
    { char: ",", shift: "<", ie: 188, ascii: { norm: 44, shift: 60 } },
    { char: "-", shift: "_", ie: 189, moz: 173, ascii: { norm:45, shift: 95 } },
    { char: ".", shift: ">", ie: 190, ascii: { norm: 46, shift: 62 } },
    { char: "/", shift: "?", ie: 191, ascii: { norm: 47, shift: 63 } },
    { char: "`", shift: "~", ie: 192, ascii: { norm: 96, shift: 126 } },
    { char: "[", shift: "{", ie: 219, ascii: { norm: 91, shift: 123 } },
    { char: "\\", shift: "|", ie: 220, ascii: { norm: 92, shift: 124 } },
    { char: "]", shift: "}", ie: 221, ascii: { norm: 93, shift: 125 } },
    { char: "'", shift: "\"", ie: 222, ascii: { norm: 39, shift: 34 } },
    //TODO: get ASCII codes for keys below this (if they exist)
    { names: ["F1"], ie: 112 },
    { names: ["F2"], ie: 113 },
    { names: ["F3"], ie: 114 },
    { names: ["F4"], ie: 115 },
    { names: ["F5"], ie: 116 },
    { names: ["F6"], ie: 117 },
    { names: ["F7"], ie: 118 },
    { names: ["F8"], ie: 119 },
    { names: ["F9"], ie: 120 },
    { names: ["F10"], ie: 121 },
    { names: ["F11"], ie: 122 },
    { names: ["F12"], ie: 123 },
    { char: "0", names: ["NUMPAD_0"], ie: 96 },
    { char: "1", names: ["NUMPAD_1"], ie: 97 },
    { char: "2", names: ["NUMPAD_2"], ie: 98 },
    { char: "3", names: ["NUMPAD_3"], ie: 99 },
    { char: "4", names: ["NUMPAD_4"], ie: 100 },
    { char: "5", names: ["NUMPAD_5"], ie: 101 },
    { char: "6", names: ["NUMPAD_6"], ie: 102 },
    { char: "7", names: ["NUMPAD_7"], ie: 103 },
    { char: "8", names: ["NUMPAD_8"], ie: 104 },
    { char: "9", names: ["NUMPAD_9"], ie: 105 },
    { char: "*", names: ["NUMPAD_MULTIPLY"], ie: 106 },
    { char: "+", names: ["NUMPAD_PLUS"], ie: 107 },
    { char: "-", names: ["NUMPAD_MINUS"], ie: 109 },
    { char: ".", names: ["NUMPAD_DECIMAL"], ie: 110 },
    { char: "/", names: ["NUMPAD_DIVIDE"], ie: 111 },
    { names: ["NUMPAD_MIDDLE", "MAC_NUM_LOCK"], ie: 12 },
    { names: ["BACKSPACE"], ie: 8 },
    { names: ["TAB"], ie: 9 },
    { names: ["ENTER"], ie: 13 },
    { names: ["SHIFT"], ie: 16 },
    { names: ["CONTROL"], ie: 17 },
    { names: ["ALT"], ie: 18 },
    { names: ["PAUSE", "BREAK"], ie: 19 },
    { names: ["CAPS_LOCK"], ie: 20 },
    { names: ["ESCAPE"], ie: 27 },
    { names: ["WINDOWS", "COMMAND"], ie: 91, moz: 224 },
    { names: ["OPTION"], ie: 93 },
    { names: ["PRINT_SCREEN"], ie: 124, moz: 44 },
    { names: ["NUM_LOCK"], ie: 144 },
    { names: ["SCROLL_LOCK"], ie: 145 },
    { names: ["PAGE_UP"], ie: 33 },
    { names: ["PAGE_DOWN"], ie: 34 },
    { names: ["END"], ie: 35 },
    { names: ["HOME"], ie: 36 },
    { names: ["LEFT_ARROW"], ie: 37 },
    { names: ["UP_ARROW"], ie: 38 },
    { names: ["RIGHT_ARROW"], ie: 39 },
    { names: ["DOWN_ARROW"], ie: 40 },
    { names: ["INSERT"], ie: 45 },
    { names: ["DELETE"], ie: 46 }
  ];

  function clone(object) {
    return JSON.parse(JSON.stringify(object));
  }

  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  function whenUndefined(value, defaultVal) {
    return isUndefined(value) ? defaultVal : value;
  }

  function getKeyFromMap(code, map) {
    var keyData = map[code];

    if(isUndefined(keyData)) {
      return null;
    } else {
      return new Key(keyData);
    }
  }

  var Key = function(keyData) {
    this.shift = {};

    this.names = clone(whenUndefined(keyData.names, []));
    this.character = whenUndefined(keyData.char, null);
    this.shift.character = whenUndefined(keyData.shift, whenUndefined(keyData.char, null));
    this.keyCode = {
      ie: keyData.ie,
      mozilla: whenUndefined(keyData.moz, keyData.ie)
    };

    this.charCode = null;
    this.shift.charCode = null;
    if(!isUndefined(keyData.ascii)) {
      this.charCode = whenUndefined(keyData.ascii.norm, null);
      this.shift.charCode = whenUndefined(keyData.ascii.shift, whenUndefined(keyData.ascii.norm, null));
    }

  };

  Key.prototype.isPrintableCharacter = function() {
    return this.character !== null;
  };

  Key.prototype.hasCharCode = function() {
    return this.charCode !== null;
  };

  Key.prototype.hasDistinctShiftCharacter = function() {
    return this.character !== this.shift.character;
  };

  Key.prototype.equals = function(other) {
    if(typeof other === 'object') {
      return this.keyCode.ie === other.keyCode.ie;
    } else {
      return this.keyCode.ie === other || this.keyCode.mozilla === other;
    }
  };

  var keyCodeToKeyMap = [];
  var asciiCodeToKeyMap = [];
  var characterToKeyMap = {};
  var namedKeys = {};
  keyData.forEach(function(key) {

    // No matching IE and Mozilla key codes refer to different physical keys so a single map approach will not result in
    // any codes being overwritten in the map
    keyCodeToKeyMap[key.ie] = key;

    if(!isUndefined(key.moz)) {
      keyCodeToKeyMap[key.moz] = key;
    }

    if(!isUndefined(key.ascii)) {
      asciiCodeToKeyMap[key.ascii.norm] = key;
      if(!isUndefined(key.ascii.shift)) {
        asciiCodeToKeyMap[key.ascii.shift] = key;
      }
    }

    // Order matters when inserting to the character map. Sometime two keys have the same character value.
    // The more commonly used keys are put higher in the key list so they are looked up rather than less used keys.
    if(!isUndefined(key.char) && isUndefined(characterToKeyMap[key.char])) {
      characterToKeyMap[key.char] = key;
    }

    // Shift values should never override regular value in the map. If this was not the case num pad 1 could overwrite
    // the number row 1 in the map. Since keys like numpad 1 are less commonly used we don't want to do this.
    if(!isUndefined(key.shift) && isUndefined(characterToKeyMap[key.shift])) {
      characterToKeyMap[key.shift] = key;
    }

    if(!isUndefined(key.names)) {

      key.names.forEach(function(name) {
        namedKeys[name] = new Key(key);
      });
    }

  });

  return new (function Keycoder() {
    this.key = namedKeys;

    this.toCharacter = function(keyCode, shift) {
      var key = this.fromKeyCode(keyCode);
      if(key === null) {
        return null;
      }

      return shift ? key.shift.character : key.character;
    };

    this.charCodeToCharacter = function(charCode) {
      var key = this.fromCharCode(charCode);
      if(key !== null) {
        return key;
      }

      return key.charCode.normal === charCode ? key.character : key.shift.character;
    };

    this.fromCharacter = function(character) {
      return getKeyFromMap(character, characterToKeyMap);
    };

    this.fromKeyCode = function(keyCode) {
      return getKeyFromMap(keyCode, keyCodeToKeyMap);
    };

    this.fromCharCode = function(charCode) {
      return getKeyFromMap(charCode, asciiCodeToKeyMap);
    };

    this.allKeys = function() {
      var keys = [];
      keyData.forEach(function(key) {
        keys.push(new Key(key));
      });
      return keys;
    };

  })();

}));