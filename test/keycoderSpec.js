describe('KeyCoder', function() {

  it('creates all named keys', function() {

    Keycoder.allKeys().forEach(function(key) {
     key.names.forEach(function(name) {
        expect(Keycoder.key[name]).not.toBeUndefined();
        expect(Keycoder.key[name].keyCode.ie).toBe(key.keyCode.ie);
      });
     });

  });

  describe('protects source key data from changes to', function() {
    var changedAKey, changedBackspaceKey;

    beforeEach(function() {
      changedAKey = Keycoder.fromCharacter('a');
      changedBackspaceKey = Keycoder.fromKeyCode(8);
    });

    describe('name', function() {

      it('values', function() {
        changedBackspaceKey.names[0] = 'DIFFERENT';
        expect(Keycoder.fromKeyCode(8).names[0]).not.toBe('DIFFERENT');
      });

      it('arrays', function() {
        changedBackspaceKey.names = ['DIFFERENT'];
        expect(Keycoder.fromKeyCode(8).names[0]).not.toBe('DIFFERENT');
      });

    });

    it('characters', function() {
      changedAKey.character = '-';
      expect(Keycoder.fromCharacter('a').character).not.toBe('-');
    });

    it('shift characters', function() {
      changedAKey.shift.character = '-';
      expect(Keycoder.fromCharacter('a').shift.character).not.toBe('-');
    });

    it('Mozilla key codes', function() {
      changedAKey.keyCode.mozilla = -1;
      expect(Keycoder.fromCharacter('a').keyCode.mozilla).not.toBe(-1);
    });

    it('IE key codes', function() {
      changedAKey.keyCode.ie = -1;
      expect(Keycoder.fromCharacter('a').keyCode.ie).not.toBe(-1);
    });

    it('character codes', function() {
      changedAKey.charCode = -1;
      expect(Keycoder.fromCharCode(97).charCode).not.toBe(-1);
    });

    it('shift character codes', function() {
      changedAKey.charCode = -1;
      expect(Keycoder.fromCharCode(65).charCode).not.toBe(-1);
    });

  });

  describe('compares', function() {
    var deleteKey, otherDeleteKey, backspaceKey;

    beforeEach(function() {
      backspaceKey = Keycoder.fromKeyCode(8);
      deleteKey = Keycoder.fromKeyCode(46);
      otherDeleteKey = Keycoder.fromKeyCode(46);
    });

    describe('key objects to key objects and', function() {

      it('returns true when they are equal', function() {
          expect(deleteKey.equals(otherDeleteKey)).toBe(true);
      });

      it('returns false when they are not equal', function() {
        expect(backspaceKey.equals(deleteKey)).toBe(false);
      });
    });

    describe('IE key codes to key objects and', function() {

      it('returns true when they are equal', function() {
        expect(deleteKey.equals(otherDeleteKey.keyCode.ie)).toBe(true);
      });

      it('returns false when they are not equal', function() {
        expect(backspaceKey.equals(deleteKey.keyCode.ie)).toBe(false);
      });

    });

    describe('Mozilla key codes to key objects and', function() {

      it('returns true when they are equal', function() {
        expect(deleteKey.equals(otherDeleteKey.keyCode.mozilla)).toBe(true);
      });

      it('returns false when they are not equal', function() {
        expect(backspaceKey.equals(deleteKey.keyCode.mozilla)).toBe(false);
      });

    });

    describe('named keys to key objects and', function() {

      it('returns true when they are equal', function() {
        expect(deleteKey.equals(Keycoder.key.DELETE)).toBe(true);
      });

      it('returns false when they are not equal', function() {
        expect(deleteKey.equals(Keycoder.key.INSERT)).toBe(false);
      });

    });

  });

  describe('key objects know if they', function() {

    it('have distinct shift characters', function() {
      var aKey = Keycoder.fromCharacter('1');
      expect(aKey.hasDistinctShiftCharacter()).toBe(true);
    });

    it('do not have distinct shift characters', function() {
      var spaceKey = Keycoder.fromCharacter(' ');
      expect(spaceKey.hasDistinctShiftCharacter()).toBe(false);
    });

    it('are printable characters', function() {
      var aKey = Keycoder.fromCharacter('a');
      expect(aKey.isPrintableCharacter()).toBe(true);
    });

    it('are not printable characters', function() {
      var backSpaceKey = Keycoder.fromKeyCode(8);
      expect(backSpaceKey.isPrintableCharacter()).toBe(false);
    });

    it('have character codes', function() {
      var aKey = Keycoder.fromCharacter('a');
      expect(aKey.hasCharCode()).toBe(true);
    });

    it('do not have character codes', function() {
      expect(Keycoder.key.BACKSPACE.hasCharCode()).toBe(false);
    });

  });

  describe('maps', function() {

    describe('printable character', function() {

      var characters = ' 0123456789abcdefghijklmnopqrstuvwxyz`-=[]\\;\',./'.split('');
      characters.forEach(function(character) {

        it(character + 'to a key', function() {
          var key = Keycoder.fromCharacter(character);
          expect(key.character).toBe(character);
        });

      });

      var shiftCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+{}|:"<>?'.split('');
      shiftCharacters.forEach(function(character) {

        it(character + 'to a key', function() {
          var key = Keycoder.fromCharacter(character);
          expect(key.shift.character).toBe(character);

        });

      });

    });

    Keycoder.allKeys().forEach(function(key) {

      if(key.character !== null) {
        it('IE keycode '+ key.keyCode.ie + ' to ' + key.character, function() {
          var ieCharacter = Keycoder.toCharacter(key.keyCode.ie);
          expect(ieCharacter).toBe(key.character);
        });

        it('Mozilla keycode '+ key.keyCode.mozilla + ' to ' + key.character, function() {
          var mozillaCharacter = Keycoder.toCharacter(key.keyCode.mozilla);
          expect(mozillaCharacter).toBe(key.character);
        });
      }

      it('Mozilla key code ' + key.keyCode.mozilla + ' to a key', function() {
          var mappedKey = Keycoder.fromKeyCode(key.keyCode.mozilla);
          expect(mappedKey.keyCode.mozilla).toBe(key.keyCode.mozilla);
      });

      it('IE key code ' + key.keyCode.ie + ' to a key', function() {
          var mappedKey = Keycoder.fromKeyCode(key.keyCode.ie);
          expect(mappedKey.keyCode.ie).toBe(key.keyCode.ie);

      });

      //Skip the numpad keys since their char codes match those of the other number keys
      //they won't map back to the same value
      if(key.charCode !== null && (key.charCode < 42 || key.charCode > 57)) {

        it('ASCII char code ' + key.charCode + ' to a key', function() {
          var mappedKey = Keycoder.fromCharCode(key.charCode);
          expect(mappedKey.charCode).toBe(key.charCode);
        });

      }

      //Skip the numpad keys since their char codes match those of the other number keys
      //they won't map back to the same value
      if(key.shift.charCode !== null && (key.shift.charCode < 42 || key.shift.charCode > 57)) {

        it('ASCII shift char code ' + key.shift.charCode + ' to a key', function() {
          var mappedKey = Keycoder.fromCharCode(key.shift.charCode);
          expect(mappedKey.shift.charCode).toBe(key.shift.charCode);
        });
      }

      if(key.charCode !== null && key.character != null) {
        it('ASCII char code ' + key.charCode + ' to ' + key.character, function() {
          var mappedCharacter = Keycoder.charCodeToCharacter(key.charCode);
          expect(mappedCharacter).toBe(key.character);
        });
      }

      if(key.shift.charCode !== null && key.shift.character != null) {
        it('char code ' + key.charCode + ' to ' + key.shift.character, function() {
            var mappedCharacter = Keycoder.charCodeToCharacter(key.shift.charCode);
            expect(mappedCharacter).toBe(key.shift.character);
        });
      }
    });
  });
});