/**
 * @module Keycoder
 */
exportModule('Keycoder', new (function(Util, Key, keyData) {
  var keyCodeToKeyMap = null;
  var asciiCodeToKeyMap = null;
  var characterToKeyMap = null;

  /**
   * An object containing references to all named keys.
   *
   * @type {object}
   * @property {Key} BACKSPACE
   * @property {Key} TAB
   * @property {Key} ENTER
   * @property {Key} SHIFT
   * @property {Key} CONTROL
   * @property {Key} ALT
   * @property {Key} PAUSE
   * @property {Key} BREAK
   * @property {Key} CAPS_LOCK
   * @property {Key} ESCAPE
   * @property {Key} WINDOWS
   * @property {Key} COMMAND
   * @property {Key} OPTION
   * @property {Key} PRINT_SCREEN
   * @property {Key} NUM_LOCK
   * @property {Key} MAC_NUM_LOCK
   * @property {Key} SCROLL_LOCK
   * @property {Key} PAGE_UP
   * @property {Key} PAGE_DOWN
   * @property {Key} END
   * @property {Key} HOME
   * @property {Key} LEFT_ARROW
   * @property {Key} UP_ARROW
   * @property {Key} RIGHT_ARROW
   * @property {Key} DOWN_ARROW
   * @property {Key} INSERT
   * @property {Key} DELETE
   * @property {Key} NUMPAD_0
   * @property {Key} NUMPAD_1
   * @property {Key} NUMPAD_2
   * @property {Key} NUMPAD_3
   * @property {Key} NUMPAD_4
   * @property {Key} NUMPAD_5
   * @property {Key} NUMPAD_6
   * @property {Key} NUMPAD_7
   * @property {Key} NUMPAD_8
   * @property {Key} NUMPAD_9
   * @property {Key} NUMPAD_MULTIPLY
   * @property {Key} NUMPAD_PLUS
   * @property {Key} NUMPAD_MINUS
   * @property {Key} NUMPAD_DECIMAL
   * @property {Key} NUMPAD_DIVIDE
   * @property {Key} NUMPAD_MIDDLE
   */

  this.key = {};
  var self = this;
  keyData.forEach(function (key) {
    if (!Util.isUndefined(key.names)) {
      key.names.forEach(function (name) {
        self.key[name] = new Key(key);
      });
    }
  });

  this._getKeyFromMap = function (code, map) {
    var keyData = map[code];

    if (Util.isUndefined(keyData)) {
      return null;
    } else {
      return new Key(keyData);
    }
  };

  this._initializeKeyCodeToKeyMap = function () {
    keyCodeToKeyMap = [];
    keyData.forEach(function (key) {
      // No matching IE and Mozilla key codes refer to different physical keys so a single map approach will not result in
      // any codes being overwritten in the map
      keyCodeToKeyMap[key.ie] = key;

      if (!Util.isUndefined(key.moz)) {
        keyCodeToKeyMap[key.moz] = key;
      }
    });
  };

  this._initializeAsciiCodeToKeyMap = function () {
    asciiCodeToKeyMap = [];
    keyData.forEach(function (key) {

      if (!Util.isUndefined(key.ascii)) {
        if(Util.isUndefined(asciiCodeToKeyMap[key.ascii.norm])) {
          asciiCodeToKeyMap[key.ascii.norm] = key;
        }

        if (!Util.isUndefined(key.ascii.shift)) {
          if(Util.isUndefined(asciiCodeToKeyMap[key.ascii.shift])) {
            asciiCodeToKeyMap[key.ascii.shift] = key;
          }
        }
      }

    });
  };

  this._initializeCharacterToKeyMap = function () {
    characterToKeyMap = {};
    keyData.forEach(function (key) {

      // Order matters when inserting to the character map. Sometime two keys have the same character value.
      // The more commonly used keys are put higher in the key list so they are looked up rather than less used keys.
      if (!Util.isUndefined(key.char) && Util.isUndefined(characterToKeyMap[key.char])) {
        characterToKeyMap[key.char] = key;
      }

      // Shift values should never override regular value in the map. If this was not the case num pad 1 could overwrite
      // the number row 1 in the map. Since keys like numpad 1 are less commonly used we don't want to do this.
      if (!Util.isUndefined(key.shift) && Util.isUndefined(characterToKeyMap[key.shift])) {
        characterToKeyMap[key.shift] = key;
      }

    });
  };


  /**
   * @param {number} keyCode - An IE or Mozilla key code
   * @param {boolean} shift - The shift key state. A value of true indicates it is pressed, false that it is not
   * @returns {string|null} The character for the keycode and shift state. Null if the key is not a printable character.
   */
  this.toCharacter = function(keyCode, shift) {
    var key = this.fromKeyCode(keyCode);
    if(key === null) {
      return null;
    }

    return shift ? key.shift.character : key.character;
  };

  /**
   * @param {number} charCode - An ASCII character code
   * @returns {string|null} Returns the character for the character code. Null if the key is not a printable character.
   */
  this.charCodeToCharacter = function(charCode) {
    var key = this.fromCharCode(charCode);
    if(key === null) {
      return null;
    }

    return key.charCode === charCode ? key.character : key.shift.character;
  };

  /**
   * @param {number} event - A keydown, keyup, or keypress event object
   * @returns {string|null} - The character pressed in the key event. Null if the key pressed is not a printable character, or the event is not a key event.
   */
  this.eventToCharacter = function(event) {
    var key = this.fromEvent(event);
    if(key === null) {
      return null;
    }

    return event.shiftKey ? key.shift.character : key.character;
  };

  /**
   * @param {string} character
   * @returns {Key|null} A Key object. Null if no key is associated with the provided code.
   */
  this.fromCharacter = function(character) {
    if (characterToKeyMap === null) {
      this._initializeCharacterToKeyMap();
    }

    return this._getKeyFromMap(character, characterToKeyMap);
  };

  /**
   * @param {number} keyCode - A IE or Mozilla key code
   * @returns {Key|null} A Key object. Null if no key is associated with the provided code.
   */
  this.fromKeyCode = function(keyCode) {
    if (keyCodeToKeyMap === null) {
      this._initializeKeyCodeToKeyMap();
    }

    return this._getKeyFromMap(keyCode, keyCodeToKeyMap);
  };

  /**
   * Maps an ASCII character code to a Key object
   * @param {number} charCode - An ASCII character code
   * @returns {Key|null} A Key object. Null if no key is associated with the provided code.
   */
  this.fromCharCode = function(charCode) {
    if (asciiCodeToKeyMap === null) {
      this._initializeAsciiCodeToKeyMap();
    }

    return this._getKeyFromMap(charCode, asciiCodeToKeyMap);
  };

  /**
   * Maps a keypress, keydown, or keyup event object to a key
   * @param {object} event - A keydown, keyup, or keypress event object
   * @returns {Key|null} A Key object. Null if no key was pressed in the provided event.
   */
  this.fromEvent = function(event) {
    var key = null;

    if(event.type === 'keydown' || event.type === 'keyup') {
      key = this.fromKeyCode(event.keyCode);
    } else if(event.type === 'keypress') {
      key = this.fromCharCode(event.charCode);
    }

    return key;
  };

  /**
   * @returns {Key[]} An array of Key objects for all keys
   */
  this.allKeys = function() {
    var keys = [];
    keyData.forEach(function (key) {
      keys.push(new Key(key));
    });
    return keys;
  };

})(Util, KeyConstructor, KeyData));