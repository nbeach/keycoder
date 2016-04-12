[david-url]: https://david-dm.org/nbeach/keycoder
[david-image]: https://img.shields.io/david/nbeach/keycoder.svg
[david-dev-url]: https://david-dm.org/nbeach/keycoder#info=devDependencies
[david-dev-image]: https://david-dm.org/nbeach/keycoder/dev-status.svg
[david-peer-url]: https://david-dm.org/nbeach/keycoder#info=peerDependencies
[david-peer-image]: https://david-dm.org/nbeach/keycoder/peer-status.svg
[coveralls-url]: https://coveralls.io/r/nbeach/keycoder/
[coveralls-image]: https://img.shields.io/coveralls/nbeach/keycoder.svg

## Keycoder
[![npm version](https://badge.fury.io/js/keycoder.svg)](https://badge.fury.io/js/keycoder) ![Build Status](https://travis-ci.org/nbeach/keycoder.svg?branch=master) [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][david-image]][david-url] [![devDependency Status][david-dev-image]][david-dev-url]

A lightweight JavaScript library for interpreting event key and character codes across browsers. Keycoder implements UMD for CommonJS, AMD, and global based loading support.

Keycoder is released under the [MIT license](https://github.com/nbeach/keycoder/blob/master/LICENSE).

## Modules

<dl>
<dt><a href="#module_Keycoder">Keycoder</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Key">Key</a></dt>
<dd></dd>
</dl>

<a name="module_Keycoder"></a>

## Keycoder

* [Keycoder](#module_Keycoder)
    * [.key](#module_Keycoder.key) : <code>object</code>
    * [.toCharacter(keyCode, shift)](#module_Keycoder.toCharacter) ⇒ <code>string</code> &#124; <code>null</code>
    * [.charCodeToCharacter(charCode)](#module_Keycoder.charCodeToCharacter) ⇒ <code>string</code> &#124; <code>null</code>
    * [.eventToCharacter(event)](#module_Keycoder.eventToCharacter) ⇒ <code>string</code> &#124; <code>null</code>
    * [.fromCharacter(character)](#module_Keycoder.fromCharacter) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
    * [.fromKeyCode(keyCode)](#module_Keycoder.fromKeyCode) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
    * [.fromCharCode(charCode)](#module_Keycoder.fromCharCode) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
    * [.fromEvent(event)](#module_Keycoder.fromEvent) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
    * [.allKeys()](#module_Keycoder.allKeys) ⇒ <code>[Array.&lt;Key&gt;](#Key)</code>

<a name="module_Keycoder.key"></a>

### Keycoder.key : <code>object</code>
An object containing references to all named keys.

**Kind**: static property of <code>[Keycoder](#module_Keycoder)</code>  
**Properties**

| Name | Type |
| --- | --- |
| BACKSPACE | <code>[Key](#Key)</code> | 
| TAB | <code>[Key](#Key)</code> | 
| ENTER | <code>[Key](#Key)</code> | 
| SHIFT | <code>[Key](#Key)</code> | 
| CONTROL | <code>[Key](#Key)</code> | 
| ALT | <code>[Key](#Key)</code> | 
| PAUSE | <code>[Key](#Key)</code> | 
| BREAK | <code>[Key](#Key)</code> | 
| CAPS_LOCK | <code>[Key](#Key)</code> | 
| ESCAPE | <code>[Key](#Key)</code> | 
| WINDOWS | <code>[Key](#Key)</code> | 
| COMMAND | <code>[Key](#Key)</code> | 
| OPTION | <code>[Key](#Key)</code> | 
| PRINT_SCREEN | <code>[Key](#Key)</code> | 
| NUM_LOCK | <code>[Key](#Key)</code> | 
| MAC_NUM_LOCK | <code>[Key](#Key)</code> | 
| SCROLL_LOCK | <code>[Key](#Key)</code> | 
| PAGE_UP | <code>[Key](#Key)</code> | 
| PAGE_DOWN | <code>[Key](#Key)</code> | 
| END | <code>[Key](#Key)</code> | 
| HOME | <code>[Key](#Key)</code> | 
| LEFT_ARROW | <code>[Key](#Key)</code> | 
| UP_ARROW | <code>[Key](#Key)</code> | 
| RIGHT_ARROW | <code>[Key](#Key)</code> | 
| DOWN_ARROW | <code>[Key](#Key)</code> | 
| INSERT | <code>[Key](#Key)</code> | 
| DELETE | <code>[Key](#Key)</code> | 
| NUMPAD_0 | <code>[Key](#Key)</code> | 
| NUMPAD_1 | <code>[Key](#Key)</code> | 
| NUMPAD_2 | <code>[Key](#Key)</code> | 
| NUMPAD_3 | <code>[Key](#Key)</code> | 
| NUMPAD_4 | <code>[Key](#Key)</code> | 
| NUMPAD_5 | <code>[Key](#Key)</code> | 
| NUMPAD_6 | <code>[Key](#Key)</code> | 
| NUMPAD_7 | <code>[Key](#Key)</code> | 
| NUMPAD_8 | <code>[Key](#Key)</code> | 
| NUMPAD_9 | <code>[Key](#Key)</code> | 
| NUMPAD_MULTIPLY | <code>[Key](#Key)</code> | 
| NUMPAD_PLUS | <code>[Key](#Key)</code> | 
| NUMPAD_MINUS | <code>[Key](#Key)</code> | 
| NUMPAD_DECIMAL | <code>[Key](#Key)</code> | 
| NUMPAD_DIVIDE | <code>[Key](#Key)</code> | 
| NUMPAD_MIDDLE | <code>[Key](#Key)</code> | 

<a name="module_Keycoder.toCharacter"></a>

### Keycoder.toCharacter(keyCode, shift) ⇒ <code>string</code> &#124; <code>null</code>
**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>string</code> &#124; <code>null</code> - The character for the keycode and shift state. Null if the key is not a printable character.  

| Param | Type | Description |
| --- | --- | --- |
| keyCode | <code>number</code> | An IE or Mozilla key code |
| shift | <code>boolean</code> | The shift key state. A value of true indicates it is pressed, false that it is not |

<a name="module_Keycoder.charCodeToCharacter"></a>

### Keycoder.charCodeToCharacter(charCode) ⇒ <code>string</code> &#124; <code>null</code>
**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>string</code> &#124; <code>null</code> - Returns the character for the character code. Null if the key is not a printable character.  

| Param | Type | Description |
| --- | --- | --- |
| charCode | <code>number</code> | An ASCII character code |

<a name="module_Keycoder.eventToCharacter"></a>

### Keycoder.eventToCharacter(event) ⇒ <code>string</code> &#124; <code>null</code>
**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>string</code> &#124; <code>null</code> - - The character pressed in the key event. Null if the key pressed is not a printable character, or the event is not a key event.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>number</code> | A keydown, keyup, or keypress event object |

<a name="module_Keycoder.fromCharacter"></a>

### Keycoder.fromCharacter(character) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>[Key](#Key)</code> &#124; <code>null</code> - A Key object. Null if no key is associated with the provided code.  

| Param | Type |
| --- | --- |
| character | <code>string</code> | 

<a name="module_Keycoder.fromKeyCode"></a>

### Keycoder.fromKeyCode(keyCode) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>[Key](#Key)</code> &#124; <code>null</code> - A Key object. Null if no key is associated with the provided code.  

| Param | Type | Description |
| --- | --- | --- |
| keyCode | <code>number</code> | A IE or Mozilla key code |

<a name="module_Keycoder.fromCharCode"></a>

### Keycoder.fromCharCode(charCode) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
Maps an ASCII character code to a Key object

**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>[Key](#Key)</code> &#124; <code>null</code> - A Key object. Null if no key is associated with the provided code.  

| Param | Type | Description |
| --- | --- | --- |
| charCode | <code>number</code> | An ASCII character code |

<a name="module_Keycoder.fromEvent"></a>

### Keycoder.fromEvent(event) ⇒ <code>[Key](#Key)</code> &#124; <code>null</code>
Maps a keypress, keydown, or keyup event object to a key

**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>[Key](#Key)</code> &#124; <code>null</code> - A Key object. Null if no key was pressed in the provided event.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>object</code> | A keydown, keyup, or keypress event object |

<a name="module_Keycoder.allKeys"></a>

### Keycoder.allKeys() ⇒ <code>[Array.&lt;Key&gt;](#Key)</code>
**Kind**: static method of <code>[Keycoder](#module_Keycoder)</code>  
**Returns**: <code>[Array.&lt;Key&gt;](#Key)</code> - An array of Key objects for all keys  
<a name="Key"></a>

## Key
**Kind**: global class  
**Internal**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| names | <code>Array.&lt;string&gt;</code> | Names that the key is called. Ex. "BACKSPACE", "INSERT" |
| keyCode.ie | <code>number</code> | IE key code |
| keyCode.mozilla | <code>number</code> | Mozillia key code |
| character | <code>string</code> &#124; <code>null</code> | Key character |
| charCode | <code>number</code> &#124; <code>null</code> | ASCII character code |
| shift.character | <code>string</code> &#124; <code>null</code> | Key shift character |
| shift.charCode | <code>number</code> &#124; <code>null</code> | Shift ASCII character code |


* [Key](#Key)
    * [new Key()](#new_Key_new)
    * [.isPrintableCharacter()](#Key+isPrintableCharacter) ⇒ <code>boolean</code>
    * [.hasCharCode()](#Key+hasCharCode) ⇒ <code>boolean</code>
    * [.hasDistinctShiftCharacter()](#Key+hasDistinctShiftCharacter) ⇒ <code>boolean</code>
    * [.equals(other)](#Key+equals) ⇒ <code>boolean</code>

<a name="new_Key_new"></a>

### new Key()
A representation of a keyboard key. This class cannot be instantiated manually. All instances are generated by the Keycoder module.

<a name="Key+isPrintableCharacter"></a>

### key.isPrintableCharacter() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Key](#Key)</code>  
**Returns**: <code>boolean</code> - If the key is a printable character  
<a name="Key+hasCharCode"></a>

### key.hasCharCode() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Key](#Key)</code>  
**Returns**: <code>boolean</code> - If the key has a character code  
<a name="Key+hasDistinctShiftCharacter"></a>

### key.hasDistinctShiftCharacter() ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Key](#Key)</code>  
**Returns**: <code>boolean</code> - If the key's character and shift character are different  
<a name="Key+equals"></a>

### key.equals(other) ⇒ <code>boolean</code>
**Kind**: instance method of <code>[Key](#Key)</code>  
**Returns**: <code>boolean</code> - True if the key and the compared key/code are the same key  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>[Key](#Key)</code> &#124; <code>number</code> | A Key object or key code |

