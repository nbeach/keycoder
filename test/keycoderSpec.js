describe('KeyCoder', function() {

  it('all keys returns the correct number of keys', function() {
    expect(Keycoder.allKeys().length).to.equal(100);
  });

  it('creates all named keys', function() {

    Keycoder.allKeys().forEach(function(key) {
     key.names.forEach(function(name) {
        expect(Keycoder.key[name]).not.to.be.undefined;
        expect(Keycoder.key[name].keyCode.ie).to.equal(key.keyCode.ie);
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
        expect(Keycoder.fromKeyCode(8).names[0]).not.to.equal('DIFFERENT');
      });

      it('arrays', function() {
        changedBackspaceKey.names = ['DIFFERENT'];
        expect(Keycoder.fromKeyCode(8).names[0]).not.to.equal('DIFFERENT');
      });

    });

    it('characters', function() {
      changedAKey.character = '-';
      expect(Keycoder.fromCharacter('a').character).not.to.equal('-');
    });

    it('shift characters', function() {
      changedAKey.shift.character = '-';
      expect(Keycoder.fromCharacter('a').shift.character).not.to.equal('-');
    });

    it('Mozilla key codes', function() {
      changedAKey.keyCode.mozilla = -1;
      expect(Keycoder.fromCharacter('a').keyCode.mozilla).not.to.equal(-1);
    });

    it('IE key codes', function() {
      changedAKey.keyCode.ie = -1;
      expect(Keycoder.fromCharacter('a').keyCode.ie).not.to.equal(-1);
    });

    it('character codes', function() {
      changedAKey.charCode = -1;
      expect(Keycoder.fromCharCode(97).charCode).not.to.equal(-1);
    });

    it('shift character codes', function() {
      changedAKey.charCode = -1;
      expect(Keycoder.fromCharCode(65).charCode).not.to.equal(-1);
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
          expect(deleteKey.equals(otherDeleteKey)).to.equal(true);
      });

      it('returns false when they are not equal', function() {
        expect(backspaceKey.equals(deleteKey)).to.equal(false);
      });
    });

    describe('IE key codes to key objects and', function() {

      it('returns true when they are equal', function() {
        expect(deleteKey.equals(otherDeleteKey.keyCode.ie)).to.equal(true);
      });

      it('returns false when they are not equal', function() {
        expect(backspaceKey.equals(deleteKey.keyCode.ie)).to.equal(false);
      });

    });

    describe('Mozilla key codes to key objects and', function() {

      it('returns true when they are equal', function() {
        expect(deleteKey.equals(otherDeleteKey.keyCode.mozilla)).to.equal(true);
      });

      it('returns false when they are not equal', function() {
        expect(backspaceKey.equals(deleteKey.keyCode.mozilla)).to.equal(false);
      });

    });

    describe('named keys to key objects and', function() {

      it('returns true when they are equal', function() {
        expect(deleteKey.equals(Keycoder.key.DELETE)).to.equal(true);
      });

      it('returns false when they are not equal', function() {
        expect(deleteKey.equals(Keycoder.key.INSERT)).to.equal(false);
      });

    });

  });

  describe('key objects know if they', function() {

    it('have distinct shift characters', function() {
      var aKey = Keycoder.fromCharacter('1');
      expect(aKey.hasDistinctShiftCharacter()).to.equal(true);
    });

    it('do not have distinct shift characters', function() {
      var spaceKey = Keycoder.fromCharacter(' ');
      expect(spaceKey.hasDistinctShiftCharacter()).to.equal(false);
    });

    it('are printable characters', function() {
      var aKey = Keycoder.fromCharacter('a');
      expect(aKey.isPrintableCharacter()).to.equal(true);
    });

    it('are not printable characters', function() {
      var backSpaceKey = Keycoder.fromKeyCode(8);
      expect(backSpaceKey.isPrintableCharacter()).to.equal(false);
    });

    it('have character codes', function() {
      var aKey = Keycoder.fromCharacter('a');
      expect(aKey.hasCharCode()).to.equal(true);
    });

    it('do not have character codes', function() {
      expect(Keycoder.key.BACKSPACE.hasCharCode()).to.equal(false);
    });

  });

  describe('maps', function() {

    describe('event objects with type', function() {
      var event;



      describe('keypress', function() {

        beforeEach(function() {
          event = {
            type: 'keypress',
            shiftKey: false

          }
        });


        it('to a printable character', function() {
          event.charCode = 97;
          expect(Keycoder.eventToCharacter(event)).to.equal('a');

        });

        it('to a shift key printable characters ', function() {
          event.charCode = 65;
          event.shiftKey = true;
          expect(Keycoder.eventToCharacter(event)).to.equal('A');

        });

        it('to null if no matching key is found', function() {
          it('to a shift key printable characters ', function() {
            event.charCode = -1;
            expect(Keycoder.eventToCharacter(event)).to.equal(null);
          });
        });


      });

      describe('keyup', function() {

        beforeEach(function() {
          event = {
            type: 'keyup',
            keyCode: 65,
            shiftKey: false
          }
        });

        it('to a printable character', function() {
          expect(Keycoder.eventToCharacter(event)).to.equal('a');
        });

        it('to a shift key printable characters ', function() {
          event.shiftKey = true;
          expect(Keycoder.eventToCharacter(event)).to.equal('A');

        });

        it('to null if no matching key is found', function() {
          it('to a shift key printable characters ', function() {
            event.keyCode = -1;
            expect(Keycoder.eventToCharacter(event)).to.equal(null);
          });
        });

      });

      describe('keydown', function() {

        beforeEach(function() {
          event = {
            type: 'keydown',
            keyCode: 65,
            shiftKey: false
          }
        });

        it('to a printable character', function() {
          expect(Keycoder.eventToCharacter(event)).to.equal('a');
        });

        it('to a shift key printable characters ', function() {
          event.shiftKey = true;
          expect(Keycoder.eventToCharacter(event)).to.equal('A');

        });

        it('to null if no matching key is found', function() {
          it('to a shift key printable characters ', function() {
            event.keyCode = -1;
            expect(Keycoder.eventToCharacter(event)).to.equal(null);
          });
        });

      });


    });

    describe('printable character', function() {

      var characters = ' 0123456789abcdefghijklmnopqrstuvwxyz`-=[]\\;\',./'.split('');
      characters.forEach(function(character) {

        it(character + ' to a key', function() {
          var key = Keycoder.fromCharacter(character);
          expect(key.character).to.equal(character);
        });

      });

      var shiftCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+{}|:"<>?'.split('');
      shiftCharacters.forEach(function(character) {

        it(character + ' to a key', function() {
          var key = Keycoder.fromCharacter(character);
          expect(key.shift.character).to.equal(character);

        });

      });

    });

    Keycoder.allKeys().forEach(function(key) {

      if(key.character !== null) {
        it('IE keycode '+ key.keyCode.ie + ' to ' + key.character, function() {
          var ieCharacter = Keycoder.toCharacter(key.keyCode.ie);
          expect(ieCharacter).to.equal(key.character);
        });

        it('Mozilla keycode '+ key.keyCode.mozilla + ' to ' + key.character, function() {
          var mozillaCharacter = Keycoder.toCharacter(key.keyCode.mozilla);
          expect(mozillaCharacter).to.equal(key.character);
        });
      }

      it('Mozilla key code ' + key.keyCode.mozilla + ' to a key', function() {
          var mappedKey = Keycoder.fromKeyCode(key.keyCode.mozilla);
          expect(mappedKey.keyCode.mozilla).to.equal(key.keyCode.mozilla);
      });

      it('IE key code ' + key.keyCode.ie + ' to a key', function() {
          var mappedKey = Keycoder.fromKeyCode(key.keyCode.ie);
          expect(mappedKey.keyCode.ie).to.equal(key.keyCode.ie);

      });

      //Skip the numpad keys since their char codes match those of the other number keys
      //they won't map back to the same value
      if(key.charCode !== null && (key.charCode < 42 || key.charCode > 57)) {

        it('ASCII char code ' + key.charCode + ' to a key', function() {
          var mappedKey = Keycoder.fromCharCode(key.charCode);
          expect(mappedKey.charCode).to.equal(key.charCode);
        });

      }

      //Skip the numpad keys since their char codes match those of the other number keys
      //they won't map back to the same value
      if(key.shift.charCode !== null && (key.shift.charCode < 42 || key.shift.charCode > 57)) {

        it('ASCII shift char code ' + key.shift.charCode + ' to a key', function() {
          var mappedKey = Keycoder.fromCharCode(key.shift.charCode);
          expect(mappedKey.shift.charCode).to.equal(key.shift.charCode);
        });
      }

      if(key.charCode !== null && key.character != null) {
        it('ASCII char code ' + key.charCode + ' to ' + key.character, function() {
          var mappedCharacter = Keycoder.charCodeToCharacter(key.charCode);
          expect(mappedCharacter).to.equal(key.character);
        });
      }

      if(key.shift.charCode !== null && key.shift.character != null) {
        it('char code ' + key.charCode + ' to ' + key.shift.character, function() {
            var mappedCharacter = Keycoder.charCodeToCharacter(key.shift.charCode);
            expect(mappedCharacter).to.equal(key.shift.character);
        });
      }
    });
  });
});