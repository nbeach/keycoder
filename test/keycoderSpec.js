describe('KeyCoder', function() {

  describe('allows loading by', function() {

    it('global scope', function() {
      expect(typeof window.KeyCoder).not.toBe('undefined');
    });

    //TODO: Devise tests for other module loading strategies
    //it('CommonJS', function() {
    //
    //});
    //
    //it('AMD', function() {
    //
    //});

  });


  it('creates all named keys', function() {

    KeyCoder.allKeys().forEach(function(key) {
     key.names.forEach(function(name) {
        expect(KeyCoder.key[name]).not.toBeUndefined();
        expect(KeyCoder.key[name].keyCode.ie).toBe(key.keyCode.ie);
      });
     });

  });

  describe('protects source key data from changes to', function() {
    var changedAKey, changedBackspaceKey;

    beforeEach(function() {
      changedAKey = KeyCoder.fromCharacter('a');
      changedBackspaceKey = KeyCoder.fromKeyCode(8);
    });

    describe('name', function() {

      it('values', function() {
        changedBackspaceKey.names[0] = 'DIFFERENT';
        expect(KeyCoder.fromKeyCode(8).names[0]).not.toBe('DIFFERENT');
      });

      it('arrays', function() {
        changedBackspaceKey.names = ['DIFFERENT'];
        expect(KeyCoder.fromKeyCode(8).names[0]).not.toBe('DIFFERENT');
      });

    });

    it('characters', function() {
      changedAKey.character = '-';
      expect(KeyCoder.fromCharacter('a').character).not.toBe('-');
    });

    it('shift characters', function() {
      changedAKey.shift.character = '-';
      expect(KeyCoder.fromCharacter('a').shift.character).not.toBe('-');
    });

    it('IE key codes', function() {
      changedAKey.keyCode.mozilla = -1;
      expect(KeyCoder.fromCharacter('a').keyCode.mozilla).not.toBe(-1);
    });

    it('Mozilla key codes', function() {
      changedAKey.keyCode.ie = -1;
      expect(KeyCoder.fromCharacter('a').keyCode.ie).not.toBe(-1);
    });

  });

  describe('compares', function() {
    var deleteKey, otherDeleteKey, backspaceKey;

    beforeEach(function() {
      backspaceKey = KeyCoder.fromKeyCode(8);
      deleteKey = KeyCoder.fromKeyCode(46);
      otherDeleteKey = KeyCoder.fromKeyCode(46);
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
        expect(deleteKey.equals(KeyCoder.key.DELETE)).toBe(true);
      });

      it('returns false when they are not equal', function() {
        expect(deleteKey.equals(KeyCoder.key.INSERT)).toBe(false);
      });

    });

  });

  describe('key objects know if they', function() {

    it('have distinct shift characters', function() {
      var aKey = KeyCoder.fromCharacter('1');
      expect(aKey.hasDistinctShiftCharacter()).toBe(true);
    });

    it('do not have distinct shift characters', function() {
      var spaceKey = KeyCoder.fromCharacter(' ');
      expect(spaceKey.hasDistinctShiftCharacter()).toBe(false);
    });

    it('are printable characters', function() {
      var aKey = KeyCoder.fromCharacter('a');
      expect(aKey.isPrintableCharacter()).toBe(true);
    });

    it('are not printable characters', function() {
      var backSpaceKey = KeyCoder.fromKeyCode(8);
      expect(backSpaceKey.isPrintableCharacter()).toBe(false);
    });

    it('have character codes', function() {
      var aKey = KeyCoder.fromCharacter('a');
      expect(aKey.hasCharCode()).toBe(true);
    });

    it('do not have character codes', function() {
      expect(KeyCoder.key.BACKSPACE.hasCharCode()).toBe(false);
    });

  });

  describe('maps', function() {

    it('all printable characters to keys', function() {
      var characters = ' 0123456789abcdefghijklmnopqrstuvwxyz`-=[]\\;\',./';
      var shiftCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+{}|:"<>?';
      var character, key, i;


      for(i = 0; i < characters.length; i++) {
        character = characters.charAt(i);
        key = KeyCoder.fromCharacter(character);

        expect(key.character).toBe(character);
      }

      for(i = 0; i < shiftCharacters.length; i++) {
        character = shiftCharacters.charAt(i);
        key = KeyCoder.fromCharacter(character);

        expect(key.shift.character).toBe(character);
      }

    });

    it('all keys to with printable characters to characters', function() {

      KeyCoder.allKeys().forEach(function(key) {
        if(key.character !== null) {
          var ieCharacter = KeyCoder.toCharacter(key.keyCode.ie);
          var mozillaCharacter = KeyCoder.toCharacter(key.keyCode.mozilla);

          expect(ieCharacter).toBe(key.character);
          expect(mozillaCharacter).toBe(key.character);
        }
      });

    });

    it('all Mozilla key codes to keys', function() {

      KeyCoder.allKeys().forEach(function(key) {
        var mappedKey = KeyCoder.fromKeyCode(key.keyCode.mozilla);
        expect(mappedKey.keyCode.mozilla).toBe(key.keyCode.mozilla);
      });

    });

    it('all IE key codes to keys', function() {

      KeyCoder.allKeys().forEach(function(key) {
        var mappedKey = KeyCoder.fromKeyCode(key.keyCode.ie);
        expect(mappedKey.keyCode.ie).toBe(key.keyCode.ie);
      });

    });

    it('all ASCII char codes to keys', function() {

      KeyCoder.allKeys().forEach(function(key) {
        if(key.charCode !== null) {
          var mappedKey = KeyCoder.charCodeToCharacter(key.charCode);
          expect(mappedKey.charCode).toBe(key.charCode);
        }
      });

    });

    it('all ASCII shift char codes to keys', function() {

      KeyCoder.allKeys().forEach(function(key) {
        if(key.shift.charCode !== null) {
          var mappedKey = KeyCoder.charCodeToCharacter(key.shift.charCode);
          expect(mappedKey.shift.charCode).toBe(key.shift.charCode);
        }
      });

    });
  });

});