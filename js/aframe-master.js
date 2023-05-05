(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AFRAME = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    function anArray(r){return r.BYTES_PER_ELEMENT&&"[object ArrayBuffer]"===str.call(r.buffer)||Array.isArray(r)}var str=Object.prototype.toString;module.exports=anArray;
    },{}],2:[function(require,module,exports){
    module.exports=function(e,n){return"number"==typeof e?e:"number"==typeof n?n:0};
    },{}],3:[function(require,module,exports){
    "use strict";function getLens(o){var r=o.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=o.indexOf("=");return-1===e&&(e=r),[e,e===r?0:4-e%4]}function byteLength(o){var r=getLens(o),e=r[0],t=r[1];return 3*(e+t)/4-t}function _byteLength(o,r,e){return 3*(r+e)/4-e}function toByteArray(o){for(var r,e=getLens(o),t=e[0],n=e[1],u=new Arr(_byteLength(o,t,n)),p=0,a=n>0?t-4:t,h=0;h<a;h+=4)r=revLookup[o.charCodeAt(h)]<<18|revLookup[o.charCodeAt(h+1)]<<12|revLookup[o.charCodeAt(h+2)]<<6|revLookup[o.charCodeAt(h+3)],u[p++]=r>>16&255,u[p++]=r>>8&255,u[p++]=255&r;return 2===n&&(r=revLookup[o.charCodeAt(h)]<<2|revLookup[o.charCodeAt(h+1)]>>4,u[p++]=255&r),1===n&&(r=revLookup[o.charCodeAt(h)]<<10|revLookup[o.charCodeAt(h+1)]<<4|revLookup[o.charCodeAt(h+2)]>>2,u[p++]=r>>8&255,u[p++]=255&r),u}function tripletToBase64(o){return lookup[o>>18&63]+lookup[o>>12&63]+lookup[o>>6&63]+lookup[63&o]}function encodeChunk(o,r,e){for(var t,n=[],u=r;u<e;u+=3)t=(o[u]<<16&16711680)+(o[u+1]<<8&65280)+(255&o[u+2]),n.push(tripletToBase64(t));return n.join("")}function fromByteArray(o){for(var r,e=o.length,t=e%3,n=[],u=0,p=e-t;u<p;u+=16383)n.push(encodeChunk(o,u,u+16383>p?p:u+16383));return 1===t?(r=o[e-1],n.push(lookup[r>>2]+lookup[r<<4&63]+"==")):2===t&&(r=(o[e-2]<<8)+o[e-1],n.push(lookup[r>>10]+lookup[r>>4&63]+lookup[r<<2&63]+"=")),n.join("")}exports.byteLength=byteLength,exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63;
    },{}],4:[function(require,module,exports){
    "use strict";module.exports={createLink:function(e,t){var a=document.head||document.getElementsByTagName("head")[0],n=document.createElement("link");n.href=e,n.rel="stylesheet";for(var d in t)if(t.hasOwnProperty(d)){var r=t[d];n.setAttribute("data-"+d,r)}a.appendChild(n)},createStyle:function(e,t){var a=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css";for(var d in t)if(t.hasOwnProperty(d)){var r=t[d];n.setAttribute("data-"+d,r)}n.sheet?(n.innerHTML=e,n.sheet.cssText=e,a.appendChild(n)):n.styleSheet?(a.appendChild(n),n.styleSheet.cssText=e):(n.appendChild(document.createTextNode(e)),a.appendChild(n))}};
    },{}],5:[function(require,module,exports){
    var Buffer=require("buffer").Buffer;module.exports=function(f,e){if(Buffer.isBuffer(f)&&Buffer.isBuffer(e)){if("function"==typeof f.equals)return f.equals(e);if(f.length!==e.length)return!1;for(var r=0;r<f.length;r++)if(f[r]!==e[r])return!1;return!0}};
    },{"buffer":6}],6:[function(require,module,exports){
    (function (global,Buffer){
    "use strict";function typedArraySupport(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function createBuffer(t,e){if(kMaxLength()<e)throw new RangeError("Invalid typed array length");return Buffer.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=Buffer.prototype):(null===t&&(t=new Buffer(e)),t.length=e),t}function Buffer(t,e,r){if(!(Buffer.TYPED_ARRAY_SUPPORT||this instanceof Buffer))return new Buffer(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(this,t)}return from(this,t,e,r)}function from(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?fromArrayBuffer(t,e,r,n):"string"==typeof e?fromString(t,e,r):fromObject(t,e)}function assertSize(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function alloc(t,e,r,n){return assertSize(e),e<=0?createBuffer(t,e):void 0!==r?"string"==typeof n?createBuffer(t,e).fill(r,n):createBuffer(t,e).fill(r):createBuffer(t,e)}function allocUnsafe(t,e){if(assertSize(e),t=createBuffer(t,e<0?0:0|checked(e)),!Buffer.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function fromString(t,e,r){if("string"==typeof r&&""!==r||(r="utf8"),!Buffer.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|byteLength(e,r);t=createBuffer(t,n);var f=t.write(e,r);return f!==n&&(t=t.slice(0,f)),t}function fromArrayLike(t,e){var r=e.length<0?0:0|checked(e.length);t=createBuffer(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function fromArrayBuffer(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");return e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n),Buffer.TYPED_ARRAY_SUPPORT?(t=e,t.__proto__=Buffer.prototype):t=fromArrayLike(t,e),t}function fromObject(t,e){if(Buffer.isBuffer(e)){var r=0|checked(e.length);return t=createBuffer(t,r),0===t.length?t:(e.copy(t,0,0,r),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||isnan(e.length)?createBuffer(t,0):fromArrayLike(t,e);if("Buffer"===e.type&&isArray(e.data))return fromArrayLike(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(t){if(t>=kMaxLength())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+kMaxLength().toString(16)+" bytes");return 0|t}function SlowBuffer(t){return+t!=t&&(t=0),Buffer.alloc(+t)}function byteLength(t,e){if(Buffer.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return utf8ToBytes(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(t).length;default:if(n)return utf8ToBytes(t).length;e=(""+e).toLowerCase(),n=!0}}function slowToString(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if(r>>>=0,e>>>=0,r<=e)return"";for(t||(t="utf8");;)switch(t){case"hex":return hexSlice(this,e,r);case"utf8":case"utf-8":return utf8Slice(this,e,r);case"ascii":return asciiSlice(this,e,r);case"latin1":case"binary":return latin1Slice(this,e,r);case"base64":return base64Slice(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function swap(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function bidirectionalIndexOf(t,e,r,n,f){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=f?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(f)return-1;r=t.length-1}else if(r<0){if(!f)return-1;r=0}if("string"==typeof e&&(e=Buffer.from(e,n)),Buffer.isBuffer(e))return 0===e.length?-1:arrayIndexOf(t,e,r,n,f);if("number"==typeof e)return e&=255,Buffer.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?f?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):arrayIndexOf(t,[e],r,n,f);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(t,e,r,n,f){function i(t,e){return 1===o?t[e]:t.readUInt16BE(e*o)}var o=1,u=t.length,s=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;o=2,u/=2,s/=2,r/=2}var a;if(f){var h=-1;for(a=r;a<u;a++)if(i(t,a)===i(e,-1===h?0:a-h)){if(-1===h&&(h=a),a-h+1===s)return h*o}else-1!==h&&(a-=a-h),h=-1}else for(r+s>u&&(r=u-s),a=r;a>=0;a--){for(var c=!0,l=0;l<s;l++)if(i(t,a+l)!==i(e,l)){c=!1;break}if(c)return a}return-1}function hexWrite(t,e,r,n){r=Number(r)||0;var f=t.length-r;n?(n=Number(n))>f&&(n=f):n=f;var i=e.length;if(i%2!=0)throw new TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var o=0;o<n;++o){var u=parseInt(e.substr(2*o,2),16);if(isNaN(u))return o;t[r+o]=u}return o}function utf8Write(t,e,r,n){return blitBuffer(utf8ToBytes(e,t.length-r),t,r,n)}function asciiWrite(t,e,r,n){return blitBuffer(asciiToBytes(e),t,r,n)}function latin1Write(t,e,r,n){return asciiWrite(t,e,r,n)}function base64Write(t,e,r,n){return blitBuffer(base64ToBytes(e),t,r,n)}function ucs2Write(t,e,r,n){return blitBuffer(utf16leToBytes(e,t.length-r),t,r,n)}function base64Slice(t,e,r){return 0===e&&r===t.length?base64.fromByteArray(t):base64.fromByteArray(t.slice(e,r))}function utf8Slice(t,e,r){r=Math.min(t.length,r);for(var n=[],f=e;f<r;){var i=t[f],o=null,u=i>239?4:i>223?3:i>191?2:1;if(f+u<=r){var s,a,h,c;switch(u){case 1:i<128&&(o=i);break;case 2:s=t[f+1],128==(192&s)&&(c=(31&i)<<6|63&s)>127&&(o=c);break;case 3:s=t[f+1],a=t[f+2],128==(192&s)&&128==(192&a)&&(c=(15&i)<<12|(63&s)<<6|63&a)>2047&&(c<55296||c>57343)&&(o=c);break;case 4:s=t[f+1],a=t[f+2],h=t[f+3],128==(192&s)&&128==(192&a)&&128==(192&h)&&(c=(15&i)<<18|(63&s)<<12|(63&a)<<6|63&h)>65535&&c<1114112&&(o=c)}}null===o?(o=65533,u=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),f+=u}return decodeCodePointsArray(n)}function decodeCodePointsArray(t){var e=t.length;if(e<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,t);for(var r="",n=0;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=MAX_ARGUMENTS_LENGTH));return r}function asciiSlice(t,e,r){var n="";r=Math.min(t.length,r);for(var f=e;f<r;++f)n+=String.fromCharCode(127&t[f]);return n}function latin1Slice(t,e,r){var n="";r=Math.min(t.length,r);for(var f=e;f<r;++f)n+=String.fromCharCode(t[f]);return n}function hexSlice(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var f="",i=e;i<r;++i)f+=toHex(t[i]);return f}function utf16leSlice(t,e,r){for(var n=t.slice(e,r),f="",i=0;i<n.length;i+=2)f+=String.fromCharCode(n[i]+256*n[i+1]);return f}function checkOffset(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(t,e,r,n,f,i){if(!Buffer.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>f||e<i)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function objectWriteUInt16(t,e,r,n){e<0&&(e=65535+e+1);for(var f=0,i=Math.min(t.length-r,2);f<i;++f)t[r+f]=(e&255<<8*(n?f:1-f))>>>8*(n?f:1-f)}function objectWriteUInt32(t,e,r,n){e<0&&(e=4294967295+e+1);for(var f=0,i=Math.min(t.length-r,4);f<i;++f)t[r+f]=e>>>8*(n?f:3-f)&255}function checkIEEE754(t,e,r,n,f,i){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(t,e,r,n,f){return f||checkIEEE754(t,e,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(t,e,r,n,23,4),r+4}function writeDouble(t,e,r,n,f){return f||checkIEEE754(t,e,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(t,e,r,n,52,8),r+8}function base64clean(t){if(t=stringtrim(t).replace(INVALID_BASE64_RE,""),t.length<2)return"";for(;t.length%4!=0;)t+="=";return t}function stringtrim(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function toHex(t){return t<16?"0"+t.toString(16):t.toString(16)}function utf8ToBytes(t,e){e=e||1/0;for(var r,n=t.length,f=null,i=[],o=0;o<n;++o){if((r=t.charCodeAt(o))>55295&&r<57344){if(!f){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(o+1===n){(e-=3)>-1&&i.push(239,191,189);continue}f=r;continue}if(r<56320){(e-=3)>-1&&i.push(239,191,189),f=r;continue}r=65536+(f-55296<<10|r-56320)}else f&&(e-=3)>-1&&i.push(239,191,189);if(f=null,r<128){if((e-=1)<0)break;i.push(r)}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function asciiToBytes(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}function utf16leToBytes(t,e){for(var r,n,f,i=[],o=0;o<t.length&&!((e-=2)<0);++o)r=t.charCodeAt(o),n=r>>8,f=r%256,i.push(f),i.push(n);return i}function base64ToBytes(t){return base64.toByteArray(base64clean(t))}function blitBuffer(t,e,r,n){for(var f=0;f<n&&!(f+r>=e.length||f>=t.length);++f)e[f+r]=t[f];return f}function isnan(t){return t!==t}var base64=require("base64-js"),ieee754=require("ieee754"),isArray=require("isarray");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50,Buffer.TYPED_ARRAY_SUPPORT=void 0!==global.TYPED_ARRAY_SUPPORT?global.TYPED_ARRAY_SUPPORT:typedArraySupport(),exports.kMaxLength=kMaxLength(),Buffer.poolSize=8192,Buffer._augment=function(t){return t.__proto__=Buffer.prototype,t},Buffer.from=function(t,e,r){return from(null,t,e,r)},Buffer.TYPED_ARRAY_SUPPORT&&(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})),Buffer.alloc=function(t,e,r){return alloc(null,t,e,r)},Buffer.allocUnsafe=function(t){return allocUnsafe(null,t)},Buffer.allocUnsafeSlow=function(t){return allocUnsafe(null,t)},Buffer.isBuffer=function(t){return!(null==t||!t._isBuffer)},Buffer.compare=function(t,e){if(!Buffer.isBuffer(t)||!Buffer.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,f=0,i=Math.min(r,n);f<i;++f)if(t[f]!==e[f]){r=t[f],n=e[f];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(t,e){if(!isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return Buffer.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=Buffer.allocUnsafe(e),f=0;for(r=0;r<t.length;++r){var i=t[r];if(!Buffer.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,f),f+=i.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)swap(this,e,e+1);return this},Buffer.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)swap(this,e,e+3),swap(this,e+1,e+2);return this},Buffer.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)swap(this,e,e+7),swap(this,e+1,e+6),swap(this,e+2,e+5),swap(this,e+3,e+4);return this},Buffer.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?utf8Slice(this,0,t):slowToString.apply(this,arguments)},Buffer.prototype.equals=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===Buffer.compare(this,t)},Buffer.prototype.inspect=function(){var t="",e=exports.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},Buffer.prototype.compare=function(t,e,r,n,f){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===f&&(f=this.length),e<0||r>t.length||n<0||f>this.length)throw new RangeError("out of range index");if(n>=f&&e>=r)return 0;if(n>=f)return-1;if(e>=r)return 1;if(e>>>=0,r>>>=0,n>>>=0,f>>>=0,this===t)return 0;for(var i=f-n,o=r-e,u=Math.min(i,o),s=this.slice(n,f),a=t.slice(e,r),h=0;h<u;++h)if(s[h]!==a[h]){i=s[h],o=a[h];break}return i<o?-1:o<i?1:0},Buffer.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},Buffer.prototype.indexOf=function(t,e,r){return bidirectionalIndexOf(this,t,e,r,!0)},Buffer.prototype.lastIndexOf=function(t,e,r){return bidirectionalIndexOf(this,t,e,r,!1)},Buffer.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var f=this.length-e;if((void 0===r||r>f)&&(r=f),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return hexWrite(this,t,e,r);case"utf8":case"utf-8":return utf8Write(this,t,e,r);case"ascii":return asciiWrite(this,t,e,r);case"latin1":case"binary":return latin1Write(this,t,e,r);case"base64":return base64Write(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,t,e,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;Buffer.prototype.slice=function(t,e){var r=this.length;t=~~t,e=void 0===e?r:~~e,t<0?(t+=r)<0&&(t=0):t>r&&(t=r),e<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);var n;if(Buffer.TYPED_ARRAY_SUPPORT)n=this.subarray(t,e),n.__proto__=Buffer.prototype;else{var f=e-t;n=new Buffer(f,void 0);for(var i=0;i<f;++i)n[i]=this[i+t]}return n},Buffer.prototype.readUIntLE=function(t,e,r){t|=0,e|=0,r||checkOffset(t,e,this.length);for(var n=this[t],f=1,i=0;++i<e&&(f*=256);)n+=this[t+i]*f;return n},Buffer.prototype.readUIntBE=function(t,e,r){t|=0,e|=0,r||checkOffset(t,e,this.length);for(var n=this[t+--e],f=1;e>0&&(f*=256);)n+=this[t+--e]*f;return n},Buffer.prototype.readUInt8=function(t,e){return e||checkOffset(t,1,this.length),this[t]},Buffer.prototype.readUInt16LE=function(t,e){return e||checkOffset(t,2,this.length),this[t]|this[t+1]<<8},Buffer.prototype.readUInt16BE=function(t,e){return e||checkOffset(t,2,this.length),this[t]<<8|this[t+1]},Buffer.prototype.readUInt32LE=function(t,e){return e||checkOffset(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},Buffer.prototype.readUInt32BE=function(t,e){return e||checkOffset(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},Buffer.prototype.readIntLE=function(t,e,r){t|=0,e|=0,r||checkOffset(t,e,this.length);for(var n=this[t],f=1,i=0;++i<e&&(f*=256);)n+=this[t+i]*f;return f*=128,n>=f&&(n-=Math.pow(2,8*e)),n},Buffer.prototype.readIntBE=function(t,e,r){t|=0,e|=0,r||checkOffset(t,e,this.length);for(var n=e,f=1,i=this[t+--n];n>0&&(f*=256);)i+=this[t+--n]*f;return f*=128,i>=f&&(i-=Math.pow(2,8*e)),i},Buffer.prototype.readInt8=function(t,e){return e||checkOffset(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},Buffer.prototype.readInt16LE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(t,e){return e||checkOffset(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},Buffer.prototype.readInt32BE=function(t,e){return e||checkOffset(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},Buffer.prototype.readFloatLE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!0,23,4)},Buffer.prototype.readFloatBE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!1,23,4)},Buffer.prototype.readDoubleLE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!0,52,8)},Buffer.prototype.readDoubleBE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!1,52,8)},Buffer.prototype.writeUIntLE=function(t,e,r,n){if(t=+t,e|=0,r|=0,!n){checkInt(this,t,e,r,Math.pow(2,8*r)-1,0)}var f=1,i=0;for(this[e]=255&t;++i<r&&(f*=256);)this[e+i]=t/f&255;return e+r},Buffer.prototype.writeUIntBE=function(t,e,r,n){if(t=+t,e|=0,r|=0,!n){checkInt(this,t,e,r,Math.pow(2,8*r)-1,0)}var f=r-1,i=1;for(this[e+f]=255&t;--f>=0&&(i*=256);)this[e+f]=t/i&255;return e+r},Buffer.prototype.writeUInt8=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},Buffer.prototype.writeUInt16LE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeUInt16BE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeUInt32LE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeUInt32BE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e|=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,t,e,r,f-1,-f)}var i=0,o=1,u=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===u&&0!==this[e+i-1]&&(u=1),this[e+i]=(t/o>>0)-u&255;return e+r},Buffer.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e|=0,!n){var f=Math.pow(2,8*r-1);checkInt(this,t,e,r,f-1,-f)}var i=r-1,o=1,u=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===u&&0!==this[e+i+1]&&(u=1),this[e+i]=(t/o>>0)-u&255;return e+r},Buffer.prototype.writeInt8=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},Buffer.prototype.writeInt16LE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeInt16BE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeInt32LE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeInt32BE=function(t,e,r){return t=+t,e|=0,r||checkInt(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeFloatLE=function(t,e,r){return writeFloat(this,t,e,!0,r)},Buffer.prototype.writeFloatBE=function(t,e,r){return writeFloat(this,t,e,!1,r)},Buffer.prototype.writeDoubleLE=function(t,e,r){return writeDouble(this,t,e,!0,r)},Buffer.prototype.writeDoubleBE=function(t,e,r){return writeDouble(this,t,e,!1,r)},Buffer.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var f,i=n-r;if(this===t&&r<e&&e<n)for(f=i-1;f>=0;--f)t[f+e]=this[f+r];else if(i<1e3||!Buffer.TYPED_ARRAY_SUPPORT)for(f=0;f<i;++f)t[f+e]=this[f+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+i),e);return i},Buffer.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var f=t.charCodeAt(0);f<256&&(t=f)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0);var i;if("number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{var o=Buffer.isBuffer(t)?t:utf8ToBytes(new Buffer(t,n).toString()),u=o.length;for(i=0;i<r-e;++i)this[i+e]=o[i%u]}return this};var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
    
    },{"base64-js":3,"buffer":6,"ieee754":29,"isarray":35}],7:[function(require,module,exports){
    !function(){if("undefined"!=typeof window)try{var e=new window.CustomEvent("test",{cancelable:!0});if(e.preventDefault(),!0!==e.defaultPrevented)throw new Error("Could not prevent default")}catch(e){var t=function(e,t){var n,r;return t=t||{},t.bubbles=!!t.bubbles,t.cancelable=!!t.cancelable,n=document.createEvent("CustomEvent"),n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),r=n.preventDefault,n.preventDefault=function(){r.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(e){this.defaultPrevented=!0}},n};t.prototype=window.Event.prototype,window.CustomEvent=t}}();
    },{}],8:[function(require,module,exports){
    function useColors(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function formatArgs(){var o=arguments,e=this.useColors;if(o[0]=(e?"%c":"")+this.namespace+(e?" %c":" ")+o[0]+(e?"%c ":" "),!e)return o;var r="color: "+this.color;o=[o[0],r,"color: inherit"].concat(Array.prototype.slice.call(o,1));var t=0,s=0;return o[0].replace(/%[a-z%]/g,function(o){"%%"!==o&&(t++,"%c"===o&&(s=t))}),o.splice(s,0,r),o}function log(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function save(o){try{null==o?exports.storage.removeItem("debug"):exports.storage.debug=o}catch(o){}}function load(){var o;try{o=exports.storage.debug}catch(o){}return o}function localstorage(){try{return window.localStorage}catch(o){}}exports=module.exports=require("./debug"),exports.log=log,exports.formatArgs=formatArgs,exports.save=save,exports.load=load,exports.useColors=useColors,exports.storage="undefined"!=typeof chrome&&void 0!==chrome.storage?chrome.storage.local:localstorage(),exports.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],exports.formatters.j=function(o){return JSON.stringify(o)},exports.enable(load());
    },{"./debug":9}],9:[function(require,module,exports){
    function selectColor(){return exports.colors[prevColor++%exports.colors.length]}function debug(e){function r(){}function o(){var e=o;null==e.useColors&&(e.useColors=exports.useColors()),null==e.color&&e.useColors&&(e.color=selectColor());var r=Array.prototype.slice.call(arguments);r[0]=exports.coerce(r[0]),"string"!=typeof r[0]&&(r=["%o"].concat(r));var s=0;r[0]=r[0].replace(/%([a-z%])/g,function(o,t){if("%%"===o)return o;s++;var n=exports.formatters[t];if("function"==typeof n){var l=r[s];o=n.call(e,l),r.splice(s,1),s--}return o}),"function"==typeof exports.formatArgs&&(r=exports.formatArgs.apply(e,r)),(o.log||exports.log||console.log.bind(console)).apply(e,r)}r.enabled=!1,o.enabled=!0;var s=exports.enabled(e)?o:r;return s.namespace=e,s}function enable(e){exports.save(e);for(var r=(e||"").split(/[\s,]+/),o=r.length,s=0;s<o;s++)r[s]&&(e=r[s].replace(/\*/g,".*?"),"-"===e[0]?exports.skips.push(new RegExp("^"+e.substr(1)+"$")):exports.names.push(new RegExp("^"+e+"$")))}function disable(){exports.enable("")}function enabled(e){var r,o;for(r=0,o=exports.skips.length;r<o;r++)if(exports.skips[r].test(e))return!1;for(r=0,o=exports.names.length;r<o;r++)if(exports.names[r].test(e))return!0;return!1}function coerce(e){return e instanceof Error?e.stack||e.message:e}exports=module.exports=debug,exports.coerce=coerce,exports.disable=disable,exports.enable=enable,exports.enabled=enabled,exports.names=[],exports.skips=[],exports.formatters={};var prevColor=0;
    },{}],10:[function(require,module,exports){
    "use strict";function toObject(r){if(null===r||void 0===r)throw new TypeError("Sources cannot be null or undefined");return Object(r)}function assignKey(r,e,n){var t=e[n];if(void 0!==t&&null!==t){if(hasOwnProperty.call(r,n)&&(void 0===r[n]||null===r[n]))throw new TypeError("Cannot convert undefined or null to object ("+n+")");hasOwnProperty.call(r,n)&&isObj(t)?r[n]=assign(Object(r[n]),e[n]):r[n]=t}}function assign(r,e){if(r===e)return r;e=Object(e);for(var n in e)hasOwnProperty.call(e,n)&&assignKey(r,e,n);if(Object.getOwnPropertySymbols)for(var t=Object.getOwnPropertySymbols(e),o=0;o<t.length;o++)propIsEnumerable.call(e,t[o])&&assignKey(r,e,t[o]);return r}var isObj=require("is-obj"),hasOwnProperty=Object.prototype.hasOwnProperty,propIsEnumerable=Object.prototype.propertyIsEnumerable;module.exports=function(r){r=toObject(r);for(var e=1;e<arguments.length;e++)assign(r,arguments[e]);return r};
    },{"is-obj":34}],11:[function(require,module,exports){
    "use strict";var keys=require("object-keys"),hasSymbols="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),toStr=Object.prototype.toString,concat=Array.prototype.concat,origDefineProperty=Object.defineProperty,isFunction=function(e){return"function"==typeof e&&"[object Function]"===toStr.call(e)},arePropertyDescriptorsSupported=function(){var e={};try{origDefineProperty(e,"x",{enumerable:!1,value:e});for(var r in e)return!1;return e.x===e}catch(e){return!1}},supportsDescriptors=origDefineProperty&&arePropertyDescriptorsSupported(),defineProperty=function(e,r,t,o){(!(r in e)||isFunction(o)&&o())&&(supportsDescriptors?origDefineProperty(e,r,{configurable:!0,enumerable:!1,value:t,writable:!0}):e[r]=t)},defineProperties=function(e,r){var t=arguments.length>2?arguments[2]:{},o=keys(r);hasSymbols&&(o=concat.call(o,Object.getOwnPropertySymbols(r)));for(var n=0;n<o.length;n+=1)defineProperty(e,o[n],r[o[n]],t[o[n]])};defineProperties.supportsDescriptors=!!supportsDescriptors,module.exports=defineProperties;
    },{"object-keys":41}],12:[function(require,module,exports){
    !function(t,r,n,a){"use strict";function l(e,t){for(var r=0,n=e.length;r<n;r++)m(e[r],t)}function i(e){for(var t,r=0,n=e.length;r<n;r++)t=e[r],y(t,H[u(t)])}function o(e){return function(t){ae(t)&&(m(t,e),l(t.querySelectorAll(x),e))}}function u(e){var t=oe.call(e,"is"),r=e.nodeName.toUpperCase(),n=G.call(U,t?k+t.toUpperCase():_+r);return t&&-1<n&&!c(r,t)?-1:n}function c(e,t){return-1<x.indexOf(e+'[is="'+t+'"]')}function s(e){var t=e.currentTarget,r=e.attrChange,n=e.attrName,a=e.target;me&&(!a||a===t)&&t.attributeChangedCallback&&"style"!==n&&e.prevValue!==e.newValue&&t.attributeChangedCallback(n,r===e[F]?null:e.prevValue,r===e[I]?null:e.newValue)}function d(e){var t=o(e);return function(e){g.push(t,e.target)}}function f(e){be&&(be=!1,e.currentTarget.removeEventListener(P,f)),l((e.target||r).querySelectorAll(x),e.detail===T?T:L),ne&&p()}function h(e,t){var r=this;ue.call(r,e,t),C.call(r,{target:r})}function v(e,t){ee(e,t),O?O.observe(e,de):(pe&&(e.setAttribute=h,e[w]=E(e),e.addEventListener(R,C)),e.addEventListener(D,s)),e.createdCallback&&me&&(e.created=!0,e.createdCallback(),e.created=!1)}function p(){for(var e,t=0,r=le.length;t<r;t++)e=le[t],Z.contains(e)||(r--,le.splice(t--,1),m(e,T))}function b(e){throw new Error("A "+e+" type is already registered")}function m(e,t){var r,n=u(e);-1<n&&(N(e,H[n]),n=0,t!==L||e[L]?t===T&&!e[T]&&(e[L]=!1,e[T]=!0,n=1):(e[T]=!1,e[L]=!0,n=1,ne&&G.call(le,e)<0&&le.push(e)),n&&(r=e[t+"Callback"])&&r.call(e))}if(!(a in r)){var g,C,A,E,O,N,y,w="__"+a+(1e5*Math.random()>>0),L="attached",T="detached",M="extends",F="ADDITION",V="MODIFICATION",I="REMOVAL",D="DOMAttrModified",P="DOMContentLoaded",R="DOMSubtreeModified",_="<",k="=",q=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,S=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],U=[],H=[],x="",Z=r.documentElement,G=U.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},j=n.prototype,z=j.hasOwnProperty,K=j.isPrototypeOf,W=n.defineProperty,X=n.getOwnPropertyDescriptor,Y=n.getOwnPropertyNames,$=n.getPrototypeOf,B=n.setPrototypeOf,J=!!n.__proto__,Q=n.create||function e(t){return t?(e.prototype=t,new e):this},ee=B||(J?function(e,t){return e.__proto__=t,e}:Y&&X?function(){function e(e,t){for(var r,n=Y(t),a=0,l=n.length;a<l;a++)r=n[a],z.call(e,r)||W(e,r,X(t,r))}return function(t,r){do{e(t,r)}while((r=$(r))&&!K.call(r,t));return t}}():function(e,t){for(var r in t)e[r]=t[r];return e}),te=t.MutationObserver||t.WebKitMutationObserver,re=(t.HTMLElement||t.Element||t.Node).prototype,ne=!K.call(re,Z),ae=ne?function(e){return 1===e.nodeType}:function(e){return K.call(re,e)},le=ne&&[],ie=re.cloneNode,oe=re.getAttribute,ue=re.setAttribute,ce=re.removeAttribute,se=r.createElement,de=te&&{attributes:!0,characterData:!0,attributeOldValue:!0},fe=te||function(e){pe=!1,Z.removeEventListener(D,fe)},he=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,10)},ve=!1,pe=!0,be=!0,me=!0;B||J?(N=function(e,t){K.call(t,e)||v(e,t)},y=v):(N=function(e,t){e[w]||(e[w]=n(!0),v(e,t))},y=N),ne?(pe=!1,function(){var t=X(re,"addEventListener"),r=t.value,n=function(e){var t=new CustomEvent(D,{bubbles:!0});t.attrName=e,t.prevValue=oe.call(this,e),t.newValue=null,t[I]=t.attrChange=2,ce.call(this,e),this.dispatchEvent(t)},a=function(t,r){var n=this.hasAttribute(t),a=n&&oe.call(this,t);e=new CustomEvent(D,{bubbles:!0}),ue.call(this,t,r),e.attrName=t,e.prevValue=n?a:null,e.newValue=r,n?e[V]=e.attrChange=1:e[F]=e.attrChange=0,this.dispatchEvent(e)},l=function(e){var t,r=e.currentTarget,n=r[w],a=e.propertyName;n.hasOwnProperty(a)&&(n=n[a],t=new CustomEvent(D,{bubbles:!0}),t.attrName=n.name,t.prevValue=n.value||null,t.newValue=n.value=r[a]||null,null==t.prevValue?t[F]=t.attrChange=0:t[V]=t.attrChange=1,r.dispatchEvent(t))};t.value=function(e,t,i){e===D&&this.attributeChangedCallback&&this.setAttribute!==a&&(this[w]={className:{name:"class",value:this.className}},this.setAttribute=a,this.removeAttribute=n,r.call(this,"propertychange",l)),r.call(this,e,t,i)},W(re,"addEventListener",t)}()):te||(Z.addEventListener(D,fe),Z.setAttribute(w,1),Z.removeAttribute(w),pe&&(C=function(e){var t,r,n,a=this;if(a===e.target){t=a[w],a[w]=r=E(a);for(n in r){if(!(n in t))return A(0,a,n,t[n],r[n],F);if(r[n]!==t[n])return A(1,a,n,t[n],r[n],V)}for(n in t)if(!(n in r))return A(2,a,n,t[n],r[n],I)}},A=function(e,t,r,n,a,l){var i={attrChange:e,currentTarget:t,attrName:r,prevValue:n,newValue:a};i[l]=e,s(i)},E=function(e){for(var t,r,n={},a=e.attributes,l=0,i=a.length;l<i;l++)t=a[l],"setAttribute"!==(r=t.name)&&(n[r]=t.value);return n})),r[a]=function(e,t){if(n=e.toUpperCase(),ve||(ve=!0,te?(O=function(e,t){function r(e,t){for(var r=0,n=e.length;r<n;t(e[r++]));}return new te(function(n){for(var a,l,i,o=0,u=n.length;o<u;o++)a=n[o],"childList"===a.type?(r(a.addedNodes,e),r(a.removedNodes,t)):(l=a.target,me&&l.attributeChangedCallback&&"style"!==a.attributeName&&(i=oe.call(l,a.attributeName))!==a.oldValue&&l.attributeChangedCallback(a.attributeName,a.oldValue,i))})}(o(L),o(T)),O.observe(r,{childList:!0,subtree:!0})):(g=[],he(function e(){for(;g.length;)g.shift().call(null,g.shift());he(e)}),r.addEventListener("DOMNodeInserted",d(L)),r.addEventListener("DOMNodeRemoved",d(T))),r.addEventListener(P,f),r.addEventListener("readystatechange",f),r.createElement=function(e,t){var n=se.apply(r,arguments),a=""+e,l=G.call(U,(t?k:_)+(t||a).toUpperCase()),i=-1<l;return t&&(n.setAttribute("is",t=t.toLowerCase()),i&&(i=c(a.toUpperCase(),t))),me=!r.createElement.innerHTMLHelper,i&&y(n,H[l]),n},re.cloneNode=function(e){var t=ie.call(this,!!e),r=u(t);return-1<r&&y(t,H[r]),e&&i(t.querySelectorAll(x)),t}),-2<G.call(U,k+n)+G.call(U,_+n)&&b(e),!q.test(n)||-1<G.call(S,n))throw new Error("The type "+e+" is invalid");var n,a,s=function(){return v?r.createElement(p,n):r.createElement(p)},h=t||j,v=z.call(h,M),p=v?t[M].toUpperCase():n;return v&&-1<G.call(U,_+p)&&b(p),a=U.push((v?k:_)+n)-1,x=x.concat(x.length?",":"",v?p+'[is="'+e.toLowerCase()+'"]':p),s.prototype=H[a]=z.call(h,"prototype")?h.prototype:Q(re),l(r.querySelectorAll(x),L),s}}}(window,document,Object,"registerElement");
    },{}],13:[function(require,module,exports){
    module.exports=function(r){switch(r){case"int8":return Int8Array;case"int16":return Int16Array;case"int32":return Int32Array;case"uint8":return Uint8Array;case"uint16":return Uint16Array;case"uint32":return Uint32Array;case"float32":return Float32Array;case"float64":return Float64Array;case"array":return Array;case"uint8_clamped":return Uint8ClampedArray}};
    },{}],14:[function(require,module,exports){
    "use strict";var undefined,ThrowTypeError=Object.getOwnPropertyDescriptor?function(){return Object.getOwnPropertyDescriptor(arguments,"callee").get}():function(){throw new TypeError},hasSymbols="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator,getProto=Object.getPrototypeOf||function(e){return e.__proto__},generator,generatorFunction=generator?getProto(generator):undefined,asyncFn,asyncFunction=asyncFn?asyncFn.constructor:undefined,asyncGen,asyncGenFunction=asyncGen?getProto(asyncGen):undefined,asyncGenIterator=asyncGen?asyncGen():undefined,TypedArray="undefined"==typeof Uint8Array?undefined:getProto(Uint8Array),INTRINSICS={"$ %Array%":Array,"$ %ArrayBuffer%":"undefined"==typeof ArrayBuffer?undefined:ArrayBuffer,"$ %ArrayBufferPrototype%":"undefined"==typeof ArrayBuffer?undefined:ArrayBuffer.prototype,"$ %ArrayIteratorPrototype%":hasSymbols?getProto([][Symbol.iterator]()):undefined,"$ %ArrayPrototype%":Array.prototype,"$ %ArrayProto_entries%":Array.prototype.entries,"$ %ArrayProto_forEach%":Array.prototype.forEach,"$ %ArrayProto_keys%":Array.prototype.keys,"$ %ArrayProto_values%":Array.prototype.values,"$ %AsyncFromSyncIteratorPrototype%":undefined,"$ %AsyncFunction%":asyncFunction,"$ %AsyncFunctionPrototype%":asyncFunction?asyncFunction.prototype:undefined,"$ %AsyncGenerator%":asyncGen?getProto(asyncGenIterator):undefined,"$ %AsyncGeneratorFunction%":asyncGenFunction,"$ %AsyncGeneratorPrototype%":asyncGenFunction?asyncGenFunction.prototype:undefined,"$ %AsyncIteratorPrototype%":asyncGenIterator&&hasSymbols&&Symbol.asyncIterator?asyncGenIterator[Symbol.asyncIterator]():undefined,"$ %Atomics%":"undefined"==typeof Atomics?undefined:Atomics,"$ %Boolean%":Boolean,"$ %BooleanPrototype%":Boolean.prototype,"$ %DataView%":"undefined"==typeof DataView?undefined:DataView,"$ %DataViewPrototype%":"undefined"==typeof DataView?undefined:DataView.prototype,"$ %Date%":Date,"$ %DatePrototype%":Date.prototype,"$ %decodeURI%":decodeURI,"$ %decodeURIComponent%":decodeURIComponent,"$ %encodeURI%":encodeURI,"$ %encodeURIComponent%":encodeURIComponent,"$ %Error%":Error,"$ %ErrorPrototype%":Error.prototype,"$ %eval%":eval,"$ %EvalError%":EvalError,"$ %EvalErrorPrototype%":EvalError.prototype,"$ %Float32Array%":"undefined"==typeof Float32Array?undefined:Float32Array,"$ %Float32ArrayPrototype%":"undefined"==typeof Float32Array?undefined:Float32Array.prototype,"$ %Float64Array%":"undefined"==typeof Float64Array?undefined:Float64Array,"$ %Float64ArrayPrototype%":"undefined"==typeof Float64Array?undefined:Float64Array.prototype,"$ %Function%":Function,"$ %FunctionPrototype%":Function.prototype,"$ %Generator%":generator?getProto(generator()):undefined,"$ %GeneratorFunction%":generatorFunction,"$ %GeneratorPrototype%":generatorFunction?generatorFunction.prototype:undefined,"$ %Int8Array%":"undefined"==typeof Int8Array?undefined:Int8Array,"$ %Int8ArrayPrototype%":"undefined"==typeof Int8Array?undefined:Int8Array.prototype,"$ %Int16Array%":"undefined"==typeof Int16Array?undefined:Int16Array,"$ %Int16ArrayPrototype%":"undefined"==typeof Int16Array?undefined:Int8Array.prototype,"$ %Int32Array%":"undefined"==typeof Int32Array?undefined:Int32Array,"$ %Int32ArrayPrototype%":"undefined"==typeof Int32Array?undefined:Int32Array.prototype,"$ %isFinite%":isFinite,"$ %isNaN%":isNaN,"$ %IteratorPrototype%":hasSymbols?getProto(getProto([][Symbol.iterator]())):undefined,"$ %JSON%":JSON,"$ %JSONParse%":JSON.parse,"$ %Map%":"undefined"==typeof Map?undefined:Map,"$ %MapIteratorPrototype%":"undefined"!=typeof Map&&hasSymbols?getProto((new Map)[Symbol.iterator]()):undefined,"$ %MapPrototype%":"undefined"==typeof Map?undefined:Map.prototype,"$ %Math%":Math,"$ %Number%":Number,"$ %NumberPrototype%":Number.prototype,"$ %Object%":Object,"$ %ObjectPrototype%":Object.prototype,"$ %ObjProto_toString%":Object.prototype.toString,"$ %ObjProto_valueOf%":Object.prototype.valueOf,"$ %parseFloat%":parseFloat,"$ %parseInt%":parseInt,"$ %Promise%":"undefined"==typeof Promise?undefined:Promise,"$ %PromisePrototype%":"undefined"==typeof Promise?undefined:Promise.prototype,"$ %PromiseProto_then%":"undefined"==typeof Promise?undefined:Promise.prototype.then,"$ %Promise_all%":"undefined"==typeof Promise?undefined:Promise.all,"$ %Promise_reject%":"undefined"==typeof Promise?undefined:Promise.reject,"$ %Promise_resolve%":"undefined"==typeof Promise?undefined:Promise.resolve,"$ %Proxy%":"undefined"==typeof Proxy?undefined:Proxy,"$ %RangeError%":RangeError,"$ %RangeErrorPrototype%":RangeError.prototype,"$ %ReferenceError%":ReferenceError,"$ %ReferenceErrorPrototype%":ReferenceError.prototype,"$ %Reflect%":"undefined"==typeof Reflect?undefined:Reflect,"$ %RegExp%":RegExp,"$ %RegExpPrototype%":RegExp.prototype,"$ %Set%":"undefined"==typeof Set?undefined:Set,"$ %SetIteratorPrototype%":"undefined"!=typeof Set&&hasSymbols?getProto((new Set)[Symbol.iterator]()):undefined,"$ %SetPrototype%":"undefined"==typeof Set?undefined:Set.prototype,"$ %SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?undefined:SharedArrayBuffer,"$ %SharedArrayBufferPrototype%":"undefined"==typeof SharedArrayBuffer?undefined:SharedArrayBuffer.prototype,"$ %String%":String,"$ %StringIteratorPrototype%":hasSymbols?getProto(""[Symbol.iterator]()):undefined,"$ %StringPrototype%":String.prototype,"$ %Symbol%":hasSymbols?Symbol:undefined,"$ %SymbolPrototype%":hasSymbols?Symbol.prototype:undefined,"$ %SyntaxError%":SyntaxError,"$ %SyntaxErrorPrototype%":SyntaxError.prototype,"$ %ThrowTypeError%":ThrowTypeError,"$ %TypedArray%":TypedArray,"$ %TypedArrayPrototype%":TypedArray?TypedArray.prototype:undefined,"$ %TypeError%":TypeError,"$ %TypeErrorPrototype%":TypeError.prototype,"$ %Uint8Array%":"undefined"==typeof Uint8Array?undefined:Uint8Array,"$ %Uint8ArrayPrototype%":"undefined"==typeof Uint8Array?undefined:Uint8Array.prototype,"$ %Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?undefined:Uint8ClampedArray,"$ %Uint8ClampedArrayPrototype%":"undefined"==typeof Uint8ClampedArray?undefined:Uint8ClampedArray.prototype,"$ %Uint16Array%":"undefined"==typeof Uint16Array?undefined:Uint16Array,"$ %Uint16ArrayPrototype%":"undefined"==typeof Uint16Array?undefined:Uint16Array.prototype,"$ %Uint32Array%":"undefined"==typeof Uint32Array?undefined:Uint32Array,"$ %Uint32ArrayPrototype%":"undefined"==typeof Uint32Array?undefined:Uint32Array.prototype,"$ %URIError%":URIError,"$ %URIErrorPrototype%":URIError.prototype,"$ %WeakMap%":"undefined"==typeof WeakMap?undefined:WeakMap,"$ %WeakMapPrototype%":"undefined"==typeof WeakMap?undefined:WeakMap.prototype,"$ %WeakSet%":"undefined"==typeof WeakSet?undefined:WeakSet,"$ %WeakSetPrototype%":"undefined"==typeof WeakSet?undefined:WeakSet.prototype};module.exports=function(e,r){if(arguments.length>1&&"boolean"!=typeof r)throw new TypeError('"allowMissing" argument must be a boolean');var t="$ "+e;if(!(t in INTRINSICS))throw new SyntaxError("intrinsic "+e+" does not exist!");if(void 0===INTRINSICS[t]&&!r)throw new TypeError("intrinsic "+e+" exists, but is not available. Please file an issue!");return INTRINSICS[t]};
    },{}],15:[function(require,module,exports){
    "use strict";var GetIntrinsic=require("./GetIntrinsic"),$Object=GetIntrinsic("%Object%"),$TypeError=GetIntrinsic("%TypeError%"),$String=GetIntrinsic("%String%"),assertRecord=require("./helpers/assertRecord"),$isNaN=require("./helpers/isNaN"),$isFinite=require("./helpers/isFinite"),sign=require("./helpers/sign"),mod=require("./helpers/mod"),IsCallable=require("is-callable"),toPrimitive=require("es-to-primitive/es5"),has=require("has"),ES5={ToPrimitive:toPrimitive,ToBoolean:function(e){return!!e},ToNumber:function(e){return+e},ToInteger:function(e){var r=this.ToNumber(e);return $isNaN(r)?0:0!==r&&$isFinite(r)?sign(r)*Math.floor(Math.abs(r)):r},ToInt32:function(e){return this.ToNumber(e)>>0},ToUint32:function(e){return this.ToNumber(e)>>>0},ToUint16:function(e){var r=this.ToNumber(e);if($isNaN(r)||0===r||!$isFinite(r))return 0;var t=sign(r)*Math.floor(Math.abs(r));return mod(t,65536)},ToString:function(e){return $String(e)},ToObject:function(e){return this.CheckObjectCoercible(e),$Object(e)},CheckObjectCoercible:function(e,r){if(null==e)throw new $TypeError(r||"Cannot call method on "+e);return e},IsCallable:IsCallable,SameValue:function(e,r){return e===r?0!==e||1/e==1/r:$isNaN(e)&&$isNaN(r)},Type:function(e){return null===e?"Null":void 0===e?"Undefined":"function"==typeof e||"object"==typeof e?"Object":"number"==typeof e?"Number":"boolean"==typeof e?"Boolean":"string"==typeof e?"String":void 0},IsPropertyDescriptor:function(e){if("Object"!==this.Type(e))return!1;var r={"[[Configurable]]":!0,"[[Enumerable]]":!0,"[[Get]]":!0,"[[Set]]":!0,"[[Value]]":!0,"[[Writable]]":!0};for(var t in e)if(has(e,t)&&!r[t])return!1;var i=has(e,"[[Value]]"),o=has(e,"[[Get]]")||has(e,"[[Set]]");if(i&&o)throw new $TypeError("Property Descriptors may not be both accessor and data descriptors");return!0},IsAccessorDescriptor:function(e){return void 0!==e&&(assertRecord(this,"Property Descriptor","Desc",e),!(!has(e,"[[Get]]")&&!has(e,"[[Set]]")))},IsDataDescriptor:function(e){return void 0!==e&&(assertRecord(this,"Property Descriptor","Desc",e),!(!has(e,"[[Value]]")&&!has(e,"[[Writable]]")))},IsGenericDescriptor:function(e){return void 0!==e&&(assertRecord(this,"Property Descriptor","Desc",e),!this.IsAccessorDescriptor(e)&&!this.IsDataDescriptor(e))},FromPropertyDescriptor:function(e){if(void 0===e)return e;if(assertRecord(this,"Property Descriptor","Desc",e),this.IsDataDescriptor(e))return{value:e["[[Value]]"],writable:!!e["[[Writable]]"],enumerable:!!e["[[Enumerable]]"],configurable:!!e["[[Configurable]]"]};if(this.IsAccessorDescriptor(e))return{get:e["[[Get]]"],set:e["[[Set]]"],enumerable:!!e["[[Enumerable]]"],configurable:!!e["[[Configurable]]"]};throw new $TypeError("FromPropertyDescriptor must be called with a fully populated Property Descriptor")},ToPropertyDescriptor:function(e){if("Object"!==this.Type(e))throw new $TypeError("ToPropertyDescriptor requires an object");var r={};if(has(e,"enumerable")&&(r["[[Enumerable]]"]=this.ToBoolean(e.enumerable)),has(e,"configurable")&&(r["[[Configurable]]"]=this.ToBoolean(e.configurable)),has(e,"value")&&(r["[[Value]]"]=e.value),has(e,"writable")&&(r["[[Writable]]"]=this.ToBoolean(e.writable)),has(e,"get")){var t=e.get;if(void 0!==t&&!this.IsCallable(t))throw new TypeError("getter must be a function");r["[[Get]]"]=t}if(has(e,"set")){var i=e.set;if(void 0!==i&&!this.IsCallable(i))throw new $TypeError("setter must be a function");r["[[Set]]"]=i}if((has(r,"[[Get]]")||has(r,"[[Set]]"))&&(has(r,"[[Value]]")||has(r,"[[Writable]]")))throw new $TypeError("Invalid property descriptor. Cannot both specify accessors and a value or writable attribute");return r}};module.exports=ES5;
    },{"./GetIntrinsic":14,"./helpers/assertRecord":16,"./helpers/isFinite":17,"./helpers/isNaN":18,"./helpers/mod":19,"./helpers/sign":20,"es-to-primitive/es5":21,"has":28,"is-callable":32}],16:[function(require,module,exports){
    "use strict";var GetIntrinsic=require("../GetIntrinsic"),$TypeError=GetIntrinsic("%TypeError%"),$SyntaxError=GetIntrinsic("%SyntaxError%"),has=require("has"),predicates={"Property Descriptor":function(r,e){if("Object"!==r.Type(e))return!1;var t={"[[Configurable]]":!0,"[[Enumerable]]":!0,"[[Get]]":!0,"[[Set]]":!0,"[[Value]]":!0,"[[Writable]]":!0};for(var n in e)if(has(e,n)&&!t[n])return!1;var o=has(e,"[[Value]]"),a=has(e,"[[Get]]")||has(e,"[[Set]]");if(o&&a)throw new $TypeError("Property Descriptors may not be both accessor and data descriptors");return!0}};module.exports=function(r,e,t,n){var o=predicates[e];if("function"!=typeof o)throw new $SyntaxError("unknown record type: "+e);if(!o(r,n))throw new $TypeError(t+" must be a "+e);console.log(o(r,n),n)};
    },{"../GetIntrinsic":14,"has":28}],17:[function(require,module,exports){
    var $isNaN=Number.isNaN||function(e){return e!==e};module.exports=Number.isFinite||function(e){return"number"==typeof e&&!$isNaN(e)&&e!==1/0&&e!==-1/0};
    },{}],18:[function(require,module,exports){
    module.exports=Number.isNaN||function(e){return e!==e};
    },{}],19:[function(require,module,exports){
    module.exports=function(o,r){var t=o%r;return Math.floor(t>=0?t:t+r)};
    },{}],20:[function(require,module,exports){
    module.exports=function(e){return e>=0?1:-1};
    },{}],21:[function(require,module,exports){
    "use strict";var toStr=Object.prototype.toString,isPrimitive=require("./helpers/isPrimitive"),isCallable=require("is-callable"),ES5internalSlots={"[[DefaultValue]]":function(e){var t;if((t=arguments.length>1?arguments[1]:"[object Date]"===toStr.call(e)?String:Number)===String||t===Number){var r,i,l=t===String?["toString","valueOf"]:["valueOf","toString"];for(i=0;i<l.length;++i)if(isCallable(e[l[i]])&&(r=e[l[i]](),isPrimitive(r)))return r;throw new TypeError("No default value")}throw new TypeError("invalid [[DefaultValue]] hint supplied")}};module.exports=function(e){return isPrimitive(e)?e:arguments.length>1?ES5internalSlots["[[DefaultValue]]"](e,arguments[1]):ES5internalSlots["[[DefaultValue]]"](e)};
    },{"./helpers/isPrimitive":22,"is-callable":32}],22:[function(require,module,exports){
    module.exports=function(o){return null===o||"function"!=typeof o&&"object"!=typeof o};
    },{}],23:[function(require,module,exports){
    function flattenVertexData(e,t,r){if(!e)throw new TypeError("must specify data as first parameter");if(r=0|+(r||0),Array.isArray(e)&&e[0]&&"number"==typeof e[0][0]){var n,a,l,o,f=e[0].length,s=e.length*f;t&&"string"!=typeof t||(t=new(dtype(t||"float32"))(s+r));var i=t.length-r;if(s!==i)throw new Error("source length "+s+" ("+f+"x"+e.length+") does not match destination length "+i);for(n=0,l=r;n<e.length;n++)for(a=0;a<f;a++)t[l++]=null===e[n][a]?NaN:e[n][a]}else if(t&&"string"!=typeof t)t.set(e,r);else{var y=dtype(t||"float32");if(Array.isArray(e)||"array"===t)for(t=new y(e.length+r),n=0,l=r,o=t.length;l<o;l++,n++)t[l]=null===e[n]?NaN:e[n];else 0===r?t=new y(e):(t=new y(e.length+r),t.set(e,r))}return t}var dtype=require("dtype");module.exports=flattenVertexData;
    },{"dtype":13}],24:[function(require,module,exports){
    "use strict";var isCallable=require("is-callable"),toStr=Object.prototype.toString,hasOwnProperty=Object.prototype.hasOwnProperty,forEachArray=function(r,t,a){for(var o=0,l=r.length;o<l;o++)hasOwnProperty.call(r,o)&&(null==a?t(r[o],o,r):t.call(a,r[o],o,r))},forEachString=function(r,t,a){for(var o=0,l=r.length;o<l;o++)null==a?t(r.charAt(o),o,r):t.call(a,r.charAt(o),o,r)},forEachObject=function(r,t,a){for(var o in r)hasOwnProperty.call(r,o)&&(null==a?t(r[o],o,r):t.call(a,r[o],o,r))},forEach=function(r,t,a){if(!isCallable(t))throw new TypeError("iterator must be a function");var o;arguments.length>=3&&(o=a),"[object Array]"===toStr.call(r)?forEachArray(r,t,o):"string"==typeof r?forEachString(r,t,o):forEachObject(r,t,o)};module.exports=forEach;
    },{"is-callable":32}],25:[function(require,module,exports){
    "use strict";var ERROR_MESSAGE="Function.prototype.bind called on incompatible ",slice=Array.prototype.slice,toStr=Object.prototype.toString,funcType="[object Function]";module.exports=function(t){var n=this;if("function"!=typeof n||toStr.call(n)!==funcType)throw new TypeError(ERROR_MESSAGE+n);for(var o,e=slice.call(arguments,1),r=function(){if(this instanceof o){var r=n.apply(this,e.concat(slice.call(arguments)));return Object(r)===r?r:this}return n.apply(t,e.concat(slice.call(arguments)))},c=Math.max(0,n.length-e.length),i=[],p=0;p<c;p++)i.push("$"+p);if(o=Function("binder","return function ("+i.join(",")+"){ return binder.apply(this,arguments); }")(r),n.prototype){var l=function(){};l.prototype=n.prototype,o.prototype=new l,l.prototype=null}return o};
    },{}],26:[function(require,module,exports){
    "use strict";var implementation=require("./implementation");module.exports=Function.prototype.bind||implementation;
    },{"./implementation":25}],27:[function(require,module,exports){
    (function (global){
    var win;win="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},module.exports=win;
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    
    },{}],28:[function(require,module,exports){
    "use strict";var bind=require("function-bind");module.exports=bind.call(Function.call,Object.prototype.hasOwnProperty);
    },{"function-bind":26}],29:[function(require,module,exports){
    exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:1/0*(s?-1:1);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),o+=p+N>=1?n/f:n*Math.pow(2,1-N),o*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l};
    },{}],30:[function(require,module,exports){
    "function"==typeof Object.create?module.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:module.exports=function(t,e){if(e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t}};
    },{}],31:[function(require,module,exports){
    function isBuffer(f){return!!f.constructor&&"function"==typeof f.constructor.isBuffer&&f.constructor.isBuffer(f)}function isSlowBuffer(f){return"function"==typeof f.readFloatLE&&"function"==typeof f.slice&&isBuffer(f.slice(0,0))}module.exports=function(f){return null!=f&&(isBuffer(f)||isSlowBuffer(f)||!!f._isBuffer)};
    },{}],32:[function(require,module,exports){
    "use strict";var fnToStr=Function.prototype.toString,constructorRegex=/^\s*class\b/,isES6ClassFn=function(t){try{var n=fnToStr.call(t);return constructorRegex.test(n)}catch(t){return!1}},tryFunctionObject=function(t){try{return!isES6ClassFn(t)&&(fnToStr.call(t),!0)}catch(t){return!1}},toStr=Object.prototype.toString,fnClass="[object Function]",genClass="[object GeneratorFunction]",hasToStringTag="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;module.exports=function(t){if(!t)return!1;if("function"!=typeof t&&"object"!=typeof t)return!1;if("function"==typeof t&&!t.prototype)return!0;if(hasToStringTag)return tryFunctionObject(t);if(isES6ClassFn(t))return!1;var n=toStr.call(t);return n===fnClass||n===genClass};
    },{}],33:[function(require,module,exports){
    function isFunction(o){var t=toString.call(o);return"[object Function]"===t||"function"==typeof o&&"[object RegExp]"!==t||"undefined"!=typeof window&&(o===window.setTimeout||o===window.alert||o===window.confirm||o===window.prompt)}module.exports=isFunction;var toString=Object.prototype.toString;
    },{}],34:[function(require,module,exports){
    "use strict";module.exports=function(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)};
    },{}],35:[function(require,module,exports){
    var toString={}.toString;module.exports=Array.isArray||function(r){return"[object Array]"==toString.call(r)};
    },{}],36:[function(require,module,exports){
    function TextLayout(t){this.glyphs=[],this._measure=this.computeMetrics.bind(this),this.update(t)}function addGetter(t){Object.defineProperty(TextLayout.prototype,t,{get:wrapper(t),configurable:!0})}function wrapper(t){return new Function(["return function "+t+"() {","  return this._"+t,"}"].join("\n"))()}function getGlyphById(t,e){if(!t.chars||0===t.chars.length)return null;var r=findChar(t.chars,e);return r>=0?t.chars[r]:null}function getXHeight(t){for(var e=0;e<X_HEIGHTS.length;e++){var r=X_HEIGHTS[e].charCodeAt(0),n=findChar(t.chars,r);if(n>=0)return t.chars[n].height}return 0}function getMGlyph(t){for(var e=0;e<M_WIDTHS.length;e++){var r=M_WIDTHS[e].charCodeAt(0),n=findChar(t.chars,r);if(n>=0)return t.chars[n]}return 0}function getCapHeight(t){for(var e=0;e<CAP_HEIGHTS.length;e++){var r=CAP_HEIGHTS[e].charCodeAt(0),n=findChar(t.chars,r);if(n>=0)return t.chars[n].height}return 0}function getKerning(t,e,r){if(!t.kernings||0===t.kernings.length)return 0;for(var n=t.kernings,i=0;i<n.length;i++){var a=n[i];if(a.first===e&&a.second===r)return a.amount}return 0}function getAlignType(t){return"center"===t?ALIGN_CENTER:"right"===t?ALIGN_RIGHT:ALIGN_LEFT}function findChar(t,e,r){r=r||0;for(var n=r;n<t.length;n++)if(t[n].id===e)return n;return-1}var wordWrap=require("word-wrapper"),xtend=require("xtend"),number=require("as-number"),X_HEIGHTS=["x","e","a","o","n","s","r","c","u","m","v","w","z"],M_WIDTHS=["m","w"],CAP_HEIGHTS=["H","I","N","E","F","K","L","T","U","V","W","X","Y","Z"],TAB_ID="\t".charCodeAt(0),SPACE_ID=" ".charCodeAt(0),ALIGN_LEFT=0,ALIGN_CENTER=1,ALIGN_RIGHT=2;module.exports=function(t){return new TextLayout(t)},TextLayout.prototype.update=function(t){if(t=xtend({measure:this._measure},t),this._opt=t,this._opt.tabSize=number(this._opt.tabSize,4),!t.font)throw new Error("must provide a valid bitmap font");var e=this.glyphs,r=t.text||"",n=t.font;this._setupSpaceGlyphs(n);var i=wordWrap.lines(r,t),a=t.width||0;e.length=0;var h=i.reduce(function(t,e){return Math.max(t,e.width,a)},0),o=0,s=0,c=number(t.lineHeight,n.common.lineHeight),u=n.common.base,l=c-u,p=t.letterSpacing||0,f=c*i.length-l,d=getAlignType(this._opt.align);s-=f,this._width=h,this._height=f,this._descender=c-u,this._baseline=u,this._xHeight=getXHeight(n),this._capHeight=getCapHeight(n),this._lineHeight=c,this._ascender=c-l-this._xHeight;var g=this;i.forEach(function(t,i){for(var a,u=t.start,l=t.end,f=t.width,_=u;_<l;_++){var y=r.charCodeAt(_),G=g.getGlyph(n,y);if(G){a&&(o+=getKerning(n,a.id,G.id));var T=o;d===ALIGN_CENTER?T+=(h-f)/2:d===ALIGN_RIGHT&&(T+=h-f),e.push({position:[T,s],data:G,index:_,line:i}),o+=G.xadvance+p,a=G}}s+=c,o=0}),this._linesTotal=i.length},TextLayout.prototype._setupSpaceGlyphs=function(t){if(this._fallbackSpaceGlyph=null,this._fallbackTabGlyph=null,t.chars&&0!==t.chars.length){var e=getGlyphById(t,SPACE_ID)||getMGlyph(t)||t.chars[0],r=this._opt.tabSize*e.xadvance;this._fallbackSpaceGlyph=e,this._fallbackTabGlyph=xtend(e,{x:0,y:0,xadvance:r,id:TAB_ID,xoffset:0,yoffset:0,width:0,height:0})}},TextLayout.prototype.getGlyph=function(t,e){var r=getGlyphById(t,e);return r||(e===TAB_ID?this._fallbackTabGlyph:e===SPACE_ID?this._fallbackSpaceGlyph:null)},TextLayout.prototype.computeMetrics=function(t,e,r,n){var i,a,h=this._opt.letterSpacing||0,o=this._opt.font,s=0,c=0,u=0;if(!o.chars||0===o.chars.length)return{start:e,end:e,width:0};r=Math.min(t.length,r);for(var l=e;l<r;l++){var p=t.charCodeAt(l),i=this.getGlyph(o,p);if(i){i.xoffset;s+=a?getKerning(o,a.id,i.id):0;var f=s+i.xadvance+h,d=s+i.width;if(d>=n||f>=n)break;s=f,c=d,a=i}u++}return a&&(c+=a.xoffset),{start:e,end:e+u,width:c}},["width","height","descender","ascender","xHeight","baseline","capHeight","lineHeight"].forEach(addGetter);
    },{"as-number":2,"word-wrapper":70,"xtend":73}],37:[function(require,module,exports){
    (function (Buffer){
    function isArrayBuffer(r){return"[object ArrayBuffer]"===Object.prototype.toString.call(r)}function getBinaryOpts(r){if(xml2)return xtend(r,{responseType:"arraybuffer"});if(void 0===self.XMLHttpRequest)throw new Error("your browser does not support XHR loading");var e=new self.XMLHttpRequest;return e.overrideMimeType("text/plain; charset=x-user-defined"),xtend({xhr:e},r)}var xhr=require("xhr"),noop=function(){},parseASCII=require("parse-bmfont-ascii"),parseXML=require("parse-bmfont-xml"),readBinary=require("parse-bmfont-binary"),isBinaryFormat=require("./lib/is-binary"),xtend=require("xtend"),xml2=function(){return self.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest}();module.exports=function(r,e){e="function"==typeof e?e:noop,"string"==typeof r?r={uri:r}:r||(r={}),r.binary&&(r=getBinaryOpts(r)),xhr(r,function(t,n,i){if(t)return e(t);if(!/^2/.test(n.statusCode))return e(new Error("http status code: "+n.statusCode));if(!i)return e(new Error("no body result"));var o=!1;if(isArrayBuffer(i)){var a=new Uint8Array(i);i=new Buffer(a,"binary")}isBinaryFormat(i)&&(o=!0,"string"==typeof i&&(i=new Buffer(i,"binary"))),o||(Buffer.isBuffer(i)&&(i=i.toString(r.encoding)),i=i.trim());var s;try{var u=n.headers["content-type"];s=o?readBinary(i):/json/.test(u)||"{"===i.charAt(0)?JSON.parse(i):/xml/.test(u)||"<"===i.charAt(0)?parseXML(i):parseASCII(i)}catch(r){e(new Error("error parsing font "+r.message)),e=noop}e(null,s)})};
    }).call(this,require("buffer").Buffer)
    
    },{"./lib/is-binary":38,"buffer":6,"parse-bmfont-ascii":43,"parse-bmfont-binary":44,"parse-bmfont-xml":45,"xhr":71,"xtend":73}],38:[function(require,module,exports){
    (function (Buffer){
    var equal=require("buffer-equal"),HEADER=new Buffer([66,77,70,3]);module.exports=function(e){return"string"==typeof e?"BMF"===e.substring(0,3):e.length>4&&equal(e.slice(0,4),HEADER)};
    }).call(this,require("buffer").Buffer)
    
    },{"buffer":6,"buffer-equal":5}],39:[function(require,module,exports){
    "use strict";function toObject(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function shouldUseNative(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map(function(e){return r[e]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(e){n[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}var getOwnPropertySymbols=Object.getOwnPropertySymbols,hasOwnProperty=Object.prototype.hasOwnProperty,propIsEnumerable=Object.prototype.propertyIsEnumerable;module.exports=shouldUseNative()?Object.assign:function(e,r){for(var t,n,o=toObject(e),a=1;a<arguments.length;a++){t=Object(arguments[a]);for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);if(getOwnPropertySymbols){n=getOwnPropertySymbols(t);for(var c=0;c<n.length;c++)propIsEnumerable.call(t,n[c])&&(o[n[c]]=t[n[c]])}}return o};
    },{}],40:[function(require,module,exports){
    "use strict";var keysShim;if(!Object.keys){var has=Object.prototype.hasOwnProperty,toStr=Object.prototype.toString,isArgs=require("./isArguments"),isEnumerable=Object.prototype.propertyIsEnumerable,hasDontEnumBug=!isEnumerable.call({toString:null},"toString"),hasProtoEnumBug=isEnumerable.call(function(){},"prototype"),dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],equalsConstructorPrototype=function(t){var o=t.constructor;return o&&o.prototype===t},excludedKeys={$applicationCache:!0,$console:!0,$external:!0,$frame:!0,$frameElement:!0,$frames:!0,$innerHeight:!0,$innerWidth:!0,$onmozfullscreenchange:!0,$onmozfullscreenerror:!0,$outerHeight:!0,$outerWidth:!0,$pageXOffset:!0,$pageYOffset:!0,$parent:!0,$scrollLeft:!0,$scrollTop:!0,$scrollX:!0,$scrollY:!0,$self:!0,$webkitIndexedDB:!0,$webkitStorageInfo:!0,$window:!0},hasAutomationEqualityBug=function(){if("undefined"==typeof window)return!1;for(var t in window)try{if(!excludedKeys["$"+t]&&has.call(window,t)&&null!==window[t]&&"object"==typeof window[t])try{equalsConstructorPrototype(window[t])}catch(t){return!0}}catch(t){return!0}return!1}(),equalsConstructorPrototypeIfNotBuggy=function(t){if("undefined"==typeof window||!hasAutomationEqualityBug)return equalsConstructorPrototype(t);try{return equalsConstructorPrototype(t)}catch(t){return!1}};keysShim=function(t){var o=null!==t&&"object"==typeof t,r="[object Function]"===toStr.call(t),e=isArgs(t),n=o&&"[object String]"===toStr.call(t),u=[];if(!o&&!r&&!e)throw new TypeError("Object.keys called on a non-object");var s=hasProtoEnumBug&&r;if(n&&t.length>0&&!has.call(t,0))for(var a=0;a<t.length;++a)u.push(String(a));if(e&&t.length>0)for(var l=0;l<t.length;++l)u.push(String(l));else for(var i in t)s&&"prototype"===i||!has.call(t,i)||u.push(String(i));if(hasDontEnumBug)for(var c=equalsConstructorPrototypeIfNotBuggy(t),p=0;p<dontEnums.length;++p)c&&"constructor"===dontEnums[p]||!has.call(t,dontEnums[p])||u.push(dontEnums[p]);return u}}module.exports=keysShim;
    },{"./isArguments":42}],41:[function(require,module,exports){
    "use strict";var slice=Array.prototype.slice,isArgs=require("./isArguments"),origKeys=Object.keys,keysShim=origKeys?function(e){return origKeys(e)}:require("./implementation"),originalKeys=Object.keys;keysShim.shim=function(){if(Object.keys){(function(){var e=Object.keys(arguments);return e&&e.length===arguments.length})(1,2)||(Object.keys=function(e){return originalKeys(isArgs(e)?slice.call(e):e)})}else Object.keys=keysShim;return Object.keys||keysShim},module.exports=keysShim;
    },{"./implementation":40,"./isArguments":42}],42:[function(require,module,exports){
    "use strict";var toStr=Object.prototype.toString;module.exports=function(t){var e=toStr.call(t),o="[object Arguments]"===e;return o||(o="[object Array]"!==e&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&"[object Function]"===toStr.call(t.callee)),o};
    },{}],43:[function(require,module,exports){
    function splitLine(e,r){if(!(e=e.replace(/\t+/g," ").trim()))return null;var t=e.indexOf(" ");if(-1===t)throw new Error("no named row at line "+r);var a=e.substring(0,t);e=e.substring(t+1),e=e.replace(/letter=[\'\"]\S+[\'\"]/gi,""),e=e.split("="),e=e.map(function(e){return e.trim().match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)});for(var n=[],i=0;i<e.length;i++){var s=e[i];0===i?n.push({key:s[0],data:""}):i===e.length-1?n[n.length-1].data=parseData(s[0]):(n[n.length-1].data=parseData(s[0]),n.push({key:s[1],data:""}))}var o={key:a,data:{}};return n.forEach(function(e){o.data[e.key]=e.data}),o}function parseData(e){return e&&0!==e.length?0===e.indexOf('"')||0===e.indexOf("'")?e.substring(1,e.length-1):-1!==e.indexOf(",")?parseIntList(e):parseInt(e,10):""}function parseIntList(e){return e.split(",").map(function(e){return parseInt(e,10)})}module.exports=function(e){if(!e)throw new Error("no data provided");e=e.toString().trim();var r={pages:[],chars:[],kernings:[]},t=e.split(/\r\n?|\n/g);if(0===t.length)throw new Error("no data in BMFont file");for(var a=0;a<t.length;a++){var n=splitLine(t[a],a);if(n)if("page"===n.key){if("number"!=typeof n.data.id)throw new Error("malformed file at line "+a+" -- needs page id=N");if("string"!=typeof n.data.file)throw new Error("malformed file at line "+a+' -- needs page file="path"');r.pages[n.data.id]=n.data.file}else"chars"===n.key||"kernings"===n.key||("char"===n.key?r.chars.push(n.data):"kerning"===n.key?r.kernings.push(n.data):r[n.key]=n.data)}return r};
    },{}],44:[function(require,module,exports){
    function readBlock(r,e,n){if(n>e.length-1)return 0;var a=e.readUInt8(n++),t=e.readInt32LE(n);switch(n+=4,a){case 1:r.info=readInfo(e,n);break;case 2:r.common=readCommon(e,n);break;case 3:r.pages=readPages(e,n,t);break;case 4:r.chars=readChars(e,n,t);break;case 5:r.kernings=readKernings(e,n,t)}return 5+t}function readInfo(r,e){var n={};n.size=r.readInt16LE(e);var a=r.readUInt8(e+2);return n.smooth=a>>7&1,n.unicode=a>>6&1,n.italic=a>>5&1,n.bold=a>>4&1,a>>3&1&&(n.fixedHeight=1),n.charset=r.readUInt8(e+3)||"",n.stretchH=r.readUInt16LE(e+4),n.aa=r.readUInt8(e+6),n.padding=[r.readInt8(e+7),r.readInt8(e+8),r.readInt8(e+9),r.readInt8(e+10)],n.spacing=[r.readInt8(e+11),r.readInt8(e+12)],n.outline=r.readUInt8(e+13),n.face=readStringNT(r,e+14),n}function readCommon(r,e){var n={};n.lineHeight=r.readUInt16LE(e),n.base=r.readUInt16LE(e+2),n.scaleW=r.readUInt16LE(e+4),n.scaleH=r.readUInt16LE(e+6),n.pages=r.readUInt16LE(e+8);r.readUInt8(e+10);return n.packed=0,n.alphaChnl=r.readUInt8(e+11),n.redChnl=r.readUInt8(e+12),n.greenChnl=r.readUInt8(e+13),n.blueChnl=r.readUInt8(e+14),n}function readPages(r,e,n){for(var a=[],t=readNameNT(r,e),d=t.length+1,o=n/d,i=0;i<o;i++)a[i]=r.slice(e,e+t.length).toString("utf8"),e+=d;return a}function readChars(r,e,n){for(var a=[],t=n/20,d=0;d<t;d++){var o={},i=20*d;o.id=r.readUInt32LE(e+0+i),o.x=r.readUInt16LE(e+4+i),o.y=r.readUInt16LE(e+6+i),o.width=r.readUInt16LE(e+8+i),o.height=r.readUInt16LE(e+10+i),o.xoffset=r.readInt16LE(e+12+i),o.yoffset=r.readInt16LE(e+14+i),o.xadvance=r.readInt16LE(e+16+i),o.page=r.readUInt8(e+18+i),o.chnl=r.readUInt8(e+19+i),a[d]=o}return a}function readKernings(r,e,n){for(var a=[],t=n/10,d=0;d<t;d++){var o={},i=10*d;o.first=r.readUInt32LE(e+0+i),o.second=r.readUInt32LE(e+4+i),o.amount=r.readInt16LE(e+8+i),a[d]=o}return a}function readNameNT(r,e){for(var n=e;n<r.length&&0!==r[n];n++);return r.slice(e,n)}function readStringNT(r,e){return readNameNT(r,e).toString("utf8")}var HEADER=[66,77,70];module.exports=function(r){if(r.length<6)throw new Error("invalid buffer length for BMFont");if(!HEADER.every(function(e,n){return r.readUInt8(n)===e}))throw new Error("BMFont missing BMF byte header");var e=3;if(r.readUInt8(e++)>3)throw new Error("Only supports BMFont Binary v3 (BMFont App v1.10)");for(var n={kernings:[],chars:[]},a=0;a<5;a++)e+=readBlock(n,r,e);return n};
    },{}],45:[function(require,module,exports){
    function getAttribs(e){return getAttribList(e).reduce(function(e,t){return e[mapName(t.nodeName)]=t.nodeValue,e},{})}function getAttribList(e){for(var t=[],r=0;r<e.attributes.length;r++)t.push(e.attributes[r]);return t}function mapName(e){return NAME_MAP[e.toLowerCase()]||e}var parseAttributes=require("./parse-attribs"),parseFromString=require("xml-parse-from-string"),NAME_MAP={scaleh:"scaleH",scalew:"scaleW",stretchh:"stretchH",lineheight:"lineHeight",alphachnl:"alphaChnl",redchnl:"redChnl",greenchnl:"greenChnl",bluechnl:"blueChnl"};module.exports=function(e){e=e.toString();var t=parseFromString(e),r={pages:[],chars:[],kernings:[]};["info","common"].forEach(function(e){var a=t.getElementsByTagName(e)[0];a&&(r[e]=parseAttributes(getAttribs(a)))});var a=t.getElementsByTagName("pages")[0];if(!a)throw new Error("malformed file -- no <pages> element");for(var n=a.getElementsByTagName("page"),i=0;i<n.length;i++){var s=n[i],g=parseInt(s.getAttribute("id"),10),l=s.getAttribute("file");if(isNaN(g))throw new Error('malformed file -- page "id" attribute is NaN');if(!l)throw new Error('malformed file -- needs page "file" attribute');r.pages[parseInt(g,10)]=l}return["chars","kernings"].forEach(function(e){var a=t.getElementsByTagName(e)[0];if(a)for(var n=e.substring(0,e.length-1),i=a.getElementsByTagName(n),s=0;s<i.length;s++){var g=i[s];r[e].push(parseAttributes(getAttribs(g)))}}),r};
    },{"./parse-attribs":46,"xml-parse-from-string":72}],46:[function(require,module,exports){
    function parseIntList(t){return t.split(",").map(function(t){return parseInt(t,10)})}var GLYPH_DESIGNER_ERROR="chasrset";module.exports=function(t){GLYPH_DESIGNER_ERROR in t&&(t.charset=t[GLYPH_DESIGNER_ERROR],delete t[GLYPH_DESIGNER_ERROR]);for(var n in t)"face"!==n&&"charset"!==n&&(t[n]="padding"===n||"spacing"===n?parseIntList(t[n]):parseInt(t[n],10));return t};
    },{}],47:[function(require,module,exports){
    var trim=require("string.prototype.trim"),forEach=require("for-each"),isArray=function(r){return"[object Array]"===Object.prototype.toString.call(r)};module.exports=function(r){if(!r)return{};var t={};return forEach(trim(r).split("\n"),function(r){var i=r.indexOf(":"),e=trim(r.slice(0,i)).toLowerCase(),o=trim(r.slice(i+1));void 0===t[e]?t[e]=o:isArray(t[e])?t[e].push(o):t[e]=[t[e],o]}),t};
    },{"for-each":24,"string.prototype.trim":53}],48:[function(require,module,exports){
    (function (global){
    var performance=global.performance||{},present=function(){for(var e=["now","webkitNow","msNow","mozNow","oNow"];e.length;){var n=e.shift();if(n in performance)return performance[n].bind(performance)}var r=Date.now||function(){return(new Date).getTime()},o=(performance.timing||{}).navigationStart||r();return function(){return r()-o}}();present.performanceNow=performance.now,present.noConflict=function(){performance.now=present.performanceNow},present.conflict=function(){performance.now=present},present.conflict(),module.exports=present;
    }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    
    },{}],49:[function(require,module,exports){
    function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}var process=module.exports={},cachedSetTimeout,cachedClearTimeout;!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};
    },{}],50:[function(require,module,exports){
    (function (setImmediate){
    !function(t){function e(t,e){return function(){t.apply(e,arguments)}}function n(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],f(t,e(r,this),e(i,this))}function o(t){var e=this;if(null===this._state)return void this._deferreds.push(t);l(function(){var n=e._state?t.onFulfilled:t.onRejected;if(null===n)return void(e._state?t.resolve:t.reject)(e._value);var o;try{o=n(e._value)}catch(e){return void t.reject(e)}t.resolve(o)})}function r(t){try{if(t===this)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if("function"==typeof n)return void f(e(n,t),e(r,this),e(i,this))}this._state=!0,this._value=t,u.call(this)}catch(t){i.call(this,t)}}function i(t){this._state=!1,this._value=t,u.call(this)}function u(){for(var t=0,e=this._deferreds.length;t<e;t++)o.call(this,this._deferreds[t]);this._deferreds=null}function c(t,e,n,o){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.resolve=n,this.reject=o}function f(t,e,n){var o=!1;try{t(function(t){o||(o=!0,e(t))},function(t){o||(o=!0,n(t))})}catch(t){if(o)return;o=!0,n(t)}}var s=setTimeout,l="function"==typeof setImmediate&&setImmediate||function(t){s(t,1)},h=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)};n.prototype.catch=function(t){return this.then(null,t)},n.prototype.then=function(t,e){var r=this;return new n(function(n,i){o.call(r,new c(t,e,n,i))})},n.all=function(){var t=Array.prototype.slice.call(1===arguments.length&&h(arguments[0])?arguments[0]:arguments);return new n(function(e,n){function o(i,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var c=u.then;if("function"==typeof c)return void c.call(u,function(t){o(i,t)},n)}t[i]=u,0==--r&&e(t)}catch(t){n(t)}}if(0===t.length)return e([]);for(var r=t.length,i=0;i<t.length;i++)o(i,t[i])})},n.resolve=function(t){return t&&"object"==typeof t&&t.constructor===n?t:new n(function(e){e(t)})},n.reject=function(t){return new n(function(e,n){n(t)})},n.race=function(t){return new n(function(e,n){for(var o=0,r=t.length;o<r;o++)t[o].then(e,n)})},n._setImmediateFn=function(t){l=t},"undefined"!=typeof module&&module.exports?module.exports=n:t.Promise||(t.Promise=n)}(this);
    }).call(this,require("timers").setImmediate)
    
    },{"timers":68}],51:[function(require,module,exports){
    var dtype=require("dtype"),anArray=require("an-array"),isBuffer=require("is-buffer"),CW=[0,2,3],CCW=[2,1,3];module.exports=function(r,e){r&&(anArray(r)||isBuffer(r))||(e=r||{},r=null),e="number"==typeof e?{count:e}:e||{};for(var t="string"==typeof e.type?e.type:"uint16",u="number"==typeof e.count?e.count:1,n=e.start||0,a=!1!==e.clockwise?CW:CCW,f=a[0],o=a[1],y=a[2],i=6*u,p=r||new(dtype(t))(i),s=0,c=0;s<i;s+=6,c+=4){var C=s+n;p[C+0]=c+0,p[C+1]=c+1,p[C+2]=c+2,p[C+3]=c+f,p[C+4]=c+o,p[C+5]=c+y}return p};
    },{"an-array":1,"dtype":13,"is-buffer":31}],52:[function(require,module,exports){
    "use strict";var bind=require("function-bind"),ES=require("es-abstract/es5"),replace=bind.call(Function.call,String.prototype.replace),leftWhitespace=/^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/,rightWhitespace=/[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;module.exports=function(){var u=ES.ToString(ES.CheckObjectCoercible(this));return replace(replace(u,leftWhitespace,""),rightWhitespace,"")};
    },{"es-abstract/es5":15,"function-bind":26}],53:[function(require,module,exports){
    "use strict";var bind=require("function-bind"),define=require("define-properties"),implementation=require("./implementation"),getPolyfill=require("./polyfill"),shim=require("./shim"),boundTrim=bind.call(Function.call,getPolyfill());define(boundTrim,{getPolyfill:getPolyfill,implementation:implementation,shim:shim}),module.exports=boundTrim;
    },{"./implementation":52,"./polyfill":54,"./shim":55,"define-properties":11,"function-bind":26}],54:[function(require,module,exports){
    "use strict";var implementation=require("./implementation"),zeroWidthSpace="​";module.exports=function(){return String.prototype.trim&&zeroWidthSpace.trim()===zeroWidthSpace?String.prototype.trim:implementation};
    },{"./implementation":52}],55:[function(require,module,exports){
    "use strict";var define=require("define-properties"),getPolyfill=require("./polyfill");module.exports=function(){var e=getPolyfill();return define(String.prototype,{trim:e},{trim:function(){return String.prototype.trim!==e}}),e};
    },{"./polyfill":54,"define-properties":11}],56:[function(require,module,exports){
    "use strict";function minMax(e,t,n){return Math.min(Math.max(e,t),n)}function stringContains(e,t){return e.indexOf(t)>-1}function applyArguments(e,t){return e.apply(null,t)}function parseEasingParameters(e){var t=easingFunctionRegex.exec(e);return t?t[1].split(",").map(function(e){return parseFloat(e)}):[]}function spring(e,t){function n(e){var n=t?t*e/1e3:e;return n=l<1?Math.exp(-n*l*c)*(f*Math.cos(g*n)+p*Math.sin(g*n)):(f+p*n)*Math.exp(-n*c),0===e||1===e?e:1-n}function r(){var t=cache.springs[e];if(t)return t;for(var r=0,a=0;;)if(r+=1/6,1===n(r)){if(++a>=16)break}else a=0;var i=r*(1/6)*1e3;return cache.springs[e]=i,i}var a=parseEasingParameters(e),i=minMax(is.und(a[0])?1:a[0],.1,100),s=minMax(is.und(a[1])?100:a[1],.1,100),o=minMax(is.und(a[2])?10:a[2],.1,100),u=minMax(is.und(a[3])?0:a[3],.1,100),c=Math.sqrt(s/i),l=o/(2*Math.sqrt(s*i)),g=l<1?c*Math.sqrt(1-l*l):0,f=1,p=l<1?(l*c-u)/g:-u+c;return t?n:r}function elastic(e,t){void 0===e&&(e=1),void 0===t&&(t=.5);var n=minMax(e,1,10),r=minMax(t,.1,2);return function(e){return 0===e||1===e?e:-n*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/n))*(2*Math.PI)/r)}}function steps(e){return void 0===e&&(e=10),function(t){return Math.round(t*e)*(1/e)}}function parseEasings(e,t){if(is.fnc(e))return e;var n=e.split("(")[0],r=penner[n],a=parseEasingParameters(e);switch(n){case"spring":return spring(e,t);case"cubicBezier":return applyArguments(bezier,a);case"steps":return applyArguments(steps,a);default:return is.fnc(r)?applyArguments(r,a):applyArguments(bezier,r)}}function selectString(e){try{return document.querySelectorAll(e)}catch(e){return}}function filterArray(e,t){for(var n=auxArrayFilter,r=e.length,a=arguments.length>=2?arguments[1]:void 0,i=0;i<r;i++)if(i in e){var s=e[i];t.call(a,s,i,e)&&n.push(s)}return auxArrayFilter=e,auxArrayFilter.length=0,n}function flattenArray(e,t){t||(t=[]);for(var n=0,r=e.length;n<r;n++){var a=e[n];Array.isArray(a)?flattenArray(a,t):t.push(a)}return t}function toArray(e){return is.arr(e)?e:(is.str(e)&&(e=selectString(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function arrayContains(e,t){return e.some(function(e){return e===t})}function cloneObject(e){var t={};for(var n in e)t[n]=e[n];return t}function replaceObjectProps(e,t){var n=cloneObject(e);for(var r in e)n[r]=t.hasOwnProperty(r)?t[r]:e[r];return n}function mergeObjects(e,t){var n=cloneObject(e);for(var r in t)n[r]=is.und(e[r])?t[r]:e[r];return n}function rgbToRgba(e){var t=rgbRegex.exec(e);return t?"rgba("+t[1]+",1)":e}function hexToRgba(e){var t=e.replace(hexToRgbaHexRegex,function(e,t,n,r){return t+t+n+n+r+r}),n=hexToRgbaRgbRegex.exec(t);return"rgba("+parseInt(n[1],16)+","+parseInt(n[2],16)+","+parseInt(n[3],16)+",1)"}function hslToRgba(e){function t(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}var n,r,a,i=hslToRgbaHsl1Regex.exec(e)||hslToRgbaHsl2Regex.exec(e),s=parseInt(i[1],10)/360,o=parseInt(i[2],10)/100,u=parseInt(i[3],10)/100,c=i[4]||1;if(0==o)n=r=a=u;else{var l=u<.5?u*(1+o):u+o-u*o,g=2*u-l;n=t(g,l,s+1/3),r=t(g,l,s),a=t(g,l,s-1/3)}return"rgba("+255*n+","+255*r+","+255*a+","+c+")"}function colorToRgb(e){return is.rgb(e)?rgbToRgba(e):is.hex(e)?hexToRgba(e):is.hsl(e)?hslToRgba(e):void 0}function getUnit(e){var t=unitRegex.exec(e);if(t)return t[2]}function getTransformUnit(e){return stringContains(e,"translate")||"perspective"===e?"px":stringContains(e,"rotate")||stringContains(e,"skew")?"deg":void 0}function getFunctionValue(e,t){return is.fnc(e)?e(t.target,t.id,t.total):e}function getAttribute(e,t){return e.getAttribute(t)}function convertPxToUnit(e,t,n){if(arrayContains([n,"deg","rad","turn"],getUnit(t)))return t;var r=cache.CSS[t+n];if(!is.und(r))return r;var a=document.createElement(e.tagName),i=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;i.appendChild(a),a.style.position="absolute",a.style.width=100+n;var s=100/a.offsetWidth;i.removeChild(a);var o=s*parseFloat(t);return cache.CSS[t+n]=o,o}function getCSSValue(e,t,n){if(t in e.style){var r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[t]||getComputedStyle(e).getPropertyValue(r)||"0";return n?convertPxToUnit(e,a,n):a}}function getAnimationType(e,t){return is.dom(e)&&!is.inp(e)&&(getAttribute(e,t)||is.svg(e)&&e[t])?"attribute":is.dom(e)&&arrayContains(validTransforms,t)?"transform":is.dom(e)&&"transform"!==t&&getCSSValue(e,t)?"css":null!=e[t]?"object":void 0}function getElementTransforms(e){if(is.dom(e)){for(var t,n=e.style.transform||"",r=new Map;t=transformRegex.exec(n);)r.set(t[1],t[2]);return r}}function getTransformValue(e,t,n,r){var a=stringContains(t,"scale")?1:0+getTransformUnit(t),i=getElementTransforms(e).get(t)||a;return n&&(n.transforms.list.set(t,i),n.transforms.last=t),r?convertPxToUnit(e,i,r):i}function getOriginalTargetValue(e,t,n,r){switch(getAnimationType(e,t)){case"transform":return getTransformValue(e,t,r,n);case"css":return getCSSValue(e,t,n);case"attribute":return getAttribute(e,t);default:return e[t]||0}}function getRelativeValue(e,t){var n=operatorRegex.exec(e);if(!n)return e;var r=getUnit(e)||0,a=parseFloat(t),i=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return a+i+r;case"-":return a-i+r;case"*":return a*i+r}}function validateValue(e,t){if(is.col(e))return colorToRgb(e);var n=getUnit(e),r=n?e.substr(0,e.length-n.length):e;return t&&!whitespaceRegex.test(e)?r+t:r}function getDistance(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function getCircleLength(e){return 2*Math.PI*getAttribute(e,"r")}function getRectLength(e){return 2*getAttribute(e,"width")+2*getAttribute(e,"height")}function getLineLength(e){return getDistance({x:getAttribute(e,"x1"),y:getAttribute(e,"y1")},{x:getAttribute(e,"x2"),y:getAttribute(e,"y2")})}function getPolylineLength(e){for(var t,n=e.points,r=0,a=0;a<n.numberOfItems;a++){var i=n.getItem(a);a>0&&(r+=getDistance(t,i)),t=i}return r}function getPolygonLength(e){var t=e.points;return getPolylineLength(e)+getDistance(t.getItem(t.numberOfItems-1),t.getItem(0))}function getTotalLength(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return getCircleLength(e);case"rect":return getRectLength(e);case"line":return getLineLength(e);case"polyline":return getPolylineLength(e);case"polygon":return getPolygonLength(e)}}function setDashoffset(e){var t=getTotalLength(e);return e.setAttribute("stroke-dasharray",t),t}function getParentSvgEl(e){for(var t=e.parentNode;is.svg(t)&&(t=t.parentNode,is.svg(t.parentNode)););return t}function getParentSvg(e,t){var n=t||{},r=n.el||getParentSvgEl(e),a=r.getBoundingClientRect(),i=getAttribute(r,"viewBox"),s=a.width,o=a.height,u=n.viewBox||(i?i.split(" "):[0,0,s,o]);return{el:r,viewBox:u,x:u[0]/1,y:u[1]/1,w:s/u[2],h:o/u[3]}}function getPath(e,t){var n=is.str(e)?selectString(e)[0]:e,r=t||100;return function(e){return{property:e,el:n,svg:getParentSvg(n),totalLength:getTotalLength(n)*(r/100)}}}function getPathProgress(e,t){function n(n){void 0===n&&(n=0);var r=t+n>=1?t+n:0;return e.el.getPointAtLength(r)}var r=getParentSvg(e.el,e.svg),a=n(),i=n(-1),s=n(1);switch(e.property){case"x":return(a.x-r.x)*r.w;case"y":return(a.y-r.y)*r.h;case"angle":return 180*Math.atan2(s.y-i.y,s.x-i.x)/Math.PI}}function decomposeValue(e,t){var n=validateValue(is.pth(e)?e.totalLength:e,t)+"";return{original:n,numbers:n.match(valueRegex)?n.match(valueRegex).map(Number):[0],strings:is.str(e)||t?n.split(valueRegex):[]}}function parseTargets(e){return filterArray(e?flattenArray(is.arr(e)?e.map(toArray):toArray(e)):[],function(e,t,n){return n.indexOf(e)===t})}function getAnimatables(e){var t=parseTargets(e);return t.map(function(e,n){return{target:e,id:n,total:t.length,transforms:{list:getElementTransforms(e)}}})}function normalizePropertyTweens(e,t){var n=cloneObject(t);if(springRegex.test(n.easing)&&(n.duration=spring(n.easing)),is.arr(e)){var r=e.length;2===r&&!is.obj(e[0])?e={value:e}:is.fnc(t.duration)||(n.duration=t.duration/r)}var a=is.arr(e)?e:[e];return a.map(function(e,n){var r=is.obj(e)&&!is.pth(e)?e:{value:e};return is.und(r.delay)&&(r.delay=n?0:t.delay),is.und(r.endDelay)&&(r.endDelay=n===a.length-1?t.endDelay:0),r}).map(function(e){return mergeObjects(e,n)})}function flattenKeyframes(e){for(var t=filterArray(flattenArray(e.map(function(e){return Object.keys(e)})),function(e){return is.key(e)}).reduce(function(e,t){return e.indexOf(t)<0&&e.push(t),e},[]),n={},r=0;r<t.length;r++)!function(r){var a=t[r];n[a]=e.map(function(e){var t={};for(var n in e)is.key(n)?n==a&&(t.value=e[n]):t[n]=e[n];return t})}(r);return n}function getProperties(e,t){var n=[],r=t.keyframes;r&&(t=mergeObjects(flattenKeyframes(r),t));for(var a in t)is.key(a)&&n.push({name:a,tweens:normalizePropertyTweens(t[a],e)});return n}function normalizeTweenValues(e,t){var n={};for(var r in e){var a=getFunctionValue(e[r],t);is.arr(a)&&(a=a.map(function(e){return getFunctionValue(e,t)}),1===a.length&&(a=a[0])),n[r]=a}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}function normalizeTweens(e,t){var n;return e.tweens.map(function(r){var a=normalizeTweenValues(r,t),i=a.value,s=is.arr(i)?i[1]:i,o=getUnit(s),u=getOriginalTargetValue(t.target,e.name,o,t),c=n?n.to.original:u,l=is.arr(i)?i[0]:c,g=getUnit(l)||getUnit(u),f=o||g;return is.und(s)&&(s=c),a.from=decomposeValue(l,f),a.to=decomposeValue(getRelativeValue(s,l),f),a.start=n?n.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=parseEasings(a.easing,a.duration),a.isPath=is.pth(i),a.isColor=is.col(a.from.original),a.isColor&&(a.round=1),n=a,a})}function setTargetsValue(e,t){for(var n=getAnimatables(e),r=0,a=n.length;r<a;r++){var i=n[r];for(var s in t){var o=getFunctionValue(t[s],i),u=i.target,c=getUnit(o),l=getOriginalTargetValue(u,s,c,i),g=c||getUnit(l),f=getRelativeValue(validateValue(o,g),l),p=getAnimationType(u,s);setProgressValue[p](u,s,f,i.transforms,!0)}}}function createAnimation(e,t){var n=getAnimationType(e.target,t.name);if(n){var r=normalizeTweens(t,e),a=r[r.length-1];return{type:n,property:t.name,animatable:e,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}function getAnimations(e,t){return filterArray(flattenArray(e.map(function(e){return t.map(function(t){return createAnimation(e,t)})})),function(e){return!is.und(e)})}function getInstanceTimings(e,t){var n=e.length,r=function(e){return e.timelineOffset?e.timelineOffset:0},a={};return a.duration=n?Math.max.apply(Math,e.map(function(e){return r(e)+e.duration})):t.duration,a.delay=n?Math.min.apply(Math,e.map(function(e){return r(e)+e.delay})):t.delay,a.endDelay=n?a.duration-Math.max.apply(Math,e.map(function(e){return r(e)+e.duration-e.endDelay})):t.endDelay,a}function createNewInstance(e){var t=replaceObjectProps(defaultInstanceSettings,e),n=replaceObjectProps(defaultTweenSettings,e),r=getProperties(n,e),a=getAnimatables(e.targets),i=getAnimations(a,r),s=getInstanceTimings(i,n),o=instanceID;return instanceID++,mergeObjects(t,{id:o,children:[],animatables:a,animations:i,duration:s.duration,delay:s.delay,endDelay:s.endDelay})}function handleVisibilityChange(){if(document.hidden){for(var e=0,t=activeInstances.length;e<t;e++)activeInstance[e].pause();pausedInstances=activeInstances.slice(0),activeInstances=[]}else for(var n=0,r=pausedInstances.length;n<r;n++)pausedInstances[n].play()}function anime(e){function t(){return window.Promise&&new Promise(function(e){return v=e})}function n(){y.reversed=!y.reversed;for(var e=0,t=g.length;e<t;e++)g[e].reversed=y.reversed}function r(e){return y.reversed?y.duration-e:e}function a(){f=0,p=r(y.currentTime)*(1/anime.speed)}function i(e,t){t&&t.seek(e-t.timelineOffset)}function s(e){if(y.reversePlayback)for(var t=d;t--;)i(e,g[t]);else for(var n=0;n<d;n++)i(e,g[n])}function o(e){for(var t=0,n=y.animations,r=n.length;t<r;){var a=n[t],i=a.animatable,s=a.tweens,o=s.length-1,u=s[o];o&&(u=filterArray(s,function(t){return e<t.end})[0]||u);for(var c=minMax(e-u.start-u.delay,0,u.duration)/u.duration,l=isNaN(c)?1:u.easing(c),g=u.to.strings,f=u.round,p=[],m=u.to.numbers.length,d=void 0,v=0;v<m;v++){var h=void 0,b=u.to.numbers[v],x=u.from.numbers[v]||0;h=u.isPath?getPathProgress(u.value,l*b):x+l*(b-x),f&&(u.isColor&&v>2||(h=Math.round(h*f)/f)),p.push(h)}var T=g.length;if(T){d=g[0];for(var A=0;A<T;A++){var R=(g[A],g[A+1]),P=p[A];isNaN(P)||(d+=R?P+R:P+" ")}}else d=p[0];setProgressValue[a.type](i.target,a.property,d,i.transforms),a.currentValue=d,t++}}function u(e){y[e]&&!y.passThrough&&y[e](y)}function c(){y.remaining&&!0!==y.remaining&&y.remaining--}function l(e){var a=y.duration,i=y.delay,l=a-y.endDelay,d=r(e);y.progress=minMax(d/a*100,0,100),y.reversePlayback=d<y.currentTime,g&&s(d),!y.began&&y.currentTime>0&&(y.began=!0,u("begin"),u("loopBegin")),d<=i&&0!==y.currentTime&&o(0),(d>=l&&y.currentTime!==a||!a)&&o(a),d>i&&d<l?(y.changeBegan||(y.changeBegan=!0,y.changeCompleted=!1,u("changeBegin")),u("change"),o(d)):y.changeBegan&&(y.changeCompleted=!0,y.changeBegan=!1,u("changeComplete")),y.currentTime=minMax(d,0,a),y.began&&u("update"),e>=a&&(p=0,c(),y.remaining?(f=m,u("loopComplete"),u("loopBegin"),"alternate"===y.direction&&n()):(y.paused=!0,y.completed||(y.completed=!0,u("loopComplete"),u("complete"),"Promise"in window&&(v(),h=t()))))}void 0===e&&(e={});var g,f=0,p=0,m=0,d=0,v=null,h=t(),y=createNewInstance(e);return y.reset=function(){var e=y.direction;y.passThrough=!1,y.currentTime=0,y.progress=0,y.paused=!0,y.began=!1,y.changeBegan=!1,y.completed=!1,y.changeCompleted=!1,y.reversePlayback=!1,y.reversed="reverse"===e,y.remaining=y.loop,g=y.children,d=g.length;for(var t=d;t--;)y.children[t].reset();(y.reversed&&!0!==y.loop||"alternate"===e&&1===y.loop)&&y.remaining++,o(0)},y.set=function(e,t){return setTargetsValue(e,t),y},y.tick=function(e){m=e,f||(f=m),l((m+(p-f))*anime.speed)},y.seek=function(e){l(r(e))},y.pause=function(){y.paused=!0,a()},y.play=function(){y.paused&&(y.paused=!1,activeInstances.push(y),a(),raf||engine())},y.reverse=function(){n(),a()},y.restart=function(){y.reset(),y.play()},y.finished=h,y.reset(),y.autoplay&&y.play(),y}function removeTargetsFromAnimations(e,t){for(var n=t.length;n--;)arrayContains(e,t[n].animatable.target)&&t.splice(n,1)}function removeTargets(e){for(var t=parseTargets(e),n=activeInstances.length;n--;){var r=activeInstances[n],a=r.animations,i=r.children;removeTargetsFromAnimations(t,a);for(var s=i.length;s--;){var o=i[s],u=o.animations;removeTargetsFromAnimations(t,u),u.length||o.children.length||i.splice(s,1)}a.length||i.length||r.pause()}}function stagger(e,t){void 0===t&&(t={});var n=t.direction||"normal",r=t.easing?parseEasings(t.easing):null,a=t.grid,i=t.axis,s=t.from||0,o="first"===s,u="center"===s,c="last"===s,l=is.arr(e),g=l?parseFloat(e[0]):parseFloat(e),f=l?parseFloat(e[1]):0,p=getUnit(l?e[1]:e)||0,m=t.start||0+(l?g:0),d=[],v=0;return function(e,t,h){if(o&&(s=0),u&&(s=(h-1)/2),c&&(s=h-1),!d.length){for(var y=0;y<h;y++){if(a){var b=u?(a[0]-1)/2:s%a[0],x=u?(a[1]-1)/2:Math.floor(s/a[0]),T=y%a[0],A=Math.floor(y/a[0]),R=b-T,P=x-A,w=Math.sqrt(R*R+P*P);"x"===i&&(w=-R),"y"===i&&(w=-P),d.push(w)}else d.push(Math.abs(s-y));v=Math.max.apply(Math,d)}r&&(d=d.map(function(e){return r(e/v)*v})),"reverse"===n&&(d=d.map(function(e){return i?e<0?-1*e:-e:Math.abs(v-e)}))}return m+(l?(f-g)/v:g)*(Math.round(100*d[t])/100)+p}}function timeline(e){void 0===e&&(e={});var t=anime(e);return t.duration=0,t.add=function(n,r){function a(e){e.passThrough=!0}var i=activeInstances.indexOf(t),s=t.children;i>-1&&activeInstances.splice(i,1);for(var o=0;o<s.length;o++)a(s[o]);var u=mergeObjects(n,replaceObjectProps(defaultTweenSettings,e));u.targets=u.targets||e.targets;var c=t.duration;u.autoplay=!1,u.direction=t.direction,u.timelineOffset=is.und(r)?c:getRelativeValue(r,c),a(t),t.seek(u.timelineOffset);var l=anime(u);a(l),s.push(l);var g=getInstanceTimings(s,e);return t.delay=g.delay,t.endDelay=g.endDelay,t.duration=g.duration,t.seek(0),t.reset(),t.autoplay&&t.play(),t},t}var defaultInstanceSettings={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},defaultTweenSettings={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},validTransforms=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective"],cache={CSS:{},springs:{}},hexRegex=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i,rgbPrefixRegex=/^rgb/,hslRegex=/^hsl/,is={arr:function(e){return Array.isArray(e)},obj:function(e){return stringContains(Object.prototype.toString.call(e),"Object")},pth:function(e){return is.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||is.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},hex:function(e){return hexRegex.test(e)},rgb:function(e){return rgbPrefixRegex.test(e)},hsl:function(e){return hslRegex.test(e)},col:function(e){return is.hex(e)||is.rgb(e)||is.hsl(e)},key:function(e){return!defaultInstanceSettings.hasOwnProperty(e)&&!defaultTweenSettings.hasOwnProperty(e)&&"targets"!==e&&"keyframes"!==e}},easingFunctionRegex=/\(([^)]+)\)/,bezier=function(){function e(e,t){return 1-3*t+3*e}function t(e,t){return 3*t-6*e}function n(e){return 3*e}function r(r,a,i){return((e(a,i)*r+t(a,i))*r+n(a))*r}function a(r,a,i){return 3*e(a,i)*r*r+2*t(a,i)*r+n(a)}function i(e,t,n,a,i){var s,o,u=0;do{o=t+(n-t)/2,s=r(o,a,i)-e,s>0?n=o:t=o}while(Math.abs(s)>1e-7&&++u<10);return o}function s(e,t,n,i){for(var s=0;s<4;++s){var o=a(t,n,i);if(0===o)return t;t-=(r(t,n,i)-e)/o}return t}function o(e,t,n,o){function l(t){for(var r=0,o=1,l=u-1;o!==l&&g[o]<=t;++o)r+=c;--o;var f=(t-g[o])/(g[o+1]-g[o]),p=r+f*c,m=a(p,e,n);return m>=.001?s(t,p,e,n):0===m?p:i(t,r,r+c,e,n)}if(0<=e&&e<=1&&0<=n&&n<=1){var g=new Float32Array(u);if(e!==t||n!==o)for(var f=0;f<u;++f)g[f]=r(f*c,e,n);return function(a){return e===t&&n===o?a:0===a||1===a?a:r(l(a),t,o)}}}var u=11,c=1/(u-1);return o}(),penner=function(){var e=["Quad","Cubic","Quart","Quint","Sine","Expo","Circ","Back","Elastic"],t={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],elastic],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(e,t){return function(n){return 1-elastic(e,t)(1-n)}}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(e,t){return function(n){return n<.5?elastic(e,t)(2*n)/2:1-elastic(e,t)(-2*n+2)/2}}]},n={linear:[.25,.25,.75,.75]};for(var r in t)for(var a=0,i=t[r].length;a<i;a++)n["ease"+r+e[a]]=t[r][a];return n}(),auxArrayFilter=[],rgbRegex=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g,hexToRgbaHexRegex=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,hexToRgbaRgbRegex=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,hslToRgbaHsl1Regex=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g,hslToRgbaHsl2Regex=/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g,unitRegex=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/,transformRegex=/(\w+)\(([^)]*)\)/g,operatorRegex=/^(\*=|\+=|-=)/,whitespaceRegex=/\s/g,valueRegex=/-?\d*\.?\d+/g,springRegex=/^spring/,setProgressValue={css:function(e,t,n){return e.style[t]=n},attribute:function(e,t,n){return e.setAttribute(t,n)},object:function(e,t,n){return e[t]=n},transform:function(e,t,n,r,a){if(r.list.set(t,n),t===r.last||a){var i="";r.list.forEach(function(e,t){i+=t+"("+e+") "}),e.style.transform=i}}},instanceID=0,activeInstances=[],pausedInstances=[],raf,engine=function(){function e(){raf=requestAnimationFrame(t)}function t(t){var n=activeInstances.length;if(n){for(var r=0;r<n;){var a=activeInstances[r];if(a.paused){var i=activeInstances.indexOf(a);i>-1&&(activeInstances.splice(i,1),n=activeInstances.length)}else a.tick(t);r++}e()}else raf=cancelAnimationFrame(raf)}return e}();document.addEventListener("visibilitychange",handleVisibilityChange),anime.version="3.0.0",anime.speed=1,anime.running=activeInstances,anime.remove=removeTargets,anime.get=getOriginalTargetValue,anime.set=setTargetsValue,anime.convertPx=convertPxToUnit,anime.path=getPath,anime.setDashoffset=setDashoffset,anime.stagger=stagger,anime.timeline=timeline,anime.easing=parseEasings,anime.penner=penner,anime.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e},module.exports=anime;
    },{}],57:[function(require,module,exports){
    /**
     * @license
     * Copyright 2010-2022 Three.js Authors
     * SPDX-License-Identifier: MIT
     */
    (function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.THREE = {}));
    }(this, (function (exports) { 'use strict';
    
        const REVISION = '137';
        const MOUSE = {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2
        };
        const TOUCH = {
            ROTATE: 0,
            PAN: 1,
            DOLLY_PAN: 2,
            DOLLY_ROTATE: 3
        };
        const CullFaceNone = 0;
        const CullFaceBack = 1;
        const CullFaceFront = 2;
        const CullFaceFrontBack = 3;
        const BasicShadowMap = 0;
        const PCFShadowMap = 1;
        const PCFSoftShadowMap = 2;
        const VSMShadowMap = 3;
        const FrontSide = 0;
        const BackSide = 1;
        const DoubleSide = 2;
        const FlatShading = 1;
        const SmoothShading = 2;
        const NoBlending = 0;
        const NormalBlending = 1;
        const AdditiveBlending = 2;
        const SubtractiveBlending = 3;
        const MultiplyBlending = 4;
        const CustomBlending = 5;
        const AddEquation = 100;
        const SubtractEquation = 101;
        const ReverseSubtractEquation = 102;
        const MinEquation = 103;
        const MaxEquation = 104;
        const ZeroFactor = 200;
        const OneFactor = 201;
        const SrcColorFactor = 202;
        const OneMinusSrcColorFactor = 203;
        const SrcAlphaFactor = 204;
        const OneMinusSrcAlphaFactor = 205;
        const DstAlphaFactor = 206;
        const OneMinusDstAlphaFactor = 207;
        const DstColorFactor = 208;
        const OneMinusDstColorFactor = 209;
        const SrcAlphaSaturateFactor = 210;
        const NeverDepth = 0;
        const AlwaysDepth = 1;
        const LessDepth = 2;
        const LessEqualDepth = 3;
        const EqualDepth = 4;
        const GreaterEqualDepth = 5;
        const GreaterDepth = 6;
        const NotEqualDepth = 7;
        const MultiplyOperation = 0;
        const MixOperation = 1;
        const AddOperation = 2;
        const NoToneMapping = 0;
        const LinearToneMapping = 1;
        const ReinhardToneMapping = 2;
        const CineonToneMapping = 3;
        const ACESFilmicToneMapping = 4;
        const CustomToneMapping = 5;
        const UVMapping = 300;
        const CubeReflectionMapping = 301;
        const CubeRefractionMapping = 302;
        const EquirectangularReflectionMapping = 303;
        const EquirectangularRefractionMapping = 304;
        const CubeUVReflectionMapping = 306;
        const CubeUVRefractionMapping = 307;
        const RepeatWrapping = 1000;
        const ClampToEdgeWrapping = 1001;
        const MirroredRepeatWrapping = 1002;
        const NearestFilter = 1003;
        const NearestMipmapNearestFilter = 1004;
        const NearestMipMapNearestFilter = 1004;
        const NearestMipmapLinearFilter = 1005;
        const NearestMipMapLinearFilter = 1005;
        const LinearFilter = 1006;
        const LinearMipmapNearestFilter = 1007;
        const LinearMipMapNearestFilter = 1007;
        const LinearMipmapLinearFilter = 1008;
        const LinearMipMapLinearFilter = 1008;
        const UnsignedByteType = 1009;
        const ByteType = 1010;
        const ShortType = 1011;
        const UnsignedShortType = 1012;
        const IntType = 1013;
        const UnsignedIntType = 1014;
        const FloatType = 1015;
        const HalfFloatType = 1016;
        const UnsignedShort4444Type = 1017;
        const UnsignedShort5551Type = 1018;
        const UnsignedInt248Type = 1020;
        const AlphaFormat = 1021;
        const RGBAFormat = 1023;
        const LuminanceFormat = 1024;
        const LuminanceAlphaFormat = 1025;
        const DepthFormat = 1026;
        const DepthStencilFormat = 1027;
        const RedFormat = 1028;
        const RedIntegerFormat = 1029;
        const RGFormat = 1030;
        const RGIntegerFormat = 1031;
        const RGBAIntegerFormat = 1033;
        const RGB_S3TC_DXT1_Format = 33776;
        const RGBA_S3TC_DXT1_Format = 33777;
        const RGBA_S3TC_DXT3_Format = 33778;
        const RGBA_S3TC_DXT5_Format = 33779;
        const RGB_PVRTC_4BPPV1_Format = 35840;
        const RGB_PVRTC_2BPPV1_Format = 35841;
        const RGBA_PVRTC_4BPPV1_Format = 35842;
        const RGBA_PVRTC_2BPPV1_Format = 35843;
        const RGB_ETC1_Format = 36196;
        const RGB_ETC2_Format = 37492;
        const RGBA_ETC2_EAC_Format = 37496;
        const RGBA_ASTC_4x4_Format = 37808;
        const RGBA_ASTC_5x4_Format = 37809;
        const RGBA_ASTC_5x5_Format = 37810;
        const RGBA_ASTC_6x5_Format = 37811;
        const RGBA_ASTC_6x6_Format = 37812;
        const RGBA_ASTC_8x5_Format = 37813;
        const RGBA_ASTC_8x6_Format = 37814;
        const RGBA_ASTC_8x8_Format = 37815;
        const RGBA_ASTC_10x5_Format = 37816;
        const RGBA_ASTC_10x6_Format = 37817;
        const RGBA_ASTC_10x8_Format = 37818;
        const RGBA_ASTC_10x10_Format = 37819;
        const RGBA_ASTC_12x10_Format = 37820;
        const RGBA_ASTC_12x12_Format = 37821;
        const RGBA_BPTC_Format = 36492;
        const LoopOnce = 2200;
        const LoopRepeat = 2201;
        const LoopPingPong = 2202;
        const InterpolateDiscrete = 2300;
        const InterpolateLinear = 2301;
        const InterpolateSmooth = 2302;
        const ZeroCurvatureEnding = 2400;
        const ZeroSlopeEnding = 2401;
        const WrapAroundEnding = 2402;
        const NormalAnimationBlendMode = 2500;
        const AdditiveAnimationBlendMode = 2501;
        const TrianglesDrawMode = 0;
        const TriangleStripDrawMode = 1;
        const TriangleFanDrawMode = 2;
        const LinearEncoding = 3000;
        const sRGBEncoding = 3001;
        const BasicDepthPacking = 3200;
        const RGBADepthPacking = 3201;
        const TangentSpaceNormalMap = 0;
        const ObjectSpaceNormalMap = 1;
        const ZeroStencilOp = 0;
        const KeepStencilOp = 7680;
        const ReplaceStencilOp = 7681;
        const IncrementStencilOp = 7682;
        const DecrementStencilOp = 7683;
        const IncrementWrapStencilOp = 34055;
        const DecrementWrapStencilOp = 34056;
        const InvertStencilOp = 5386;
        const NeverStencilFunc = 512;
        const LessStencilFunc = 513;
        const EqualStencilFunc = 514;
        const LessEqualStencilFunc = 515;
        const GreaterStencilFunc = 516;
        const NotEqualStencilFunc = 517;
        const GreaterEqualStencilFunc = 518;
        const AlwaysStencilFunc = 519;
        const StaticDrawUsage = 35044;
        const DynamicDrawUsage = 35048;
        const StreamDrawUsage = 35040;
        const StaticReadUsage = 35045;
        const DynamicReadUsage = 35049;
        const StreamReadUsage = 35041;
        const StaticCopyUsage = 35046;
        const DynamicCopyUsage = 35050;
        const StreamCopyUsage = 35042;
        const GLSL1 = '100';
        const GLSL3 = '300 es';
        const _SRGBAFormat = 1035; // fallback for WebGL 1
    
        /**
         * https://github.com/mrdoob/eventdispatcher.js/
         */
        class EventDispatcher {
            addEventListener(type, listener) {
                if (this._listeners === undefined) this._listeners = {};
                const listeners = this._listeners;
    
                if (listeners[type] === undefined) {
                    listeners[type] = [];
                }
    
                if (listeners[type].indexOf(listener) === -1) {
                    listeners[type].push(listener);
                }
            }
    
            hasEventListener(type, listener) {
                if (this._listeners === undefined) return false;
                const listeners = this._listeners;
                return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
            }
    
            removeEventListener(type, listener) {
                if (this._listeners === undefined) return;
                const listeners = this._listeners;
                const listenerArray = listeners[type];
    
                if (listenerArray !== undefined) {
                    const index = listenerArray.indexOf(listener);
    
                    if (index !== -1) {
                        listenerArray.splice(index, 1);
                    }
                }
            }
    
            dispatchEvent(event) {
                if (this._listeners === undefined) return;
                const listeners = this._listeners;
                const listenerArray = listeners[event.type];
    
                if (listenerArray !== undefined) {
                    event.target = this; // Make a copy, in case listeners are removed while iterating.
    
                    const array = listenerArray.slice(0);
    
                    for (let i = 0, l = array.length; i < l; i++) {
                        array[i].call(this, event);
                    }
    
                    event.target = null;
                }
            }
    
        }
    
        const _lut = [];
    
        for (let i = 0; i < 256; i++) {
            _lut[i] = (i < 16 ? '0' : '') + i.toString(16);
        }
    
        let _seed = 1234567;
        const DEG2RAD = Math.PI / 180;
        const RAD2DEG = 180 / Math.PI; // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
    
        function generateUUID() {
            const d0 = Math.random() * 0xffffffff | 0;
            const d1 = Math.random() * 0xffffffff | 0;
            const d2 = Math.random() * 0xffffffff | 0;
            const d3 = Math.random() * 0xffffffff | 0;
            const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' + _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' + _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff]; // .toUpperCase() here flattens concatenated strings to save heap memory space.
    
            return uuid.toUpperCase();
        }
    
        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        } // compute euclidian modulo of m % n
        // https://en.wikipedia.org/wiki/Modulo_operation
    
    
        function euclideanModulo(n, m) {
            return (n % m + m) % m;
        } // Linear mapping from range <a1, a2> to range <b1, b2>
    
    
        function mapLinear(x, a1, a2, b1, b2) {
            return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
        } // https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
    
    
        function inverseLerp(x, y, value) {
            if (x !== y) {
                return (value - x) / (y - x);
            } else {
                return 0;
            }
        } // https://en.wikipedia.org/wiki/Linear_interpolation
    
    
        function lerp(x, y, t) {
            return (1 - t) * x + t * y;
        } // http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
    
    
        function damp(x, y, lambda, dt) {
            return lerp(x, y, 1 - Math.exp(-lambda * dt));
        } // https://www.desmos.com/calculator/vcsjnyz7x4
    
    
        function pingpong(x, length = 1) {
            return length - Math.abs(euclideanModulo(x, length * 2) - length);
        } // http://en.wikipedia.org/wiki/Smoothstep
    
    
        function smoothstep(x, min, max) {
            if (x <= min) return 0;
            if (x >= max) return 1;
            x = (x - min) / (max - min);
            return x * x * (3 - 2 * x);
        }
    
        function smootherstep(x, min, max) {
            if (x <= min) return 0;
            if (x >= max) return 1;
            x = (x - min) / (max - min);
            return x * x * x * (x * (x * 6 - 15) + 10);
        } // Random integer from <low, high> interval
    
    
        function randInt(low, high) {
            return low + Math.floor(Math.random() * (high - low + 1));
        } // Random float from <low, high> interval
    
    
        function randFloat(low, high) {
            return low + Math.random() * (high - low);
        } // Random float from <-range/2, range/2> interval
    
    
        function randFloatSpread(range) {
            return range * (0.5 - Math.random());
        } // Deterministic pseudo-random float in the interval [ 0, 1 ]
    
    
        function seededRandom(s) {
            if (s !== undefined) _seed = s % 2147483647; // Park-Miller algorithm
    
            _seed = _seed * 16807 % 2147483647;
            return (_seed - 1) / 2147483646;
        }
    
        function degToRad(degrees) {
            return degrees * DEG2RAD;
        }
    
        function radToDeg(radians) {
            return radians * RAD2DEG;
        }
    
        function isPowerOfTwo(value) {
            return (value & value - 1) === 0 && value !== 0;
        }
    
        function ceilPowerOfTwo(value) {
            return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
        }
    
        function floorPowerOfTwo(value) {
            return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
        }
    
        function setQuaternionFromProperEuler(q, a, b, c, order) {
            // Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles
            // rotations are applied to the axes in the order specified by 'order'
            // rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
            // angles are in radians
            const cos = Math.cos;
            const sin = Math.sin;
            const c2 = cos(b / 2);
            const s2 = sin(b / 2);
            const c13 = cos((a + c) / 2);
            const s13 = sin((a + c) / 2);
            const c1_3 = cos((a - c) / 2);
            const s1_3 = sin((a - c) / 2);
            const c3_1 = cos((c - a) / 2);
            const s3_1 = sin((c - a) / 2);
    
            switch (order) {
                case 'XYX':
                    q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
                    break;
    
                case 'YZY':
                    q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
                    break;
    
                case 'ZXZ':
                    q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
                    break;
    
                case 'XZX':
                    q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
                    break;
    
                case 'YXY':
                    q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
                    break;
    
                case 'ZYZ':
                    q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
                    break;
    
                default:
                    console.warn('THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order);
            }
        }
    
        var MathUtils = /*#__PURE__*/Object.freeze({
            __proto__: null,
            DEG2RAD: DEG2RAD,
            RAD2DEG: RAD2DEG,
            generateUUID: generateUUID,
            clamp: clamp,
            euclideanModulo: euclideanModulo,
            mapLinear: mapLinear,
            inverseLerp: inverseLerp,
            lerp: lerp,
            damp: damp,
            pingpong: pingpong,
            smoothstep: smoothstep,
            smootherstep: smootherstep,
            randInt: randInt,
            randFloat: randFloat,
            randFloatSpread: randFloatSpread,
            seededRandom: seededRandom,
            degToRad: degToRad,
            radToDeg: radToDeg,
            isPowerOfTwo: isPowerOfTwo,
            ceilPowerOfTwo: ceilPowerOfTwo,
            floorPowerOfTwo: floorPowerOfTwo,
            setQuaternionFromProperEuler: setQuaternionFromProperEuler
        });
    
        class Vector2 {
            constructor(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }
    
            get width() {
                return this.x;
            }
    
            set width(value) {
                this.x = value;
            }
    
            get height() {
                return this.y;
            }
    
            set height(value) {
                this.y = value;
            }
    
            set(x, y) {
                this.x = x;
                this.y = y;
                return this;
            }
    
            setScalar(scalar) {
                this.x = scalar;
                this.y = scalar;
                return this;
            }
    
            setX(x) {
                this.x = x;
                return this;
            }
    
            setY(y) {
                this.y = y;
                return this;
            }
    
            setComponent(index, value) {
                switch (index) {
                    case 0:
                        this.x = value;
                        break;
    
                    case 1:
                        this.y = value;
                        break;
    
                    default:
                        throw new Error('index is out of range: ' + index);
                }
    
                return this;
            }
    
            getComponent(index) {
                switch (index) {
                    case 0:
                        return this.x;
    
                    case 1:
                        return this.y;
    
                    default:
                        throw new Error('index is out of range: ' + index);
                }
            }
    
            clone() {
                return new this.constructor(this.x, this.y);
            }
    
            copy(v) {
                this.x = v.x;
                this.y = v.y;
                return this;
            }
    
            add(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                    return this.addVectors(v, w);
                }
    
                this.x += v.x;
                this.y += v.y;
                return this;
            }
    
            addScalar(s) {
                this.x += s;
                this.y += s;
                return this;
            }
    
            addVectors(a, b) {
                this.x = a.x + b.x;
                this.y = a.y + b.y;
                return this;
            }
    
            addScaledVector(v, s) {
                this.x += v.x * s;
                this.y += v.y * s;
                return this;
            }
    
            sub(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                    return this.subVectors(v, w);
                }
    
                this.x -= v.x;
                this.y -= v.y;
                return this;
            }
    
            subScalar(s) {
                this.x -= s;
                this.y -= s;
                return this;
            }
    
            subVectors(a, b) {
                this.x = a.x - b.x;
                this.y = a.y - b.y;
                return this;
            }
    
            multiply(v) {
                this.x *= v.x;
                this.y *= v.y;
                return this;
            }
    
            multiplyScalar(scalar) {
                this.x *= scalar;
                this.y *= scalar;
                return this;
            }
    
            divide(v) {
                this.x /= v.x;
                this.y /= v.y;
                return this;
            }
    
            divideScalar(scalar) {
                return this.multiplyScalar(1 / scalar);
            }
    
            applyMatrix3(m) {
                const x = this.x,
                            y = this.y;
                const e = m.elements;
                this.x = e[0] * x + e[3] * y + e[6];
                this.y = e[1] * x + e[4] * y + e[7];
                return this;
            }
    
            min(v) {
                this.x = Math.min(this.x, v.x);
                this.y = Math.min(this.y, v.y);
                return this;
            }
    
            max(v) {
                this.x = Math.max(this.x, v.x);
                this.y = Math.max(this.y, v.y);
                return this;
            }
    
            clamp(min, max) {
                // assumes min < max, componentwise
                this.x = Math.max(min.x, Math.min(max.x, this.x));
                this.y = Math.max(min.y, Math.min(max.y, this.y));
                return this;
            }
    
            clampScalar(minVal, maxVal) {
                this.x = Math.max(minVal, Math.min(maxVal, this.x));
                this.y = Math.max(minVal, Math.min(maxVal, this.y));
                return this;
            }
    
            clampLength(min, max) {
                const length = this.length();
                return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
            }
    
            floor() {
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
                return this;
            }
    
            ceil() {
                this.x = Math.ceil(this.x);
                this.y = Math.ceil(this.y);
                return this;
            }
    
            round() {
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
                return this;
            }
    
            roundToZero() {
                this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
                this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
                return this;
            }
    
            negate() {
                this.x = -this.x;
                this.y = -this.y;
                return this;
            }
    
            dot(v) {
                return this.x * v.x + this.y * v.y;
            }
    
            cross(v) {
                return this.x * v.y - this.y * v.x;
            }
    
            lengthSq() {
                return this.x * this.x + this.y * this.y;
            }
    
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            }
    
            manhattanLength() {
                return Math.abs(this.x) + Math.abs(this.y);
            }
    
            normalize() {
                return this.divideScalar(this.length() || 1);
            }
    
            angle() {
                // computes the angle in radians with respect to the positive x-axis
                const angle = Math.atan2(-this.y, -this.x) + Math.PI;
                return angle;
            }
    
            distanceTo(v) {
                return Math.sqrt(this.distanceToSquared(v));
            }
    
            distanceToSquared(v) {
                const dx = this.x - v.x,
                            dy = this.y - v.y;
                return dx * dx + dy * dy;
            }
    
            manhattanDistanceTo(v) {
                return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
            }
    
            setLength(length) {
                return this.normalize().multiplyScalar(length);
            }
    
            lerp(v, alpha) {
                this.x += (v.x - this.x) * alpha;
                this.y += (v.y - this.y) * alpha;
                return this;
            }
    
            lerpVectors(v1, v2, alpha) {
                this.x = v1.x + (v2.x - v1.x) * alpha;
                this.y = v1.y + (v2.y - v1.y) * alpha;
                return this;
            }
    
            equals(v) {
                return v.x === this.x && v.y === this.y;
            }
    
            fromArray(array, offset = 0) {
                this.x = array[offset];
                this.y = array[offset + 1];
                return this;
            }
    
            toArray(array = [], offset = 0) {
                array[offset] = this.x;
                array[offset + 1] = this.y;
                return array;
            }
    
            fromBufferAttribute(attribute, index, offset) {
                if (offset !== undefined) {
                    console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');
                }
    
                this.x = attribute.getX(index);
                this.y = attribute.getY(index);
                return this;
            }
    
            rotateAround(center, angle) {
                const c = Math.cos(angle),
                            s = Math.sin(angle);
                const x = this.x - center.x;
                const y = this.y - center.y;
                this.x = x * c - y * s + center.x;
                this.y = x * s + y * c + center.y;
                return this;
            }
    
            random() {
                this.x = Math.random();
                this.y = Math.random();
                return this;
            }
    
            *[Symbol.iterator]() {
                yield this.x;
                yield this.y;
            }
    
        }
    
        Vector2.prototype.isVector2 = true;
    
        class Matrix3 {
            constructor() {
                this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    
                if (arguments.length > 0) {
                    console.error('THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.');
                }
            }
    
            set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {
                const te = this.elements;
                te[0] = n11;
                te[1] = n21;
                te[2] = n31;
                te[3] = n12;
                te[4] = n22;
                te[5] = n32;
                te[6] = n13;
                te[7] = n23;
                te[8] = n33;
                return this;
            }
    
            identity() {
                this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
                return this;
            }
    
            copy(m) {
                const te = this.elements;
                const me = m.elements;
                te[0] = me[0];
                te[1] = me[1];
                te[2] = me[2];
                te[3] = me[3];
                te[4] = me[4];
                te[5] = me[5];
                te[6] = me[6];
                te[7] = me[7];
                te[8] = me[8];
                return this;
            }
    
            extractBasis(xAxis, yAxis, zAxis) {
                xAxis.setFromMatrix3Column(this, 0);
                yAxis.setFromMatrix3Column(this, 1);
                zAxis.setFromMatrix3Column(this, 2);
                return this;
            }
    
            setFromMatrix4(m) {
                const me = m.elements;
                this.set(me[0], me[4], me[8], me[1], me[5], me[9], me[2], me[6], me[10]);
                return this;
            }
    
            multiply(m) {
                return this.multiplyMatrices(this, m);
            }
    
            premultiply(m) {
                return this.multiplyMatrices(m, this);
            }
    
            multiplyMatrices(a, b) {
                const ae = a.elements;
                const be = b.elements;
                const te = this.elements;
                const a11 = ae[0],
                            a12 = ae[3],
                            a13 = ae[6];
                const a21 = ae[1],
                            a22 = ae[4],
                            a23 = ae[7];
                const a31 = ae[2],
                            a32 = ae[5],
                            a33 = ae[8];
                const b11 = be[0],
                            b12 = be[3],
                            b13 = be[6];
                const b21 = be[1],
                            b22 = be[4],
                            b23 = be[7];
                const b31 = be[2],
                            b32 = be[5],
                            b33 = be[8];
                te[0] = a11 * b11 + a12 * b21 + a13 * b31;
                te[3] = a11 * b12 + a12 * b22 + a13 * b32;
                te[6] = a11 * b13 + a12 * b23 + a13 * b33;
                te[1] = a21 * b11 + a22 * b21 + a23 * b31;
                te[4] = a21 * b12 + a22 * b22 + a23 * b32;
                te[7] = a21 * b13 + a22 * b23 + a23 * b33;
                te[2] = a31 * b11 + a32 * b21 + a33 * b31;
                te[5] = a31 * b12 + a32 * b22 + a33 * b32;
                te[8] = a31 * b13 + a32 * b23 + a33 * b33;
                return this;
            }
    
            multiplyScalar(s) {
                const te = this.elements;
                te[0] *= s;
                te[3] *= s;
                te[6] *= s;
                te[1] *= s;
                te[4] *= s;
                te[7] *= s;
                te[2] *= s;
                te[5] *= s;
                te[8] *= s;
                return this;
            }
    
            determinant() {
                const te = this.elements;
                const a = te[0],
                            b = te[1],
                            c = te[2],
                            d = te[3],
                            e = te[4],
                            f = te[5],
                            g = te[6],
                            h = te[7],
                            i = te[8];
                return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
            }
    
            invert() {
                const te = this.elements,
                            n11 = te[0],
                            n21 = te[1],
                            n31 = te[2],
                            n12 = te[3],
                            n22 = te[4],
                            n32 = te[5],
                            n13 = te[6],
                            n23 = te[7],
                            n33 = te[8],
                            t11 = n33 * n22 - n32 * n23,
                            t12 = n32 * n13 - n33 * n12,
                            t13 = n23 * n12 - n22 * n13,
                            det = n11 * t11 + n21 * t12 + n31 * t13;
                if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
                const detInv = 1 / det;
                te[0] = t11 * detInv;
                te[1] = (n31 * n23 - n33 * n21) * detInv;
                te[2] = (n32 * n21 - n31 * n22) * detInv;
                te[3] = t12 * detInv;
                te[4] = (n33 * n11 - n31 * n13) * detInv;
                te[5] = (n31 * n12 - n32 * n11) * detInv;
                te[6] = t13 * detInv;
                te[7] = (n21 * n13 - n23 * n11) * detInv;
                te[8] = (n22 * n11 - n21 * n12) * detInv;
                return this;
            }
    
            transpose() {
                let tmp;
                const m = this.elements;
                tmp = m[1];
                m[1] = m[3];
                m[3] = tmp;
                tmp = m[2];
                m[2] = m[6];
                m[6] = tmp;
                tmp = m[5];
                m[5] = m[7];
                m[7] = tmp;
                return this;
            }
    
            getNormalMatrix(matrix4) {
                return this.setFromMatrix4(matrix4).invert().transpose();
            }
    
            transposeIntoArray(r) {
                const m = this.elements;
                r[0] = m[0];
                r[1] = m[3];
                r[2] = m[6];
                r[3] = m[1];
                r[4] = m[4];
                r[5] = m[7];
                r[6] = m[2];
                r[7] = m[5];
                r[8] = m[8];
                return this;
            }
    
            setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {
                const c = Math.cos(rotation);
                const s = Math.sin(rotation);
                this.set(sx * c, sx * s, -sx * (c * cx + s * cy) + cx + tx, -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + ty, 0, 0, 1);
                return this;
            }
    
            scale(sx, sy) {
                const te = this.elements;
                te[0] *= sx;
                te[3] *= sx;
                te[6] *= sx;
                te[1] *= sy;
                te[4] *= sy;
                te[7] *= sy;
                return this;
            }
    
            rotate(theta) {
                const c = Math.cos(theta);
                const s = Math.sin(theta);
                const te = this.elements;
                const a11 = te[0],
                            a12 = te[3],
                            a13 = te[6];
                const a21 = te[1],
                            a22 = te[4],
                            a23 = te[7];
                te[0] = c * a11 + s * a21;
                te[3] = c * a12 + s * a22;
                te[6] = c * a13 + s * a23;
                te[1] = -s * a11 + c * a21;
                te[4] = -s * a12 + c * a22;
                te[7] = -s * a13 + c * a23;
                return this;
            }
    
            translate(tx, ty) {
                const te = this.elements;
                te[0] += tx * te[2];
                te[3] += tx * te[5];
                te[6] += tx * te[8];
                te[1] += ty * te[2];
                te[4] += ty * te[5];
                te[7] += ty * te[8];
                return this;
            }
    
            equals(matrix) {
                const te = this.elements;
                const me = matrix.elements;
    
                for (let i = 0; i < 9; i++) {
                    if (te[i] !== me[i]) return false;
                }
    
                return true;
            }
    
            fromArray(array, offset = 0) {
                for (let i = 0; i < 9; i++) {
                    this.elements[i] = array[i + offset];
                }
    
                return this;
            }
    
            toArray(array = [], offset = 0) {
                const te = this.elements;
                array[offset] = te[0];
                array[offset + 1] = te[1];
                array[offset + 2] = te[2];
                array[offset + 3] = te[3];
                array[offset + 4] = te[4];
                array[offset + 5] = te[5];
                array[offset + 6] = te[6];
                array[offset + 7] = te[7];
                array[offset + 8] = te[8];
                return array;
            }
    
            clone() {
                return new this.constructor().fromArray(this.elements);
            }
    
        }
    
        Matrix3.prototype.isMatrix3 = true;
    
        function arrayNeedsUint32(array) {
            // assumes larger values usually on last
            for (let i = array.length - 1; i >= 0; --i) {
                if (array[i] > 65535) return true;
            }
    
            return false;
        }
    
        const TYPED_ARRAYS = {
            Int8Array: Int8Array,
            Uint8Array: Uint8Array,
            Uint8ClampedArray: Uint8ClampedArray,
            Int16Array: Int16Array,
            Uint16Array: Uint16Array,
            Int32Array: Int32Array,
            Uint32Array: Uint32Array,
            Float32Array: Float32Array,
            Float64Array: Float64Array
        };
    
        function getTypedArray(type, buffer) {
            return new TYPED_ARRAYS[type](buffer);
        }
    
        function createElementNS(name) {
            return document.createElementNS('http://www.w3.org/1999/xhtml', name);
        }
    
        const _colorKeywords = {
            'aliceblue': 0xF0F8FF,
            'antiquewhite': 0xFAEBD7,
            'aqua': 0x00FFFF,
            'aquamarine': 0x7FFFD4,
            'azure': 0xF0FFFF,
            'beige': 0xF5F5DC,
            'bisque': 0xFFE4C4,
            'black': 0x000000,
            'blanchedalmond': 0xFFEBCD,
            'blue': 0x0000FF,
            'blueviolet': 0x8A2BE2,
            'brown': 0xA52A2A,
            'burlywood': 0xDEB887,
            'cadetblue': 0x5F9EA0,
            'chartreuse': 0x7FFF00,
            'chocolate': 0xD2691E,
            'coral': 0xFF7F50,
            'cornflowerblue': 0x6495ED,
            'cornsilk': 0xFFF8DC,
            'crimson': 0xDC143C,
            'cyan': 0x00FFFF,
            'darkblue': 0x00008B,
            'darkcyan': 0x008B8B,
            'darkgoldenrod': 0xB8860B,
            'darkgray': 0xA9A9A9,
            'darkgreen': 0x006400,
            'darkgrey': 0xA9A9A9,
            'darkkhaki': 0xBDB76B,
            'darkmagenta': 0x8B008B,
            'darkolivegreen': 0x556B2F,
            'darkorange': 0xFF8C00,
            'darkorchid': 0x9932CC,
            'darkred': 0x8B0000,
            'darksalmon': 0xE9967A,
            'darkseagreen': 0x8FBC8F,
            'darkslateblue': 0x483D8B,
            'darkslategray': 0x2F4F4F,
            'darkslategrey': 0x2F4F4F,
            'darkturquoise': 0x00CED1,
            'darkviolet': 0x9400D3,
            'deeppink': 0xFF1493,
            'deepskyblue': 0x00BFFF,
            'dimgray': 0x696969,
            'dimgrey': 0x696969,
            'dodgerblue': 0x1E90FF,
            'firebrick': 0xB22222,
            'floralwhite': 0xFFFAF0,
            'forestgreen': 0x228B22,
            'fuchsia': 0xFF00FF,
            'gainsboro': 0xDCDCDC,
            'ghostwhite': 0xF8F8FF,
            'gold': 0xFFD700,
            'goldenrod': 0xDAA520,
            'gray': 0x808080,
            'green': 0x008000,
            'greenyellow': 0xADFF2F,
            'grey': 0x808080,
            'honeydew': 0xF0FFF0,
            'hotpink': 0xFF69B4,
            'indianred': 0xCD5C5C,
            'indigo': 0x4B0082,
            'ivory': 0xFFFFF0,
            'khaki': 0xF0E68C,
            'lavender': 0xE6E6FA,
            'lavenderblush': 0xFFF0F5,
            'lawngreen': 0x7CFC00,
            'lemonchiffon': 0xFFFACD,
            'lightblue': 0xADD8E6,
            'lightcoral': 0xF08080,
            'lightcyan': 0xE0FFFF,
            'lightgoldenrodyellow': 0xFAFAD2,
            'lightgray': 0xD3D3D3,
            'lightgreen': 0x90EE90,
            'lightgrey': 0xD3D3D3,
            'lightpink': 0xFFB6C1,
            'lightsalmon': 0xFFA07A,
            'lightseagreen': 0x20B2AA,
            'lightskyblue': 0x87CEFA,
            'lightslategray': 0x778899,
            'lightslategrey': 0x778899,
            'lightsteelblue': 0xB0C4DE,
            'lightyellow': 0xFFFFE0,
            'lime': 0x00FF00,
            'limegreen': 0x32CD32,
            'linen': 0xFAF0E6,
            'magenta': 0xFF00FF,
            'maroon': 0x800000,
            'mediumaquamarine': 0x66CDAA,
            'mediumblue': 0x0000CD,
            'mediumorchid': 0xBA55D3,
            'mediumpurple': 0x9370DB,
            'mediumseagreen': 0x3CB371,
            'mediumslateblue': 0x7B68EE,
            'mediumspringgreen': 0x00FA9A,
            'mediumturquoise': 0x48D1CC,
            'mediumvioletred': 0xC71585,
            'midnightblue': 0x191970,
            'mintcream': 0xF5FFFA,
            'mistyrose': 0xFFE4E1,
            'moccasin': 0xFFE4B5,
            'navajowhite': 0xFFDEAD,
            'navy': 0x000080,
            'oldlace': 0xFDF5E6,
            'olive': 0x808000,
            'olivedrab': 0x6B8E23,
            'orange': 0xFFA500,
            'orangered': 0xFF4500,
            'orchid': 0xDA70D6,
            'palegoldenrod': 0xEEE8AA,
            'palegreen': 0x98FB98,
            'paleturquoise': 0xAFEEEE,
            'palevioletred': 0xDB7093,
            'papayawhip': 0xFFEFD5,
            'peachpuff': 0xFFDAB9,
            'peru': 0xCD853F,
            'pink': 0xFFC0CB,
            'plum': 0xDDA0DD,
            'powderblue': 0xB0E0E6,
            'purple': 0x800080,
            'rebeccapurple': 0x663399,
            'red': 0xFF0000,
            'rosybrown': 0xBC8F8F,
            'royalblue': 0x4169E1,
            'saddlebrown': 0x8B4513,
            'salmon': 0xFA8072,
            'sandybrown': 0xF4A460,
            'seagreen': 0x2E8B57,
            'seashell': 0xFFF5EE,
            'sienna': 0xA0522D,
            'silver': 0xC0C0C0,
            'skyblue': 0x87CEEB,
            'slateblue': 0x6A5ACD,
            'slategray': 0x708090,
            'slategrey': 0x708090,
            'snow': 0xFFFAFA,
            'springgreen': 0x00FF7F,
            'steelblue': 0x4682B4,
            'tan': 0xD2B48C,
            'teal': 0x008080,
            'thistle': 0xD8BFD8,
            'tomato': 0xFF6347,
            'turquoise': 0x40E0D0,
            'violet': 0xEE82EE,
            'wheat': 0xF5DEB3,
            'white': 0xFFFFFF,
            'whitesmoke': 0xF5F5F5,
            'yellow': 0xFFFF00,
            'yellowgreen': 0x9ACD32
        };
        const _hslA = {
            h: 0,
            s: 0,
            l: 0
        };
        const _hslB = {
            h: 0,
            s: 0,
            l: 0
        };
    
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
            return p;
        }
    
        function SRGBToLinear(c) {
            return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);
        }
    
        function LinearToSRGB(c) {
            return c < 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;
        }
    
        class Color {
            constructor(r, g, b) {
                if (g === undefined && b === undefined) {
                    // r is THREE.Color, hex or string
                    return this.set(r);
                }
    
                return this.setRGB(r, g, b);
            }
    
            set(value) {
                if (value && value.isColor) {
                    this.copy(value);
                } else if (typeof value === 'number') {
                    this.setHex(value);
                } else if (typeof value === 'string') {
                    this.setStyle(value);
                }
    
                return this;
            }
    
            setScalar(scalar) {
                this.r = scalar;
                this.g = scalar;
                this.b = scalar;
                return this;
            }
    
            setHex(hex) {
                hex = Math.floor(hex);
                this.r = (hex >> 16 & 255) / 255;
                this.g = (hex >> 8 & 255) / 255;
                this.b = (hex & 255) / 255;
                return this;
            }
    
            setRGB(r, g, b) {
                this.r = r;
                this.g = g;
                this.b = b;
                return this;
            }
    
            setHSL(h, s, l) {
                // h,s,l ranges are in 0.0 - 1.0
                h = euclideanModulo(h, 1);
                s = clamp(s, 0, 1);
                l = clamp(l, 0, 1);
    
                if (s === 0) {
                    this.r = this.g = this.b = l;
                } else {
                    const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;
                    const q = 2 * l - p;
                    this.r = hue2rgb(q, p, h + 1 / 3);
                    this.g = hue2rgb(q, p, h);
                    this.b = hue2rgb(q, p, h - 1 / 3);
                }
    
                return this;
            }
    
            setStyle(style) {
                function handleAlpha(string) {
                    if (string === undefined) return;
    
                    if (parseFloat(string) < 1) {
                        console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
                    }
                }
    
                let m;
    
                if (m = /^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(style)) {
                    // rgb / hsl
                    let color;
                    const name = m[1];
                    const components = m[2];
    
                    switch (name) {
                        case 'rgb':
                        case 'rgba':
                            if (color = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                                // rgb(255,0,0) rgba(255,0,0,0.5)
                                this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                                this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                                this.b = Math.min(255, parseInt(color[3], 10)) / 255;
                                handleAlpha(color[4]);
                                return this;
                            }
    
                            if (color = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                                // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                                this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                                this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                                this.b = Math.min(100, parseInt(color[3], 10)) / 100;
                                handleAlpha(color[4]);
                                return this;
                            }
    
                            break;
    
                        case 'hsl':
                        case 'hsla':
                            if (color = /^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(components)) {
                                // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                                const h = parseFloat(color[1]) / 360;
                                const s = parseInt(color[2], 10) / 100;
                                const l = parseInt(color[3], 10) / 100;
                                handleAlpha(color[4]);
                                return this.setHSL(h, s, l);
                            }
    
                            break;
                    }
                } else if (m = /^\#([A-Fa-f\d]+)$/.exec(style)) {
                    // hex color
                    const hex = m[1];
                    const size = hex.length;
    
                    if (size === 3) {
                        // #ff0
                        this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
                        this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
                        this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
                        return this;
                    } else if (size === 6) {
                        // #ff0000
                        this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                        this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
                        this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;
                        return this;
                    }
                }
    
                if (style && style.length > 0) {
                    return this.setColorName(style);
                }
    
                return this;
            }
    
            setColorName(style) {
                // color keywords
                const hex = _colorKeywords[style.toLowerCase()];
    
                if (hex !== undefined) {
                    // red
                    this.setHex(hex);
                } else {
                    // unknown color
                    console.warn('THREE.Color: Unknown color ' + style);
                }
    
                return this;
            }
    
            clone() {
                return new this.constructor(this.r, this.g, this.b);
            }
    
            copy(color) {
                this.r = color.r;
                this.g = color.g;
                this.b = color.b;
                return this;
            }
    
            copySRGBToLinear(color) {
                this.r = SRGBToLinear(color.r);
                this.g = SRGBToLinear(color.g);
                this.b = SRGBToLinear(color.b);
                return this;
            }
    
            copyLinearToSRGB(color) {
                this.r = LinearToSRGB(color.r);
                this.g = LinearToSRGB(color.g);
                this.b = LinearToSRGB(color.b);
                return this;
            }
    
            convertSRGBToLinear() {
                this.copySRGBToLinear(this);
                return this;
            }
    
            convertLinearToSRGB() {
                this.copyLinearToSRGB(this);
                return this;
            }
    
            getHex() {
                return this.r * 255 << 16 ^ this.g * 255 << 8 ^ this.b * 255 << 0;
            }
    
            getHexString() {
                return ('000000' + this.getHex().toString(16)).slice(-6);
            }
    
            getHSL(target) {
                // h,s,l ranges are in 0.0 - 1.0
                const r = this.r,
                            g = this.g,
                            b = this.b;
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                let hue, saturation;
                const lightness = (min + max) / 2.0;
    
                if (min === max) {
                    hue = 0;
                    saturation = 0;
                } else {
                    const delta = max - min;
                    saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
    
                    switch (max) {
                        case r:
                            hue = (g - b) / delta + (g < b ? 6 : 0);
                            break;
    
                        case g:
                            hue = (b - r) / delta + 2;
                            break;
    
                        case b:
                            hue = (r - g) / delta + 4;
                            break;
                    }
    
                    hue /= 6;
                }
    
                target.h = hue;
                target.s = saturation;
                target.l = lightness;
                return target;
            }
    
            getStyle() {
                return 'rgb(' + (this.r * 255 | 0) + ',' + (this.g * 255 | 0) + ',' + (this.b * 255 | 0) + ')';
            }
    
            offsetHSL(h, s, l) {
                this.getHSL(_hslA);
                _hslA.h += h;
                _hslA.s += s;
                _hslA.l += l;
                this.setHSL(_hslA.h, _hslA.s, _hslA.l);
                return this;
            }
    
            add(color) {
                this.r += color.r;
                this.g += color.g;
                this.b += color.b;
                return this;
            }
    
            addColors(color1, color2) {
                this.r = color1.r + color2.r;
                this.g = color1.g + color2.g;
                this.b = color1.b + color2.b;
                return this;
            }
    
            addScalar(s) {
                this.r += s;
                this.g += s;
                this.b += s;
                return this;
            }
    
            sub(color) {
                this.r = Math.max(0, this.r - color.r);
                this.g = Math.max(0, this.g - color.g);
                this.b = Math.max(0, this.b - color.b);
                return this;
            }
    
            multiply(color) {
                this.r *= color.r;
                this.g *= color.g;
                this.b *= color.b;
                return this;
            }
    
            multiplyScalar(s) {
                this.r *= s;
                this.g *= s;
                this.b *= s;
                return this;
            }
    
            lerp(color, alpha) {
                this.r += (color.r - this.r) * alpha;
                this.g += (color.g - this.g) * alpha;
                this.b += (color.b - this.b) * alpha;
                return this;
            }
    
            lerpColors(color1, color2, alpha) {
                this.r = color1.r + (color2.r - color1.r) * alpha;
                this.g = color1.g + (color2.g - color1.g) * alpha;
                this.b = color1.b + (color2.b - color1.b) * alpha;
                return this;
            }
    
            lerpHSL(color, alpha) {
                this.getHSL(_hslA);
                color.getHSL(_hslB);
                const h = lerp(_hslA.h, _hslB.h, alpha);
                const s = lerp(_hslA.s, _hslB.s, alpha);
                const l = lerp(_hslA.l, _hslB.l, alpha);
                this.setHSL(h, s, l);
                return this;
            }
    
            equals(c) {
                return c.r === this.r && c.g === this.g && c.b === this.b;
            }
    
            fromArray(array, offset = 0) {
                this.r = array[offset];
                this.g = array[offset + 1];
                this.b = array[offset + 2];
                return this;
            }
    
            toArray(array = [], offset = 0) {
                array[offset] = this.r;
                array[offset + 1] = this.g;
                array[offset + 2] = this.b;
                return array;
            }
    
            fromBufferAttribute(attribute, index) {
                this.r = attribute.getX(index);
                this.g = attribute.getY(index);
                this.b = attribute.getZ(index);
    
                if (attribute.normalized === true) {
                    // assuming Uint8Array
                    this.r /= 255;
                    this.g /= 255;
                    this.b /= 255;
                }
    
                return this;
            }
    
            toJSON() {
                return this.getHex();
            }
    
        }
    
        Color.NAMES = _colorKeywords;
        Color.prototype.isColor = true;
        Color.prototype.r = 1;
        Color.prototype.g = 1;
        Color.prototype.b = 1;
    
        let _canvas;
    
        class ImageUtils {
            static getDataURL(image) {
                if (/^data:/i.test(image.src)) {
                    return image.src;
                }
    
                if (typeof HTMLCanvasElement == 'undefined') {
                    return image.src;
                }
    
                let canvas;
    
                if (image instanceof HTMLCanvasElement) {
                    canvas = image;
                } else {
                    if (_canvas === undefined) _canvas = createElementNS('canvas');
                    _canvas.width = image.width;
                    _canvas.height = image.height;
    
                    const context = _canvas.getContext('2d');
    
                    if (image instanceof ImageData) {
                        context.putImageData(image, 0, 0);
                    } else {
                        context.drawImage(image, 0, 0, image.width, image.height);
                    }
    
                    canvas = _canvas;
                }
    
                if (canvas.width > 2048 || canvas.height > 2048) {
                    console.warn('THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons', image);
                    return canvas.toDataURL('image/jpeg', 0.6);
                } else {
                    return canvas.toDataURL('image/png');
                }
            }
    
            static sRGBToLinear(image) {
                if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
                    const canvas = createElementNS('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, image.width, image.height);
                    const imageData = context.getImageData(0, 0, image.width, image.height);
                    const data = imageData.data;
    
                    for (let i = 0; i < data.length; i++) {
                        data[i] = SRGBToLinear(data[i] / 255) * 255;
                    }
    
                    context.putImageData(imageData, 0, 0);
                    return canvas;
                } else if (image.data) {
                    const data = image.data.slice(0);
    
                    for (let i = 0; i < data.length; i++) {
                        if (data instanceof Uint8Array || data instanceof Uint8ClampedArray) {
                            data[i] = Math.floor(SRGBToLinear(data[i] / 255) * 255);
                        } else {
                            // assuming float
                            data[i] = SRGBToLinear(data[i]);
                        }
                    }
    
                    return {
                        data: data,
                        width: image.width,
                        height: image.height
                    };
                } else {
                    console.warn('THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.');
                    return image;
                }
            }
    
        }
    
        let textureId = 0;
    
        class Texture extends EventDispatcher {
            constructor(image = Texture.DEFAULT_IMAGE, mapping = Texture.DEFAULT_MAPPING, wrapS = ClampToEdgeWrapping, wrapT = ClampToEdgeWrapping, magFilter = LinearFilter, minFilter = LinearMipmapLinearFilter, format = RGBAFormat, type = UnsignedByteType, anisotropy = 1, encoding = LinearEncoding) {
                super();
                Object.defineProperty(this, 'id', {
                    value: textureId++
                });
                this.uuid = generateUUID();
                this.name = '';
                this.image = image;
                this.mipmaps = [];
                this.mapping = mapping;
                this.wrapS = wrapS;
                this.wrapT = wrapT;
                this.magFilter = magFilter;
                this.minFilter = minFilter;
                this.anisotropy = anisotropy;
                this.format = format;
                this.internalFormat = null;
                this.type = type;
                this.offset = new Vector2(0, 0);
                this.repeat = new Vector2(1, 1);
                this.center = new Vector2(0, 0);
                this.rotation = 0;
                this.matrixAutoUpdate = true;
                this.matrix = new Matrix3();
                this.generateMipmaps = true;
                this.premultiplyAlpha = false;
                this.flipY = true;
                this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)
                // Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
                //
                // Also changing the encoding after already used by a Material will not automatically make the Material
                // update. You need to explicitly call Material.needsUpdate to trigger it to recompile.
    
                this.encoding = encoding;
                this.userData = {};
                this.version = 0;
                this.onUpdate = null;
                this.isRenderTargetTexture = false; // indicates whether a texture belongs to a render target or not
    
                this.needsPMREMUpdate = false; // indicates whether this texture should be processed by PMREMGenerator or not (only relevant for render target textures)
            }
    
            updateMatrix() {
                this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
            copy(source) {
                this.name = source.name;
                this.image = source.image;
                this.mipmaps = source.mipmaps.slice(0);
                this.mapping = source.mapping;
                this.wrapS = source.wrapS;
                this.wrapT = source.wrapT;
                this.magFilter = source.magFilter;
                this.minFilter = source.minFilter;
                this.anisotropy = source.anisotropy;
                this.format = source.format;
                this.internalFormat = source.internalFormat;
                this.type = source.type;
                this.offset.copy(source.offset);
                this.repeat.copy(source.repeat);
                this.center.copy(source.center);
                this.rotation = source.rotation;
                this.matrixAutoUpdate = source.matrixAutoUpdate;
                this.matrix.copy(source.matrix);
                this.generateMipmaps = source.generateMipmaps;
                this.premultiplyAlpha = source.premultiplyAlpha;
                this.flipY = source.flipY;
                this.unpackAlignment = source.unpackAlignment;
                this.encoding = source.encoding;
                this.userData = JSON.parse(JSON.stringify(source.userData));
                return this;
            }
    
            toJSON(meta) {
                const isRootObject = meta === undefined || typeof meta === 'string';
    
                if (!isRootObject && meta.textures[this.uuid] !== undefined) {
                    return meta.textures[this.uuid];
                }
    
                const output = {
                    metadata: {
                        version: 4.5,
                        type: 'Texture',
                        generator: 'Texture.toJSON'
                    },
                    uuid: this.uuid,
                    name: this.name,
                    mapping: this.mapping,
                    repeat: [this.repeat.x, this.repeat.y],
                    offset: [this.offset.x, this.offset.y],
                    center: [this.center.x, this.center.y],
                    rotation: this.rotation,
                    wrap: [this.wrapS, this.wrapT],
                    format: this.format,
                    type: this.type,
                    encoding: this.encoding,
                    minFilter: this.minFilter,
                    magFilter: this.magFilter,
                    anisotropy: this.anisotropy,
                    flipY: this.flipY,
                    premultiplyAlpha: this.premultiplyAlpha,
                    unpackAlignment: this.unpackAlignment
                };
    
                if (this.image !== undefined) {
                    // TODO: Move to THREE.Image
                    const image = this.image;
    
                    if (image.uuid === undefined) {
                        image.uuid = generateUUID(); // UGH
                    }
    
                    if (!isRootObject && meta.images[image.uuid] === undefined) {
                        let url;
    
                        if (Array.isArray(image)) {
                            // process array of images e.g. CubeTexture
                            url = [];
    
                            for (let i = 0, l = image.length; i < l; i++) {
                                // check cube texture with data textures
                                if (image[i].isDataTexture) {
                                    url.push(serializeImage(image[i].image));
                                } else {
                                    url.push(serializeImage(image[i]));
                                }
                            }
                        } else {
                            // process single image
                            url = serializeImage(image);
                        }
    
                        meta.images[image.uuid] = {
                            uuid: image.uuid,
                            url: url
                        };
                    }
    
                    output.image = image.uuid;
                }
    
                if (JSON.stringify(this.userData) !== '{}') output.userData = this.userData;
    
                if (!isRootObject) {
                    meta.textures[this.uuid] = output;
                }
    
                return output;
            }
    
            dispose() {
                this.dispatchEvent({
                    type: 'dispose'
                });
            }
    
            transformUv(uv) {
                if (this.mapping !== UVMapping) return uv;
                uv.applyMatrix3(this.matrix);
    
                if (uv.x < 0 || uv.x > 1) {
                    switch (this.wrapS) {
                        case RepeatWrapping:
                            uv.x = uv.x - Math.floor(uv.x);
                            break;
    
                        case ClampToEdgeWrapping:
                            uv.x = uv.x < 0 ? 0 : 1;
                            break;
    
                        case MirroredRepeatWrapping:
                            if (Math.abs(Math.floor(uv.x) % 2) === 1) {
                                uv.x = Math.ceil(uv.x) - uv.x;
                            } else {
                                uv.x = uv.x - Math.floor(uv.x);
                            }
    
                            break;
                    }
                }
    
                if (uv.y < 0 || uv.y > 1) {
                    switch (this.wrapT) {
                        case RepeatWrapping:
                            uv.y = uv.y - Math.floor(uv.y);
                            break;
    
                        case ClampToEdgeWrapping:
                            uv.y = uv.y < 0 ? 0 : 1;
                            break;
    
                        case MirroredRepeatWrapping:
                            if (Math.abs(Math.floor(uv.y) % 2) === 1) {
                                uv.y = Math.ceil(uv.y) - uv.y;
                            } else {
                                uv.y = uv.y - Math.floor(uv.y);
                            }
    
                            break;
                    }
                }
    
                if (this.flipY) {
                    uv.y = 1 - uv.y;
                }
    
                return uv;
            }
    
            set needsUpdate(value) {
                if (value === true) this.version++;
            }
    
        }
    
        Texture.DEFAULT_IMAGE = undefined;
        Texture.DEFAULT_MAPPING = UVMapping;
        Texture.prototype.isTexture = true;
    
        function serializeImage(image) {
            if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
                // default images
                return ImageUtils.getDataURL(image);
            } else {
                if (image.data) {
                    // images of DataTexture
                    return {
                        data: Array.prototype.slice.call(image.data),
                        width: image.width,
                        height: image.height,
                        type: image.data.constructor.name
                    };
                } else {
                    console.warn('THREE.Texture: Unable to serialize Texture.');
                    return {};
                }
            }
        }
    
        class Vector4 {
            constructor(x = 0, y = 0, z = 0, w = 1) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
            }
    
            get width() {
                return this.z;
            }
    
            set width(value) {
                this.z = value;
            }
    
            get height() {
                return this.w;
            }
    
            set height(value) {
                this.w = value;
            }
    
            set(x, y, z, w) {
                this.x = x;
                this.y = y;
                this.z = z;
                this.w = w;
                return this;
            }
    
            setScalar(scalar) {
                this.x = scalar;
                this.y = scalar;
                this.z = scalar;
                this.w = scalar;
                return this;
            }
    
            setX(x) {
                this.x = x;
                return this;
            }
    
            setY(y) {
                this.y = y;
                return this;
            }
    
            setZ(z) {
                this.z = z;
                return this;
            }
    
            setW(w) {
                this.w = w;
                return this;
            }
    
            setComponent(index, value) {
                switch (index) {
                    case 0:
                        this.x = value;
                        break;
    
                    case 1:
                        this.y = value;
                        break;
    
                    case 2:
                        this.z = value;
                        break;
    
                    case 3:
                        this.w = value;
                        break;
    
                    default:
                        throw new Error('index is out of range: ' + index);
                }
    
                return this;
            }
    
            getComponent(index) {
                switch (index) {
                    case 0:
                        return this.x;
    
                    case 1:
                        return this.y;
    
                    case 2:
                        return this.z;
    
                    case 3:
                        return this.w;
    
                    default:
                        throw new Error('index is out of range: ' + index);
                }
            }
    
            clone() {
                return new this.constructor(this.x, this.y, this.z, this.w);
            }
    
            copy(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
                this.w = v.w !== undefined ? v.w : 1;
                return this;
            }
    
            add(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                    return this.addVectors(v, w);
                }
    
                this.x += v.x;
                this.y += v.y;
                this.z += v.z;
                this.w += v.w;
                return this;
            }
    
            addScalar(s) {
                this.x += s;
                this.y += s;
                this.z += s;
                this.w += s;
                return this;
            }
    
            addVectors(a, b) {
                this.x = a.x + b.x;
                this.y = a.y + b.y;
                this.z = a.z + b.z;
                this.w = a.w + b.w;
                return this;
            }
    
            addScaledVector(v, s) {
                this.x += v.x * s;
                this.y += v.y * s;
                this.z += v.z * s;
                this.w += v.w * s;
                return this;
            }
    
            sub(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                    return this.subVectors(v, w);
                }
    
                this.x -= v.x;
                this.y -= v.y;
                this.z -= v.z;
                this.w -= v.w;
                return this;
            }
    
            subScalar(s) {
                this.x -= s;
                this.y -= s;
                this.z -= s;
                this.w -= s;
                return this;
            }
    
            subVectors(a, b) {
                this.x = a.x - b.x;
                this.y = a.y - b.y;
                this.z = a.z - b.z;
                this.w = a.w - b.w;
                return this;
            }
    
            multiply(v) {
                this.x *= v.x;
                this.y *= v.y;
                this.z *= v.z;
                this.w *= v.w;
                return this;
            }
    
            multiplyScalar(scalar) {
                this.x *= scalar;
                this.y *= scalar;
                this.z *= scalar;
                this.w *= scalar;
                return this;
            }
    
            applyMatrix4(m) {
                const x = this.x,
                            y = this.y,
                            z = this.z,
                            w = this.w;
                const e = m.elements;
                this.x = e[0] * x + e[4] * y + e[8] * z + e[12] * w;
                this.y = e[1] * x + e[5] * y + e[9] * z + e[13] * w;
                this.z = e[2] * x + e[6] * y + e[10] * z + e[14] * w;
                this.w = e[3] * x + e[7] * y + e[11] * z + e[15] * w;
                return this;
            }
    
            divideScalar(scalar) {
                return this.multiplyScalar(1 / scalar);
            }
    
            setAxisAngleFromQuaternion(q) {
                // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/index.htm
                // q is assumed to be normalized
                this.w = 2 * Math.acos(q.w);
                const s = Math.sqrt(1 - q.w * q.w);
    
                if (s < 0.0001) {
                    this.x = 1;
                    this.y = 0;
                    this.z = 0;
                } else {
                    this.x = q.x / s;
                    this.y = q.y / s;
                    this.z = q.z / s;
                }
    
                return this;
            }
    
            setAxisAngleFromRotationMatrix(m) {
                // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToAngle/index.htm
                // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
                let angle, x, y, z; // variables for result
    
                const epsilon = 0.01,
                            // margin to allow for rounding errors
                epsilon2 = 0.1,
                            // margin to distinguish between 0 and 180 degrees
                te = m.elements,
                            m11 = te[0],
                            m12 = te[4],
                            m13 = te[8],
                            m21 = te[1],
                            m22 = te[5],
                            m23 = te[9],
                            m31 = te[2],
                            m32 = te[6],
                            m33 = te[10];
    
                if (Math.abs(m12 - m21) < epsilon && Math.abs(m13 - m31) < epsilon && Math.abs(m23 - m32) < epsilon) {
                    // singularity found
                    // first check for identity matrix which must have +1 for all terms
                    // in leading diagonal and zero in other terms
                    if (Math.abs(m12 + m21) < epsilon2 && Math.abs(m13 + m31) < epsilon2 && Math.abs(m23 + m32) < epsilon2 && Math.abs(m11 + m22 + m33 - 3) < epsilon2) {
                        // this singularity is identity matrix so angle = 0
                        this.set(1, 0, 0, 0);
                        return this; // zero angle, arbitrary axis
                    } // otherwise this singularity is angle = 180
    
    
                    angle = Math.PI;
                    const xx = (m11 + 1) / 2;
                    const yy = (m22 + 1) / 2;
                    const zz = (m33 + 1) / 2;
                    const xy = (m12 + m21) / 4;
                    const xz = (m13 + m31) / 4;
                    const yz = (m23 + m32) / 4;
    
                    if (xx > yy && xx > zz) {
                        // m11 is the largest diagonal term
                        if (xx < epsilon) {
                            x = 0;
                            y = 0.707106781;
                            z = 0.707106781;
                        } else {
                            x = Math.sqrt(xx);
                            y = xy / x;
                            z = xz / x;
                        }
                    } else if (yy > zz) {
                        // m22 is the largest diagonal term
                        if (yy < epsilon) {
                            x = 0.707106781;
                            y = 0;
                            z = 0.707106781;
                        } else {
                            y = Math.sqrt(yy);
                            x = xy / y;
                            z = yz / y;
                        }
                    } else {
                        // m33 is the largest diagonal term so base result on this
                        if (zz < epsilon) {
                            x = 0.707106781;
                            y = 0.707106781;
                            z = 0;
                        } else {
                            z = Math.sqrt(zz);
                            x = xz / z;
                            y = yz / z;
                        }
                    }
    
                    this.set(x, y, z, angle);
                    return this; // return 180 deg rotation
                } // as we have reached here there are no singularities so we can handle normally
    
    
                let s = Math.sqrt((m32 - m23) * (m32 - m23) + (m13 - m31) * (m13 - m31) + (m21 - m12) * (m21 - m12)); // used to normalize
    
                if (Math.abs(s) < 0.001) s = 1; // prevent divide by zero, should not happen if matrix is orthogonal and should be
                // caught by singularity test above, but I've left it in just in case
    
                this.x = (m32 - m23) / s;
                this.y = (m13 - m31) / s;
                this.z = (m21 - m12) / s;
                this.w = Math.acos((m11 + m22 + m33 - 1) / 2);
                return this;
            }
    
            min(v) {
                this.x = Math.min(this.x, v.x);
                this.y = Math.min(this.y, v.y);
                this.z = Math.min(this.z, v.z);
                this.w = Math.min(this.w, v.w);
                return this;
            }
    
            max(v) {
                this.x = Math.max(this.x, v.x);
                this.y = Math.max(this.y, v.y);
                this.z = Math.max(this.z, v.z);
                this.w = Math.max(this.w, v.w);
                return this;
            }
    
            clamp(min, max) {
                // assumes min < max, componentwise
                this.x = Math.max(min.x, Math.min(max.x, this.x));
                this.y = Math.max(min.y, Math.min(max.y, this.y));
                this.z = Math.max(min.z, Math.min(max.z, this.z));
                this.w = Math.max(min.w, Math.min(max.w, this.w));
                return this;
            }
    
            clampScalar(minVal, maxVal) {
                this.x = Math.max(minVal, Math.min(maxVal, this.x));
                this.y = Math.max(minVal, Math.min(maxVal, this.y));
                this.z = Math.max(minVal, Math.min(maxVal, this.z));
                this.w = Math.max(minVal, Math.min(maxVal, this.w));
                return this;
            }
    
            clampLength(min, max) {
                const length = this.length();
                return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
            }
    
            floor() {
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
                this.z = Math.floor(this.z);
                this.w = Math.floor(this.w);
                return this;
            }
    
            ceil() {
                this.x = Math.ceil(this.x);
                this.y = Math.ceil(this.y);
                this.z = Math.ceil(this.z);
                this.w = Math.ceil(this.w);
                return this;
            }
    
            round() {
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
                this.z = Math.round(this.z);
                this.w = Math.round(this.w);
                return this;
            }
    
            roundToZero() {
                this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
                this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
                this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
                this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w);
                return this;
            }
    
            negate() {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
                this.w = -this.w;
                return this;
            }
    
            dot(v) {
                return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
            }
    
            lengthSq() {
                return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
            }
    
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            }
    
            manhattanLength() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
            }
    
            normalize() {
                return this.divideScalar(this.length() || 1);
            }
    
            setLength(length) {
                return this.normalize().multiplyScalar(length);
            }
    
            lerp(v, alpha) {
                this.x += (v.x - this.x) * alpha;
                this.y += (v.y - this.y) * alpha;
                this.z += (v.z - this.z) * alpha;
                this.w += (v.w - this.w) * alpha;
                return this;
            }
    
            lerpVectors(v1, v2, alpha) {
                this.x = v1.x + (v2.x - v1.x) * alpha;
                this.y = v1.y + (v2.y - v1.y) * alpha;
                this.z = v1.z + (v2.z - v1.z) * alpha;
                this.w = v1.w + (v2.w - v1.w) * alpha;
                return this;
            }
    
            equals(v) {
                return v.x === this.x && v.y === this.y && v.z === this.z && v.w === this.w;
            }
    
            fromArray(array, offset = 0) {
                this.x = array[offset];
                this.y = array[offset + 1];
                this.z = array[offset + 2];
                this.w = array[offset + 3];
                return this;
            }
    
            toArray(array = [], offset = 0) {
                array[offset] = this.x;
                array[offset + 1] = this.y;
                array[offset + 2] = this.z;
                array[offset + 3] = this.w;
                return array;
            }
    
            fromBufferAttribute(attribute, index, offset) {
                if (offset !== undefined) {
                    console.warn('THREE.Vector4: offset has been removed from .fromBufferAttribute().');
                }
    
                this.x = attribute.getX(index);
                this.y = attribute.getY(index);
                this.z = attribute.getZ(index);
                this.w = attribute.getW(index);
                return this;
            }
    
            random() {
                this.x = Math.random();
                this.y = Math.random();
                this.z = Math.random();
                this.w = Math.random();
                return this;
            }
    
            *[Symbol.iterator]() {
                yield this.x;
                yield this.y;
                yield this.z;
                yield this.w;
            }
    
        }
    
        Vector4.prototype.isVector4 = true;
    
        /*
         In options, we can specify:
         * Texture parameters for an auto-generated target texture
         * depthBuffer/stencilBuffer: Booleans to indicate if we should generate these buffers
        */
    
        class WebGLRenderTarget extends EventDispatcher {
            constructor(width, height, options = {}) {
                super();
                this.width = width;
                this.height = height;
                this.depth = 1;
                this.scissor = new Vector4(0, 0, width, height);
                this.scissorTest = false;
                this.viewport = new Vector4(0, 0, width, height);
                this.texture = new Texture(undefined, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
                this.texture.isRenderTargetTexture = true;
                this.texture.image = {
                    width: width,
                    height: height,
                    depth: 1
                };
                this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
                this.texture.internalFormat = options.internalFormat !== undefined ? options.internalFormat : null;
                this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;
                this.depthBuffer = options.depthBuffer !== undefined ? options.depthBuffer : true;
                this.stencilBuffer = options.stencilBuffer !== undefined ? options.stencilBuffer : false;
                this.depthTexture = options.depthTexture !== undefined ? options.depthTexture : null;
            }
    
            setTexture(texture) {
                texture.image = {
                    width: this.width,
                    height: this.height,
                    depth: this.depth
                };
                this.texture = texture;
            }
    
            setSize(width, height, depth = 1) {
                if (this.width !== width || this.height !== height || this.depth !== depth) {
                    this.width = width;
                    this.height = height;
                    this.depth = depth;
                    this.texture.image.width = width;
                    this.texture.image.height = height;
                    this.texture.image.depth = depth;
                    this.dispose();
                }
    
                this.viewport.set(0, 0, width, height);
                this.scissor.set(0, 0, width, height);
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
            copy(source) {
                this.width = source.width;
                this.height = source.height;
                this.depth = source.depth;
                this.viewport.copy(source.viewport);
                this.texture = source.texture.clone(); // ensure image object is not shared, see #20328
    
                this.texture.image = Object.assign({}, source.texture.image);
                this.depthBuffer = source.depthBuffer;
                this.stencilBuffer = source.stencilBuffer;
                this.depthTexture = source.depthTexture;
                return this;
            }
    
            dispose() {
                this.dispatchEvent({
                    type: 'dispose'
                });
            }
    
        }
    
        WebGLRenderTarget.prototype.isWebGLRenderTarget = true;
    
        class WebGLMultipleRenderTargets extends WebGLRenderTarget {
            constructor(width, height, count) {
                super(width, height);
                const texture = this.texture;
                this.texture = [];
    
                for (let i = 0; i < count; i++) {
                    this.texture[i] = texture.clone();
                }
            }
    
            setSize(width, height, depth = 1) {
                if (this.width !== width || this.height !== height || this.depth !== depth) {
                    this.width = width;
                    this.height = height;
                    this.depth = depth;
    
                    for (let i = 0, il = this.texture.length; i < il; i++) {
                        this.texture[i].image.width = width;
                        this.texture[i].image.height = height;
                        this.texture[i].image.depth = depth;
                    }
    
                    this.dispose();
                }
    
                this.viewport.set(0, 0, width, height);
                this.scissor.set(0, 0, width, height);
                return this;
            }
    
            copy(source) {
                this.dispose();
                this.width = source.width;
                this.height = source.height;
                this.depth = source.depth;
                this.viewport.set(0, 0, this.width, this.height);
                this.scissor.set(0, 0, this.width, this.height);
                this.depthBuffer = source.depthBuffer;
                this.stencilBuffer = source.stencilBuffer;
                this.depthTexture = source.depthTexture;
                this.texture.length = 0;
    
                for (let i = 0, il = source.texture.length; i < il; i++) {
                    this.texture[i] = source.texture[i].clone();
                }
    
                return this;
            }
    
        }
    
        WebGLMultipleRenderTargets.prototype.isWebGLMultipleRenderTargets = true;
    
        class WebGLMultisampleRenderTarget extends WebGLRenderTarget {
            constructor(width, height, options = {}) {
                super(width, height, options);
                this.samples = 4;
                this.ignoreDepthForMultisampleCopy = options.ignoreDepth !== undefined ? options.ignoreDepth : true;
                this.useRenderToTexture = options.useRenderToTexture !== undefined ? options.useRenderToTexture : false;
                this.useRenderbuffer = this.useRenderToTexture === false;
            }
    
            copy(source) {
                super.copy.call(this, source);
                this.samples = source.samples;
                this.useRenderToTexture = source.useRenderToTexture;
                this.useRenderbuffer = source.useRenderbuffer;
                return this;
            }
    
        }
    
        WebGLMultisampleRenderTarget.prototype.isWebGLMultisampleRenderTarget = true;
    
        class Quaternion {
            constructor(x = 0, y = 0, z = 0, w = 1) {
                this._x = x;
                this._y = y;
                this._z = z;
                this._w = w;
            }
    
            static slerp(qa, qb, qm, t) {
                console.warn('THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.');
                return qm.slerpQuaternions(qa, qb, t);
            }
    
            static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
                // fuzz-free, array-based Quaternion SLERP operation
                let x0 = src0[srcOffset0 + 0],
                        y0 = src0[srcOffset0 + 1],
                        z0 = src0[srcOffset0 + 2],
                        w0 = src0[srcOffset0 + 3];
                const x1 = src1[srcOffset1 + 0],
                            y1 = src1[srcOffset1 + 1],
                            z1 = src1[srcOffset1 + 2],
                            w1 = src1[srcOffset1 + 3];
    
                if (t === 0) {
                    dst[dstOffset + 0] = x0;
                    dst[dstOffset + 1] = y0;
                    dst[dstOffset + 2] = z0;
                    dst[dstOffset + 3] = w0;
                    return;
                }
    
                if (t === 1) {
                    dst[dstOffset + 0] = x1;
                    dst[dstOffset + 1] = y1;
                    dst[dstOffset + 2] = z1;
                    dst[dstOffset + 3] = w1;
                    return;
                }
    
                if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
                    let s = 1 - t;
                    const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
                                dir = cos >= 0 ? 1 : -1,
                                sqrSin = 1 - cos * cos; // Skip the Slerp for tiny steps to avoid numeric problems:
    
                    if (sqrSin > Number.EPSILON) {
                        const sin = Math.sqrt(sqrSin),
                                    len = Math.atan2(sin, cos * dir);
                        s = Math.sin(s * len) / sin;
                        t = Math.sin(t * len) / sin;
                    }
    
                    const tDir = t * dir;
                    x0 = x0 * s + x1 * tDir;
                    y0 = y0 * s + y1 * tDir;
                    z0 = z0 * s + z1 * tDir;
                    w0 = w0 * s + w1 * tDir; // Normalize in case we just did a lerp:
    
                    if (s === 1 - t) {
                        const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
                        x0 *= f;
                        y0 *= f;
                        z0 *= f;
                        w0 *= f;
                    }
                }
    
                dst[dstOffset] = x0;
                dst[dstOffset + 1] = y0;
                dst[dstOffset + 2] = z0;
                dst[dstOffset + 3] = w0;
            }
    
            static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
                const x0 = src0[srcOffset0];
                const y0 = src0[srcOffset0 + 1];
                const z0 = src0[srcOffset0 + 2];
                const w0 = src0[srcOffset0 + 3];
                const x1 = src1[srcOffset1];
                const y1 = src1[srcOffset1 + 1];
                const z1 = src1[srcOffset1 + 2];
                const w1 = src1[srcOffset1 + 3];
                dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
                dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
                dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
                dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
                return dst;
            }
    
            get x() {
                return this._x;
            }
    
            set x(value) {
                this._x = value;
    
                this._onChangeCallback();
            }
    
            get y() {
                return this._y;
            }
    
            set y(value) {
                this._y = value;
    
                this._onChangeCallback();
            }
    
            get z() {
                return this._z;
            }
    
            set z(value) {
                this._z = value;
    
                this._onChangeCallback();
            }
    
            get w() {
                return this._w;
            }
    
            set w(value) {
                this._w = value;
    
                this._onChangeCallback();
            }
    
            set(x, y, z, w) {
                this._x = x;
                this._y = y;
                this._z = z;
                this._w = w;
    
                this._onChangeCallback();
    
                return this;
            }
    
            clone() {
                return new this.constructor(this._x, this._y, this._z, this._w);
            }
    
            copy(quaternion) {
                this._x = quaternion.x;
                this._y = quaternion.y;
                this._z = quaternion.z;
                this._w = quaternion.w;
    
                this._onChangeCallback();
    
                return this;
            }
    
            setFromEuler(euler, update) {
                if (!(euler && euler.isEuler)) {
                    throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
                }
    
                const x = euler._x,
                            y = euler._y,
                            z = euler._z,
                            order = euler._order; // http://www.mathworks.com/matlabcentral/fileexchange/
                // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
                //	content/SpinCalc.m
    
                const cos = Math.cos;
                const sin = Math.sin;
                const c1 = cos(x / 2);
                const c2 = cos(y / 2);
                const c3 = cos(z / 2);
                const s1 = sin(x / 2);
                const s2 = sin(y / 2);
                const s3 = sin(z / 2);
    
                switch (order) {
                    case 'XYZ':
                        this._x = s1 * c2 * c3 + c1 * s2 * s3;
                        this._y = c1 * s2 * c3 - s1 * c2 * s3;
                        this._z = c1 * c2 * s3 + s1 * s2 * c3;
                        this._w = c1 * c2 * c3 - s1 * s2 * s3;
                        break;
    
                    case 'YXZ':
                        this._x = s1 * c2 * c3 + c1 * s2 * s3;
                        this._y = c1 * s2 * c3 - s1 * c2 * s3;
                        this._z = c1 * c2 * s3 - s1 * s2 * c3;
                        this._w = c1 * c2 * c3 + s1 * s2 * s3;
                        break;
    
                    case 'ZXY':
                        this._x = s1 * c2 * c3 - c1 * s2 * s3;
                        this._y = c1 * s2 * c3 + s1 * c2 * s3;
                        this._z = c1 * c2 * s3 + s1 * s2 * c3;
                        this._w = c1 * c2 * c3 - s1 * s2 * s3;
                        break;
    
                    case 'ZYX':
                        this._x = s1 * c2 * c3 - c1 * s2 * s3;
                        this._y = c1 * s2 * c3 + s1 * c2 * s3;
                        this._z = c1 * c2 * s3 - s1 * s2 * c3;
                        this._w = c1 * c2 * c3 + s1 * s2 * s3;
                        break;
    
                    case 'YZX':
                        this._x = s1 * c2 * c3 + c1 * s2 * s3;
                        this._y = c1 * s2 * c3 + s1 * c2 * s3;
                        this._z = c1 * c2 * s3 - s1 * s2 * c3;
                        this._w = c1 * c2 * c3 - s1 * s2 * s3;
                        break;
    
                    case 'XZY':
                        this._x = s1 * c2 * c3 - c1 * s2 * s3;
                        this._y = c1 * s2 * c3 - s1 * c2 * s3;
                        this._z = c1 * c2 * s3 + s1 * s2 * c3;
                        this._w = c1 * c2 * c3 + s1 * s2 * s3;
                        break;
    
                    default:
                        console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order);
                }
    
                if (update !== false) this._onChangeCallback();
                return this;
            }
    
            setFromAxisAngle(axis, angle) {
                // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
                // assumes axis is normalized
                const halfAngle = angle / 2,
                            s = Math.sin(halfAngle);
                this._x = axis.x * s;
                this._y = axis.y * s;
                this._z = axis.z * s;
                this._w = Math.cos(halfAngle);
    
                this._onChangeCallback();
    
                return this;
            }
    
            setFromRotationMatrix(m) {
                // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
                // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
                const te = m.elements,
                            m11 = te[0],
                            m12 = te[4],
                            m13 = te[8],
                            m21 = te[1],
                            m22 = te[5],
                            m23 = te[9],
                            m31 = te[2],
                            m32 = te[6],
                            m33 = te[10],
                            trace = m11 + m22 + m33;
    
                if (trace > 0) {
                    const s = 0.5 / Math.sqrt(trace + 1.0);
                    this._w = 0.25 / s;
                    this._x = (m32 - m23) * s;
                    this._y = (m13 - m31) * s;
                    this._z = (m21 - m12) * s;
                } else if (m11 > m22 && m11 > m33) {
                    const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
                    this._w = (m32 - m23) / s;
                    this._x = 0.25 * s;
                    this._y = (m12 + m21) / s;
                    this._z = (m13 + m31) / s;
                } else if (m22 > m33) {
                    const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
                    this._w = (m13 - m31) / s;
                    this._x = (m12 + m21) / s;
                    this._y = 0.25 * s;
                    this._z = (m23 + m32) / s;
                } else {
                    const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
                    this._w = (m21 - m12) / s;
                    this._x = (m13 + m31) / s;
                    this._y = (m23 + m32) / s;
                    this._z = 0.25 * s;
                }
    
                this._onChangeCallback();
    
                return this;
            }
    
            setFromUnitVectors(vFrom, vTo) {
                // assumes direction vectors vFrom and vTo are normalized
                let r = vFrom.dot(vTo) + 1;
    
                if (r < Number.EPSILON) {
                    // vFrom and vTo point in opposite directions
                    r = 0;
    
                    if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                        this._x = -vFrom.y;
                        this._y = vFrom.x;
                        this._z = 0;
                        this._w = r;
                    } else {
                        this._x = 0;
                        this._y = -vFrom.z;
                        this._z = vFrom.y;
                        this._w = r;
                    }
                } else {
                    // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
                    this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
                    this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
                    this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
                    this._w = r;
                }
    
                return this.normalize();
            }
    
            angleTo(q) {
                return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));
            }
    
            rotateTowards(q, step) {
                const angle = this.angleTo(q);
                if (angle === 0) return this;
                const t = Math.min(1, step / angle);
                this.slerp(q, t);
                return this;
            }
    
            identity() {
                return this.set(0, 0, 0, 1);
            }
    
            invert() {
                // quaternion is assumed to have unit length
                return this.conjugate();
            }
    
            conjugate() {
                this._x *= -1;
                this._y *= -1;
                this._z *= -1;
    
                this._onChangeCallback();
    
                return this;
            }
    
            dot(v) {
                return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
            }
    
            lengthSq() {
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
            }
    
            length() {
                return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
            }
    
            normalize() {
                let l = this.length();
    
                if (l === 0) {
                    this._x = 0;
                    this._y = 0;
                    this._z = 0;
                    this._w = 1;
                } else {
                    l = 1 / l;
                    this._x = this._x * l;
                    this._y = this._y * l;
                    this._z = this._z * l;
                    this._w = this._w * l;
                }
    
                this._onChangeCallback();
    
                return this;
            }
    
            multiply(q, p) {
                if (p !== undefined) {
                    console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
                    return this.multiplyQuaternions(q, p);
                }
    
                return this.multiplyQuaternions(this, q);
            }
    
            premultiply(q) {
                return this.multiplyQuaternions(q, this);
            }
    
            multiplyQuaternions(a, b) {
                // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
                const qax = a._x,
                            qay = a._y,
                            qaz = a._z,
                            qaw = a._w;
                const qbx = b._x,
                            qby = b._y,
                            qbz = b._z,
                            qbw = b._w;
                this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
                this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
                this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
                this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    
                this._onChangeCallback();
    
                return this;
            }
    
            slerp(qb, t) {
                if (t === 0) return this;
                if (t === 1) return this.copy(qb);
                const x = this._x,
                            y = this._y,
                            z = this._z,
                            w = this._w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
    
                let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
    
                if (cosHalfTheta < 0) {
                    this._w = -qb._w;
                    this._x = -qb._x;
                    this._y = -qb._y;
                    this._z = -qb._z;
                    cosHalfTheta = -cosHalfTheta;
                } else {
                    this.copy(qb);
                }
    
                if (cosHalfTheta >= 1.0) {
                    this._w = w;
                    this._x = x;
                    this._y = y;
                    this._z = z;
                    return this;
                }
    
                const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;
    
                if (sqrSinHalfTheta <= Number.EPSILON) {
                    const s = 1 - t;
                    this._w = s * w + t * this._w;
                    this._x = s * x + t * this._x;
                    this._y = s * y + t * this._y;
                    this._z = s * z + t * this._z;
                    this.normalize();
    
                    this._onChangeCallback();
    
                    return this;
                }
    
                const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
                const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
                const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
                            ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
                this._w = w * ratioA + this._w * ratioB;
                this._x = x * ratioA + this._x * ratioB;
                this._y = y * ratioA + this._y * ratioB;
                this._z = z * ratioA + this._z * ratioB;
    
                this._onChangeCallback();
    
                return this;
            }
    
            slerpQuaternions(qa, qb, t) {
                return this.copy(qa).slerp(qb, t);
            }
    
            random() {
                // Derived from http://planning.cs.uiuc.edu/node198.html
                // Note, this source uses w, x, y, z ordering,
                // so we swap the order below.
                const u1 = Math.random();
                const sqrt1u1 = Math.sqrt(1 - u1);
                const sqrtu1 = Math.sqrt(u1);
                const u2 = 2 * Math.PI * Math.random();
                const u3 = 2 * Math.PI * Math.random();
                return this.set(sqrt1u1 * Math.cos(u2), sqrtu1 * Math.sin(u3), sqrtu1 * Math.cos(u3), sqrt1u1 * Math.sin(u2));
            }
    
            equals(quaternion) {
                return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
            }
    
            fromArray(array, offset = 0) {
                this._x = array[offset];
                this._y = array[offset + 1];
                this._z = array[offset + 2];
                this._w = array[offset + 3];
    
                this._onChangeCallback();
    
                return this;
            }
    
            toArray(array = [], offset = 0) {
                array[offset] = this._x;
                array[offset + 1] = this._y;
                array[offset + 2] = this._z;
                array[offset + 3] = this._w;
                return array;
            }
    
            fromBufferAttribute(attribute, index) {
                this._x = attribute.getX(index);
                this._y = attribute.getY(index);
                this._z = attribute.getZ(index);
                this._w = attribute.getW(index);
                return this;
            }
    
            _onChange(callback) {
                this._onChangeCallback = callback;
                return this;
            }
    
            _onChangeCallback() {}
    
        }
    
        Quaternion.prototype.isQuaternion = true;
    
        class Vector3 {
            constructor(x = 0, y = 0, z = 0) {
                this.x = x;
                this.y = y;
                this.z = z;
            }
    
            set(x, y, z) {
                if (z === undefined) z = this.z; // sprite.scale.set(x,y)
    
                this.x = x;
                this.y = y;
                this.z = z;
                return this;
            }
    
            setScalar(scalar) {
                this.x = scalar;
                this.y = scalar;
                this.z = scalar;
                return this;
            }
    
            setX(x) {
                this.x = x;
                return this;
            }
    
            setY(y) {
                this.y = y;
                return this;
            }
    
            setZ(z) {
                this.z = z;
                return this;
            }
    
            setComponent(index, value) {
                switch (index) {
                    case 0:
                        this.x = value;
                        break;
    
                    case 1:
                        this.y = value;
                        break;
    
                    case 2:
                        this.z = value;
                        break;
    
                    default:
                        throw new Error('index is out of range: ' + index);
                }
    
                return this;
            }
    
            getComponent(index) {
                switch (index) {
                    case 0:
                        return this.x;
    
                    case 1:
                        return this.y;
    
                    case 2:
                        return this.z;
    
                    default:
                        throw new Error('index is out of range: ' + index);
                }
            }
    
            clone() {
                return new this.constructor(this.x, this.y, this.z);
            }
    
            copy(v) {
                this.x = v.x;
                this.y = v.y;
                this.z = v.z;
                return this;
            }
    
            add(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
                    return this.addVectors(v, w);
                }
    
                this.x += v.x;
                this.y += v.y;
                this.z += v.z;
                return this;
            }
    
            addScalar(s) {
                this.x += s;
                this.y += s;
                this.z += s;
                return this;
            }
    
            addVectors(a, b) {
                this.x = a.x + b.x;
                this.y = a.y + b.y;
                this.z = a.z + b.z;
                return this;
            }
    
            addScaledVector(v, s) {
                this.x += v.x * s;
                this.y += v.y * s;
                this.z += v.z * s;
                return this;
            }
    
            sub(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
                    return this.subVectors(v, w);
                }
    
                this.x -= v.x;
                this.y -= v.y;
                this.z -= v.z;
                return this;
            }
    
            subScalar(s) {
                this.x -= s;
                this.y -= s;
                this.z -= s;
                return this;
            }
    
            subVectors(a, b) {
                this.x = a.x - b.x;
                this.y = a.y - b.y;
                this.z = a.z - b.z;
                return this;
            }
    
            multiply(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
                    return this.multiplyVectors(v, w);
                }
    
                this.x *= v.x;
                this.y *= v.y;
                this.z *= v.z;
                return this;
            }
    
            multiplyScalar(scalar) {
                this.x *= scalar;
                this.y *= scalar;
                this.z *= scalar;
                return this;
            }
    
            multiplyVectors(a, b) {
                this.x = a.x * b.x;
                this.y = a.y * b.y;
                this.z = a.z * b.z;
                return this;
            }
    
            applyEuler(euler) {
                if (!(euler && euler.isEuler)) {
                    console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
                }
    
                return this.applyQuaternion(_quaternion$4.setFromEuler(euler));
            }
    
            applyAxisAngle(axis, angle) {
                return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));
            }
    
            applyMatrix3(m) {
                const x = this.x,
                            y = this.y,
                            z = this.z;
                const e = m.elements;
                this.x = e[0] * x + e[3] * y + e[6] * z;
                this.y = e[1] * x + e[4] * y + e[7] * z;
                this.z = e[2] * x + e[5] * y + e[8] * z;
                return this;
            }
    
            applyNormalMatrix(m) {
                return this.applyMatrix3(m).normalize();
            }
    
            applyMatrix4(m) {
                const x = this.x,
                            y = this.y,
                            z = this.z;
                const e = m.elements;
                const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
                this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
                this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
                this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
                return this;
            }
    
            applyQuaternion(q) {
                const x = this.x,
                            y = this.y,
                            z = this.z;
                const qx = q.x,
                            qy = q.y,
                            qz = q.z,
                            qw = q.w; // calculate quat * vector
    
                const ix = qw * x + qy * z - qz * y;
                const iy = qw * y + qz * x - qx * z;
                const iz = qw * z + qx * y - qy * x;
                const iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat
    
                this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
                this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
                this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
                return this;
            }
    
            project(camera) {
                return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
            }
    
            unproject(camera) {
                return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
            }
    
            transformDirection(m) {
                // input: THREE.Matrix4 affine matrix
                // vector interpreted as a direction
                const x = this.x,
                            y = this.y,
                            z = this.z;
                const e = m.elements;
                this.x = e[0] * x + e[4] * y + e[8] * z;
                this.y = e[1] * x + e[5] * y + e[9] * z;
                this.z = e[2] * x + e[6] * y + e[10] * z;
                return this.normalize();
            }
    
            divide(v) {
                this.x /= v.x;
                this.y /= v.y;
                this.z /= v.z;
                return this;
            }
    
            divideScalar(scalar) {
                return this.multiplyScalar(1 / scalar);
            }
    
            min(v) {
                this.x = Math.min(this.x, v.x);
                this.y = Math.min(this.y, v.y);
                this.z = Math.min(this.z, v.z);
                return this;
            }
    
            max(v) {
                this.x = Math.max(this.x, v.x);
                this.y = Math.max(this.y, v.y);
                this.z = Math.max(this.z, v.z);
                return this;
            }
    
            clamp(min, max) {
                // assumes min < max, componentwise
                this.x = Math.max(min.x, Math.min(max.x, this.x));
                this.y = Math.max(min.y, Math.min(max.y, this.y));
                this.z = Math.max(min.z, Math.min(max.z, this.z));
                return this;
            }
    
            clampScalar(minVal, maxVal) {
                this.x = Math.max(minVal, Math.min(maxVal, this.x));
                this.y = Math.max(minVal, Math.min(maxVal, this.y));
                this.z = Math.max(minVal, Math.min(maxVal, this.z));
                return this;
            }
    
            clampLength(min, max) {
                const length = this.length();
                return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
            }
    
            floor() {
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
                this.z = Math.floor(this.z);
                return this;
            }
    
            ceil() {
                this.x = Math.ceil(this.x);
                this.y = Math.ceil(this.y);
                this.z = Math.ceil(this.z);
                return this;
            }
    
            round() {
                this.x = Math.round(this.x);
                this.y = Math.round(this.y);
                this.z = Math.round(this.z);
                return this;
            }
    
            roundToZero() {
                this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
                this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
                this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
                return this;
            }
    
            negate() {
                this.x = -this.x;
                this.y = -this.y;
                this.z = -this.z;
                return this;
            }
    
            dot(v) {
                return this.x * v.x + this.y * v.y + this.z * v.z;
            } // TODO lengthSquared?
    
    
            lengthSq() {
                return this.x * this.x + this.y * this.y + this.z * this.z;
            }
    
            length() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            }
    
            manhattanLength() {
                return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
            }
    
            normalize() {
                return this.divideScalar(this.length() || 1);
            }
    
            setLength(length) {
                return this.normalize().multiplyScalar(length);
            }
    
            lerp(v, alpha) {
                this.x += (v.x - this.x) * alpha;
                this.y += (v.y - this.y) * alpha;
                this.z += (v.z - this.z) * alpha;
                return this;
            }
    
            lerpVectors(v1, v2, alpha) {
                this.x = v1.x + (v2.x - v1.x) * alpha;
                this.y = v1.y + (v2.y - v1.y) * alpha;
                this.z = v1.z + (v2.z - v1.z) * alpha;
                return this;
            }
    
            cross(v, w) {
                if (w !== undefined) {
                    console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
                    return this.crossVectors(v, w);
                }
    
                return this.crossVectors(this, v);
            }
    
            crossVectors(a, b) {
                const ax = a.x,
                            ay = a.y,
                            az = a.z;
                const bx = b.x,
                            by = b.y,
                            bz = b.z;
                this.x = ay * bz - az * by;
                this.y = az * bx - ax * bz;
                this.z = ax * by - ay * bx;
                return this;
            }
    
            projectOnVector(v) {
                const denominator = v.lengthSq();
                if (denominator === 0) return this.set(0, 0, 0);
                const scalar = v.dot(this) / denominator;
                return this.copy(v).multiplyScalar(scalar);
            }
    
            projectOnPlane(planeNormal) {
                _vector$c.copy(this).projectOnVector(planeNormal);
    
                return this.sub(_vector$c);
            }
    
            reflect(normal) {
                // reflect incident vector off plane orthogonal to normal
                // normal is assumed to have unit length
                return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));
            }
    
            angleTo(v) {
                const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
                if (denominator === 0) return Math.PI / 2;
                const theta = this.dot(v) / denominator; // clamp, to handle numerical problems
    
                return Math.acos(clamp(theta, -1, 1));
            }
    
            distanceTo(v) {
                return Math.sqrt(this.distanceToSquared(v));
            }
    
            distanceToSquared(v) {
                const dx = this.x - v.x,
                            dy = this.y - v.y,
                            dz = this.z - v.z;
                return dx * dx + dy * dy + dz * dz;
            }
    
            manhattanDistanceTo(v) {
                return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
            }
    
            setFromSpherical(s) {
                return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
            }
    
            setFromSphericalCoords(radius, phi, theta) {
                const sinPhiRadius = Math.sin(phi) * radius;
                this.x = sinPhiRadius * Math.sin(theta);
                this.y = Math.cos(phi) * radius;
                this.z = sinPhiRadius * Math.cos(theta);
                return this;
            }
    
            setFromCylindrical(c) {
                return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
            }
    
            setFromCylindricalCoords(radius, theta, y) {
                this.x = radius * Math.sin(theta);
                this.y = y;
                this.z = radius * Math.cos(theta);
                return this;
            }
    
            setFromMatrixPosition(m) {
                const e = m.elements;
                this.x = e[12];
                this.y = e[13];
                this.z = e[14];
                return this;
            }
    
            setFromMatrixScale(m) {
                const sx = this.setFromMatrixColumn(m, 0).length();
                const sy = this.setFromMatrixColumn(m, 1).length();
                const sz = this.setFromMatrixColumn(m, 2).length();
                this.x = sx;
                this.y = sy;
                this.z = sz;
                return this;
            }
    
            setFromMatrixColumn(m, index) {
                return this.fromArray(m.elements, index * 4);
            }
    
            setFromMatrix3Column(m, index) {
                return this.fromArray(m.elements, index * 3);
            }
    
            equals(v) {
                return v.x === this.x && v.y === this.y && v.z === this.z;
            }
    
            fromArray(array, offset = 0) {
                this.x = array[offset];
                this.y = array[offset + 1];
                this.z = array[offset + 2];
                return this;
            }
    
            toArray(array = [], offset = 0) {
                array[offset] = this.x;
                array[offset + 1] = this.y;
                array[offset + 2] = this.z;
                return array;
            }
    
            fromBufferAttribute(attribute, index, offset) {
                if (offset !== undefined) {
                    console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
                }
    
                this.x = attribute.getX(index);
                this.y = attribute.getY(index);
                this.z = attribute.getZ(index);
                return this;
            }
    
            random() {
                this.x = Math.random();
                this.y = Math.random();
                this.z = Math.random();
                return this;
            }
    
            randomDirection() {
                // Derived from https://mathworld.wolfram.com/SpherePointPicking.html
                const u = (Math.random() - 0.5) * 2;
                const t = Math.random() * Math.PI * 2;
                const f = Math.sqrt(1 - u ** 2);
                this.x = f * Math.cos(t);
                this.y = f * Math.sin(t);
                this.z = u;
                return this;
            }
    
            *[Symbol.iterator]() {
                yield this.x;
                yield this.y;
                yield this.z;
            }
    
        }
    
        Vector3.prototype.isVector3 = true;
    
        const _vector$c = /*@__PURE__*/new Vector3();
    
        const _quaternion$4 = /*@__PURE__*/new Quaternion();
    
        class Box3 {
            constructor(min = new Vector3(+Infinity, +Infinity, +Infinity), max = new Vector3(-Infinity, -Infinity, -Infinity)) {
                this.min = min;
                this.max = max;
            }
    
            set(min, max) {
                this.min.copy(min);
                this.max.copy(max);
                return this;
            }
    
            setFromArray(array) {
                let minX = +Infinity;
                let minY = +Infinity;
                let minZ = +Infinity;
                let maxX = -Infinity;
                let maxY = -Infinity;
                let maxZ = -Infinity;
    
                for (let i = 0, l = array.length; i < l; i += 3) {
                    const x = array[i];
                    const y = array[i + 1];
                    const z = array[i + 2];
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (z < minZ) minZ = z;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                    if (z > maxZ) maxZ = z;
                }
    
                this.min.set(minX, minY, minZ);
                this.max.set(maxX, maxY, maxZ);
                return this;
            }
    
            setFromBufferAttribute(attribute) {
                let minX = +Infinity;
                let minY = +Infinity;
                let minZ = +Infinity;
                let maxX = -Infinity;
                let maxY = -Infinity;
                let maxZ = -Infinity;
    
                for (let i = 0, l = attribute.count; i < l; i++) {
                    const x = attribute.getX(i);
                    const y = attribute.getY(i);
                    const z = attribute.getZ(i);
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (z < minZ) minZ = z;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                    if (z > maxZ) maxZ = z;
                }
    
                this.min.set(minX, minY, minZ);
                this.max.set(maxX, maxY, maxZ);
                return this;
            }
    
            setFromPoints(points) {
                this.makeEmpty();
    
                for (let i = 0, il = points.length; i < il; i++) {
                    this.expandByPoint(points[i]);
                }
    
                return this;
            }
    
            setFromCenterAndSize(center, size) {
                const halfSize = _vector$b.copy(size).multiplyScalar(0.5);
    
                this.min.copy(center).sub(halfSize);
                this.max.copy(center).add(halfSize);
                return this;
            }
    
            setFromObject(object, precise = false) {
                this.makeEmpty();
                return this.expandByObject(object, precise);
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
            copy(box) {
                this.min.copy(box.min);
                this.max.copy(box.max);
                return this;
            }
    
            makeEmpty() {
                this.min.x = this.min.y = this.min.z = +Infinity;
                this.max.x = this.max.y = this.max.z = -Infinity;
                return this;
            }
    
            isEmpty() {
                // this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
                return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
            }
    
            getCenter(target) {
                return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
            }
    
            getSize(target) {
                return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);
            }
    
            expandByPoint(point) {
                this.min.min(point);
                this.max.max(point);
                return this;
            }
    
            expandByVector(vector) {
                this.min.sub(vector);
                this.max.add(vector);
                return this;
            }
    
            expandByScalar(scalar) {
                this.min.addScalar(-scalar);
                this.max.addScalar(scalar);
                return this;
            }
    
            expandByObject(object, precise = false) {
                // Computes the world-axis-aligned bounding box of an object (including its children),
                // accounting for both the object's, and children's, world transforms
                object.updateWorldMatrix(false, false);
                const geometry = object.geometry;
    
                if (geometry !== undefined) {
                    if (precise && geometry.attributes != undefined && geometry.attributes.position !== undefined) {
                        const position = geometry.attributes.position;
    
                        for (let i = 0, l = position.count; i < l; i++) {
                            _vector$b.fromBufferAttribute(position, i).applyMatrix4(object.matrixWorld);
    
                            this.expandByPoint(_vector$b);
                        }
                    } else {
                        if (geometry.boundingBox === null) {
                            geometry.computeBoundingBox();
                        }
    
                        _box$3.copy(geometry.boundingBox);
    
                        _box$3.applyMatrix4(object.matrixWorld);
    
                        this.union(_box$3);
                    }
                }
    
                const children = object.children;
    
                for (let i = 0, l = children.length; i < l; i++) {
                    this.expandByObject(children[i], precise);
                }
    
                return this;
            }
    
            containsPoint(point) {
                return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y || point.z < this.min.z || point.z > this.max.z ? false : true;
            }
    
            containsBox(box) {
                return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;
            }
    
            getParameter(point, target) {
                // This can potentially have a divide by zero if the box
                // has a size dimension of 0.
                return target.set((point.x - this.min.x) / (this.max.x - this.min.x), (point.y - this.min.y) / (this.max.y - this.min.y), (point.z - this.min.z) / (this.max.z - this.min.z));
            }
    
            intersectsBox(box) {
                // using 6 splitting planes to rule out intersections.
                return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y || box.max.z < this.min.z || box.min.z > this.max.z ? false : true;
            }
    
            intersectsSphere(sphere) {
                // Find the point on the AABB closest to the sphere center.
                this.clampPoint(sphere.center, _vector$b); // If that point is inside the sphere, the AABB and sphere intersect.
    
                return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;
            }
    
            intersectsPlane(plane) {
                // We compute the minimum and maximum dot product values. If those values
                // are on the same side (back or front) of the plane, then there is no intersection.
                let min, max;
    
                if (plane.normal.x > 0) {
                    min = plane.normal.x * this.min.x;
                    max = plane.normal.x * this.max.x;
                } else {
                    min = plane.normal.x * this.max.x;
                    max = plane.normal.x * this.min.x;
                }
    
                if (plane.normal.y > 0) {
                    min += plane.normal.y * this.min.y;
                    max += plane.normal.y * this.max.y;
                } else {
                    min += plane.normal.y * this.max.y;
                    max += plane.normal.y * this.min.y;
                }
    
                if (plane.normal.z > 0) {
                    min += plane.normal.z * this.min.z;
                    max += plane.normal.z * this.max.z;
                } else {
                    min += plane.normal.z * this.max.z;
                    max += plane.normal.z * this.min.z;
                }
    
                return min <= -plane.constant && max >= -plane.constant;
            }
    
            intersectsTriangle(triangle) {
                if (this.isEmpty()) {
                    return false;
                } // compute box center and extents
    
    
                this.getCenter(_center);
    
                _extents.subVectors(this.max, _center); // translate triangle to aabb origin
    
    
                _v0$2.subVectors(triangle.a, _center);
    
                _v1$7.subVectors(triangle.b, _center);
    
                _v2$3.subVectors(triangle.c, _center); // compute edge vectors for triangle
    
    
                _f0.subVectors(_v1$7, _v0$2);
    
                _f1.subVectors(_v2$3, _v1$7);
    
                _f2.subVectors(_v0$2, _v2$3); // test against axes that are given by cross product combinations of the edges of the triangle and the edges of the aabb
                // make an axis testing of each of the 3 sides of the aabb against each of the 3 sides of the triangle = 9 axis of separation
                // axis_ij = u_i x f_j (u0, u1, u2 = face normals of aabb = x,y,z axes vectors since aabb is axis aligned)
    
    
                let axes = [0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y, _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x, -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0];
    
                if (!satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents)) {
                    return false;
                } // test 3 face normals from the aabb
    
    
                axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    
                if (!satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents)) {
                    return false;
                } // finally testing the face normal of the triangle
                // use already existing triangle edge vectors here
    
    
                _triangleNormal.crossVectors(_f0, _f1);
    
                axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
                return satForAxes(axes, _v0$2, _v1$7, _v2$3, _extents);
            }
    
            clampPoint(point, target) {
                return target.copy(point).clamp(this.min, this.max);
            }
    
            distanceToPoint(point) {
                const clampedPoint = _vector$b.copy(point).clamp(this.min, this.max);
    
                return clampedPoint.sub(point).length();
            }
    
            getBoundingSphere(target) {
                this.getCenter(target.center);
                target.radius = this.getSize(_vector$b).length() * 0.5;
                return target;
            }
    
            intersect(box) {
                this.min.max(box.min);
                this.max.min(box.max); // ensure that if there is no overlap, the result is fully empty, not slightly empty with non-inf/+inf values that will cause subsequence intersects to erroneously return valid values.
    
                if (this.isEmpty()) this.makeEmpty();
                return this;
            }
    
            union(box) {
                this.min.min(box.min);
                this.max.max(box.max);
                return this;
            }
    
            applyMatrix4(matrix) {
                // transform of empty box is an empty box.
                if (this.isEmpty()) return this; // NOTE: I am using a binary pattern to specify all 2^3 combinations below
    
                _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix); // 000
    
    
                _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix); // 001
    
    
                _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix); // 010
    
    
                _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix); // 011
    
    
                _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix); // 100
    
    
                _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix); // 101
    
    
                _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix); // 110
    
    
                _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix); // 111
    
    
                this.setFromPoints(_points);
                return this;
            }
    
            translate(offset) {
                this.min.add(offset);
                this.max.add(offset);
                return this;
            }
    
            equals(box) {
                return box.min.equals(this.min) && box.max.equals(this.max);
            }
    
        }
    
        Box3.prototype.isBox3 = true;
        const _points = [/*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3(), /*@__PURE__*/new Vector3()];
    
        const _vector$b = /*@__PURE__*/new Vector3();
    
        const _box$3 = /*@__PURE__*/new Box3(); // triangle centered vertices
    
    
        const _v0$2 = /*@__PURE__*/new Vector3();
    
        const _v1$7 = /*@__PURE__*/new Vector3();
    
        const _v2$3 = /*@__PURE__*/new Vector3(); // triangle edge vectors
    
    
        const _f0 = /*@__PURE__*/new Vector3();
    
        const _f1 = /*@__PURE__*/new Vector3();
    
        const _f2 = /*@__PURE__*/new Vector3();
    
        const _center = /*@__PURE__*/new Vector3();
    
        const _extents = /*@__PURE__*/new Vector3();
    
        const _triangleNormal = /*@__PURE__*/new Vector3();
    
        const _testAxis = /*@__PURE__*/new Vector3();
    
        function satForAxes(axes, v0, v1, v2, extents) {
            for (let i = 0, j = axes.length - 3; i <= j; i += 3) {
                _testAxis.fromArray(axes, i); // project the aabb onto the seperating axis
    
    
                const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z); // project all 3 vertices of the triangle onto the seperating axis
    
                const p0 = v0.dot(_testAxis);
                const p1 = v1.dot(_testAxis);
                const p2 = v2.dot(_testAxis); // actual test, basically see if either of the most extreme of the triangle points intersects r
    
                if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {
                    // points of the projected triangle are outside the projected half-length of the aabb
                    // the axis is seperating and we can exit
                    return false;
                }
            }
    
            return true;
        }
    
        const _box$2 = /*@__PURE__*/new Box3();
    
        const _v1$6 = /*@__PURE__*/new Vector3();
    
        const _toFarthestPoint = /*@__PURE__*/new Vector3();
    
        const _toPoint = /*@__PURE__*/new Vector3();
    
        class Sphere {
            constructor(center = new Vector3(), radius = -1) {
                this.center = center;
                this.radius = radius;
            }
    
            set(center, radius) {
                this.center.copy(center);
                this.radius = radius;
                return this;
            }
    
            setFromPoints(points, optionalCenter) {
                const center = this.center;
    
                if (optionalCenter !== undefined) {
                    center.copy(optionalCenter);
                } else {
                    _box$2.setFromPoints(points).getCenter(center);
                }
    
                let maxRadiusSq = 0;
    
                for (let i = 0, il = points.length; i < il; i++) {
                    maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(points[i]));
                }
    
                this.radius = Math.sqrt(maxRadiusSq);
                return this;
            }
    
            copy(sphere) {
                this.center.copy(sphere.center);
                this.radius = sphere.radius;
                return this;
            }
    
            isEmpty() {
                return this.radius < 0;
            }
    
            makeEmpty() {
                this.center.set(0, 0, 0);
                this.radius = -1;
                return this;
            }
    
            containsPoint(point) {
                return point.distanceToSquared(this.center) <= this.radius * this.radius;
            }
    
            distanceToPoint(point) {
                return point.distanceTo(this.center) - this.radius;
            }
    
            intersectsSphere(sphere) {
                const radiusSum = this.radius + sphere.radius;
                return sphere.center.distanceToSquared(this.center) <= radiusSum * radiusSum;
            }
    
            intersectsBox(box) {
                return box.intersectsSphere(this);
            }
    
            intersectsPlane(plane) {
                return Math.abs(plane.distanceToPoint(this.center)) <= this.radius;
            }
    
            clampPoint(point, target) {
                const deltaLengthSq = this.center.distanceToSquared(point);
                target.copy(point);
    
                if (deltaLengthSq > this.radius * this.radius) {
                    target.sub(this.center).normalize();
                    target.multiplyScalar(this.radius).add(this.center);
                }
    
                return target;
            }
    
            getBoundingBox(target) {
                if (this.isEmpty()) {
                    // Empty sphere produces empty bounding box
                    target.makeEmpty();
                    return target;
                }
    
                target.set(this.center, this.center);
                target.expandByScalar(this.radius);
                return target;
            }
    
            applyMatrix4(matrix) {
                this.center.applyMatrix4(matrix);
                this.radius = this.radius * matrix.getMaxScaleOnAxis();
                return this;
            }
    
            translate(offset) {
                this.center.add(offset);
                return this;
            }
    
            expandByPoint(point) {
                // from https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L649-L671
                _toPoint.subVectors(point, this.center);
    
                const lengthSq = _toPoint.lengthSq();
    
                if (lengthSq > this.radius * this.radius) {
                    const length = Math.sqrt(lengthSq);
                    const missingRadiusHalf = (length - this.radius) * 0.5; // Nudge this sphere towards the target point. Add half the missing distance to radius,
                    // and the other half to position. This gives a tighter enclosure, instead of if
                    // the whole missing distance were just added to radius.
    
                    this.center.add(_toPoint.multiplyScalar(missingRadiusHalf / length));
                    this.radius += missingRadiusHalf;
                }
    
                return this;
            }
    
            union(sphere) {
                // from https://github.com/juj/MathGeoLib/blob/2940b99b99cfe575dd45103ef20f4019dee15b54/src/Geometry/Sphere.cpp#L759-L769
                // To enclose another sphere into this sphere, we only need to enclose two points:
                // 1) Enclose the farthest point on the other sphere into this sphere.
                // 2) Enclose the opposite point of the farthest point into this sphere.
                if (this.center.equals(sphere.center) === true) {
                    _toFarthestPoint.set(0, 0, 1).multiplyScalar(sphere.radius);
                } else {
                    _toFarthestPoint.subVectors(sphere.center, this.center).normalize().multiplyScalar(sphere.radius);
                }
    
                this.expandByPoint(_v1$6.copy(sphere.center).add(_toFarthestPoint));
                this.expandByPoint(_v1$6.copy(sphere.center).sub(_toFarthestPoint));
                return this;
            }
    
            equals(sphere) {
                return sphere.center.equals(this.center) && sphere.radius === this.radius;
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
        }
    
        const _vector$a = /*@__PURE__*/new Vector3();
    
        const _segCenter = /*@__PURE__*/new Vector3();
    
        const _segDir = /*@__PURE__*/new Vector3();
    
        const _diff = /*@__PURE__*/new Vector3();
    
        const _edge1 = /*@__PURE__*/new Vector3();
    
        const _edge2 = /*@__PURE__*/new Vector3();
    
        const _normal$1 = /*@__PURE__*/new Vector3();
    
        class Ray {
            constructor(origin = new Vector3(), direction = new Vector3(0, 0, -1)) {
                this.origin = origin;
                this.direction = direction;
            }
    
            set(origin, direction) {
                this.origin.copy(origin);
                this.direction.copy(direction);
                return this;
            }
    
            copy(ray) {
                this.origin.copy(ray.origin);
                this.direction.copy(ray.direction);
                return this;
            }
    
            at(t, target) {
                return target.copy(this.direction).multiplyScalar(t).add(this.origin);
            }
    
            lookAt(v) {
                this.direction.copy(v).sub(this.origin).normalize();
                return this;
            }
    
            recast(t) {
                this.origin.copy(this.at(t, _vector$a));
                return this;
            }
    
            closestPointToPoint(point, target) {
                target.subVectors(point, this.origin);
                const directionDistance = target.dot(this.direction);
    
                if (directionDistance < 0) {
                    return target.copy(this.origin);
                }
    
                return target.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
            }
    
            distanceToPoint(point) {
                return Math.sqrt(this.distanceSqToPoint(point));
            }
    
            distanceSqToPoint(point) {
                const directionDistance = _vector$a.subVectors(point, this.origin).dot(this.direction); // point behind the ray
    
    
                if (directionDistance < 0) {
                    return this.origin.distanceToSquared(point);
                }
    
                _vector$a.copy(this.direction).multiplyScalar(directionDistance).add(this.origin);
    
                return _vector$a.distanceToSquared(point);
            }
    
            distanceSqToSegment(v0, v1, optionalPointOnRay, optionalPointOnSegment) {
                // from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteDistRaySegment.h
                // It returns the min distance between the ray and the segment
                // defined by v0 and v1
                // It can also set two optional targets :
                // - The closest point on the ray
                // - The closest point on the segment
                _segCenter.copy(v0).add(v1).multiplyScalar(0.5);
    
                _segDir.copy(v1).sub(v0).normalize();
    
                _diff.copy(this.origin).sub(_segCenter);
    
                const segExtent = v0.distanceTo(v1) * 0.5;
                const a01 = -this.direction.dot(_segDir);
    
                const b0 = _diff.dot(this.direction);
    
                const b1 = -_diff.dot(_segDir);
    
                const c = _diff.lengthSq();
    
                const det = Math.abs(1 - a01 * a01);
                let s0, s1, sqrDist, extDet;
    
                if (det > 0) {
                    // The ray and segment are not parallel.
                    s0 = a01 * b1 - b0;
                    s1 = a01 * b0 - b1;
                    extDet = segExtent * det;
    
                    if (s0 >= 0) {
                        if (s1 >= -extDet) {
                            if (s1 <= extDet) {
                                // region 0
                                // Minimum at interior points of ray and segment.
                                const invDet = 1 / det;
                                s0 *= invDet;
                                s1 *= invDet;
                                sqrDist = s0 * (s0 + a01 * s1 + 2 * b0) + s1 * (a01 * s0 + s1 + 2 * b1) + c;
                            } else {
                                // region 1
                                s1 = segExtent;
                                s0 = Math.max(0, -(a01 * s1 + b0));
                                sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                            }
                        } else {
                            // region 5
                            s1 = -segExtent;
                            s0 = Math.max(0, -(a01 * s1 + b0));
                            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                        }
                    } else {
                        if (s1 <= -extDet) {
                            // region 4
                            s0 = Math.max(0, -(-a01 * segExtent + b0));
                            s1 = s0 > 0 ? -segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                        } else if (s1 <= extDet) {
                            // region 3
                            s0 = 0;
                            s1 = Math.min(Math.max(-segExtent, -b1), segExtent);
                            sqrDist = s1 * (s1 + 2 * b1) + c;
                        } else {
                            // region 2
                            s0 = Math.max(0, -(a01 * segExtent + b0));
                            s1 = s0 > 0 ? segExtent : Math.min(Math.max(-segExtent, -b1), segExtent);
                            sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                        }
                    }
                } else {
                    // Ray and segment are parallel.
                    s1 = a01 > 0 ? -segExtent : segExtent;
                    s0 = Math.max(0, -(a01 * s1 + b0));
                    sqrDist = -s0 * s0 + s1 * (s1 + 2 * b1) + c;
                }
    
                if (optionalPointOnRay) {
                    optionalPointOnRay.copy(this.direction).multiplyScalar(s0).add(this.origin);
                }
    
                if (optionalPointOnSegment) {
                    optionalPointOnSegment.copy(_segDir).multiplyScalar(s1).add(_segCenter);
                }
    
                return sqrDist;
            }
    
            intersectSphere(sphere, target) {
                _vector$a.subVectors(sphere.center, this.origin);
    
                const tca = _vector$a.dot(this.direction);
    
                const d2 = _vector$a.dot(_vector$a) - tca * tca;
                const radius2 = sphere.radius * sphere.radius;
                if (d2 > radius2) return null;
                const thc = Math.sqrt(radius2 - d2); // t0 = first intersect point - entrance on front of sphere
    
                const t0 = tca - thc; // t1 = second intersect point - exit point on back of sphere
    
                const t1 = tca + thc; // test to see if both t0 and t1 are behind the ray - if so, return null
    
                if (t0 < 0 && t1 < 0) return null; // test to see if t0 is behind the ray:
                // if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
                // in order to always return an intersect point that is in front of the ray.
    
                if (t0 < 0) return this.at(t1, target); // else t0 is in front of the ray, so return the first collision point scaled by t0
    
                return this.at(t0, target);
            }
    
            intersectsSphere(sphere) {
                return this.distanceSqToPoint(sphere.center) <= sphere.radius * sphere.radius;
            }
    
            distanceToPlane(plane) {
                const denominator = plane.normal.dot(this.direction);
    
                if (denominator === 0) {
                    // line is coplanar, return origin
                    if (plane.distanceToPoint(this.origin) === 0) {
                        return 0;
                    } // Null is preferable to undefined since undefined means.... it is undefined
    
    
                    return null;
                }
    
                const t = -(this.origin.dot(plane.normal) + plane.constant) / denominator; // Return if the ray never intersects the plane
    
                return t >= 0 ? t : null;
            }
    
            intersectPlane(plane, target) {
                const t = this.distanceToPlane(plane);
    
                if (t === null) {
                    return null;
                }
    
                return this.at(t, target);
            }
    
            intersectsPlane(plane) {
                // check if the ray lies on the plane first
                const distToPoint = plane.distanceToPoint(this.origin);
    
                if (distToPoint === 0) {
                    return true;
                }
    
                const denominator = plane.normal.dot(this.direction);
    
                if (denominator * distToPoint < 0) {
                    return true;
                } // ray origin is behind the plane (and is pointing behind it)
    
    
                return false;
            }
    
            intersectBox(box, target) {
                let tmin, tmax, tymin, tymax, tzmin, tzmax;
                const invdirx = 1 / this.direction.x,
                            invdiry = 1 / this.direction.y,
                            invdirz = 1 / this.direction.z;
                const origin = this.origin;
    
                if (invdirx >= 0) {
                    tmin = (box.min.x - origin.x) * invdirx;
                    tmax = (box.max.x - origin.x) * invdirx;
                } else {
                    tmin = (box.max.x - origin.x) * invdirx;
                    tmax = (box.min.x - origin.x) * invdirx;
                }
    
                if (invdiry >= 0) {
                    tymin = (box.min.y - origin.y) * invdiry;
                    tymax = (box.max.y - origin.y) * invdiry;
                } else {
                    tymin = (box.max.y - origin.y) * invdiry;
                    tymax = (box.min.y - origin.y) * invdiry;
                }
    
                if (tmin > tymax || tymin > tmax) return null; // These lines also handle the case where tmin or tmax is NaN
                // (result of 0 * Infinity). x !== x returns true if x is NaN
    
                if (tymin > tmin || tmin !== tmin) tmin = tymin;
                if (tymax < tmax || tmax !== tmax) tmax = tymax;
    
                if (invdirz >= 0) {
                    tzmin = (box.min.z - origin.z) * invdirz;
                    tzmax = (box.max.z - origin.z) * invdirz;
                } else {
                    tzmin = (box.max.z - origin.z) * invdirz;
                    tzmax = (box.min.z - origin.z) * invdirz;
                }
    
                if (tmin > tzmax || tzmin > tmax) return null;
                if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
                if (tzmax < tmax || tmax !== tmax) tmax = tzmax; //return point closest to the ray (positive side)
    
                if (tmax < 0) return null;
                return this.at(tmin >= 0 ? tmin : tmax, target);
            }
    
            intersectsBox(box) {
                return this.intersectBox(box, _vector$a) !== null;
            }
    
            intersectTriangle(a, b, c, backfaceCulling, target) {
                // Compute the offset origin, edges, and normal.
                // from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
                _edge1.subVectors(b, a);
    
                _edge2.subVectors(c, a);
    
                _normal$1.crossVectors(_edge1, _edge2); // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
                // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
                //	 |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
                //	 |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
                //	 |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
    
    
                let DdN = this.direction.dot(_normal$1);
                let sign;
    
                if (DdN > 0) {
                    if (backfaceCulling) return null;
                    sign = 1;
                } else if (DdN < 0) {
                    sign = -1;
                    DdN = -DdN;
                } else {
                    return null;
                }
    
                _diff.subVectors(this.origin, a);
    
                const DdQxE2 = sign * this.direction.dot(_edge2.crossVectors(_diff, _edge2)); // b1 < 0, no intersection
    
                if (DdQxE2 < 0) {
                    return null;
                }
    
                const DdE1xQ = sign * this.direction.dot(_edge1.cross(_diff)); // b2 < 0, no intersection
    
                if (DdE1xQ < 0) {
                    return null;
                } // b1+b2 > 1, no intersection
    
    
                if (DdQxE2 + DdE1xQ > DdN) {
                    return null;
                } // Line intersects triangle, check if ray does.
    
    
                const QdN = -sign * _diff.dot(_normal$1); // t < 0, no intersection
    
    
                if (QdN < 0) {
                    return null;
                } // Ray intersects triangle.
    
    
                return this.at(QdN / DdN, target);
            }
    
            applyMatrix4(matrix4) {
                this.origin.applyMatrix4(matrix4);
                this.direction.transformDirection(matrix4);
                return this;
            }
    
            equals(ray) {
                return ray.origin.equals(this.origin) && ray.direction.equals(this.direction);
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
        }
    
        class Matrix4 {
            constructor() {
                this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    
                if (arguments.length > 0) {
                    console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.');
                }
            }
    
            set(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
                const te = this.elements;
                te[0] = n11;
                te[4] = n12;
                te[8] = n13;
                te[12] = n14;
                te[1] = n21;
                te[5] = n22;
                te[9] = n23;
                te[13] = n24;
                te[2] = n31;
                te[6] = n32;
                te[10] = n33;
                te[14] = n34;
                te[3] = n41;
                te[7] = n42;
                te[11] = n43;
                te[15] = n44;
                return this;
            }
    
            identity() {
                this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                return this;
            }
    
            clone() {
                return new Matrix4().fromArray(this.elements);
            }
    
            copy(m) {
                const te = this.elements;
                const me = m.elements;
                te[0] = me[0];
                te[1] = me[1];
                te[2] = me[2];
                te[3] = me[3];
                te[4] = me[4];
                te[5] = me[5];
                te[6] = me[6];
                te[7] = me[7];
                te[8] = me[8];
                te[9] = me[9];
                te[10] = me[10];
                te[11] = me[11];
                te[12] = me[12];
                te[13] = me[13];
                te[14] = me[14];
                te[15] = me[15];
                return this;
            }
    
            copyPosition(m) {
                const te = this.elements,
                            me = m.elements;
                te[12] = me[12];
                te[13] = me[13];
                te[14] = me[14];
                return this;
            }
    
            setFromMatrix3(m) {
                const me = m.elements;
                this.set(me[0], me[3], me[6], 0, me[1], me[4], me[7], 0, me[2], me[5], me[8], 0, 0, 0, 0, 1);
                return this;
            }
    
            extractBasis(xAxis, yAxis, zAxis) {
                xAxis.setFromMatrixColumn(this, 0);
                yAxis.setFromMatrixColumn(this, 1);
                zAxis.setFromMatrixColumn(this, 2);
                return this;
            }
    
            makeBasis(xAxis, yAxis, zAxis) {
                this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
                return this;
            }
    
            extractRotation(m) {
                // this method does not support reflection matrices
                const te = this.elements;
                const me = m.elements;
    
                const scaleX = 1 / _v1$5.setFromMatrixColumn(m, 0).length();
    
                const scaleY = 1 / _v1$5.setFromMatrixColumn(m, 1).length();
    
                const scaleZ = 1 / _v1$5.setFromMatrixColumn(m, 2).length();
    
                te[0] = me[0] * scaleX;
                te[1] = me[1] * scaleX;
                te[2] = me[2] * scaleX;
                te[3] = 0;
                te[4] = me[4] * scaleY;
                te[5] = me[5] * scaleY;
                te[6] = me[6] * scaleY;
                te[7] = 0;
                te[8] = me[8] * scaleZ;
                te[9] = me[9] * scaleZ;
                te[10] = me[10] * scaleZ;
                te[11] = 0;
                te[12] = 0;
                te[13] = 0;
                te[14] = 0;
                te[15] = 1;
                return this;
            }
    
            makeRotationFromEuler(euler) {
                if (!(euler && euler.isEuler)) {
                    console.error('THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
                }
    
                const te = this.elements;
                const x = euler.x,
                            y = euler.y,
                            z = euler.z;
                const a = Math.cos(x),
                            b = Math.sin(x);
                const c = Math.cos(y),
                            d = Math.sin(y);
                const e = Math.cos(z),
                            f = Math.sin(z);
    
                if (euler.order === 'XYZ') {
                    const ae = a * e,
                                af = a * f,
                                be = b * e,
                                bf = b * f;
                    te[0] = c * e;
                    te[4] = -c * f;
                    te[8] = d;
                    te[1] = af + be * d;
                    te[5] = ae - bf * d;
                    te[9] = -b * c;
                    te[2] = bf - ae * d;
                    te[6] = be + af * d;
                    te[10] = a * c;
                } else if (euler.order === 'YXZ') {
                    const ce = c * e,
                                cf = c * f,
                                de = d * e,
                                df = d * f;
                    te[0] = ce + df * b;
                    te[4] = de * b - cf;
                    te[8] = a * d;
                    te[1] = a * f;
                    te[5] = a * e;
                    te[9] = -b;
                    te[2] = cf * b - de;
                    te[6] = df + ce * b;
                    te[10] = a * c;
                } else if (euler.order === 'ZXY') {
                    const ce = c * e,
                                cf = c * f,
                                de = d * e,
                                df = d * f;
                    te[0] = ce - df * b;
                    te[4] = -a * f;
                    te[8] = de + cf * b;
                    te[1] = cf + de * b;
                    te[5] = a * e;
                    te[9] = df - ce * b;
                    te[2] = -a * d;
                    te[6] = b;
                    te[10] = a * c;
                } else if (euler.order === 'ZYX') {
                    const ae = a * e,
                                af = a * f,
                                be = b * e,
                                bf = b * f;
                    te[0] = c * e;
                    te[4] = be * d - af;
                    te[8] = ae * d + bf;
                    te[1] = c * f;
                    te[5] = bf * d + ae;
                    te[9] = af * d - be;
                    te[2] = -d;
                    te[6] = b * c;
                    te[10] = a * c;
                } else if (euler.order === 'YZX') {
                    const ac = a * c,
                                ad = a * d,
                                bc = b * c,
                                bd = b * d;
                    te[0] = c * e;
                    te[4] = bd - ac * f;
                    te[8] = bc * f + ad;
                    te[1] = f;
                    te[5] = a * e;
                    te[9] = -b * e;
                    te[2] = -d * e;
                    te[6] = ad * f + bc;
                    te[10] = ac - bd * f;
                } else if (euler.order === 'XZY') {
                    const ac = a * c,
                                ad = a * d,
                                bc = b * c,
                                bd = b * d;
                    te[0] = c * e;
                    te[4] = -f;
                    te[8] = d * e;
                    te[1] = ac * f + bd;
                    te[5] = a * e;
                    te[9] = ad * f - bc;
                    te[2] = bc * f - ad;
                    te[6] = b * e;
                    te[10] = bd * f + ac;
                } // bottom row
    
    
                te[3] = 0;
                te[7] = 0;
                te[11] = 0; // last column
    
                te[12] = 0;
                te[13] = 0;
                te[14] = 0;
                te[15] = 1;
                return this;
            }
    
            makeRotationFromQuaternion(q) {
                return this.compose(_zero, q, _one);
            }
    
            lookAt(eye, target, up) {
                const te = this.elements;
    
                _z.subVectors(eye, target);
    
                if (_z.lengthSq() === 0) {
                    // eye and target are in the same position
                    _z.z = 1;
                }
    
                _z.normalize();
    
                _x.crossVectors(up, _z);
    
                if (_x.lengthSq() === 0) {
                    // up and z are parallel
                    if (Math.abs(up.z) === 1) {
                        _z.x += 0.0001;
                    } else {
                        _z.z += 0.0001;
                    }
    
                    _z.normalize();
    
                    _x.crossVectors(up, _z);
                }
    
                _x.normalize();
    
                _y.crossVectors(_z, _x);
    
                te[0] = _x.x;
                te[4] = _y.x;
                te[8] = _z.x;
                te[1] = _x.y;
                te[5] = _y.y;
                te[9] = _z.y;
                te[2] = _x.z;
                te[6] = _y.z;
                te[10] = _z.z;
                return this;
            }
    
            multiply(m, n) {
                if (n !== undefined) {
                    console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
                    return this.multiplyMatrices(m, n);
                }
    
                return this.multiplyMatrices(this, m);
            }
    
            premultiply(m) {
                return this.multiplyMatrices(m, this);
            }
    
            multiplyMatrices(a, b) {
                const ae = a.elements;
                const be = b.elements;
                const te = this.elements;
                const a11 = ae[0],
                            a12 = ae[4],
                            a13 = ae[8],
                            a14 = ae[12];
                const a21 = ae[1],
                            a22 = ae[5],
                            a23 = ae[9],
                            a24 = ae[13];
                const a31 = ae[2],
                            a32 = ae[6],
                            a33 = ae[10],
                            a34 = ae[14];
                const a41 = ae[3],
                            a42 = ae[7],
                            a43 = ae[11],
                            a44 = ae[15];
                const b11 = be[0],
                            b12 = be[4],
                            b13 = be[8],
                            b14 = be[12];
                const b21 = be[1],
                            b22 = be[5],
                            b23 = be[9],
                            b24 = be[13];
                const b31 = be[2],
                            b32 = be[6],
                            b33 = be[10],
                            b34 = be[14];
                const b41 = be[3],
                            b42 = be[7],
                            b43 = be[11],
                            b44 = be[15];
                te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
                te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
                te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
                te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
                te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
                te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
                te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
                te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
                te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
                te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
                te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
                te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
                te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
                te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
                te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
                te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
                return this;
            }
    
            multiplyScalar(s) {
                const te = this.elements;
                te[0] *= s;
                te[4] *= s;
                te[8] *= s;
                te[12] *= s;
                te[1] *= s;
                te[5] *= s;
                te[9] *= s;
                te[13] *= s;
                te[2] *= s;
                te[6] *= s;
                te[10] *= s;
                te[14] *= s;
                te[3] *= s;
                te[7] *= s;
                te[11] *= s;
                te[15] *= s;
                return this;
            }
    
            determinant() {
                const te = this.elements;
                const n11 = te[0],
                            n12 = te[4],
                            n13 = te[8],
                            n14 = te[12];
                const n21 = te[1],
                            n22 = te[5],
                            n23 = te[9],
                            n24 = te[13];
                const n31 = te[2],
                            n32 = te[6],
                            n33 = te[10],
                            n34 = te[14];
                const n41 = te[3],
                            n42 = te[7],
                            n43 = te[11],
                            n44 = te[15]; //TODO: make this more efficient
                //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
    
                return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
            }
    
            transpose() {
                const te = this.elements;
                let tmp;
                tmp = te[1];
                te[1] = te[4];
                te[4] = tmp;
                tmp = te[2];
                te[2] = te[8];
                te[8] = tmp;
                tmp = te[6];
                te[6] = te[9];
                te[9] = tmp;
                tmp = te[3];
                te[3] = te[12];
                te[12] = tmp;
                tmp = te[7];
                te[7] = te[13];
                te[13] = tmp;
                tmp = te[11];
                te[11] = te[14];
                te[14] = tmp;
                return this;
            }
    
            setPosition(x, y, z) {
                const te = this.elements;
    
                if (x.isVector3) {
                    te[12] = x.x;
                    te[13] = x.y;
                    te[14] = x.z;
                } else {
                    te[12] = x;
                    te[13] = y;
                    te[14] = z;
                }
    
                return this;
            }
    
            invert() {
                // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
                const te = this.elements,
                            n11 = te[0],
                            n21 = te[1],
                            n31 = te[2],
                            n41 = te[3],
                            n12 = te[4],
                            n22 = te[5],
                            n32 = te[6],
                            n42 = te[7],
                            n13 = te[8],
                            n23 = te[9],
                            n33 = te[10],
                            n43 = te[11],
                            n14 = te[12],
                            n24 = te[13],
                            n34 = te[14],
                            n44 = te[15],
                            t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
                            t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
                            t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
                            t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
                const det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;
                if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                const detInv = 1 / det;
                te[0] = t11 * detInv;
                te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
                te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
                te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
                te[4] = t12 * detInv;
                te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
                te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
                te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
                te[8] = t13 * detInv;
                te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
                te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
                te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
                te[12] = t14 * detInv;
                te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
                te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
                te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
                return this;
            }
    
            scale(v) {
                const te = this.elements;
                const x = v.x,
                            y = v.y,
                            z = v.z;
                te[0] *= x;
                te[4] *= y;
                te[8] *= z;
                te[1] *= x;
                te[5] *= y;
                te[9] *= z;
                te[2] *= x;
                te[6] *= y;
                te[10] *= z;
                te[3] *= x;
                te[7] *= y;
                te[11] *= z;
                return this;
            }
    
            getMaxScaleOnAxis() {
                const te = this.elements;
                const scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
                const scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
                const scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
                return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
            }
    
            makeTranslation(x, y, z) {
                this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
                return this;
            }
    
            makeRotationX(theta) {
                const c = Math.cos(theta),
                            s = Math.sin(theta);
                this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
                return this;
            }
    
            makeRotationY(theta) {
                const c = Math.cos(theta),
                            s = Math.sin(theta);
                this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
                return this;
            }
    
            makeRotationZ(theta) {
                const c = Math.cos(theta),
                            s = Math.sin(theta);
                this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                return this;
            }
    
            makeRotationAxis(axis, angle) {
                // Based on http://www.gamedev.net/reference/articles/article1199.asp
                const c = Math.cos(angle);
                const s = Math.sin(angle);
                const t = 1 - c;
                const x = axis.x,
                            y = axis.y,
                            z = axis.z;
                const tx = t * x,
                            ty = t * y;
                this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
                return this;
            }
    
            makeScale(x, y, z) {
                this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
                return this;
            }
    
            makeShear(xy, xz, yx, yz, zx, zy) {
                this.set(1, yx, zx, 0, xy, 1, zy, 0, xz, yz, 1, 0, 0, 0, 0, 1);
                return this;
            }
    
            compose(position, quaternion, scale) {
                const te = this.elements;
                const x = quaternion._x,
                            y = quaternion._y,
                            z = quaternion._z,
                            w = quaternion._w;
                const x2 = x + x,
                            y2 = y + y,
                            z2 = z + z;
                const xx = x * x2,
                            xy = x * y2,
                            xz = x * z2;
                const yy = y * y2,
                            yz = y * z2,
                            zz = z * z2;
                const wx = w * x2,
                            wy = w * y2,
                            wz = w * z2;
                const sx = scale.x,
                            sy = scale.y,
                            sz = scale.z;
                te[0] = (1 - (yy + zz)) * sx;
                te[1] = (xy + wz) * sx;
                te[2] = (xz - wy) * sx;
                te[3] = 0;
                te[4] = (xy - wz) * sy;
                te[5] = (1 - (xx + zz)) * sy;
                te[6] = (yz + wx) * sy;
                te[7] = 0;
                te[8] = (xz + wy) * sz;
                te[9] = (yz - wx) * sz;
                te[10] = (1 - (xx + yy)) * sz;
                te[11] = 0;
                te[12] = position.x;
                te[13] = position.y;
                te[14] = position.z;
                te[15] = 1;
                return this;
            }
    
            decompose(position, quaternion, scale) {
                const te = this.elements;
    
                let sx = _v1$5.set(te[0], te[1], te[2]).length();
    
                const sy = _v1$5.set(te[4], te[5], te[6]).length();
    
                const sz = _v1$5.set(te[8], te[9], te[10]).length(); // if determine is negative, we need to invert one scale
    
    
                const det = this.determinant();
                if (det < 0) sx = -sx;
                position.x = te[12];
                position.y = te[13];
                position.z = te[14]; // scale the rotation part
    
                _m1$2.copy(this);
    
                const invSX = 1 / sx;
                const invSY = 1 / sy;
                const invSZ = 1 / sz;
                _m1$2.elements[0] *= invSX;
                _m1$2.elements[1] *= invSX;
                _m1$2.elements[2] *= invSX;
                _m1$2.elements[4] *= invSY;
                _m1$2.elements[5] *= invSY;
                _m1$2.elements[6] *= invSY;
                _m1$2.elements[8] *= invSZ;
                _m1$2.elements[9] *= invSZ;
                _m1$2.elements[10] *= invSZ;
                quaternion.setFromRotationMatrix(_m1$2);
                scale.x = sx;
                scale.y = sy;
                scale.z = sz;
                return this;
            }
    
            makePerspective(left, right, top, bottom, near, far) {
                if (far === undefined) {
                    console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
                }
    
                const te = this.elements;
                const x = 2 * near / (right - left);
                const y = 2 * near / (top - bottom);
                const a = (right + left) / (right - left);
                const b = (top + bottom) / (top - bottom);
                const c = -(far + near) / (far - near);
                const d = -2 * far * near / (far - near);
                te[0] = x;
                te[4] = 0;
                te[8] = a;
                te[12] = 0;
                te[1] = 0;
                te[5] = y;
                te[9] = b;
                te[13] = 0;
                te[2] = 0;
                te[6] = 0;
                te[10] = c;
                te[14] = d;
                te[3] = 0;
                te[7] = 0;
                te[11] = -1;
                te[15] = 0;
                return this;
            }
    
            makeOrthographic(left, right, top, bottom, near, far) {
                const te = this.elements;
                const w = 1.0 / (right - left);
                const h = 1.0 / (top - bottom);
                const p = 1.0 / (far - near);
                const x = (right + left) * w;
                const y = (top + bottom) * h;
                const z = (far + near) * p;
                te[0] = 2 * w;
                te[4] = 0;
                te[8] = 0;
                te[12] = -x;
                te[1] = 0;
                te[5] = 2 * h;
                te[9] = 0;
                te[13] = -y;
                te[2] = 0;
                te[6] = 0;
                te[10] = -2 * p;
                te[14] = -z;
                te[3] = 0;
                te[7] = 0;
                te[11] = 0;
                te[15] = 1;
                return this;
            }
    
            equals(matrix) {
                const te = this.elements;
                const me = matrix.elements;
    
                for (let i = 0; i < 16; i++) {
                    if (te[i] !== me[i]) return false;
                }
    
                return true;
            }
    
            fromArray(array, offset = 0) {
                for (let i = 0; i < 16; i++) {
                    this.elements[i] = array[i + offset];
                }
    
                return this;
            }
    
            toArray(array = [], offset = 0) {
                const te = this.elements;
                array[offset] = te[0];
                array[offset + 1] = te[1];
                array[offset + 2] = te[2];
                array[offset + 3] = te[3];
                array[offset + 4] = te[4];
                array[offset + 5] = te[5];
                array[offset + 6] = te[6];
                array[offset + 7] = te[7];
                array[offset + 8] = te[8];
                array[offset + 9] = te[9];
                array[offset + 10] = te[10];
                array[offset + 11] = te[11];
                array[offset + 12] = te[12];
                array[offset + 13] = te[13];
                array[offset + 14] = te[14];
                array[offset + 15] = te[15];
                return array;
            }
    
        }
    
        Matrix4.prototype.isMatrix4 = true;
    
        const _v1$5 = /*@__PURE__*/new Vector3();
    
        const _m1$2 = /*@__PURE__*/new Matrix4();
    
        const _zero = /*@__PURE__*/new Vector3(0, 0, 0);
    
        const _one = /*@__PURE__*/new Vector3(1, 1, 1);
    
        const _x = /*@__PURE__*/new Vector3();
    
        const _y = /*@__PURE__*/new Vector3();
    
        const _z = /*@__PURE__*/new Vector3();
    
        const _matrix$1 = /*@__PURE__*/new Matrix4();
    
        const _quaternion$3 = /*@__PURE__*/new Quaternion();
    
        class Euler {
            constructor(x = 0, y = 0, z = 0, order = Euler.DefaultOrder) {
                this._x = x;
                this._y = y;
                this._z = z;
                this._order = order;
            }
    
            get x() {
                return this._x;
            }
    
            set x(value) {
                this._x = value;
    
                this._onChangeCallback();
            }
    
            get y() {
                return this._y;
            }
    
            set y(value) {
                this._y = value;
    
                this._onChangeCallback();
            }
    
            get z() {
                return this._z;
            }
    
            set z(value) {
                this._z = value;
    
                this._onChangeCallback();
            }
    
            get order() {
                return this._order;
            }
    
            set order(value) {
                this._order = value;
    
                this._onChangeCallback();
            }
    
            set(x, y, z, order = this._order) {
                this._x = x;
                this._y = y;
                this._z = z;
                this._order = order;
    
                this._onChangeCallback();
    
                return this;
            }
    
            clone() {
                return new this.constructor(this._x, this._y, this._z, this._order);
            }
    
            copy(euler) {
                this._x = euler._x;
                this._y = euler._y;
                this._z = euler._z;
                this._order = euler._order;
    
                this._onChangeCallback();
    
                return this;
            }
    
            setFromRotationMatrix(m, order = this._order, update = true) {
                // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
                const te = m.elements;
                const m11 = te[0],
                            m12 = te[4],
                            m13 = te[8];
                const m21 = te[1],
                            m22 = te[5],
                            m23 = te[9];
                const m31 = te[2],
                            m32 = te[6],
                            m33 = te[10];
    
                switch (order) {
                    case 'XYZ':
                        this._y = Math.asin(clamp(m13, -1, 1));
    
                        if (Math.abs(m13) < 0.9999999) {
                            this._x = Math.atan2(-m23, m33);
                            this._z = Math.atan2(-m12, m11);
                        } else {
                            this._x = Math.atan2(m32, m22);
                            this._z = 0;
                        }
    
                        break;
    
                    case 'YXZ':
                        this._x = Math.asin(-clamp(m23, -1, 1));
    
                        if (Math.abs(m23) < 0.9999999) {
                            this._y = Math.atan2(m13, m33);
                            this._z = Math.atan2(m21, m22);
                        } else {
                            this._y = Math.atan2(-m31, m11);
                            this._z = 0;
                        }
    
                        break;
    
                    case 'ZXY':
                        this._x = Math.asin(clamp(m32, -1, 1));
    
                        if (Math.abs(m32) < 0.9999999) {
                            this._y = Math.atan2(-m31, m33);
                            this._z = Math.atan2(-m12, m22);
                        } else {
                            this._y = 0;
                            this._z = Math.atan2(m21, m11);
                        }
    
                        break;
    
                    case 'ZYX':
                        this._y = Math.asin(-clamp(m31, -1, 1));
    
                        if (Math.abs(m31) < 0.9999999) {
                            this._x = Math.atan2(m32, m33);
                            this._z = Math.atan2(m21, m11);
                        } else {
                            this._x = 0;
                            this._z = Math.atan2(-m12, m22);
                        }
    
                        break;
    
                    case 'YZX':
                        this._z = Math.asin(clamp(m21, -1, 1));
    
                        if (Math.abs(m21) < 0.9999999) {
                            this._x = Math.atan2(-m23, m22);
                            this._y = Math.atan2(-m31, m11);
                        } else {
                            this._x = 0;
                            this._y = Math.atan2(m13, m33);
                        }
    
                        break;
    
                    case 'XZY':
                        this._z = Math.asin(-clamp(m12, -1, 1));
    
                        if (Math.abs(m12) < 0.9999999) {
                            this._x = Math.atan2(m32, m22);
                            this._y = Math.atan2(m13, m11);
                        } else {
                            this._x = Math.atan2(-m23, m33);
                            this._y = 0;
                        }
    
                        break;
    
                    default:
                        console.warn('THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order);
                }
    
                this._order = order;
                if (update === true) this._onChangeCallback();
                return this;
            }
    
            setFromQuaternion(q, order, update) {
                _matrix$1.makeRotationFromQuaternion(q);
    
                return this.setFromRotationMatrix(_matrix$1, order, update);
            }
    
            setFromVector3(v, order = this._order) {
                return this.set(v.x, v.y, v.z, order);
            }
    
            reorder(newOrder) {
                // WARNING: this discards revolution information -bhouston
                _quaternion$3.setFromEuler(this);
    
                return this.setFromQuaternion(_quaternion$3, newOrder);
            }
    
            equals(euler) {
                return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
            }
    
            fromArray(array) {
                this._x = array[0];
                this._y = array[1];
                this._z = array[2];
                if (array[3] !== undefined) this._order = array[3];
    
                this._onChangeCallback();
    
                return this;
            }
    
            toArray(array = [], offset = 0) {
                array[offset] = this._x;
                array[offset + 1] = this._y;
                array[offset + 2] = this._z;
                array[offset + 3] = this._order;
                return array;
            }
    
            toVector3(optionalResult) {
                if (optionalResult) {
                    return optionalResult.set(this._x, this._y, this._z);
                } else {
                    return new Vector3(this._x, this._y, this._z);
                }
            }
    
            _onChange(callback) {
                this._onChangeCallback = callback;
                return this;
            }
    
            _onChangeCallback() {}
    
        }
    
        Euler.prototype.isEuler = true;
        Euler.DefaultOrder = 'XYZ';
        Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
    
        class Layers {
            constructor() {
                this.mask = 1 | 0;
            }
    
            set(channel) {
                this.mask = (1 << channel | 0) >>> 0;
            }
    
            enable(channel) {
                this.mask |= 1 << channel | 0;
            }
    
            enableAll() {
                this.mask = 0xffffffff | 0;
            }
    
            toggle(channel) {
                this.mask ^= 1 << channel | 0;
            }
    
            disable(channel) {
                this.mask &= ~(1 << channel | 0);
            }
    
            disableAll() {
                this.mask = 0;
            }
    
            test(layers) {
                return (this.mask & layers.mask) !== 0;
            }
    
            isEnabled(channel) {
                return (this.mask & (1 << channel | 0)) !== 0;
            }
    
        }
    
        let _object3DId = 0;
    
        const _v1$4 = /*@__PURE__*/new Vector3();
    
        const _q1 = /*@__PURE__*/new Quaternion();
    
        const _m1$1 = /*@__PURE__*/new Matrix4();
    
        const _target = /*@__PURE__*/new Vector3();
    
        const _position$3 = /*@__PURE__*/new Vector3();
    
        const _scale$2 = /*@__PURE__*/new Vector3();
    
        const _quaternion$2 = /*@__PURE__*/new Quaternion();
    
        const _xAxis = /*@__PURE__*/new Vector3(1, 0, 0);
    
        const _yAxis = /*@__PURE__*/new Vector3(0, 1, 0);
    
        const _zAxis = /*@__PURE__*/new Vector3(0, 0, 1);
    
        const _addedEvent = {
            type: 'added'
        };
        const _removedEvent = {
            type: 'removed'
        };
    
        class Object3D extends EventDispatcher {
            constructor() {
                super();
                Object.defineProperty(this, 'id', {
                    value: _object3DId++
                });
                this.uuid = generateUUID();
                this.name = '';
                this.type = 'Object3D';
                this.parent = null;
                this.children = [];
                this.up = Object3D.DefaultUp.clone();
                const position = new Vector3();
                const rotation = new Euler();
                const quaternion = new Quaternion();
                const scale = new Vector3(1, 1, 1);
    
                function onRotationChange() {
                    quaternion.setFromEuler(rotation, false);
                }
    
                function onQuaternionChange() {
                    rotation.setFromQuaternion(quaternion, undefined, false);
                }
    
                rotation._onChange(onRotationChange);
    
                quaternion._onChange(onQuaternionChange);
    
                Object.defineProperties(this, {
                    position: {
                        configurable: true,
                        enumerable: true,
                        value: position
                    },
                    rotation: {
                        configurable: true,
                        enumerable: true,
                        value: rotation
                    },
                    quaternion: {
                        configurable: true,
                        enumerable: true,
                        value: quaternion
                    },
                    scale: {
                        configurable: true,
                        enumerable: true,
                        value: scale
                    },
                    modelViewMatrix: {
                        value: new Matrix4()
                    },
                    normalMatrix: {
                        value: new Matrix3()
                    }
                });
                this.matrix = new Matrix4();
                this.matrixWorld = new Matrix4();
                this.matrixAutoUpdate = Object3D.DefaultMatrixAutoUpdate;
                this.matrixWorldNeedsUpdate = false;
                this.layers = new Layers();
                this.visible = true;
                this.castShadow = false;
                this.receiveShadow = false;
                this.frustumCulled = true;
                this.renderOrder = 0;
                this.animations = [];
                this.userData = {};
            }
    
            onBeforeRender() {}
    
            onAfterRender() {}
    
            applyMatrix4(matrix) {
                if (this.matrixAutoUpdate) this.updateMatrix();
                this.matrix.premultiply(matrix);
                this.matrix.decompose(this.position, this.quaternion, this.scale);
            }
    
            applyQuaternion(q) {
                this.quaternion.premultiply(q);
                return this;
            }
    
            setRotationFromAxisAngle(axis, angle) {
                // assumes axis is normalized
                this.quaternion.setFromAxisAngle(axis, angle);
            }
    
            setRotationFromEuler(euler) {
                this.quaternion.setFromEuler(euler, true);
            }
    
            setRotationFromMatrix(m) {
                // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
                this.quaternion.setFromRotationMatrix(m);
            }
    
            setRotationFromQuaternion(q) {
                // assumes q is normalized
                this.quaternion.copy(q);
            }
    
            rotateOnAxis(axis, angle) {
                // rotate object on axis in object space
                // axis is assumed to be normalized
                _q1.setFromAxisAngle(axis, angle);
    
                this.quaternion.multiply(_q1);
                return this;
            }
    
            rotateOnWorldAxis(axis, angle) {
                // rotate object on axis in world space
                // axis is assumed to be normalized
                // method assumes no rotated parent
                _q1.setFromAxisAngle(axis, angle);
    
                this.quaternion.premultiply(_q1);
                return this;
            }
    
            rotateX(angle) {
                return this.rotateOnAxis(_xAxis, angle);
            }
    
            rotateY(angle) {
                return this.rotateOnAxis(_yAxis, angle);
            }
    
            rotateZ(angle) {
                return this.rotateOnAxis(_zAxis, angle);
            }
    
            translateOnAxis(axis, distance) {
                // translate object by distance along axis in object space
                // axis is assumed to be normalized
                _v1$4.copy(axis).applyQuaternion(this.quaternion);
    
                this.position.add(_v1$4.multiplyScalar(distance));
                return this;
            }
    
            translateX(distance) {
                return this.translateOnAxis(_xAxis, distance);
            }
    
            translateY(distance) {
                return this.translateOnAxis(_yAxis, distance);
            }
    
            translateZ(distance) {
                return this.translateOnAxis(_zAxis, distance);
            }
    
            localToWorld(vector) {
                return vector.applyMatrix4(this.matrixWorld);
            }
    
            worldToLocal(vector) {
                return vector.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
            }
    
            lookAt(x, y, z) {
                // This method does not support objects having non-uniformly-scaled parent(s)
                if (x.isVector3) {
                    _target.copy(x);
                } else {
                    _target.set(x, y, z);
                }
    
                const parent = this.parent;
                this.updateWorldMatrix(true, false);
    
                _position$3.setFromMatrixPosition(this.matrixWorld);
    
                if (this.isCamera || this.isLight) {
                    _m1$1.lookAt(_position$3, _target, this.up);
                } else {
                    _m1$1.lookAt(_target, _position$3, this.up);
                }
    
                this.quaternion.setFromRotationMatrix(_m1$1);
    
                if (parent) {
                    _m1$1.extractRotation(parent.matrixWorld);
    
                    _q1.setFromRotationMatrix(_m1$1);
    
                    this.quaternion.premultiply(_q1.invert());
                }
            }
    
            add(object) {
                if (arguments.length > 1) {
                    for (let i = 0; i < arguments.length; i++) {
                        this.add(arguments[i]);
                    }
    
                    return this;
                }
    
                if (object === this) {
                    console.error('THREE.Object3D.add: object can\'t be added as a child of itself.', object);
                    return this;
                }
    
                if (object && object.isObject3D) {
                    if (object.parent !== null) {
                        object.parent.remove(object);
                    }
    
                    object.parent = this;
                    this.children.push(object);
                    object.dispatchEvent(_addedEvent);
                } else {
                    console.error('THREE.Object3D.add: object not an instance of THREE.Object3D.', object);
                }
    
                return this;
            }
    
            remove(object) {
                if (arguments.length > 1) {
                    for (let i = 0; i < arguments.length; i++) {
                        this.remove(arguments[i]);
                    }
    
                    return this;
                }
    
                const index = this.children.indexOf(object);
    
                if (index !== -1) {
                    object.parent = null;
                    this.children.splice(index, 1);
                    object.dispatchEvent(_removedEvent);
                }
    
                return this;
            }
    
            removeFromParent() {
                const parent = this.parent;
    
                if (parent !== null) {
                    parent.remove(this);
                }
    
                return this;
            }
    
            clear() {
                for (let i = 0; i < this.children.length; i++) {
                    const object = this.children[i];
                    object.parent = null;
                    object.dispatchEvent(_removedEvent);
                }
    
                this.children.length = 0;
                return this;
            }
    
            attach(object) {
                // adds object as a child of this, while maintaining the object's world transform
                // Note: This method does not support scene graphs having non-uniformly-scaled nodes(s)
                this.updateWorldMatrix(true, false);
    
                _m1$1.copy(this.matrixWorld).invert();
    
                if (object.parent !== null) {
                    object.parent.updateWorldMatrix(true, false);
    
                    _m1$1.multiply(object.parent.matrixWorld);
                }
    
                object.applyMatrix4(_m1$1);
                this.add(object);
                object.updateWorldMatrix(false, true);
                return this;
            }
    
            getObjectById(id) {
                return this.getObjectByProperty('id', id);
            }
    
            getObjectByName(name) {
                return this.getObjectByProperty('name', name);
            }
    
            getObjectByProperty(name, value) {
                if (this[name] === value) return this;
    
                for (let i = 0, l = this.children.length; i < l; i++) {
                    const child = this.children[i];
                    const object = child.getObjectByProperty(name, value);
    
                    if (object !== undefined) {
                        return object;
                    }
                }
    
                return undefined;
            }
    
            getWorldPosition(target) {
                this.updateWorldMatrix(true, false);
                return target.setFromMatrixPosition(this.matrixWorld);
            }
    
            getWorldQuaternion(target) {
                this.updateWorldMatrix(true, false);
                this.matrixWorld.decompose(_position$3, target, _scale$2);
                return target;
            }
    
            getWorldScale(target) {
                this.updateWorldMatrix(true, false);
                this.matrixWorld.decompose(_position$3, _quaternion$2, target);
                return target;
            }
    
            getWorldDirection(target) {
                this.updateWorldMatrix(true, false);
                const e = this.matrixWorld.elements;
                return target.set(e[8], e[9], e[10]).normalize();
            }
    
            raycast() {}
    
            traverse(callback) {
                callback(this);
                const children = this.children;
    
                for (let i = 0, l = children.length; i < l; i++) {
                    children[i].traverse(callback);
                }
            }
    
            traverseVisible(callback) {
                if (this.visible === false) return;
                callback(this);
                const children = this.children;
    
                for (let i = 0, l = children.length; i < l; i++) {
                    children[i].traverseVisible(callback);
                }
            }
    
            traverseAncestors(callback) {
                const parent = this.parent;
    
                if (parent !== null) {
                    callback(parent);
                    parent.traverseAncestors(callback);
                }
            }
    
            updateMatrix() {
                this.matrix.compose(this.position, this.quaternion, this.scale);
                this.matrixWorldNeedsUpdate = true;
            }
    
            updateMatrixWorld(force) {
                if (this.matrixAutoUpdate) this.updateMatrix();
    
                if (this.matrixWorldNeedsUpdate || force) {
                    if (this.parent === null) {
                        this.matrixWorld.copy(this.matrix);
                    } else {
                        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                    }
    
                    this.matrixWorldNeedsUpdate = false;
                    force = true;
                } // update children
    
    
                const children = this.children;
    
                for (let i = 0, l = children.length; i < l; i++) {
                    children[i].updateMatrixWorld(force);
                }
            }
    
            updateWorldMatrix(updateParents, updateChildren) {
                const parent = this.parent;
    
                if (updateParents === true && parent !== null) {
                    parent.updateWorldMatrix(true, false);
                }
    
                if (this.matrixAutoUpdate) this.updateMatrix();
    
                if (this.parent === null) {
                    this.matrixWorld.copy(this.matrix);
                } else {
                    this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
                } // update children
    
    
                if (updateChildren === true) {
                    const children = this.children;
    
                    for (let i = 0, l = children.length; i < l; i++) {
                        children[i].updateWorldMatrix(false, true);
                    }
                }
            }
    
            toJSON(meta) {
                // meta is a string when called from JSON.stringify
                const isRootObject = meta === undefined || typeof meta === 'string';
                const output = {}; // meta is a hash used to collect geometries, materials.
                // not providing it implies that this is the root object
                // being serialized.
    
                if (isRootObject) {
                    // initialize meta obj
                    meta = {
                        geometries: {},
                        materials: {},
                        textures: {},
                        images: {},
                        shapes: {},
                        skeletons: {},
                        animations: {}
                    };
                    output.metadata = {
                        version: 4.5,
                        type: 'Object',
                        generator: 'Object3D.toJSON'
                    };
                } // standard Object3D serialization
    
    
                const object = {};
                object.uuid = this.uuid;
                object.type = this.type;
                if (this.name !== '') object.name = this.name;
                if (this.castShadow === true) object.castShadow = true;
                if (this.receiveShadow === true) object.receiveShadow = true;
                if (this.visible === false) object.visible = false;
                if (this.frustumCulled === false) object.frustumCulled = false;
                if (this.renderOrder !== 0) object.renderOrder = this.renderOrder;
                if (JSON.stringify(this.userData) !== '{}') object.userData = this.userData;
                object.layers = this.layers.mask;
                object.matrix = this.matrix.toArray();
                if (this.matrixAutoUpdate === false) object.matrixAutoUpdate = false; // object specific properties
    
                if (this.isInstancedMesh) {
                    object.type = 'InstancedMesh';
                    object.count = this.count;
                    object.instanceMatrix = this.instanceMatrix.toJSON();
                    if (this.instanceColor !== null) object.instanceColor = this.instanceColor.toJSON();
                } //
    
    
                function serialize(library, element) {
                    if (library[element.uuid] === undefined) {
                        library[element.uuid] = element.toJSON(meta);
                    }
    
                    return element.uuid;
                }
    
                if (this.isScene) {
                    if (this.background) {
                        if (this.background.isColor) {
                            object.background = this.background.toJSON();
                        } else if (this.background.isTexture) {
                            object.background = this.background.toJSON(meta).uuid;
                        }
                    }
    
                    if (this.environment && this.environment.isTexture) {
                        object.environment = this.environment.toJSON(meta).uuid;
                    }
                } else if (this.isMesh || this.isLine || this.isPoints) {
                    object.geometry = serialize(meta.geometries, this.geometry);
                    const parameters = this.geometry.parameters;
    
                    if (parameters !== undefined && parameters.shapes !== undefined) {
                        const shapes = parameters.shapes;
    
                        if (Array.isArray(shapes)) {
                            for (let i = 0, l = shapes.length; i < l; i++) {
                                const shape = shapes[i];
                                serialize(meta.shapes, shape);
                            }
                        } else {
                            serialize(meta.shapes, shapes);
                        }
                    }
                }
    
                if (this.isSkinnedMesh) {
                    object.bindMode = this.bindMode;
                    object.bindMatrix = this.bindMatrix.toArray();
    
                    if (this.skeleton !== undefined) {
                        serialize(meta.skeletons, this.skeleton);
                        object.skeleton = this.skeleton.uuid;
                    }
                }
    
                if (this.material !== undefined) {
                    if (Array.isArray(this.material)) {
                        const uuids = [];
    
                        for (let i = 0, l = this.material.length; i < l; i++) {
                            uuids.push(serialize(meta.materials, this.material[i]));
                        }
    
                        object.material = uuids;
                    } else {
                        object.material = serialize(meta.materials, this.material);
                    }
                } //
    
    
                if (this.children.length > 0) {
                    object.children = [];
    
                    for (let i = 0; i < this.children.length; i++) {
                        object.children.push(this.children[i].toJSON(meta).object);
                    }
                } //
    
    
                if (this.animations.length > 0) {
                    object.animations = [];
    
                    for (let i = 0; i < this.animations.length; i++) {
                        const animation = this.animations[i];
                        object.animations.push(serialize(meta.animations, animation));
                    }
                }
    
                if (isRootObject) {
                    const geometries = extractFromCache(meta.geometries);
                    const materials = extractFromCache(meta.materials);
                    const textures = extractFromCache(meta.textures);
                    const images = extractFromCache(meta.images);
                    const shapes = extractFromCache(meta.shapes);
                    const skeletons = extractFromCache(meta.skeletons);
                    const animations = extractFromCache(meta.animations);
                    if (geometries.length > 0) output.geometries = geometries;
                    if (materials.length > 0) output.materials = materials;
                    if (textures.length > 0) output.textures = textures;
                    if (images.length > 0) output.images = images;
                    if (shapes.length > 0) output.shapes = shapes;
                    if (skeletons.length > 0) output.skeletons = skeletons;
                    if (animations.length > 0) output.animations = animations;
                }
    
                output.object = object;
                return output; // extract data from the cache hash
                // remove metadata on each item
                // and return as array
    
                function extractFromCache(cache) {
                    const values = [];
    
                    for (const key in cache) {
                        const data = cache[key];
                        delete data.metadata;
                        values.push(data);
                    }
    
                    return values;
                }
            }
    
            clone(recursive) {
                return new this.constructor().copy(this, recursive);
            }
    
            copy(source, recursive = true) {
                this.name = source.name;
                this.up.copy(source.up);
                this.position.copy(source.position);
                this.rotation.order = source.rotation.order;
                this.quaternion.copy(source.quaternion);
                this.scale.copy(source.scale);
                this.matrix.copy(source.matrix);
                this.matrixWorld.copy(source.matrixWorld);
                this.matrixAutoUpdate = source.matrixAutoUpdate;
                this.matrixWorldNeedsUpdate = source.matrixWorldNeedsUpdate;
                this.layers.mask = source.layers.mask;
                this.visible = source.visible;
                this.castShadow = source.castShadow;
                this.receiveShadow = source.receiveShadow;
                this.frustumCulled = source.frustumCulled;
                this.renderOrder = source.renderOrder;
                this.userData = JSON.parse(JSON.stringify(source.userData));
    
                if (recursive === true) {
                    for (let i = 0; i < source.children.length; i++) {
                        const child = source.children[i];
                        this.add(child.clone());
                    }
                }
    
                return this;
            }
    
        }
    
        Object3D.DefaultUp = new Vector3(0, 1, 0);
        Object3D.DefaultMatrixAutoUpdate = true;
        Object3D.prototype.isObject3D = true;
    
        const _v0$1 = /*@__PURE__*/new Vector3();
    
        const _v1$3 = /*@__PURE__*/new Vector3();
    
        const _v2$2 = /*@__PURE__*/new Vector3();
    
        const _v3$1 = /*@__PURE__*/new Vector3();
    
        const _vab = /*@__PURE__*/new Vector3();
    
        const _vac = /*@__PURE__*/new Vector3();
    
        const _vbc = /*@__PURE__*/new Vector3();
    
        const _vap = /*@__PURE__*/new Vector3();
    
        const _vbp = /*@__PURE__*/new Vector3();
    
        const _vcp = /*@__PURE__*/new Vector3();
    
        class Triangle {
            constructor(a = new Vector3(), b = new Vector3(), c = new Vector3()) {
                this.a = a;
                this.b = b;
                this.c = c;
            }
    
            static getNormal(a, b, c, target) {
                target.subVectors(c, b);
    
                _v0$1.subVectors(a, b);
    
                target.cross(_v0$1);
                const targetLengthSq = target.lengthSq();
    
                if (targetLengthSq > 0) {
                    return target.multiplyScalar(1 / Math.sqrt(targetLengthSq));
                }
    
                return target.set(0, 0, 0);
            } // static/instance method to calculate barycentric coordinates
            // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
    
    
            static getBarycoord(point, a, b, c, target) {
                _v0$1.subVectors(c, a);
    
                _v1$3.subVectors(b, a);
    
                _v2$2.subVectors(point, a);
    
                const dot00 = _v0$1.dot(_v0$1);
    
                const dot01 = _v0$1.dot(_v1$3);
    
                const dot02 = _v0$1.dot(_v2$2);
    
                const dot11 = _v1$3.dot(_v1$3);
    
                const dot12 = _v1$3.dot(_v2$2);
    
                const denom = dot00 * dot11 - dot01 * dot01; // collinear or singular triangle
    
                if (denom === 0) {
                    // arbitrary location outside of triangle?
                    // not sure if this is the best idea, maybe should be returning undefined
                    return target.set(-2, -1, -1);
                }
    
                const invDenom = 1 / denom;
                const u = (dot11 * dot02 - dot01 * dot12) * invDenom;
                const v = (dot00 * dot12 - dot01 * dot02) * invDenom; // barycentric coordinates must always sum to 1
    
                return target.set(1 - u - v, v, u);
            }
    
            static containsPoint(point, a, b, c) {
                this.getBarycoord(point, a, b, c, _v3$1);
                return _v3$1.x >= 0 && _v3$1.y >= 0 && _v3$1.x + _v3$1.y <= 1;
            }
    
            static getUV(point, p1, p2, p3, uv1, uv2, uv3, target) {
                this.getBarycoord(point, p1, p2, p3, _v3$1);
                target.set(0, 0);
                target.addScaledVector(uv1, _v3$1.x);
                target.addScaledVector(uv2, _v3$1.y);
                target.addScaledVector(uv3, _v3$1.z);
                return target;
            }
    
            static isFrontFacing(a, b, c, direction) {
                _v0$1.subVectors(c, b);
    
                _v1$3.subVectors(a, b); // strictly front facing
    
    
                return _v0$1.cross(_v1$3).dot(direction) < 0 ? true : false;
            }
    
            set(a, b, c) {
                this.a.copy(a);
                this.b.copy(b);
                this.c.copy(c);
                return this;
            }
    
            setFromPointsAndIndices(points, i0, i1, i2) {
                this.a.copy(points[i0]);
                this.b.copy(points[i1]);
                this.c.copy(points[i2]);
                return this;
            }
    
            setFromAttributeAndIndices(attribute, i0, i1, i2) {
                this.a.fromBufferAttribute(attribute, i0);
                this.b.fromBufferAttribute(attribute, i1);
                this.c.fromBufferAttribute(attribute, i2);
                return this;
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
            copy(triangle) {
                this.a.copy(triangle.a);
                this.b.copy(triangle.b);
                this.c.copy(triangle.c);
                return this;
            }
    
            getArea() {
                _v0$1.subVectors(this.c, this.b);
    
                _v1$3.subVectors(this.a, this.b);
    
                return _v0$1.cross(_v1$3).length() * 0.5;
            }
    
            getMidpoint(target) {
                return target.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
            }
    
            getNormal(target) {
                return Triangle.getNormal(this.a, this.b, this.c, target);
            }
    
            getPlane(target) {
                return target.setFromCoplanarPoints(this.a, this.b, this.c);
            }
    
            getBarycoord(point, target) {
                return Triangle.getBarycoord(point, this.a, this.b, this.c, target);
            }
    
            getUV(point, uv1, uv2, uv3, target) {
                return Triangle.getUV(point, this.a, this.b, this.c, uv1, uv2, uv3, target);
            }
    
            containsPoint(point) {
                return Triangle.containsPoint(point, this.a, this.b, this.c);
            }
    
            isFrontFacing(direction) {
                return Triangle.isFrontFacing(this.a, this.b, this.c, direction);
            }
    
            intersectsBox(box) {
                return box.intersectsTriangle(this);
            }
    
            closestPointToPoint(p, target) {
                const a = this.a,
                            b = this.b,
                            c = this.c;
                let v, w; // algorithm thanks to Real-Time Collision Detection by Christer Ericson,
                // published by Morgan Kaufmann Publishers, (c) 2005 Elsevier Inc.,
                // under the accompanying license; see chapter 5.1.5 for detailed explanation.
                // basically, we're distinguishing which of the voronoi regions of the triangle
                // the point lies in with the minimum amount of redundant computation.
    
                _vab.subVectors(b, a);
    
                _vac.subVectors(c, a);
    
                _vap.subVectors(p, a);
    
                const d1 = _vab.dot(_vap);
    
                const d2 = _vac.dot(_vap);
    
                if (d1 <= 0 && d2 <= 0) {
                    // vertex region of A; barycentric coords (1, 0, 0)
                    return target.copy(a);
                }
    
                _vbp.subVectors(p, b);
    
                const d3 = _vab.dot(_vbp);
    
                const d4 = _vac.dot(_vbp);
    
                if (d3 >= 0 && d4 <= d3) {
                    // vertex region of B; barycentric coords (0, 1, 0)
                    return target.copy(b);
                }
    
                const vc = d1 * d4 - d3 * d2;
    
                if (vc <= 0 && d1 >= 0 && d3 <= 0) {
                    v = d1 / (d1 - d3); // edge region of AB; barycentric coords (1-v, v, 0)
    
                    return target.copy(a).addScaledVector(_vab, v);
                }
    
                _vcp.subVectors(p, c);
    
                const d5 = _vab.dot(_vcp);
    
                const d6 = _vac.dot(_vcp);
    
                if (d6 >= 0 && d5 <= d6) {
                    // vertex region of C; barycentric coords (0, 0, 1)
                    return target.copy(c);
                }
    
                const vb = d5 * d2 - d1 * d6;
    
                if (vb <= 0 && d2 >= 0 && d6 <= 0) {
                    w = d2 / (d2 - d6); // edge region of AC; barycentric coords (1-w, 0, w)
    
                    return target.copy(a).addScaledVector(_vac, w);
                }
    
                const va = d3 * d6 - d5 * d4;
    
                if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
                    _vbc.subVectors(c, b);
    
                    w = (d4 - d3) / (d4 - d3 + (d5 - d6)); // edge region of BC; barycentric coords (0, 1-w, w)
    
                    return target.copy(b).addScaledVector(_vbc, w); // edge region of BC
                } // face region
    
    
                const denom = 1 / (va + vb + vc); // u = va * denom
    
                v = vb * denom;
                w = vc * denom;
                return target.copy(a).addScaledVector(_vab, v).addScaledVector(_vac, w);
            }
    
            equals(triangle) {
                return triangle.a.equals(this.a) && triangle.b.equals(this.b) && triangle.c.equals(this.c);
            }
    
        }
    
        let materialId = 0;
    
        class Material extends EventDispatcher {
            constructor() {
                super();
                Object.defineProperty(this, 'id', {
                    value: materialId++
                });
                this.uuid = generateUUID();
                this.name = '';
                this.type = 'Material';
                this.fog = true;
                this.blending = NormalBlending;
                this.side = FrontSide;
                this.vertexColors = false;
                this.opacity = 1;
                this.transparent = false;
                this.blendSrc = SrcAlphaFactor;
                this.blendDst = OneMinusSrcAlphaFactor;
                this.blendEquation = AddEquation;
                this.blendSrcAlpha = null;
                this.blendDstAlpha = null;
                this.blendEquationAlpha = null;
                this.depthFunc = LessEqualDepth;
                this.depthTest = true;
                this.depthWrite = true;
                this.stencilWriteMask = 0xff;
                this.stencilFunc = AlwaysStencilFunc;
                this.stencilRef = 0;
                this.stencilFuncMask = 0xff;
                this.stencilFail = KeepStencilOp;
                this.stencilZFail = KeepStencilOp;
                this.stencilZPass = KeepStencilOp;
                this.stencilWrite = false;
                this.clippingPlanes = null;
                this.clipIntersection = false;
                this.clipShadows = false;
                this.shadowSide = null;
                this.colorWrite = true;
                this.alphaWrite = true;
                this.precision = null; // override the renderer's default precision for this material
    
                this.polygonOffset = false;
                this.polygonOffsetFactor = 0;
                this.polygonOffsetUnits = 0;
                this.dithering = false;
                this.alphaToCoverage = false;
                this.premultipliedAlpha = false;
                this.visible = true;
                this.toneMapped = true;
                this.userData = {};
                this.version = 0;
                this._alphaTest = 0;
            }
    
            get alphaTest() {
                return this._alphaTest;
            }
    
            set alphaTest(value) {
                if (this._alphaTest > 0 !== value > 0) {
                    this.version++;
                }
    
                this._alphaTest = value;
            }
    
            onBuild() {}
    
            onBeforeRender() {}
    
            onBeforeCompile() {}
    
            customProgramCacheKey() {
                return this.onBeforeCompile.toString();
            }
    
            setValues(values) {
                if (values === undefined) return;
    
                for (const key in values) {
                    const newValue = values[key];
    
                    if (newValue === undefined) {
                        console.warn('THREE.Material: \'' + key + '\' parameter is undefined.');
                        continue;
                    } // for backward compatability if shading is set in the constructor
    
    
                    if (key === 'shading') {
                        console.warn('THREE.' + this.type + ': .shading has been removed. Use the boolean .flatShading instead.');
                        this.flatShading = newValue === FlatShading ? true : false;
                        continue;
                    }
    
                    const currentValue = this[key];
    
                    if (currentValue === undefined) {
                        console.warn('THREE.' + this.type + ': \'' + key + '\' is not a property of this material.');
                        continue;
                    }
    
                    if (currentValue && currentValue.isColor) {
                        currentValue.set(newValue);
                    } else if (currentValue && currentValue.isVector3 && newValue && newValue.isVector3) {
                        currentValue.copy(newValue);
                    } else {
                        this[key] = newValue;
                    }
                }
            }
    
            toJSON(meta) {
                const isRoot = meta === undefined || typeof meta === 'string';
    
                if (isRoot) {
                    meta = {
                        textures: {},
                        images: {}
                    };
                }
    
                const data = {
                    metadata: {
                        version: 4.5,
                        type: 'Material',
                        generator: 'Material.toJSON'
                    }
                }; // standard Material serialization
    
                data.uuid = this.uuid;
                data.type = this.type;
                if (this.name !== '') data.name = this.name;
                if (this.color && this.color.isColor) data.color = this.color.getHex();
                if (this.roughness !== undefined) data.roughness = this.roughness;
                if (this.metalness !== undefined) data.metalness = this.metalness;
                if (this.sheen !== undefined) data.sheen = this.sheen;
                if (this.sheenColor && this.sheenColor.isColor) data.sheenColor = this.sheenColor.getHex();
                if (this.sheenRoughness !== undefined) data.sheenRoughness = this.sheenRoughness;
                if (this.emissive && this.emissive.isColor) data.emissive = this.emissive.getHex();
                if (this.emissiveIntensity && this.emissiveIntensity !== 1) data.emissiveIntensity = this.emissiveIntensity;
                if (this.specular && this.specular.isColor) data.specular = this.specular.getHex();
                if (this.specularIntensity !== undefined) data.specularIntensity = this.specularIntensity;
                if (this.specularColor && this.specularColor.isColor) data.specularColor = this.specularColor.getHex();
                if (this.shininess !== undefined) data.shininess = this.shininess;
                if (this.clearcoat !== undefined) data.clearcoat = this.clearcoat;
                if (this.clearcoatRoughness !== undefined) data.clearcoatRoughness = this.clearcoatRoughness;
    
                if (this.clearcoatMap && this.clearcoatMap.isTexture) {
                    data.clearcoatMap = this.clearcoatMap.toJSON(meta).uuid;
                }
    
                if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture) {
                    data.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(meta).uuid;
                }
    
                if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture) {
                    data.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(meta).uuid;
                    data.clearcoatNormalScale = this.clearcoatNormalScale.toArray();
                }
    
                if (this.map && this.map.isTexture) data.map = this.map.toJSON(meta).uuid;
                if (this.matcap && this.matcap.isTexture) data.matcap = this.matcap.toJSON(meta).uuid;
                if (this.alphaMap && this.alphaMap.isTexture) data.alphaMap = this.alphaMap.toJSON(meta).uuid;
    
                if (this.lightMap && this.lightMap.isTexture) {
                    data.lightMap = this.lightMap.toJSON(meta).uuid;
                    data.lightMapIntensity = this.lightMapIntensity;
                }
    
                if (this.aoMap && this.aoMap.isTexture) {
                    data.aoMap = this.aoMap.toJSON(meta).uuid;
                    data.aoMapIntensity = this.aoMapIntensity;
                }
    
                if (this.bumpMap && this.bumpMap.isTexture) {
                    data.bumpMap = this.bumpMap.toJSON(meta).uuid;
                    data.bumpScale = this.bumpScale;
                }
    
                if (this.normalMap && this.normalMap.isTexture) {
                    data.normalMap = this.normalMap.toJSON(meta).uuid;
                    data.normalMapType = this.normalMapType;
                    data.normalScale = this.normalScale.toArray();
                }
    
                if (this.displacementMap && this.displacementMap.isTexture) {
                    data.displacementMap = this.displacementMap.toJSON(meta).uuid;
                    data.displacementScale = this.displacementScale;
                    data.displacementBias = this.displacementBias;
                }
    
                if (this.roughnessMap && this.roughnessMap.isTexture) data.roughnessMap = this.roughnessMap.toJSON(meta).uuid;
                if (this.metalnessMap && this.metalnessMap.isTexture) data.metalnessMap = this.metalnessMap.toJSON(meta).uuid;
                if (this.emissiveMap && this.emissiveMap.isTexture) data.emissiveMap = this.emissiveMap.toJSON(meta).uuid;
                if (this.specularMap && this.specularMap.isTexture) data.specularMap = this.specularMap.toJSON(meta).uuid;
                if (this.specularIntensityMap && this.specularIntensityMap.isTexture) data.specularIntensityMap = this.specularIntensityMap.toJSON(meta).uuid;
                if (this.specularColorMap && this.specularColorMap.isTexture) data.specularColorMap = this.specularColorMap.toJSON(meta).uuid;
    
                if (this.envMap && this.envMap.isTexture) {
                    data.envMap = this.envMap.toJSON(meta).uuid;
                    if (this.combine !== undefined) data.combine = this.combine;
                }
    
                if (this.envMapIntensity !== undefined) data.envMapIntensity = this.envMapIntensity;
                if (this.reflectivity !== undefined) data.reflectivity = this.reflectivity;
                if (this.refractionRatio !== undefined) data.refractionRatio = this.refractionRatio;
    
                if (this.gradientMap && this.gradientMap.isTexture) {
                    data.gradientMap = this.gradientMap.toJSON(meta).uuid;
                }
    
                if (this.transmission !== undefined) data.transmission = this.transmission;
                if (this.transmissionMap && this.transmissionMap.isTexture) data.transmissionMap = this.transmissionMap.toJSON(meta).uuid;
                if (this.thickness !== undefined) data.thickness = this.thickness;
                if (this.thicknessMap && this.thicknessMap.isTexture) data.thicknessMap = this.thicknessMap.toJSON(meta).uuid;
                if (this.attenuationDistance !== undefined) data.attenuationDistance = this.attenuationDistance;
                if (this.attenuationColor !== undefined) data.attenuationColor = this.attenuationColor.getHex();
                if (this.size !== undefined) data.size = this.size;
                if (this.shadowSide !== null) data.shadowSide = this.shadowSide;
                if (this.sizeAttenuation !== undefined) data.sizeAttenuation = this.sizeAttenuation;
                if (this.blending !== NormalBlending) data.blending = this.blending;
                if (this.side !== FrontSide) data.side = this.side;
                if (this.vertexColors) data.vertexColors = true;
                if (this.opacity < 1) data.opacity = this.opacity;
                if (this.transparent === true) data.transparent = this.transparent;
                data.depthFunc = this.depthFunc;
                data.depthTest = this.depthTest;
                data.depthWrite = this.depthWrite;
                data.colorWrite = this.colorWrite;
                data.alphaWrite = this.alphaWrite;
                data.stencilWrite = this.stencilWrite;
                data.stencilWriteMask = this.stencilWriteMask;
                data.stencilFunc = this.stencilFunc;
                data.stencilRef = this.stencilRef;
                data.stencilFuncMask = this.stencilFuncMask;
                data.stencilFail = this.stencilFail;
                data.stencilZFail = this.stencilZFail;
                data.stencilZPass = this.stencilZPass; // rotation (SpriteMaterial)
    
                if (this.rotation && this.rotation !== 0) data.rotation = this.rotation;
                if (this.polygonOffset === true) data.polygonOffset = true;
                if (this.polygonOffsetFactor !== 0) data.polygonOffsetFactor = this.polygonOffsetFactor;
                if (this.polygonOffsetUnits !== 0) data.polygonOffsetUnits = this.polygonOffsetUnits;
                if (this.linewidth && this.linewidth !== 1) data.linewidth = this.linewidth;
                if (this.dashSize !== undefined) data.dashSize = this.dashSize;
                if (this.gapSize !== undefined) data.gapSize = this.gapSize;
                if (this.scale !== undefined) data.scale = this.scale;
                if (this.dithering === true) data.dithering = true;
                if (this.alphaTest > 0) data.alphaTest = this.alphaTest;
                if (this.alphaToCoverage === true) data.alphaToCoverage = this.alphaToCoverage;
                if (this.premultipliedAlpha === true) data.premultipliedAlpha = this.premultipliedAlpha;
                if (this.wireframe === true) data.wireframe = this.wireframe;
                if (this.wireframeLinewidth > 1) data.wireframeLinewidth = this.wireframeLinewidth;
                if (this.wireframeLinecap !== 'round') data.wireframeLinecap = this.wireframeLinecap;
                if (this.wireframeLinejoin !== 'round') data.wireframeLinejoin = this.wireframeLinejoin;
                if (this.flatShading === true) data.flatShading = this.flatShading;
                if (this.visible === false) data.visible = false;
                if (this.toneMapped === false) data.toneMapped = false;
                if (JSON.stringify(this.userData) !== '{}') data.userData = this.userData; // TODO: Copied from Object3D.toJSON
    
                function extractFromCache(cache) {
                    const values = [];
    
                    for (const key in cache) {
                        const data = cache[key];
                        delete data.metadata;
                        values.push(data);
                    }
    
                    return values;
                }
    
                if (isRoot) {
                    const textures = extractFromCache(meta.textures);
                    const images = extractFromCache(meta.images);
                    if (textures.length > 0) data.textures = textures;
                    if (images.length > 0) data.images = images;
                }
    
                return data;
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
            copy(source) {
                this.name = source.name;
                this.fog = source.fog;
                this.blending = source.blending;
                this.side = source.side;
                this.vertexColors = source.vertexColors;
                this.opacity = source.opacity;
                this.transparent = source.transparent;
                this.blendSrc = source.blendSrc;
                this.blendDst = source.blendDst;
                this.blendEquation = source.blendEquation;
                this.blendSrcAlpha = source.blendSrcAlpha;
                this.blendDstAlpha = source.blendDstAlpha;
                this.blendEquationAlpha = source.blendEquationAlpha;
                this.depthFunc = source.depthFunc;
                this.depthTest = source.depthTest;
                this.depthWrite = source.depthWrite;
                this.stencilWriteMask = source.stencilWriteMask;
                this.stencilFunc = source.stencilFunc;
                this.stencilRef = source.stencilRef;
                this.stencilFuncMask = source.stencilFuncMask;
                this.stencilFail = source.stencilFail;
                this.stencilZFail = source.stencilZFail;
                this.stencilZPass = source.stencilZPass;
                this.stencilWrite = source.stencilWrite;
                const srcPlanes = source.clippingPlanes;
                let dstPlanes = null;
    
                if (srcPlanes !== null) {
                    const n = srcPlanes.length;
                    dstPlanes = new Array(n);
    
                    for (let i = 0; i !== n; ++i) {
                        dstPlanes[i] = srcPlanes[i].clone();
                    }
                }
    
                this.clippingPlanes = dstPlanes;
                this.clipIntersection = source.clipIntersection;
                this.clipShadows = source.clipShadows;
                this.shadowSide = source.shadowSide;
                this.colorWrite = source.colorWrite;
                this.alphaWrite = source.alphaWrite;
                this.precision = source.precision;
                this.polygonOffset = source.polygonOffset;
                this.polygonOffsetFactor = source.polygonOffsetFactor;
                this.polygonOffsetUnits = source.polygonOffsetUnits;
                this.dithering = source.dithering;
                this.alphaTest = source.alphaTest;
                this.alphaToCoverage = source.alphaToCoverage;
                this.premultipliedAlpha = source.premultipliedAlpha;
                this.visible = source.visible;
                this.toneMapped = source.toneMapped;
                this.userData = JSON.parse(JSON.stringify(source.userData));
                return this;
            }
    
            dispose() {
                this.dispatchEvent({
                    type: 'dispose'
                });
            }
    
            set needsUpdate(value) {
                if (value === true) this.version++;
            }
    
        }
    
        Material.prototype.isMaterial = true;
    
        /**
         * parameters = {
         *	color: <hex>,
         *	opacity: <float>,
         *	map: new THREE.Texture( <Image> ),
         *
         *	lightMap: new THREE.Texture( <Image> ),
         *	lightMapIntensity: <float>
         *
         *	aoMap: new THREE.Texture( <Image> ),
         *	aoMapIntensity: <float>
         *
         *	specularMap: new THREE.Texture( <Image> ),
         *
         *	alphaMap: new THREE.Texture( <Image> ),
         *
         *	envMap: new THREE.CubeTexture( [posx, negx, posy, negy, posz, negz] ),
         *	combine: THREE.Multiply,
         *	reflectivity: <float>,
         *	refractionRatio: <float>,
         *
         *	depthTest: <bool>,
         *	depthWrite: <bool>,
         *
         *	wireframe: <boolean>,
         *	wireframeLinewidth: <float>,
         * }
         */
    
        class MeshBasicMaterial extends Material {
            constructor(parameters) {
                super();
                this.type = 'MeshBasicMaterial';
                this.color = new Color(0xffffff); // emissive
    
                this.map = null;
                this.lightMap = null;
                this.lightMapIntensity = 1.0;
                this.aoMap = null;
                this.aoMapIntensity = 1.0;
                this.specularMap = null;
                this.alphaMap = null;
                this.envMap = null;
                this.combine = MultiplyOperation;
                this.reflectivity = 1;
                this.refractionRatio = 0.98;
                this.wireframe = false;
                this.wireframeLinewidth = 1;
                this.wireframeLinecap = 'round';
                this.wireframeLinejoin = 'round';
                this.setValues(parameters);
            }
    
            copy(source) {
                super.copy(source);
                this.color.copy(source.color);
                this.map = source.map;
                this.lightMap = source.lightMap;
                this.lightMapIntensity = source.lightMapIntensity;
                this.aoMap = source.aoMap;
                this.aoMapIntensity = source.aoMapIntensity;
                this.specularMap = source.specularMap;
                this.alphaMap = source.alphaMap;
                this.envMap = source.envMap;
                this.combine = source.combine;
                this.reflectivity = source.reflectivity;
                this.refractionRatio = source.refractionRatio;
                this.wireframe = source.wireframe;
                this.wireframeLinewidth = source.wireframeLinewidth;
                this.wireframeLinecap = source.wireframeLinecap;
                this.wireframeLinejoin = source.wireframeLinejoin;
                return this;
            }
    
        }
    
        MeshBasicMaterial.prototype.isMeshBasicMaterial = true;
    
        const _vector$9 = /*@__PURE__*/new Vector3();
    
        const _vector2$1 = /*@__PURE__*/new Vector2();
    
        class BufferAttribute {
            constructor(array, itemSize, normalized) {
                if (Array.isArray(array)) {
                    throw new TypeError('THREE.BufferAttribute: array should be a Typed Array.');
                }
    
                this.name = '';
                this.array = array;
                this.itemSize = itemSize;
                this.count = array !== undefined ? array.length / itemSize : 0;
                this.normalized = normalized === true;
                this.usage = StaticDrawUsage;
                this.updateRange = {
                    offset: 0,
                    count: -1
                };
                this.version = 0;
            }
    
            onUploadCallback() {}
    
            set needsUpdate(value) {
                if (value === true) this.version++;
            }
    
            setUsage(value) {
                this.usage = value;
                return this;
            }
    
            copy(source) {
                this.name = source.name;
                this.array = new source.array.constructor(source.array);
                this.itemSize = source.itemSize;
                this.count = source.count;
                this.normalized = source.normalized;
                this.usage = source.usage;
                return this;
            }
    
            copyAt(index1, attribute, index2) {
                index1 *= this.itemSize;
                index2 *= attribute.itemSize;
    
                for (let i = 0, l = this.itemSize; i < l; i++) {
                    this.array[index1 + i] = attribute.array[index2 + i];
                }
    
                return this;
            }
    
            copyArray(array) {
                this.array.set(array);
                return this;
            }
    
            copyColorsArray(colors) {
                const array = this.array;
                let offset = 0;
    
                for (let i = 0, l = colors.length; i < l; i++) {
                    let color = colors[i];
    
                    if (color === undefined) {
                        console.warn('THREE.BufferAttribute.copyColorsArray(): color is undefined', i);
                        color = new Color();
                    }
    
                    array[offset++] = color.r;
                    array[offset++] = color.g;
                    array[offset++] = color.b;
                }
    
                return this;
            }
    
            copyVector2sArray(vectors) {
                const array = this.array;
                let offset = 0;
    
                for (let i = 0, l = vectors.length; i < l; i++) {
                    let vector = vectors[i];
    
                    if (vector === undefined) {
                        console.warn('THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i);
                        vector = new Vector2();
                    }
    
                    array[offset++] = vector.x;
                    array[offset++] = vector.y;
                }
    
                return this;
            }
    
            copyVector3sArray(vectors) {
                const array = this.array;
                let offset = 0;
    
                for (let i = 0, l = vectors.length; i < l; i++) {
                    let vector = vectors[i];
    
                    if (vector === undefined) {
                        console.warn('THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i);
                        vector = new Vector3();
                    }
    
                    array[offset++] = vector.x;
                    array[offset++] = vector.y;
                    array[offset++] = vector.z;
                }
    
                return this;
            }
    
            copyVector4sArray(vectors) {
                const array = this.array;
                let offset = 0;
    
                for (let i = 0, l = vectors.length; i < l; i++) {
                    let vector = vectors[i];
    
                    if (vector === undefined) {
                        console.warn('THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i);
                        vector = new Vector4();
                    }
    
                    array[offset++] = vector.x;
                    array[offset++] = vector.y;
                    array[offset++] = vector.z;
                    array[offset++] = vector.w;
                }
    
                return this;
            }
    
            applyMatrix3(m) {
                if (this.itemSize === 2) {
                    for (let i = 0, l = this.count; i < l; i++) {
                        _vector2$1.fromBufferAttribute(this, i);
    
                        _vector2$1.applyMatrix3(m);
    
                        this.setXY(i, _vector2$1.x, _vector2$1.y);
                    }
                } else if (this.itemSize === 3) {
                    for (let i = 0, l = this.count; i < l; i++) {
                        _vector$9.fromBufferAttribute(this, i);
    
                        _vector$9.applyMatrix3(m);
    
                        this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);
                    }
                }
    
                return this;
            }
    
            applyMatrix4(m) {
                for (let i = 0, l = this.count; i < l; i++) {
                    _vector$9.x = this.getX(i);
                    _vector$9.y = this.getY(i);
                    _vector$9.z = this.getZ(i);
    
                    _vector$9.applyMatrix4(m);
    
                    this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);
                }
    
                return this;
            }
    
            applyNormalMatrix(m) {
                for (let i = 0, l = this.count; i < l; i++) {
                    _vector$9.x = this.getX(i);
                    _vector$9.y = this.getY(i);
                    _vector$9.z = this.getZ(i);
    
                    _vector$9.applyNormalMatrix(m);
    
                    this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);
                }
    
                return this;
            }
    
            transformDirection(m) {
                for (let i = 0, l = this.count; i < l; i++) {
                    _vector$9.x = this.getX(i);
                    _vector$9.y = this.getY(i);
                    _vector$9.z = this.getZ(i);
    
                    _vector$9.transformDirection(m);
    
                    this.setXYZ(i, _vector$9.x, _vector$9.y, _vector$9.z);
                }
    
                return this;
            }
    
            set(value, offset = 0) {
                this.array.set(value, offset);
                return this;
            }
    
            getX(index) {
                return this.array[index * this.itemSize];
            }
    
            setX(index, x) {
                this.array[index * this.itemSize] = x;
                return this;
            }
    
            getY(index) {
                return this.array[index * this.itemSize + 1];
            }
    
            setY(index, y) {
                this.array[index * this.itemSize + 1] = y;
                return this;
            }
    
            getZ(index) {
                return this.array[index * this.itemSize + 2];
            }
    
            setZ(index, z) {
                this.array[index * this.itemSize + 2] = z;
                return this;
            }
    
            getW(index) {
                return this.array[index * this.itemSize + 3];
            }
    
            setW(index, w) {
                this.array[index * this.itemSize + 3] = w;
                return this;
            }
    
            setXY(index, x, y) {
                index *= this.itemSize;
                this.array[index + 0] = x;
                this.array[index + 1] = y;
                return this;
            }
    
            setXYZ(index, x, y, z) {
                index *= this.itemSize;
                this.array[index + 0] = x;
                this.array[index + 1] = y;
                this.array[index + 2] = z;
                return this;
            }
    
            setXYZW(index, x, y, z, w) {
                index *= this.itemSize;
                this.array[index + 0] = x;
                this.array[index + 1] = y;
                this.array[index + 2] = z;
                this.array[index + 3] = w;
                return this;
            }
    
            onUpload(callback) {
                this.onUploadCallback = callback;
                return this;
            }
    
            clone() {
                return new this.constructor(this.array, this.itemSize).copy(this);
            }
    
            toJSON() {
                const data = {
                    itemSize: this.itemSize,
                    type: this.array.constructor.name,
                    array: Array.prototype.slice.call(this.array),
                    normalized: this.normalized
                };
                if (this.name !== '') data.name = this.name;
                if (this.usage !== StaticDrawUsage) data.usage = this.usage;
                if (this.updateRange.offset !== 0 || this.updateRange.count !== -1) data.updateRange = this.updateRange;
                return data;
            }
    
        }
    
        BufferAttribute.prototype.isBufferAttribute = true; //
    
        class Int8BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Int8Array(array), itemSize, normalized);
            }
    
        }
    
        class Uint8BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Uint8Array(array), itemSize, normalized);
            }
    
        }
    
        class Uint8ClampedBufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Uint8ClampedArray(array), itemSize, normalized);
            }
    
        }
    
        class Int16BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Int16Array(array), itemSize, normalized);
            }
    
        }
    
        class Uint16BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Uint16Array(array), itemSize, normalized);
            }
    
        }
    
        class Int32BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Int32Array(array), itemSize, normalized);
            }
    
        }
    
        class Uint32BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Uint32Array(array), itemSize, normalized);
            }
    
        }
    
        class Float16BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Uint16Array(array), itemSize, normalized);
            }
    
        }
    
        Float16BufferAttribute.prototype.isFloat16BufferAttribute = true;
    
        class Float32BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Float32Array(array), itemSize, normalized);
            }
    
        }
    
        class Float64BufferAttribute extends BufferAttribute {
            constructor(array, itemSize, normalized) {
                super(new Float64Array(array), itemSize, normalized);
            }
    
        } //
    
        let _id$1 = 0;
    
        const _m1 = /*@__PURE__*/new Matrix4();
    
        const _obj = /*@__PURE__*/new Object3D();
    
        const _offset = /*@__PURE__*/new Vector3();
    
        const _box$1 = /*@__PURE__*/new Box3();
    
        const _boxMorphTargets = /*@__PURE__*/new Box3();
    
        const _vector$8 = /*@__PURE__*/new Vector3();
    
        class BufferGeometry extends EventDispatcher {
            constructor() {
                super();
                Object.defineProperty(this, 'id', {
                    value: _id$1++
                });
                this.uuid = generateUUID();
                this.name = '';
                this.type = 'BufferGeometry';
                this.index = null;
                this.attributes = {};
                this.morphAttributes = {};
                this.morphTargetsRelative = false;
                this.groups = [];
                this.boundingBox = null;
                this.boundingSphere = null;
                this.drawRange = {
                    start: 0,
                    count: Infinity
                };
                this.userData = {};
            }
    
            getIndex() {
                return this.index;
            }
    
            setIndex(index) {
                if (Array.isArray(index)) {
                    this.index = new (arrayNeedsUint32(index) ? Uint32BufferAttribute : Uint16BufferAttribute)(index, 1);
                } else {
                    this.index = index;
                }
    
                return this;
            }
    
            getAttribute(name) {
                return this.attributes[name];
            }
    
            setAttribute(name, attribute) {
                this.attributes[name] = attribute;
                return this;
            }
    
            deleteAttribute(name) {
                delete this.attributes[name];
                return this;
            }
    
            hasAttribute(name) {
                return this.attributes[name] !== undefined;
            }
    
            addGroup(start, count, materialIndex = 0) {
                this.groups.push({
                    start: start,
                    count: count,
                    materialIndex: materialIndex
                });
            }
    
            clearGroups() {
                this.groups = [];
            }
    
            setDrawRange(start, count) {
                this.drawRange.start = start;
                this.drawRange.count = count;
            }
    
            applyMatrix4(matrix) {
                const position = this.attributes.position;
    
                if (position !== undefined) {
                    position.applyMatrix4(matrix);
                    position.needsUpdate = true;
                }
    
                const normal = this.attributes.normal;
    
                if (normal !== undefined) {
                    const normalMatrix = new Matrix3().getNormalMatrix(matrix);
                    normal.applyNormalMatrix(normalMatrix);
                    normal.needsUpdate = true;
                }
    
                const tangent = this.attributes.tangent;
    
                if (tangent !== undefined) {
                    tangent.transformDirection(matrix);
                    tangent.needsUpdate = true;
                }
    
                if (this.boundingBox !== null) {
                    this.computeBoundingBox();
                }
    
                if (this.boundingSphere !== null) {
                    this.computeBoundingSphere();
                }
    
                return this;
            }
    
            applyQuaternion(q) {
                _m1.makeRotationFromQuaternion(q);
    
                this.applyMatrix4(_m1);
                return this;
            }
    
            rotateX(angle) {
                // rotate geometry around world x-axis
                _m1.makeRotationX(angle);
    
                this.applyMatrix4(_m1);
                return this;
            }
    
            rotateY(angle) {
                // rotate geometry around world y-axis
                _m1.makeRotationY(angle);
    
                this.applyMatrix4(_m1);
                return this;
            }
    
            rotateZ(angle) {
                // rotate geometry around world z-axis
                _m1.makeRotationZ(angle);
    
                this.applyMatrix4(_m1);
                return this;
            }
    
            translate(x, y, z) {
                // translate geometry
                _m1.makeTranslation(x, y, z);
    
                this.applyMatrix4(_m1);
                return this;
            }
    
            scale(x, y, z) {
                // scale geometry
                _m1.makeScale(x, y, z);
    
                this.applyMatrix4(_m1);
                return this;
            }
    
            lookAt(vector) {
                _obj.lookAt(vector);
    
                _obj.updateMatrix();
    
                this.applyMatrix4(_obj.matrix);
                return this;
            }
    
            center() {
                this.computeBoundingBox();
                this.boundingBox.getCenter(_offset).negate();
                this.translate(_offset.x, _offset.y, _offset.z);
                return this;
            }
    
            setFromPoints(points) {
                const position = [];
    
                for (let i = 0, l = points.length; i < l; i++) {
                    const point = points[i];
                    position.push(point.x, point.y, point.z || 0);
                }
    
                this.setAttribute('position', new Float32BufferAttribute(position, 3));
                return this;
            }
    
            computeBoundingBox() {
                if (this.boundingBox === null) {
                    this.boundingBox = new Box3();
                }
    
                const position = this.attributes.position;
                const morphAttributesPosition = this.morphAttributes.position;
    
                if (position && position.isGLBufferAttribute) {
                    console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this);
                    this.boundingBox.set(new Vector3(-Infinity, -Infinity, -Infinity), new Vector3(+Infinity, +Infinity, +Infinity));
                    return;
                }
    
                if (position !== undefined) {
                    this.boundingBox.setFromBufferAttribute(position); // process morph attributes if present
    
                    if (morphAttributesPosition) {
                        for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {
                            const morphAttribute = morphAttributesPosition[i];
    
                            _box$1.setFromBufferAttribute(morphAttribute);
    
                            if (this.morphTargetsRelative) {
                                _vector$8.addVectors(this.boundingBox.min, _box$1.min);
    
                                this.boundingBox.expandByPoint(_vector$8);
    
                                _vector$8.addVectors(this.boundingBox.max, _box$1.max);
    
                                this.boundingBox.expandByPoint(_vector$8);
                            } else {
                                this.boundingBox.expandByPoint(_box$1.min);
                                this.boundingBox.expandByPoint(_box$1.max);
                            }
                        }
                    }
                } else {
                    this.boundingBox.makeEmpty();
                }
    
                if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
                    console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
                }
            }
    
            computeBoundingSphere() {
                if (this.boundingSphere === null) {
                    this.boundingSphere = new Sphere();
                }
    
                const position = this.attributes.position;
                const morphAttributesPosition = this.morphAttributes.position;
    
                if (position && position.isGLBufferAttribute) {
                    console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this);
                    this.boundingSphere.set(new Vector3(), Infinity);
                    return;
                }
    
                if (position) {
                    // first, find the center of the bounding sphere
                    const center = this.boundingSphere.center;
    
                    _box$1.setFromBufferAttribute(position); // process morph attributes if present
    
    
                    if (morphAttributesPosition) {
                        for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {
                            const morphAttribute = morphAttributesPosition[i];
    
                            _boxMorphTargets.setFromBufferAttribute(morphAttribute);
    
                            if (this.morphTargetsRelative) {
                                _vector$8.addVectors(_box$1.min, _boxMorphTargets.min);
    
                                _box$1.expandByPoint(_vector$8);
    
                                _vector$8.addVectors(_box$1.max, _boxMorphTargets.max);
    
                                _box$1.expandByPoint(_vector$8);
                            } else {
                                _box$1.expandByPoint(_boxMorphTargets.min);
    
                                _box$1.expandByPoint(_boxMorphTargets.max);
                            }
                        }
                    }
    
                    _box$1.getCenter(center); // second, try to find a boundingSphere with a radius smaller than the
                    // boundingSphere of the boundingBox: sqrt(3) smaller in the best case
    
    
                    let maxRadiusSq = 0;
    
                    for (let i = 0, il = position.count; i < il; i++) {
                        _vector$8.fromBufferAttribute(position, i);
    
                        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$8));
                    } // process morph attributes if present
    
    
                    if (morphAttributesPosition) {
                        for (let i = 0, il = morphAttributesPosition.length; i < il; i++) {
                            const morphAttribute = morphAttributesPosition[i];
                            const morphTargetsRelative = this.morphTargetsRelative;
    
                            for (let j = 0, jl = morphAttribute.count; j < jl; j++) {
                                _vector$8.fromBufferAttribute(morphAttribute, j);
    
                                if (morphTargetsRelative) {
                                    _offset.fromBufferAttribute(position, j);
    
                                    _vector$8.add(_offset);
                                }
    
                                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_vector$8));
                            }
                        }
                    }
    
                    this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
    
                    if (isNaN(this.boundingSphere.radius)) {
                        console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
                    }
                }
            }
    
            computeTangents() {
                const index = this.index;
                const attributes = this.attributes; // based on http://www.terathon.com/code/tangent.html
                // (per vertex tangents)
    
                if (index === null || attributes.position === undefined || attributes.normal === undefined || attributes.uv === undefined) {
                    console.error('THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)');
                    return;
                }
    
                const indices = index.array;
                const positions = attributes.position.array;
                const normals = attributes.normal.array;
                const uvs = attributes.uv.array;
                const nVertices = positions.length / 3;
    
                if (attributes.tangent === undefined) {
                    this.setAttribute('tangent', new BufferAttribute(new Float32Array(4 * nVertices), 4));
                }
    
                const tangents = attributes.tangent.array;
                const tan1 = [],
                            tan2 = [];
    
                for (let i = 0; i < nVertices; i++) {
                    tan1[i] = new Vector3();
                    tan2[i] = new Vector3();
                }
    
                const vA = new Vector3(),
                            vB = new Vector3(),
                            vC = new Vector3(),
                            uvA = new Vector2(),
                            uvB = new Vector2(),
                            uvC = new Vector2(),
                            sdir = new Vector3(),
                            tdir = new Vector3();
    
                function handleTriangle(a, b, c) {
                    vA.fromArray(positions, a * 3);
                    vB.fromArray(positions, b * 3);
                    vC.fromArray(positions, c * 3);
                    uvA.fromArray(uvs, a * 2);
                    uvB.fromArray(uvs, b * 2);
                    uvC.fromArray(uvs, c * 2);
                    vB.sub(vA);
                    vC.sub(vA);
                    uvB.sub(uvA);
                    uvC.sub(uvA);
                    const r = 1.0 / (uvB.x * uvC.y - uvC.x * uvB.y); // silently ignore degenerate uv triangles having coincident or colinear vertices
    
                    if (!isFinite(r)) return;
                    sdir.copy(vB).multiplyScalar(uvC.y).addScaledVector(vC, -uvB.y).multiplyScalar(r);
                    tdir.copy(vC).multiplyScalar(uvB.x).addScaledVector(vB, -uvC.x).multiplyScalar(r);
                    tan1[a].add(sdir);
                    tan1[b].add(sdir);
                    tan1[c].add(sdir);
                    tan2[a].add(tdir);
                    tan2[b].add(tdir);
                    tan2[c].add(tdir);
                }
    
                let groups = this.groups;
    
                if (groups.length === 0) {
                    groups = [{
                        start: 0,
                        count: indices.length
                    }];
                }
    
                for (let i = 0, il = groups.length; i < il; ++i) {
                    const group = groups[i];
                    const start = group.start;
                    const count = group.count;
    
                    for (let j = start, jl = start + count; j < jl; j += 3) {
                        handleTriangle(indices[j + 0], indices[j + 1], indices[j + 2]);
                    }
                }
    
                const tmp = new Vector3(),
                            tmp2 = new Vector3();
                const n = new Vector3(),
                            n2 = new Vector3();
    
                function handleVertex(v) {
                    n.fromArray(normals, v * 3);
                    n2.copy(n);
                    const t = tan1[v]; // Gram-Schmidt orthogonalize
    
                    tmp.copy(t);
                    tmp.sub(n.multiplyScalar(n.dot(t))).normalize(); // Calculate handedness
    
                    tmp2.crossVectors(n2, t);
                    const test = tmp2.dot(tan2[v]);
                    const w = test < 0.0 ? -1.0 : 1.0;
                    tangents[v * 4] = tmp.x;
                    tangents[v * 4 + 1] = tmp.y;
                    tangents[v * 4 + 2] = tmp.z;
                    tangents[v * 4 + 3] = w;
                }
    
                for (let i = 0, il = groups.length; i < il; ++i) {
                    const group = groups[i];
                    const start = group.start;
                    const count = group.count;
    
                    for (let j = start, jl = start + count; j < jl; j += 3) {
                        handleVertex(indices[j + 0]);
                        handleVertex(indices[j + 1]);
                        handleVertex(indices[j + 2]);
                    }
                }
            }
    
            computeVertexNormals() {
                const index = this.index;
                const positionAttribute = this.getAttribute('position');
    
                if (positionAttribute !== undefined) {
                    let normalAttribute = this.getAttribute('normal');
    
                    if (normalAttribute === undefined) {
                        normalAttribute = new BufferAttribute(new Float32Array(positionAttribute.count * 3), 3);
                        this.setAttribute('normal', normalAttribute);
                    } else {
                        // reset existing normals to zero
                        for (let i = 0, il = normalAttribute.count; i < il; i++) {
                            normalAttribute.setXYZ(i, 0, 0, 0);
                        }
                    }
    
                    const pA = new Vector3(),
                                pB = new Vector3(),
                                pC = new Vector3();
                    const nA = new Vector3(),
                                nB = new Vector3(),
                                nC = new Vector3();
                    const cb = new Vector3(),
                                ab = new Vector3(); // indexed elements
    
                    if (index) {
                        for (let i = 0, il = index.count; i < il; i += 3) {
                            const vA = index.getX(i + 0);
                            const vB = index.getX(i + 1);
                            const vC = index.getX(i + 2);
                            pA.fromBufferAttribute(positionAttribute, vA);
                            pB.fromBufferAttribute(positionAttribute, vB);
                            pC.fromBufferAttribute(positionAttribute, vC);
                            cb.subVectors(pC, pB);
                            ab.subVectors(pA, pB);
                            cb.cross(ab);
                            nA.fromBufferAttribute(normalAttribute, vA);
                            nB.fromBufferAttribute(normalAttribute, vB);
                            nC.fromBufferAttribute(normalAttribute, vC);
                            nA.add(cb);
                            nB.add(cb);
                            nC.add(cb);
                            normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
                            normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
                            normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
                        }
                    } else {
                        // non-indexed elements (unconnected triangle soup)
                        for (let i = 0, il = positionAttribute.count; i < il; i += 3) {
                            pA.fromBufferAttribute(positionAttribute, i + 0);
                            pB.fromBufferAttribute(positionAttribute, i + 1);
                            pC.fromBufferAttribute(positionAttribute, i + 2);
                            cb.subVectors(pC, pB);
                            ab.subVectors(pA, pB);
                            cb.cross(ab);
                            normalAttribute.setXYZ(i + 0, cb.x, cb.y, cb.z);
                            normalAttribute.setXYZ(i + 1, cb.x, cb.y, cb.z);
                            normalAttribute.setXYZ(i + 2, cb.x, cb.y, cb.z);
                        }
                    }
    
                    this.normalizeNormals();
                    normalAttribute.needsUpdate = true;
                }
            }
    
            merge(geometry, offset) {
                if (!(geometry && geometry.isBufferGeometry)) {
                    console.error('THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.', geometry);
                    return;
                }
    
                if (offset === undefined) {
                    offset = 0;
                    console.warn('THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. ' + 'Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.');
                }
    
                const attributes = this.attributes;
    
                for (const key in attributes) {
                    if (geometry.attributes[key] === undefined) continue;
                    const attribute1 = attributes[key];
                    const attributeArray1 = attribute1.array;
                    const attribute2 = geometry.attributes[key];
                    const attributeArray2 = attribute2.array;
                    const attributeOffset = attribute2.itemSize * offset;
                    const length = Math.min(attributeArray2.length, attributeArray1.length - attributeOffset);
    
                    for (let i = 0, j = attributeOffset; i < length; i++, j++) {
                        attributeArray1[j] = attributeArray2[i];
                    }
                }
    
                return this;
            }
    
            normalizeNormals() {
                const normals = this.attributes.normal;
    
                for (let i = 0, il = normals.count; i < il; i++) {
                    _vector$8.fromBufferAttribute(normals, i);
    
                    _vector$8.normalize();
    
                    normals.setXYZ(i, _vector$8.x, _vector$8.y, _vector$8.z);
                }
            }
    
            toNonIndexed() {
                function convertBufferAttribute(attribute, indices) {
                    const array = attribute.array;
                    const itemSize = attribute.itemSize;
                    const normalized = attribute.normalized;
                    const array2 = new array.constructor(indices.length * itemSize);
                    let index = 0,
                            index2 = 0;
    
                    for (let i = 0, l = indices.length; i < l; i++) {
                        if (attribute.isInterleavedBufferAttribute) {
                            index = indices[i] * attribute.data.stride + attribute.offset;
                        } else {
                            index = indices[i] * itemSize;
                        }
    
                        for (let j = 0; j < itemSize; j++) {
                            array2[index2++] = array[index++];
                        }
                    }
    
                    return new BufferAttribute(array2, itemSize, normalized);
                } //
    
    
                if (this.index === null) {
                    console.warn('THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.');
                    return this;
                }
    
                const geometry2 = new BufferGeometry();
                const indices = this.index.array;
                const attributes = this.attributes; // attributes
    
                for (const name in attributes) {
                    const attribute = attributes[name];
                    const newAttribute = convertBufferAttribute(attribute, indices);
                    geometry2.setAttribute(name, newAttribute);
                } // morph attributes
    
    
                const morphAttributes = this.morphAttributes;
    
                for (const name in morphAttributes) {
                    const morphArray = [];
                    const morphAttribute = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes
    
                    for (let i = 0, il = morphAttribute.length; i < il; i++) {
                        const attribute = morphAttribute[i];
                        const newAttribute = convertBufferAttribute(attribute, indices);
                        morphArray.push(newAttribute);
                    }
    
                    geometry2.morphAttributes[name] = morphArray;
                }
    
                geometry2.morphTargetsRelative = this.morphTargetsRelative; // groups
    
                const groups = this.groups;
    
                for (let i = 0, l = groups.length; i < l; i++) {
                    const group = groups[i];
                    geometry2.addGroup(group.start, group.count, group.materialIndex);
                }
    
                return geometry2;
            }
    
            toJSON() {
                const data = {
                    metadata: {
                        version: 4.5,
                        type: 'BufferGeometry',
                        generator: 'BufferGeometry.toJSON'
                    }
                }; // standard BufferGeometry serialization
    
                data.uuid = this.uuid;
                data.type = this.type;
                if (this.name !== '') data.name = this.name;
                if (Object.keys(this.userData).length > 0) data.userData = this.userData;
    
                if (this.parameters !== undefined) {
                    const parameters = this.parameters;
    
                    for (const key in parameters) {
                        if (parameters[key] !== undefined) data[key] = parameters[key];
                    }
    
                    return data;
                } // for simplicity the code assumes attributes are not shared across geometries, see #15811
    
    
                data.data = {
                    attributes: {}
                };
                const index = this.index;
    
                if (index !== null) {
                    data.data.index = {
                        type: index.array.constructor.name,
                        array: Array.prototype.slice.call(index.array)
                    };
                }
    
                const attributes = this.attributes;
    
                for (const key in attributes) {
                    const attribute = attributes[key];
                    data.data.attributes[key] = attribute.toJSON(data.data);
                }
    
                const morphAttributes = {};
                let hasMorphAttributes = false;
    
                for (const key in this.morphAttributes) {
                    const attributeArray = this.morphAttributes[key];
                    const array = [];
    
                    for (let i = 0, il = attributeArray.length; i < il; i++) {
                        const attribute = attributeArray[i];
                        array.push(attribute.toJSON(data.data));
                    }
    
                    if (array.length > 0) {
                        morphAttributes[key] = array;
                        hasMorphAttributes = true;
                    }
                }
    
                if (hasMorphAttributes) {
                    data.data.morphAttributes = morphAttributes;
                    data.data.morphTargetsRelative = this.morphTargetsRelative;
                }
    
                const groups = this.groups;
    
                if (groups.length > 0) {
                    data.data.groups = JSON.parse(JSON.stringify(groups));
                }
    
                const boundingSphere = this.boundingSphere;
    
                if (boundingSphere !== null) {
                    data.data.boundingSphere = {
                        center: boundingSphere.center.toArray(),
                        radius: boundingSphere.radius
                    };
                }
    
                return data;
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
            copy(source) {
                // reset
                this.index = null;
                this.attributes = {};
                this.morphAttributes = {};
                this.groups = [];
                this.boundingBox = null;
                this.boundingSphere = null; // used for storing cloned, shared data
    
                const data = {}; // name
    
                this.name = source.name; // index
    
                const index = source.index;
    
                if (index !== null) {
                    this.setIndex(index.clone(data));
                } // attributes
    
    
                const attributes = source.attributes;
    
                for (const name in attributes) {
                    const attribute = attributes[name];
                    this.setAttribute(name, attribute.clone(data));
                } // morph attributes
    
    
                const morphAttributes = source.morphAttributes;
    
                for (const name in morphAttributes) {
                    const array = [];
                    const morphAttribute = morphAttributes[name]; // morphAttribute: array of Float32BufferAttributes
    
                    for (let i = 0, l = morphAttribute.length; i < l; i++) {
                        array.push(morphAttribute[i].clone(data));
                    }
    
                    this.morphAttributes[name] = array;
                }
    
                this.morphTargetsRelative = source.morphTargetsRelative; // groups
    
                const groups = source.groups;
    
                for (let i = 0, l = groups.length; i < l; i++) {
                    const group = groups[i];
                    this.addGroup(group.start, group.count, group.materialIndex);
                } // bounding box
    
    
                const boundingBox = source.boundingBox;
    
                if (boundingBox !== null) {
                    this.boundingBox = boundingBox.clone();
                } // bounding sphere
    
    
                const boundingSphere = source.boundingSphere;
    
                if (boundingSphere !== null) {
                    this.boundingSphere = boundingSphere.clone();
                } // draw range
    
    
                this.drawRange.start = source.drawRange.start;
                this.drawRange.count = source.drawRange.count; // user data
    
                this.userData = source.userData; // geometry generator parameters
    
                if (source.parameters !== undefined) this.parameters = Object.assign({}, source.parameters);
                return this;
            }
    
            dispose() {
                this.dispatchEvent({
                    type: 'dispose'
                });
            }
    
        }
    
        BufferGeometry.prototype.isBufferGeometry = true;
    
        const _inverseMatrix$2 = /*@__PURE__*/new Matrix4();
    
        const _ray$2 = /*@__PURE__*/new Ray();
    
        const _sphere$3 = /*@__PURE__*/new Sphere();
    
        const _vA$1 = /*@__PURE__*/new Vector3();
    
        const _vB$1 = /*@__PURE__*/new Vector3();
    
        const _vC$1 = /*@__PURE__*/new Vector3();
    
        const _tempA = /*@__PURE__*/new Vector3();
    
        const _tempB = /*@__PURE__*/new Vector3();
    
        const _tempC = /*@__PURE__*/new Vector3();
    
        const _morphA = /*@__PURE__*/new Vector3();
    
        const _morphB = /*@__PURE__*/new Vector3();
    
        const _morphC = /*@__PURE__*/new Vector3();
    
        const _uvA$1 = /*@__PURE__*/new Vector2();
    
        const _uvB$1 = /*@__PURE__*/new Vector2();
    
        const _uvC$1 = /*@__PURE__*/new Vector2();
    
        const _intersectionPoint = /*@__PURE__*/new Vector3();
    
        const _intersectionPointWorld = /*@__PURE__*/new Vector3();
    
        class Mesh extends Object3D {
            constructor(geometry = new BufferGeometry(), material = new MeshBasicMaterial()) {
                super();
                this.type = 'Mesh';
                this.geometry = geometry;
                this.material = material;
                this.updateMorphTargets();
            }
    
            copy(source) {
                super.copy(source);
    
                if (source.morphTargetInfluences !== undefined) {
                    this.morphTargetInfluences = source.morphTargetInfluences.slice();
                }
    
                if (source.morphTargetDictionary !== undefined) {
                    this.morphTargetDictionary = Object.assign({}, source.morphTargetDictionary);
                }
    
                this.material = source.material;
                this.geometry = source.geometry;
                return this;
            }
    
            updateMorphTargets() {
                const geometry = this.geometry;
    
                if (geometry.isBufferGeometry) {
                    const morphAttributes = geometry.morphAttributes;
                    const keys = Object.keys(morphAttributes);
    
                    if (keys.length > 0) {
                        const morphAttribute = morphAttributes[keys[0]];
    
                        if (morphAttribute !== undefined) {
                            this.morphTargetInfluences = [];
                            this.morphTargetDictionary = {};
    
                            for (let m = 0, ml = morphAttribute.length; m < ml; m++) {
                                const name = morphAttribute[m].name || String(m);
                                this.morphTargetInfluences.push(0);
                                this.morphTargetDictionary[name] = m;
                            }
                        }
                    }
                } else {
                    const morphTargets = geometry.morphTargets;
    
                    if (morphTargets !== undefined && morphTargets.length > 0) {
                        console.error('THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.');
                    }
                }
            }
    
            raycast(raycaster, intersects) {
                const geometry = this.geometry;
                const material = this.material;
                const matrixWorld = this.matrixWorld;
                if (material === undefined) return; // Checking boundingSphere distance to ray
    
                if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    
                _sphere$3.copy(geometry.boundingSphere);
    
                _sphere$3.applyMatrix4(matrixWorld);
    
                if (raycaster.ray.intersectsSphere(_sphere$3) === false) return; //
    
                _inverseMatrix$2.copy(matrixWorld).invert();
    
                _ray$2.copy(raycaster.ray).applyMatrix4(_inverseMatrix$2); // Check boundingBox before continuing
    
    
                if (geometry.boundingBox !== null) {
                    if (_ray$2.intersectsBox(geometry.boundingBox) === false) return;
                }
    
                let intersection;
    
                if (geometry.isBufferGeometry) {
                    const index = geometry.index;
                    const position = geometry.attributes.position;
                    const morphPosition = geometry.morphAttributes.position;
                    const morphTargetsRelative = geometry.morphTargetsRelative;
                    const uv = geometry.attributes.uv;
                    const uv2 = geometry.attributes.uv2;
                    const groups = geometry.groups;
                    const drawRange = geometry.drawRange;
    
                    if (index !== null) {
                        // indexed buffer geometry
                        if (Array.isArray(material)) {
                            for (let i = 0, il = groups.length; i < il; i++) {
                                const group = groups[i];
                                const groupMaterial = material[group.materialIndex];
                                const start = Math.max(group.start, drawRange.start);
                                const end = Math.min(index.count, Math.min(group.start + group.count, drawRange.start + drawRange.count));
    
                                for (let j = start, jl = end; j < jl; j += 3) {
                                    const a = index.getX(j);
                                    const b = index.getX(j + 1);
                                    const c = index.getX(j + 2);
                                    intersection = checkBufferGeometryIntersection(this, groupMaterial, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
    
                                    if (intersection) {
                                        intersection.faceIndex = Math.floor(j / 3); // triangle number in indexed buffer semantics
    
                                        intersection.face.materialIndex = group.materialIndex;
                                        intersects.push(intersection);
                                    }
                                }
                            }
                        } else {
                            const start = Math.max(0, drawRange.start);
                            const end = Math.min(index.count, drawRange.start + drawRange.count);
    
                            for (let i = start, il = end; i < il; i += 3) {
                                const a = index.getX(i);
                                const b = index.getX(i + 1);
                                const c = index.getX(i + 2);
                                intersection = checkBufferGeometryIntersection(this, material, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
    
                                if (intersection) {
                                    intersection.faceIndex = Math.floor(i / 3); // triangle number in indexed buffer semantics
    
                                    intersects.push(intersection);
                                }
                            }
                        }
                    } else if (position !== undefined) {
                        // non-indexed buffer geometry
                        if (Array.isArray(material)) {
                            for (let i = 0, il = groups.length; i < il; i++) {
                                const group = groups[i];
                                const groupMaterial = material[group.materialIndex];
                                const start = Math.max(group.start, drawRange.start);
                                const end = Math.min(position.count, Math.min(group.start + group.count, drawRange.start + drawRange.count));
    
                                for (let j = start, jl = end; j < jl; j += 3) {
                                    const a = j;
                                    const b = j + 1;
                                    const c = j + 2;
                                    intersection = checkBufferGeometryIntersection(this, groupMaterial, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
    
                                    if (intersection) {
                                        intersection.faceIndex = Math.floor(j / 3); // triangle number in non-indexed buffer semantics
    
                                        intersection.face.materialIndex = group.materialIndex;
                                        intersects.push(intersection);
                                    }
                                }
                            }
                        } else {
                            const start = Math.max(0, drawRange.start);
                            const end = Math.min(position.count, drawRange.start + drawRange.count);
    
                            for (let i = start, il = end; i < il; i += 3) {
                                const a = i;
                                const b = i + 1;
                                const c = i + 2;
                                intersection = checkBufferGeometryIntersection(this, material, raycaster, _ray$2, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c);
    
                                if (intersection) {
                                    intersection.faceIndex = Math.floor(i / 3); // triangle number in non-indexed buffer semantics
    
                                    intersects.push(intersection);
                                }
                            }
                        }
                    }
                } else if (geometry.isGeometry) {
                    console.error('THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.');
                }
            }
    
        }
    
        Mesh.prototype.isMesh = true;
    
        function checkIntersection(object, material, raycaster, ray, pA, pB, pC, point) {
            let intersect;
    
            if (material.side === BackSide) {
                intersect = ray.intersectTriangle(pC, pB, pA, true, point);
            } else {
                intersect = ray.intersectTriangle(pA, pB, pC, material.side !== DoubleSide, point);
            }
    
            if (intersect === null) return null;
    
            _intersectionPointWorld.copy(point);
    
            _intersectionPointWorld.applyMatrix4(object.matrixWorld);
    
            const distance = raycaster.ray.origin.distanceTo(_intersectionPointWorld);
            if (distance < raycaster.near || distance > raycaster.far) return null;
            return {
                distance: distance,
                point: _intersectionPointWorld.clone(),
                object: object
            };
        }
    
        function checkBufferGeometryIntersection(object, material, raycaster, ray, position, morphPosition, morphTargetsRelative, uv, uv2, a, b, c) {
            _vA$1.fromBufferAttribute(position, a);
    
            _vB$1.fromBufferAttribute(position, b);
    
            _vC$1.fromBufferAttribute(position, c);
    
            const morphInfluences = object.morphTargetInfluences;
    
            if (morphPosition && morphInfluences) {
                _morphA.set(0, 0, 0);
    
                _morphB.set(0, 0, 0);
    
                _morphC.set(0, 0, 0);
    
                for (let i = 0, il = morphPosition.length; i < il; i++) {
                    const influence = morphInfluences[i];
                    const morphAttribute = morphPosition[i];
                    if (influence === 0) continue;
    
                    _tempA.fromBufferAttribute(morphAttribute, a);
    
                    _tempB.fromBufferAttribute(morphAttribute, b);
    
                    _tempC.fromBufferAttribute(morphAttribute, c);
    
                    if (morphTargetsRelative) {
                        _morphA.addScaledVector(_tempA, influence);
    
                        _morphB.addScaledVector(_tempB, influence);
    
                        _morphC.addScaledVector(_tempC, influence);
                    } else {
                        _morphA.addScaledVector(_tempA.sub(_vA$1), influence);
    
                        _morphB.addScaledVector(_tempB.sub(_vB$1), influence);
    
                        _morphC.addScaledVector(_tempC.sub(_vC$1), influence);
                    }
                }
    
                _vA$1.add(_morphA);
    
                _vB$1.add(_morphB);
    
                _vC$1.add(_morphC);
            }
    
            if (object.isSkinnedMesh) {
                object.boneTransform(a, _vA$1);
                object.boneTransform(b, _vB$1);
                object.boneTransform(c, _vC$1);
            }
    
            const intersection = checkIntersection(object, material, raycaster, ray, _vA$1, _vB$1, _vC$1, _intersectionPoint);
    
            if (intersection) {
                if (uv) {
                    _uvA$1.fromBufferAttribute(uv, a);
    
                    _uvB$1.fromBufferAttribute(uv, b);
    
                    _uvC$1.fromBufferAttribute(uv, c);
    
                    intersection.uv = Triangle.getUV(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2());
                }
    
                if (uv2) {
                    _uvA$1.fromBufferAttribute(uv2, a);
    
                    _uvB$1.fromBufferAttribute(uv2, b);
    
                    _uvC$1.fromBufferAttribute(uv2, c);
    
                    intersection.uv2 = Triangle.getUV(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2());
                }
    
                const face = {
                    a: a,
                    b: b,
                    c: c,
                    normal: new Vector3(),
                    materialIndex: 0
                };
                Triangle.getNormal(_vA$1, _vB$1, _vC$1, face.normal);
                intersection.face = face;
            }
    
            return intersection;
        }
    
        class BoxGeometry extends BufferGeometry {
            constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
                super();
                this.type = 'BoxGeometry';
                this.parameters = {
                    width: width,
                    height: height,
                    depth: depth,
                    widthSegments: widthSegments,
                    heightSegments: heightSegments,
                    depthSegments: depthSegments
                };
                const scope = this; // segments
    
                widthSegments = Math.floor(widthSegments);
                heightSegments = Math.floor(heightSegments);
                depthSegments = Math.floor(depthSegments); // buffers
    
                const indices = [];
                const vertices = [];
                const normals = [];
                const uvs = []; // helper variables
    
                let numberOfVertices = 0;
                let groupStart = 0; // build each side of the box geometry
    
                buildPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments, 0); // px
    
                buildPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments, 1); // nx
    
                buildPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2); // py
    
                buildPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments, 3); // ny
    
                buildPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments, 4); // pz
    
                buildPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments, 5); // nz
                // build geometry
    
                this.setIndex(indices);
                this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
                this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
                this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    
                function buildPlane(u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex) {
                    const segmentWidth = width / gridX;
                    const segmentHeight = height / gridY;
                    const widthHalf = width / 2;
                    const heightHalf = height / 2;
                    const depthHalf = depth / 2;
                    const gridX1 = gridX + 1;
                    const gridY1 = gridY + 1;
                    let vertexCounter = 0;
                    let groupCount = 0;
                    const vector = new Vector3(); // generate vertices, normals and uvs
    
                    for (let iy = 0; iy < gridY1; iy++) {
                        const y = iy * segmentHeight - heightHalf;
    
                        for (let ix = 0; ix < gridX1; ix++) {
                            const x = ix * segmentWidth - widthHalf; // set values to correct vector component
    
                            vector[u] = x * udir;
                            vector[v] = y * vdir;
                            vector[w] = depthHalf; // now apply vector to vertex buffer
    
                            vertices.push(vector.x, vector.y, vector.z); // set values to correct vector component
    
                            vector[u] = 0;
                            vector[v] = 0;
                            vector[w] = depth > 0 ? 1 : -1; // now apply vector to normal buffer
    
                            normals.push(vector.x, vector.y, vector.z); // uvs
    
                            uvs.push(ix / gridX);
                            uvs.push(1 - iy / gridY); // counters
    
                            vertexCounter += 1;
                        }
                    } // indices
                    // 1. you need three indices to draw a single face
                    // 2. a single segment consists of two faces
                    // 3. so we need to generate six (2*3) indices per segment
    
    
                    for (let iy = 0; iy < gridY; iy++) {
                        for (let ix = 0; ix < gridX; ix++) {
                            const a = numberOfVertices + ix + gridX1 * iy;
                            const b = numberOfVertices + ix + gridX1 * (iy + 1);
                            const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
                            const d = numberOfVertices + (ix + 1) + gridX1 * iy; // faces
    
                            indices.push(a, b, d);
                            indices.push(b, c, d); // increase counter
    
                            groupCount += 6;
                        }
                    } // add a group to the geometry. this will ensure multi material support
    
    
                    scope.addGroup(groupStart, groupCount, materialIndex); // calculate new start value for groups
    
                    groupStart += groupCount; // update total number of vertices
    
                    numberOfVertices += vertexCounter;
                }
            }
    
            static fromJSON(data) {
                return new BoxGeometry(data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments);
            }
    
        }
    
        /**
         * Uniform Utilities
         */
        function cloneUniforms(src) {
            const dst = {};
    
            for (const u in src) {
                dst[u] = {};
    
                for (const p in src[u]) {
                    const property = src[u][p];
    
                    if (property && (property.isColor || property.isMatrix3 || property.isMatrix4 || property.isVector2 || property.isVector3 || property.isVector4 || property.isTexture || property.isQuaternion)) {
                        dst[u][p] = property.clone();
                    } else if (Array.isArray(property)) {
                        dst[u][p] = property.slice();
                    } else {
                        dst[u][p] = property;
                    }
                }
            }
    
            return dst;
        }
        function mergeUniforms(uniforms) {
            const merged = {};
    
            for (let u = 0; u < uniforms.length; u++) {
                const tmp = cloneUniforms(uniforms[u]);
    
                for (const p in tmp) {
                    merged[p] = tmp[p];
                }
            }
    
            return merged;
        } // Legacy
    
        const UniformsUtils = {
            clone: cloneUniforms,
            merge: mergeUniforms
        };
    
        var default_vertex = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
    
        var default_fragment = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
    
        /**
         * parameters = {
         *	defines: { "label" : "value" },
         *	uniforms: { "parameter1": { value: 1.0 }, "parameter2": { value2: 2 } },
         *
         *	fragmentShader: <string>,
         *	vertexShader: <string>,
         *
         *	wireframe: <boolean>,
         *	wireframeLinewidth: <float>,
         *
         *	lights: <bool>
         * }
         */
    
        class ShaderMaterial extends Material {
            constructor(parameters) {
                super();
                this.type = 'ShaderMaterial';
                this.defines = {};
                this.uniforms = {};
                this.vertexShader = default_vertex;
                this.fragmentShader = default_fragment;
                this.linewidth = 1;
                this.wireframe = false;
                this.wireframeLinewidth = 1;
                this.fog = false; // set to use scene fog
    
                this.lights = false; // set to use scene lights
    
                this.clipping = false; // set to use user-defined clipping planes
    
                this.extensions = {
                    derivatives: false,
                    // set to use derivatives
                    fragDepth: false,
                    // set to use fragment depth values
                    drawBuffers: false,
                    // set to use draw buffers
                    shaderTextureLOD: false // set to use shader texture LOD
    
                }; // When rendered geometry doesn't include these attributes but the material does,
                // use these default values in WebGL. This avoids errors when buffer data is missing.
    
                this.defaultAttributeValues = {
                    'color': [1, 1, 1],
                    'uv': [0, 0],
                    'uv2': [0, 0]
                };
                this.index0AttributeName = undefined;
                this.uniformsNeedUpdate = false;
                this.glslVersion = null;
    
                if (parameters !== undefined) {
                    if (parameters.attributes !== undefined) {
                        console.error('THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.');
                    }
    
                    this.setValues(parameters);
                }
            }
    
            copy(source) {
                super.copy(source);
                this.fragmentShader = source.fragmentShader;
                this.vertexShader = source.vertexShader;
                this.uniforms = cloneUniforms(source.uniforms);
                this.defines = Object.assign({}, source.defines);
                this.wireframe = source.wireframe;
                this.wireframeLinewidth = source.wireframeLinewidth;
                this.lights = source.lights;
                this.clipping = source.clipping;
                this.extensions = Object.assign({}, source.extensions);
                this.glslVersion = source.glslVersion;
                return this;
            }
    
            toJSON(meta) {
                const data = super.toJSON(meta);
                data.glslVersion = this.glslVersion;
                data.uniforms = {};
    
                for (const name in this.uniforms) {
                    const uniform = this.uniforms[name];
                    const value = uniform.value;
    
                    if (value && value.isTexture) {
                        data.uniforms[name] = {
                            type: 't',
                            value: value.toJSON(meta).uuid
                        };
                    } else if (value && value.isColor) {
                        data.uniforms[name] = {
                            type: 'c',
                            value: value.getHex()
                        };
                    } else if (value && value.isVector2) {
                        data.uniforms[name] = {
                            type: 'v2',
                            value: value.toArray()
                        };
                    } else if (value && value.isVector3) {
                        data.uniforms[name] = {
                            type: 'v3',
                            value: value.toArray()
                        };
                    } else if (value && value.isVector4) {
                        data.uniforms[name] = {
                            type: 'v4',
                            value: value.toArray()
                        };
                    } else if (value && value.isMatrix3) {
                        data.uniforms[name] = {
                            type: 'm3',
                            value: value.toArray()
                        };
                    } else if (value && value.isMatrix4) {
                        data.uniforms[name] = {
                            type: 'm4',
                            value: value.toArray()
                        };
                    } else {
                        data.uniforms[name] = {
                            value: value
                        }; // note: the array variants v2v, v3v, v4v, m4v and tv are not supported so far
                    }
                }
    
                if (Object.keys(this.defines).length > 0) data.defines = this.defines;
                data.vertexShader = this.vertexShader;
                data.fragmentShader = this.fragmentShader;
                const extensions = {};
    
                for (const key in this.extensions) {
                    if (this.extensions[key] === true) extensions[key] = true;
                }
    
                if (Object.keys(extensions).length > 0) data.extensions = extensions;
                return data;
            }
    
        }
    
        ShaderMaterial.prototype.isShaderMaterial = true;
    
        class Camera extends Object3D {
            constructor() {
                super();
                this.type = 'Camera';
                this.matrixWorldInverse = new Matrix4();
                this.projectionMatrix = new Matrix4();
                this.projectionMatrixInverse = new Matrix4();
            }
    
            copy(source, recursive) {
                super.copy(source, recursive);
                this.matrixWorldInverse.copy(source.matrixWorldInverse);
                this.projectionMatrix.copy(source.projectionMatrix);
                this.projectionMatrixInverse.copy(source.projectionMatrixInverse);
                return this;
            }
    
            getWorldDirection(target) {
                this.updateWorldMatrix(true, false);
                const e = this.matrixWorld.elements;
                return target.set(-e[8], -e[9], -e[10]).normalize();
            }
    
            updateMatrixWorld(force) {
                super.updateMatrixWorld(force);
                this.matrixWorldInverse.copy(this.matrixWorld).invert();
            }
    
            updateWorldMatrix(updateParents, updateChildren) {
                super.updateWorldMatrix(updateParents, updateChildren);
                this.matrixWorldInverse.copy(this.matrixWorld).invert();
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
        }
    
        Camera.prototype.isCamera = true;
    
        class PerspectiveCamera extends Camera {
            constructor(fov = 50, aspect = 1, near = 0.1, far = 2000) {
                super();
                this.type = 'PerspectiveCamera';
                this.fov = fov;
                this.zoom = 1;
                this.near = near;
                this.far = far;
                this.focus = 10;
                this.aspect = aspect;
                this.view = null;
                this.filmGauge = 35; // width of the film (default in millimeters)
    
                this.filmOffset = 0; // horizontal film offset (same unit as gauge)
    
                this.updateProjectionMatrix();
            }
    
            copy(source, recursive) {
                super.copy(source, recursive);
                this.fov = source.fov;
                this.zoom = source.zoom;
                this.near = source.near;
                this.far = source.far;
                this.focus = source.focus;
                this.aspect = source.aspect;
                this.view = source.view === null ? null : Object.assign({}, source.view);
                this.filmGauge = source.filmGauge;
                this.filmOffset = source.filmOffset;
                return this;
            }
            /**
             * Sets the FOV by focal length in respect to the current .filmGauge.
             *
             * The default film gauge is 35, so that the focal length can be specified for
             * a 35mm (full frame) camera.
             *
             * Values for focal length and film gauge must have the same unit.
             */
    
    
            setFocalLength(focalLength) {
                /** see {@link http://www.bobatkins.com/photography/technical/field_of_view.html} */
                const vExtentSlope = 0.5 * this.getFilmHeight() / focalLength;
                this.fov = RAD2DEG * 2 * Math.atan(vExtentSlope);
                this.updateProjectionMatrix();
            }
            /**
             * Calculates the focal length from the current .fov and .filmGauge.
             */
    
    
            getFocalLength() {
                const vExtentSlope = Math.tan(DEG2RAD * 0.5 * this.fov);
                return 0.5 * this.getFilmHeight() / vExtentSlope;
            }
    
            getEffectiveFOV() {
                return RAD2DEG * 2 * Math.atan(Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom);
            }
    
            getFilmWidth() {
                // film not completely covered in portrait format (aspect < 1)
                return this.filmGauge * Math.min(this.aspect, 1);
            }
    
            getFilmHeight() {
                // film not completely covered in landscape format (aspect > 1)
                return this.filmGauge / Math.max(this.aspect, 1);
            }
            /**
             * Sets an offset in a larger frustum. This is useful for multi-window or
             * multi-monitor/multi-machine setups.
             *
             * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
             * the monitors are in grid like this
             *
             *	 +---+---+---+
             *	 | A | B | C |
             *	 +---+---+---+
             *	 | D | E | F |
             *	 +---+---+---+
             *
             * then for each monitor you would call it like this
             *
             *	 const w = 1920;
             *	 const h = 1080;
             *	 const fullWidth = w * 3;
             *	 const fullHeight = h * 2;
             *
             *	 --A--
             *	 camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
             *	 --B--
             *	 camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
             *	 --C--
             *	 camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
             *	 --D--
             *	 camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
             *	 --E--
             *	 camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
             *	 --F--
             *	 camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
             *
             *	 Note there is no reason monitors have to be the same size or in a grid.
             */
    
    
            setViewOffset(fullWidth, fullHeight, x, y, width, height) {
                this.aspect = fullWidth / fullHeight;
    
                if (this.view === null) {
                    this.view = {
                        enabled: true,
                        fullWidth: 1,
                        fullHeight: 1,
                        offsetX: 0,
                        offsetY: 0,
                        width: 1,
                        height: 1
                    };
                }
    
                this.view.enabled = true;
                this.view.fullWidth = fullWidth;
                this.view.fullHeight = fullHeight;
                this.view.offsetX = x;
                this.view.offsetY = y;
                this.view.width = width;
                this.view.height = height;
                this.updateProjectionMatrix();
            }
    
            clearViewOffset() {
                if (this.view !== null) {
                    this.view.enabled = false;
                }
    
                this.updateProjectionMatrix();
            }
    
            updateProjectionMatrix() {
                const near = this.near;
                let top = near * Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom;
                let height = 2 * top;
                let width = this.aspect * height;
                let left = -0.5 * width;
                const view = this.view;
    
                if (this.view !== null && this.view.enabled) {
                    const fullWidth = view.fullWidth,
                                fullHeight = view.fullHeight;
                    left += view.offsetX * width / fullWidth;
                    top -= view.offsetY * height / fullHeight;
                    width *= view.width / fullWidth;
                    height *= view.height / fullHeight;
                }
    
                const skew = this.filmOffset;
                if (skew !== 0) left += near * skew / this.getFilmWidth();
                this.projectionMatrix.makePerspective(left, left + width, top, top - height, near, this.far);
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
            }
    
            toJSON(meta) {
                const data = super.toJSON(meta);
                data.object.fov = this.fov;
                data.object.zoom = this.zoom;
                data.object.near = this.near;
                data.object.far = this.far;
                data.object.focus = this.focus;
                data.object.aspect = this.aspect;
                if (this.view !== null) data.object.view = Object.assign({}, this.view);
                data.object.filmGauge = this.filmGauge;
                data.object.filmOffset = this.filmOffset;
                return data;
            }
    
        }
    
        PerspectiveCamera.prototype.isPerspectiveCamera = true;
    
        const fov = 90,
                    aspect = 1;
    
        class CubeCamera extends Object3D {
            constructor(near, far, renderTarget) {
                super();
                this.type = 'CubeCamera';
    
                if (renderTarget.isWebGLCubeRenderTarget !== true) {
                    console.error('THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.');
                    return;
                }
    
                this.renderTarget = renderTarget;
                const cameraPX = new PerspectiveCamera(fov, aspect, near, far);
                cameraPX.layers = this.layers;
                cameraPX.up.set(0, -1, 0);
                cameraPX.lookAt(new Vector3(1, 0, 0));
                this.add(cameraPX);
                const cameraNX = new PerspectiveCamera(fov, aspect, near, far);
                cameraNX.layers = this.layers;
                cameraNX.up.set(0, -1, 0);
                cameraNX.lookAt(new Vector3(-1, 0, 0));
                this.add(cameraNX);
                const cameraPY = new PerspectiveCamera(fov, aspect, near, far);
                cameraPY.layers = this.layers;
                cameraPY.up.set(0, 0, 1);
                cameraPY.lookAt(new Vector3(0, 1, 0));
                this.add(cameraPY);
                const cameraNY = new PerspectiveCamera(fov, aspect, near, far);
                cameraNY.layers = this.layers;
                cameraNY.up.set(0, 0, -1);
                cameraNY.lookAt(new Vector3(0, -1, 0));
                this.add(cameraNY);
                const cameraPZ = new PerspectiveCamera(fov, aspect, near, far);
                cameraPZ.layers = this.layers;
                cameraPZ.up.set(0, -1, 0);
                cameraPZ.lookAt(new Vector3(0, 0, 1));
                this.add(cameraPZ);
                const cameraNZ = new PerspectiveCamera(fov, aspect, near, far);
                cameraNZ.layers = this.layers;
                cameraNZ.up.set(0, -1, 0);
                cameraNZ.lookAt(new Vector3(0, 0, -1));
                this.add(cameraNZ);
            }
    
            update(renderer, scene) {
                if (this.parent === null) this.updateMatrixWorld();
                const renderTarget = this.renderTarget;
                const [cameraPX, cameraNX, cameraPY, cameraNY, cameraPZ, cameraNZ] = this.children;
                const currentXrEnabled = renderer.xr.enabled;
                const currentRenderTarget = renderer.getRenderTarget();
                renderer.xr.enabled = false;
                const generateMipmaps = renderTarget.texture.generateMipmaps;
                renderTarget.texture.generateMipmaps = false;
                renderer.setRenderTarget(renderTarget, 0);
                renderer.render(scene, cameraPX);
                renderer.setRenderTarget(renderTarget, 1);
                renderer.render(scene, cameraNX);
                renderer.setRenderTarget(renderTarget, 2);
                renderer.render(scene, cameraPY);
                renderer.setRenderTarget(renderTarget, 3);
                renderer.render(scene, cameraNY);
                renderer.setRenderTarget(renderTarget, 4);
                renderer.render(scene, cameraPZ);
                renderTarget.texture.generateMipmaps = generateMipmaps;
                renderer.setRenderTarget(renderTarget, 5);
                renderer.render(scene, cameraNZ);
                renderer.setRenderTarget(currentRenderTarget);
                renderer.xr.enabled = currentXrEnabled;
                renderTarget.texture.needsPMREMUpdate = true;
            }
    
        }
    
        class CubeTexture extends Texture {
            constructor(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
                images = images !== undefined ? images : [];
                mapping = mapping !== undefined ? mapping : CubeReflectionMapping;
                super(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
                this.flipY = false;
            }
    
            get images() {
                return this.image;
            }
    
            set images(value) {
                this.image = value;
            }
    
        }
    
        CubeTexture.prototype.isCubeTexture = true;
    
        class WebGLCubeRenderTarget extends WebGLRenderTarget {
            constructor(size, options, dummy) {
                if (Number.isInteger(options)) {
                    console.warn('THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )');
                    options = dummy;
                }
    
                super(size, size, options);
                options = options || {}; // By convention -- likely based on the RenderMan spec from the 1990's -- cube maps are specified by WebGL (and three.js)
                // in a coordinate system in which positive-x is to the right when looking up the positive-z axis -- in other words,
                // in a left-handed coordinate system. By continuing this convention, preexisting cube maps continued to render correctly.
                // three.js uses a right-handed coordinate system. So environment maps used in three.js appear to have px and nx swapped
                // and the flag isRenderTargetTexture controls this conversion. The flip is not required when using WebGLCubeRenderTarget.texture
                // as a cube texture (this is detected when isRenderTargetTexture is set to true for cube textures).
    
                this.texture = new CubeTexture(undefined, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding);
                this.texture.isRenderTargetTexture = true;
                this.texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
                this.texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;
            }
    
            fromEquirectangularTexture(renderer, texture) {
                this.texture.type = texture.type;
                this.texture.format = RGBAFormat; // see #18859
    
                this.texture.encoding = texture.encoding;
                this.texture.generateMipmaps = texture.generateMipmaps;
                this.texture.minFilter = texture.minFilter;
                this.texture.magFilter = texture.magFilter;
                const shader = {
                    uniforms: {
                        tEquirect: {
                            value: null
                        }
                    },
                    vertexShader:
                    /* glsl */
                    `
    
                    varying vec3 vWorldDirection;
    
                    vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
    
                        return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
    
                    }
    
                    void main() {
    
                        vWorldDirection = transformDirection( position, modelMatrix );
    
                        #include <begin_vertex>
                        #include <project_vertex>
    
                    }
                `,
                    fragmentShader:
                    /* glsl */
                    `
    
                    uniform sampler2D tEquirect;
    
                    varying vec3 vWorldDirection;
    
                    #include <common>
    
                    void main() {
    
                        vec3 direction = normalize( vWorldDirection );
    
                        vec2 sampleUV = equirectUv( direction );
    
                        gl_FragColor = texture2D( tEquirect, sampleUV );
    
                    }
                `
                };
                const geometry = new BoxGeometry(5, 5, 5);
                const material = new ShaderMaterial({
                    name: 'CubemapFromEquirect',
                    uniforms: cloneUniforms(shader.uniforms),
                    vertexShader: shader.vertexShader,
                    fragmentShader: shader.fragmentShader,
                    side: BackSide,
                    blending: NoBlending
                });
                material.uniforms.tEquirect.value = texture;
                const mesh = new Mesh(geometry, material);
                const currentMinFilter = texture.minFilter; // Avoid blurred poles
    
                if (texture.minFilter === LinearMipmapLinearFilter) texture.minFilter = LinearFilter;
                const camera = new CubeCamera(1, 10, this);
                camera.update(renderer, mesh);
                texture.minFilter = currentMinFilter;
                mesh.geometry.dispose();
                mesh.material.dispose();
                return this;
            }
    
            clear(renderer, color, depth, stencil) {
                const currentRenderTarget = renderer.getRenderTarget();
    
                for (let i = 0; i < 6; i++) {
                    renderer.setRenderTarget(this, i);
                    renderer.clear(color, depth, stencil);
                }
    
                renderer.setRenderTarget(currentRenderTarget);
            }
    
        }
    
        WebGLCubeRenderTarget.prototype.isWebGLCubeRenderTarget = true;
    
        const _vector1 = /*@__PURE__*/new Vector3();
    
        const _vector2 = /*@__PURE__*/new Vector3();
    
        const _normalMatrix = /*@__PURE__*/new Matrix3();
    
        class Plane {
            constructor(normal = new Vector3(1, 0, 0), constant = 0) {
                // normal is assumed to be normalized
                this.normal = normal;
                this.constant = constant;
            }
    
            set(normal, constant) {
                this.normal.copy(normal);
                this.constant = constant;
                return this;
            }
    
            setComponents(x, y, z, w) {
                this.normal.set(x, y, z);
                this.constant = w;
                return this;
            }
    
            setFromNormalAndCoplanarPoint(normal, point) {
                this.normal.copy(normal);
                this.constant = -point.dot(this.normal);
                return this;
            }
    
            setFromCoplanarPoints(a, b, c) {
                const normal = _vector1.subVectors(c, b).cross(_vector2.subVectors(a, b)).normalize(); // Q: should an error be thrown if normal is zero (e.g. degenerate plane)?
    
    
                this.setFromNormalAndCoplanarPoint(normal, a);
                return this;
            }
    
            copy(plane) {
                this.normal.copy(plane.normal);
                this.constant = plane.constant;
                return this;
            }
    
            normalize() {
                // Note: will lead to a divide by zero if the plane is invalid.
                const inverseNormalLength = 1.0 / this.normal.length();
                this.normal.multiplyScalar(inverseNormalLength);
                this.constant *= inverseNormalLength;
                return this;
            }
    
            negate() {
                this.constant *= -1;
                this.normal.negate();
                return this;
            }
    
            distanceToPoint(point) {
                return this.normal.dot(point) + this.constant;
            }
    
            distanceToSphere(sphere) {
                return this.distanceToPoint(sphere.center) - sphere.radius;
            }
    
            projectPoint(point, target) {
                return target.copy(this.normal).multiplyScalar(-this.distanceToPoint(point)).add(point);
            }
    
            intersectLine(line, target) {
                const direction = line.delta(_vector1);
                const denominator = this.normal.dot(direction);
    
                if (denominator === 0) {
                    // line is coplanar, return origin
                    if (this.distanceToPoint(line.start) === 0) {
                        return target.copy(line.start);
                    } // Unsure if this is the correct method to handle this case.
    
    
                    return null;
                }
    
                const t = -(line.start.dot(this.normal) + this.constant) / denominator;
    
                if (t < 0 || t > 1) {
                    return null;
                }
    
                return target.copy(direction).multiplyScalar(t).add(line.start);
            }
    
            intersectsLine(line) {
                // Note: this tests if a line intersects the plane, not whether it (or its end-points) are coplanar with it.
                const startSign = this.distanceToPoint(line.start);
                const endSign = this.distanceToPoint(line.end);
                return startSign < 0 && endSign > 0 || endSign < 0 && startSign > 0;
            }
    
            intersectsBox(box) {
                return box.intersectsPlane(this);
            }
    
            intersectsSphere(sphere) {
                return sphere.intersectsPlane(this);
            }
    
            coplanarPoint(target) {
                return target.copy(this.normal).multiplyScalar(-this.constant);
            }
    
            applyMatrix4(matrix, optionalNormalMatrix) {
                const normalMatrix = optionalNormalMatrix || _normalMatrix.getNormalMatrix(matrix);
    
                const referencePoint = this.coplanarPoint(_vector1).applyMatrix4(matrix);
                const normal = this.normal.applyMatrix3(normalMatrix).normalize();
                this.constant = -referencePoint.dot(normal);
                return this;
            }
    
            translate(offset) {
                this.constant -= offset.dot(this.normal);
                return this;
            }
    
            equals(plane) {
                return plane.normal.equals(this.normal) && plane.constant === this.constant;
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
        }
    
        Plane.prototype.isPlane = true;
    
        const _sphere$2 = /*@__PURE__*/new Sphere();
    
        const _vector$7 = /*@__PURE__*/new Vector3();
    
        class Frustum {
            constructor(p0 = new Plane(), p1 = new Plane(), p2 = new Plane(), p3 = new Plane(), p4 = new Plane(), p5 = new Plane()) {
                this.planes = [p0, p1, p2, p3, p4, p5];
            }
    
            set(p0, p1, p2, p3, p4, p5) {
                const planes = this.planes;
                planes[0].copy(p0);
                planes[1].copy(p1);
                planes[2].copy(p2);
                planes[3].copy(p3);
                planes[4].copy(p4);
                planes[5].copy(p5);
                return this;
            }
    
            copy(frustum) {
                const planes = this.planes;
    
                for (let i = 0; i < 6; i++) {
                    planes[i].copy(frustum.planes[i]);
                }
    
                return this;
            }
    
            setFromProjectionMatrix(m) {
                const planes = this.planes;
                const me = m.elements;
                const me0 = me[0],
                            me1 = me[1],
                            me2 = me[2],
                            me3 = me[3];
                const me4 = me[4],
                            me5 = me[5],
                            me6 = me[6],
                            me7 = me[7];
                const me8 = me[8],
                            me9 = me[9],
                            me10 = me[10],
                            me11 = me[11];
                const me12 = me[12],
                            me13 = me[13],
                            me14 = me[14],
                            me15 = me[15];
                planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12).normalize();
                planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12).normalize();
                planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13).normalize();
                planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13).normalize();
                planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14).normalize();
                planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14).normalize();
                return this;
            }
    
            intersectsObject(object) {
                const geometry = object.geometry;
                if (geometry.boundingSphere === null) geometry.computeBoundingSphere();
    
                _sphere$2.copy(geometry.boundingSphere).applyMatrix4(object.matrixWorld);
    
                return this.intersectsSphere(_sphere$2);
            }
    
            intersectsSprite(sprite) {
                _sphere$2.center.set(0, 0, 0);
    
                _sphere$2.radius = 0.7071067811865476;
    
                _sphere$2.applyMatrix4(sprite.matrixWorld);
    
                return this.intersectsSphere(_sphere$2);
            }
    
            intersectsSphere(sphere) {
                const planes = this.planes;
                const center = sphere.center;
                const negRadius = -sphere.radius;
    
                for (let i = 0; i < 6; i++) {
                    const distance = planes[i].distanceToPoint(center);
    
                    if (distance < negRadius) {
                        return false;
                    }
                }
    
                return true;
            }
    
            intersectsBox(box) {
                const planes = this.planes;
    
                for (let i = 0; i < 6; i++) {
                    const plane = planes[i]; // corner at max distance
    
                    _vector$7.x = plane.normal.x > 0 ? box.max.x : box.min.x;
                    _vector$7.y = plane.normal.y > 0 ? box.max.y : box.min.y;
                    _vector$7.z = plane.normal.z > 0 ? box.max.z : box.min.z;
    
                    if (plane.distanceToPoint(_vector$7) < 0) {
                        return false;
                    }
                }
    
                return true;
            }
    
            containsPoint(point) {
                const planes = this.planes;
    
                for (let i = 0; i < 6; i++) {
                    if (planes[i].distanceToPoint(point) < 0) {
                        return false;
                    }
                }
    
                return true;
            }
    
            clone() {
                return new this.constructor().copy(this);
            }
    
        }
    
        function WebGLAnimation() {
            let context = null;
            let isAnimating = false;
            let animationLoop = null;
            let requestId = null;
    
            function onAnimationFrame(time, frame) {
                animationLoop(time, frame);
                requestId = context.requestAnimationFrame(onAnimationFrame);
            }
    
            return {
                start: function () {
                    if (isAnimating === true) return;
                    if (animationLoop === null) return;
                    requestId = context.requestAnimationFrame(onAnimationFrame);
                    isAnimating = true;
                },
                stop: function () {
                    context.cancelAnimationFrame(requestId);
                    isAnimating = false;
                },
                setAnimationLoop: function (callback) {
                    animationLoop = callback;
                },
                setContext: function (value) {
                    context = value;
                }
            };
        }
    
        function WebGLAttributes(gl, capabilities) {
            const isWebGL2 = capabilities.isWebGL2;
            const buffers = new WeakMap();
    
            function createBuffer(attribute, bufferType) {
                const array = attribute.array;
                const usage = attribute.usage;
                const buffer = gl.createBuffer();
                gl.bindBuffer(bufferType, buffer);
                gl.bufferData(bufferType, array, usage);
                attribute.onUploadCallback();
                let type = gl.FLOAT;
    
                if (array instanceof Float32Array) {
                    type = gl.FLOAT;
                } else if (array instanceof Float64Array) {
                    console.warn('THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.');
                } else if (array instanceof Uint16Array) {
                    if (attribute.isFloat16BufferAttribute) {
                        if (isWebGL2) {
                            type = gl.HALF_FLOAT;
                        } else {
                            console.warn('THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.');
                        }
                    } else {
                        type = gl.UNSIGNED_SHORT;
                    }
                } else if (array instanceof Int16Array) {
                    type = gl.SHORT;
                } else if (array instanceof Uint32Array) {
                    type = gl.UNSIGNED_INT;
                } else if (array instanceof Int32Array) {
                    type = gl.INT;
                } else if (array instanceof Int8Array) {
                    type = gl.BYTE;
                } else if (array instanceof Uint8Array) {
                    type = gl.UNSIGNED_BYTE;
                } else if (array instanceof Uint8ClampedArray) {
                    type = gl.UNSIGNED_BYTE;
                }
    
                return {
                    buffer: buffer,
                    type: type,
                    bytesPerElement: array.BYTES_PER_ELEMENT,
                    version: attribute.version
                };
            }
    
            function updateBuffer(buffer, attribute, bufferType) {
                const array = attribute.array;
                const updateRange = attribute.updateRange;
                gl.bindBuffer(bufferType, buffer);
    
                if (updateRange.count === -1) {
                    // Not using update ranges
                    gl.bufferSubData(bufferType, 0, array);
                } else {
                    if (isWebGL2) {
                        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array, updateRange.offset, updateRange.count);
                    } else {
                        gl.bufferSubData(bufferType, updateRange.offset * array.BYTES_PER_ELEMENT, array.subarray(updateRange.offset, updateRange.offset + updateRange.count));
                    }
    
                    updateRange.count = -1; // reset range
                }
            } //
    
    
            function get(attribute) {
                if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
                return buffers.get(attribute);
            }
    
            function remove(attribute) {
                if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
                const data = buffers.get(attribute);
    
                if (data) {
                    gl.deleteBuffer(data.buffer);
                    buffers.delete(attribute);
                }
            }
    
            function update(attribute, bufferType) {
                if (attribute.isGLBufferAttribute) {
                    const cached = buffers.get(attribute);
    
                    if (!cached || cached.version < attribute.version) {
                        buffers.set(attribute, {
                            buffer: attribute.buffer,
                            type: attribute.type,
                            bytesPerElement: attribute.elementSize,
                            version: attribute.version
                        });
                    }
    
                    return;
                }
    
                if (attribute.isInterleavedBufferAttribute) attribute = attribute.data;
                const data = buffers.get(attribute);
    
                if (data === undefined) {
                    buffers.set(attribute, createBuffer(attribute, bufferType));
                } else if (data.version < attribute.version) {
                    updateBuffer(data.buffer, attribute, bufferType);
                    data.version = attribute.version;
                }
            }
    
            return {
                get: get,
                remove: remove,
                update: update
            };
        }
    
        class PlaneGeometry extends BufferGeometry {
            constructor(width = 1, height = 1, widthSegments = 1, heightSegments = 1) {
                super();
                this.type = 'PlaneGeometry';
                this.parameters = {
                    width: width,
                    height: height,
                    widthSegments: widthSegments,
                    heightSegments: heightSegments
                };
                const width_half = width / 2;
                const height_half = height / 2;
                const gridX = Math.floor(widthSegments);
                const gridY = Math.floor(heightSegments);
                const gridX1 = gridX + 1;
                const gridY1 = gridY + 1;
                const segment_width = width / gridX;
                const segment_height = height / gridY; //
    
                const indices = [];
                const vertices = [];
                const normals = [];
                const uvs = [];
    
                for (let iy = 0; iy < gridY1; iy++) {
                    const y = iy * segment_height - height_half;
    
                    for (let ix = 0; ix < gridX1; ix++) {
                        const x = ix * segment_width - width_half;
                        vertices.push(x, -y, 0);
                        normals.push(0, 0, 1);
                        uvs.push(ix / gridX);
                        uvs.push(1 - iy / gridY);
                    }
                }
    
                for (let iy = 0; iy < gridY; iy++) {
                    for (let ix = 0; ix < gridX; ix++) {
                        const a = ix + gridX1 * iy;
                        const b = ix + gridX1 * (iy + 1);
                        const c = ix + 1 + gridX1 * (iy + 1);
                        const d = ix + 1 + gridX1 * iy;
                        indices.push(a, b, d);
                        indices.push(b, c, d);
                    }
                }
    
                this.setIndex(indices);
                this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
                this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
                this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
            }
    
            static fromJSON(data) {
                return new PlaneGeometry(data.width, data.height, data.widthSegments, data.heightSegments);
            }
    
        }
    
        var alphamap_fragment = "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif";
    
        var alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";
    
        var alphatest_fragment = "#ifdef USE_ALPHATEST\n\tif ( diffuseColor.a < alphaTest ) discard;\n#endif";
    
        var alphatest_pars_fragment = "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif";
    
        var aomap_fragment = "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif";
    
        var aomap_pars_fragment = "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif";
    
        var begin_vertex = "vec3 transformed = vec3( position );";
    
        var beginnormal_vertex = "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif";
    
        var bsdfs = "vec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif";
    
        var bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif";
    
        var clipping_planes_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#pragma unroll_loop_end\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\tif ( clipped ) discard;\n\t#endif\n#endif";
    
        var clipping_planes_pars_fragment = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif";
    
        var clipping_planes_pars_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif";
    
        var clipping_planes_vertex = "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif";
    
        var color_fragment = "#if defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#elif defined( USE_COLOR )\n\tdiffuseColor.rgb *= vColor;\n#endif";
    
        var color_pars_fragment = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR )\n\tvarying vec3 vColor;\n#endif";
    
        var color_pars_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvarying vec3 vColor;\n#endif";
    
        var color_vertex = "#if defined( USE_COLOR_ALPHA )\n\tvColor = vec4( 1.0 );\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )\n\tvColor = vec3( 1.0 );\n#endif\n#ifdef USE_COLOR\n\tvColor *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.xyz *= instanceColor.xyz;\n#endif";
    
        var common = "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}";
    
        var cube_uv_reflection_fragment = "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_maxMipLevel 8.0\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_maxTileSize 256.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\tfloat texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );\n\t\tvec2 uv = getUV( direction, face ) * ( faceSize - 1.0 ) + 0.5;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tif ( mipInt < cubeUV_maxMipLevel ) {\n\t\t\tuv.y += 2.0 * cubeUV_maxTileSize;\n\t\t}\n\t\tuv.y += filterInt * 2.0 * cubeUV_minTileSize;\n\t\tuv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );\n\t\tuv *= texelSize;\n\t\treturn texture2D( envMap, uv ).rgb;\n\t}\n\t#define r0 1.0\n\t#define v0 0.339\n\t#define m0 - 2.0\n\t#define r1 0.8\n\t#define v1 0.276\n\t#define m1 - 1.0\n\t#define r4 0.4\n\t#define v4 0.046\n\t#define m4 2.0\n\t#define r5 0.305\n\t#define v5 0.016\n\t#define m5 3.0\n\t#define r6 0.21\n\t#define v6 0.0038\n\t#define m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= r1 ) {\n\t\t\tmip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;\n\t\t} else if ( roughness >= r4 ) {\n\t\t\tmip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;\n\t\t} else if ( roughness >= r5 ) {\n\t\t\tmip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;\n\t\t} else if ( roughness >= r6 ) {\n\t\t\tmip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif";
    
        var defaultnormal_vertex = "vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\tmat3 m = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );\n\ttransformedNormal = m * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif";
    
        var displacementmap_pars_vertex = "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif";
    
        var displacementmap_vertex = "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif";
    
        var emissivemap_fragment = "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif";
    
        var emissivemap_pars_fragment = "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif";
    
        var encodings_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";
    
        var encodings_pars_fragment = "vec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}";
    
        var envmap_fragment = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif";
    
        var envmap_common_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif";
    
        var envmap_pars_fragment = "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif";
    
        var envmap_pars_vertex = "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif";
    
        var envmap_vertex = "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif";
    
        var fog_vertex = "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif";
    
        var fog_pars_vertex = "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif";
    
        var fog_fragment = "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif";
    
        var fog_pars_fragment = "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif";
    
        var gradientmap_pars_fragment = "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t#endif\n}";
    
        var lightmap_fragment = "#ifdef USE_LIGHTMAP\n\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tlightMapIrradiance *= PI;\n\t#endif\n\treflectedLight.indirectDiffuse += lightMapIrradiance;\n#endif";
    
        var lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif";
    
        var lights_lambert_vertex = "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\nvIndirectFront += getAmbientLightIrradiance( ambientLightColor );\nvIndirectFront += getLightProbeIrradiance( lightProbe, geometry.normal );\n#ifdef DOUBLE_SIDED\n\tvIndirectBack += getAmbientLightIrradiance( ambientLightColor );\n\tvIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry.normal );\n#endif\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointLightInfo( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotLightInfo( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalLightInfo( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( - dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry.normal );\n\t\t#endif\n\t}\n\t#pragma unroll_loop_end\n#endif";
    
        var lights_pars_begin = "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tif ( cutoffDistance > 0.0 ) {\n\t\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t}\n\t\treturn distanceFalloff;\n\t#else\n\t\tif ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\t\treturn pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t\t}\n\t\treturn 1.0;\n\t#endif\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif";
    
        var envmap_physical_pars_fragment = "#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#if defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 reflectVec;\n\t\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\t\treflectVec = reflect( - viewDir, normal );\n\t\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t\t#else\n\t\t\t\treflectVec = refract( - viewDir, normal, refractionRatio );\n\t\t\t#endif\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n#endif";
    
        var lights_toon_fragment = "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;";
    
        var lights_toon_pars_fragment = "varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n#define Material_LightProbeLOD( material )\t(0)";
    
        var lights_phong_fragment = "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;";
    
        var lights_phong_pars_fragment = "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)";
    
        var lights_physical_fragment = "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nvec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\t#ifdef SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULARINTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;\n\t\t#endif\n\t\t#ifdef USE_SPECULARCOLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vUv ).rgb;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEENCOLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\t#ifdef USE_SHEENROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;\n\t#endif\n#endif";
    
        var lights_physical_pars_fragment = "struct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n};\nvec3 clearcoatSpecular = vec3( 0.0 );\nvec3 sheenSpecular = vec3( 0.0 );\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\treturn saturate( DG * RECIPROCAL_PI );\n}\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\treturn fab;\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\tvec3 FssEss = specularColor * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(		0, 1,		0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );\n\t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );\n\t#endif\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tcomputeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}";
    
        var lights_fragment_begin = "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef USE_CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry.normal );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif";
    
        var lights_fragment_maps = "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vUv2 );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getIBLIrradiance( geometry.normal );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif";
    
        var lights_fragment_end = "#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif";
    
        var logdepthbuf_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif";
    
        var logdepthbuf_pars_fragment = "#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif";
    
        var logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif";
    
        var logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif";
    
        var map_fragment = "#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif";
    
        var map_pars_fragment = "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif";
    
        var map_particle_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif";
    
        var map_particle_pars_fragment = "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif";
    
        var metalnessmap_fragment = "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif";
    
        var metalnessmap_pars_fragment = "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif";
    
        var morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1, 2 ) * morphTargetInfluences[ i ];\n\t\t}\n\t#else\n\t\tobjectNormal += morphNormal0 * morphTargetInfluences[ 0 ];\n\t\tobjectNormal += morphNormal1 * morphTargetInfluences[ 1 ];\n\t\tobjectNormal += morphNormal2 * morphTargetInfluences[ 2 ];\n\t\tobjectNormal += morphNormal3 * morphTargetInfluences[ 3 ];\n\t#endif\n#endif";
    
        var morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\tuniform float morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t\tuniform sampler2DArray morphTargetsTexture;\n\t\tuniform vec2 morphTargetsTextureSize;\n\t\tvec3 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset, const in int stride ) {\n\t\t\tfloat texelIndex = float( vertexIndex * stride + offset );\n\t\t\tfloat y = floor( texelIndex / morphTargetsTextureSize.x );\n\t\t\tfloat x = texelIndex - y * morphTargetsTextureSize.x;\n\t\t\tvec3 morphUV = vec3( ( x + 0.5 ) / morphTargetsTextureSize.x, y / morphTargetsTextureSize.y, morphTargetIndex );\n\t\t\treturn texture( morphTargetsTexture, morphUV ).xyz;\n\t\t}\n\t#else\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\tuniform float morphTargetInfluences[ 8 ];\n\t\t#else\n\t\t\tuniform float morphTargetInfluences[ 4 ];\n\t\t#endif\n\t#endif\n#endif";
    
        var morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\t#ifdef MORPHTARGETS_TEXTURE\n\t\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t\t#ifndef USE_MORPHNORMALS\n\t\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 1 ) * morphTargetInfluences[ i ];\n\t\t\t#else\n\t\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0, 2 ) * morphTargetInfluences[ i ];\n\t\t\t#endif\n\t\t}\n\t#else\n\t\ttransformed += morphTarget0 * morphTargetInfluences[ 0 ];\n\t\ttransformed += morphTarget1 * morphTargetInfluences[ 1 ];\n\t\ttransformed += morphTarget2 * morphTargetInfluences[ 2 ];\n\t\ttransformed += morphTarget3 * morphTargetInfluences[ 3 ];\n\t\t#ifndef USE_MORPHNORMALS\n\t\t\ttransformed += morphTarget4 * morphTargetInfluences[ 4 ];\n\t\t\ttransformed += morphTarget5 * morphTargetInfluences[ 5 ];\n\t\t\ttransformed += morphTarget6 * morphTargetInfluences[ 6 ];\n\t\t\ttransformed += morphTarget7 * morphTargetInfluences[ 7 ];\n\t\t#endif\n\t#endif\n#endif";
    
        var normal_fragment_begin = "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * faceDirection;\n\t\t\tbitangent = bitangent * faceDirection;\n\t\t#endif\n\t\t#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;";
    
        var normal_fragment_maps = "#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\t#ifdef USE_TANGENT\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif";
    
        var normal_pars_fragment = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";
    
        var normal_pars_vertex = "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif";
    
        var normal_vertex = "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif";
    
        var normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );\n\t\treturn normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );\n\t}\n#endif";
    
        var clearcoat_normal_fragment_begin = "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif";
    
        var clearcoat_normal_fragment_maps = "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\t#ifdef USE_TANGENT\n\t\tclearcoatNormal = normalize( vTBN * clearcoatMapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );\n\t#endif\n#endif";
    
        var clearcoat_pars_fragment = "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif";
    
        var output_fragment = "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= transmissionAlpha + 0.1;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );";
    
        var packing = "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 pack2HalfToRGBA( vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}";
    
        var premultiplied_alpha_fragment = "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif";
    
        var project_vertex = "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;";
    
        var dithering_fragment = "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif";
    
        var dithering_pars_fragment = "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif";
    
        var roughnessmap_fragment = "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif";
    
        var roughnessmap_pars_fragment = "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif";
    
        var shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), \n\t\t\t\t\t\t	texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t	f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), \n\t\t\t\t\t\t	texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t	f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif";
    
        var shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif";
    
        var shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0\n\t\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\tvec4 shadowWorldPosition;\n\t#endif\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n#endif";
    
        var shadowmask_pars_fragment = "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}";
    
        var skinbase_vertex = "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif";
    
        var skinning_pars_vertex = "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif";
    
        var skinning_vertex = "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif";
    
        var skinnormal_vertex = "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif";
    
        var specularmap_fragment = "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif";
    
        var specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif";
    
        var tonemapping_fragment = "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif";
    
        var tonemapping_pars_fragment = "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(	1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,	1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,	1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }";
    
        var transmission_fragment = "#ifdef USE_TRANSMISSION\n\tfloat transmissionAlpha = 1.0;\n\tfloat transmissionFactor = transmission;\n\tfloat thicknessFactor = thickness;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\ttransmissionFactor *= texture2D( transmissionMap, vUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tthicknessFactor *= texture2D( thicknessMap, vUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\tvec4 transmission = getIBLVolumeRefraction(\n\t\tn, v, roughnessFactor, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,\n\t\tattenuationColor, attenuationDistance );\n\ttotalDiffuse = mix( totalDiffuse, transmission.rgb, transmissionFactor );\n\ttransmissionAlpha = mix( transmissionAlpha, transmission.a, transmissionFactor );\n#endif";
    
        var transmission_pars_fragment = "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\treturn texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#else\n\t\t\treturn texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );\n\t\t#endif\n\t}\n\tvec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( attenuationDistance == 0.0 ) {\n\t\t\treturn radiance;\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance * radiance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\trefractionCoords += 1.0;\n\t\trefractionCoords /= 2.0;\n\t\tvec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\tvec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );\n\t}\n#endif";
    
        var uv_pars_fragment = "#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif";
    
        var uv_pars_vertex = "#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif";
    
        var uv_vertex = "#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif";
    
        var uv2_pars_fragment = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif";
    
        var uv2_pars_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n\tuniform mat3 uv2Transform;\n#endif";
    
        var uv2_vertex = "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;\n#endif";
    
        var worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif";
    
        const vertex$g = "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}";
        const fragment$g = "uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tgl_FragColor = texture2D( t2D, vUv );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";
    
        const vertex$f = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}";
        const fragment$f = "#include <envmap_common_pars_fragment>\nuniform float opacity;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\tvec3 vReflect = vWorldDirection;\n\t#include <envmap_fragment>\n\tgl_FragColor = envColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";
    
        const vertex$e = "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}";
        const fragment$e = "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#endif\n}";
    
        const vertex$d = "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}";
        const fragment$d = "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}";
    
        const vertex$c = "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}";
        const fragment$c = "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}";
    
        const vertex$b = "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$b = "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";
    
        const vertex$a = "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$a = "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel= texture2D( lightMap, vUv2 );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
    
        const vertex$9 = "#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$9 = "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
    
        const vertex$8 = "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}";
        const fragment$8 = "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
    
        const vertex$7 = "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}";
        const fragment$7 = "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}";
    
        const vertex$6 = "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$6 = "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
    
        const vertex$5 = "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}";
        const fragment$5 = "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULARINTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n\t#ifdef USE_SPECULARCOLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEENCOLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEENROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;\n\t#endif\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
    
        const vertex$4 = "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$4 = "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}";
    
        const vertex$3 = "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$3 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}";
    
        const vertex$2 = "#include <common>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$2 = "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";
    
        const vertex$1 = "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}";
        const fragment$1 = "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <output_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}";
    
        const ShaderChunk = {
            alphamap_fragment: alphamap_fragment,
            alphamap_pars_fragment: alphamap_pars_fragment,
            alphatest_fragment: alphatest_fragment,
            alphatest_pars_fragment: alphatest_pars_fragment,
            aomap_fragment: aomap_fragment,
            aomap_pars_fragment: aomap_pars_fragment,
            begin_vertex: begin_vertex,
            beginnormal_vertex: beginnormal_vertex,
            bsdfs: bsdfs,
            bumpmap_pars_fragment: bumpmap_pars_fragment,
            clipping_planes_fragment: clipping_planes_fragment,
            clipping_planes_pars_fragment: clipping_planes_pars_fragment,
            clipping_planes_pars_vertex: clipping_planes_pars_vertex,
            clipping_planes_vertex: clipping_planes_vertex,
            color_fragment: color_fragment,
            color_pars_fragment: color_pars_fragment,
            color_pars_vertex: color_pars_vertex,
            color_vertex: color_vertex,
            common: common,
            cube_uv_reflection_fragment: cube_uv_reflection_fragment,
            defaultnormal_vertex: defaultnormal_vertex,
            displacementmap_pars_vertex: displacementmap_pars_vertex,
            displacementmap_vertex: displacementmap_vertex,
            emissivemap_fragment: emissivemap_fragment,
            emissivemap_pars_fragment: emissivemap_pars_fragment,
            encodings_fragment: encodings_fragment,
            encodings_pars_fragment: encodings_pars_fragment,
            envmap_fragment: envmap_fragment,
            envmap_common_pars_fragment: envmap_common_pars_fragment,
            envmap_pars_fragment: envmap_pars_fragment,
            envmap_pars_vertex: envmap_pars_vertex,
            envmap_physical_pars_fragment: envmap_physical_pars_fragment,
            envmap_vertex: envmap_vertex,
            fog_vertex: fog_vertex,
            fog_pars_vertex: fog_pars_vertex,
            fog_fragment: fog_fragment,
            fog_pars_fragment: fog_pars_fragment,
            gradientmap_pars_fragment: gradientmap_pars_fragment,
            lightmap_fragment: lightmap_fragment,
            lightmap_pars_fragment: lightmap_pars_fragment,
            lights_lambert_vertex: lights_lambert_vertex,
            lights_pars_begin: lights_pars_begin,
            lights_toon_fragment: lights_toon_fragment,
            lights_toon_pars_fragment: lights_toon_pars_fragment,
            lights_phong_fragment: lights_phong_fragment,
            lights_phong_pars_fragment: lights_phong_pars_fragment,
            lights_physical_fragment: lights_physical_fragment,
            lights_physical_pars_fragment: lights_physical_pars_fragment,
            lights_fragment_begin: lights_fragment_begin,
            lights_fragment_maps: lights_fragment_maps,
            lights_fragment_end: lights_fragment_end,
            logdepthbuf_fragment: logdepthbuf_fragment,
            logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
            logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
            logdepthbuf_vertex: logdepthbuf_vertex,
            map_fragment: map_fragment,
            map_pars_fragment: map_pars_fragment,
            map_particle_fragment: map_particle_fragment,
            map_particle_pars_fragment: map_particle_pars_fragment,
            metalnessmap_fragment: metalnessmap_fragment,
            metalnessmap_pars_fragment: metalnessmap_pars_fragment,
            morphnormal_vertex: morphnormal_vertex,
            morphtarget_pars_vertex: morphtarget_pars_vertex,
            morphtarget_vertex: morphtarget_vertex,
            normal_fragment_begin: normal_fragment_begin,
            normal_fragment_maps: normal_fragment_maps,
            normal_pars_fragment: normal_pars_fragment,
            normal_pars_vertex: normal_pars_vertex,
            normal_vertex: normal_vertex,
            normalmap_pars_fragment: normalmap_pars_fragment,
            clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
            clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
            clearcoat_pars_fragment: clearcoat_pars_fragment,
            output_fragment: output_fragment,
            packing: packing,
            premultiplied_alpha_fragment: premultiplied_alpha_fragment,
            project_vertex: project_vertex,
            dithering_fragment: dithering_fragment,
            dithering_pars_fragment: dithering_pars_fragment,
            roughnessmap_fragment: roughnessmap_fragment,
            roughnessmap_pars_fragment: roughnessmap_pars_fragment,
            shadowmap_pars_fragment: shadowmap_pars_fragment,
            shadowmap_pars_vertex: shadowmap_pars_vertex,
            shadowmap_vertex: shadowmap_vertex,
            shadowmask_pars_fragment: shadowmask_pars_fragment,
            skinbase_vertex: skinbase_vertex,
            skinning_pars_vertex: skinning_pars_vertex,
            skinning_vertex: skinning_vertex,
            skinnormal_vertex: skinnormal_vertex,
            specularmap_fragment: specularmap_fragment,
            specularmap_pars_fragment: specularmap_pars_fragment,
            tonemapping_fragment: tonemapping_fragment,
            tonemapping_pars_fragment: tonemapping_pars_fragment,
            transmission_fragment: transmission_fragment,
            transmission_pars_fragment: transmission_pars_fragment,
            uv_pars_fragment: uv_pars_fragment,
            uv_pars_vertex: uv_pars_vertex,
            uv_vertex: uv_vertex,
            uv2_pars_fragment: uv2_pars_fragment,
            uv2_pars_vertex: uv2_pars_vertex,
            uv2_vertex: uv2_vertex,
            worldpos_vertex: worldpos_vertex,
            background_vert: vertex$g,
            background_frag: fragment$g,
            cube_vert: vertex$f,
            cube_frag: fragment$f,
            depth_vert: vertex$e,
            depth_frag: fragment$e,
            distanceRGBA_vert: vertex$d,
            distanceRGBA_frag: fragment$d,
            equirect_vert: vertex$c,
            equirect_frag: fragment$c,
            linedashed_vert: vertex$b,
            linedashed_frag: fragment$b,
            meshbasic_vert: vertex$a,
            meshbasic_frag: fragment$a,
            meshlambert_vert: vertex$9,
            meshlambert_frag: fragment$9,
            meshmatcap_vert: vertex$8,
            meshmatcap_frag: fragment$8,
            meshnormal_vert: vertex$7,
            meshnormal_frag: fragment$7,
            meshphong_vert: vertex$6,
            meshphong_frag: fragment$6,
            meshphysical_vert: vertex$5,
            meshphysical_frag: fragment$5,
            meshtoon_vert: vertex$4,
            meshtoon_frag: fragment$4,
            points_vert: vertex$3,
            points_frag: fragment$3,
            shadow_vert: vertex$2,
            shadow_frag: fragment$2,
            sprite_vert: vertex$1,
            sprite_frag: fragment$1
        };
    
        /**
         * Uniforms library for shared webgl shaders
         */
    
        const UniformsLib = {
            common: {
                diffuse: {
                    value: new Color(0xffffff)
                },
                opacity: {
                    value: 1.0
                },
                map: {
                    value: null
                },
                uvTransform: {
                    value: new Matrix3()
                },
                uv2Transform: {
                    value: new Matrix3()
                },
                alphaMap: {
                    value: null
                },
                alphaTest: {
                    value: 0
                }
            },
            specularmap: {
                specularMap: {
                    value: null
                }
            },
            envmap: {
                envMap: {
                    value: null
                },
                flipEnvMap: {
                    value: -1
                },
                reflectivity: {
                    value: 1.0
                },
                // basic, lambert, phong
                ior: {
                    value: 1.5
                },
                // standard, physical
                refractionRatio: {
                    value: 0.98
                }
            },
            aomap: {
                aoMap: {
                    value: null
                },
                aoMapIntensity: {
                    value: 1
                }
            },
            lightmap: {
                lightMap: {
                    value: null
                },
                lightMapIntensity: {
                    value: 1
                }
            },
            emissivemap: {
                emissiveMap: {
                    value: null
                }
            },
            bumpmap: {
                bumpMap: {
                    value: null
                },
                bumpScale: {
                    value: 1
                }
            },
            normalmap: {
                normalMap: {
                    value: null
                },
                normalScale: {
                    value: new Vector2(1, 1)
                }
            },
            displacementmap: {
                displacementMap: {
                    value: null
                },
                displacementScale: {
                    value: 1
                },
                displacementBias: {
                    value: 0
                }
            },
            roughnessmap: {
                roughnessMap: {
                    value: null
                }
            },
            metalnessmap: {
                metalnessMap: {
                    value: null
                }
            },
            gradientmap: {
                gradientMap: {
                    value: null
                }
            },
            fog: {
                fogDensity: {
                    value: 0.00025
                },
                fogNear: {
                    value: 1
                },
                fogFar: {
                    value: 2000
                },
                fogColor: {
                    value: new Color(0xffffff)
                }
            },
            lights: {
                ambientLightColor: {
                    value: []
                },
                lightProbe: {
                    value: []
                },
                directionalLights: {
                    value: [],
                    properties: {
                        direction: {},
                        color: {}
                    }
                },
                directionalLightShadows: {
                    value: [],
                    properties: {
                        shadowBias: {},
                        shadowNormalBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                directionalShadowMap: {
                    value: []
                },
                directionalShadowMatrix: {
                    value: []
                },
                spotLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        direction: {},
                        distance: {},
                        coneCos: {},
                        penumbraCos: {},
                        decay: {}
                    }
                },
                spotLightShadows: {
                    value: [],
                    properties: {
                        shadowBias: {},
                        shadowNormalBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                spotShadowMap: {
                    value: []
                },
                spotShadowMatrix: {
                    value: []
                },
                pointLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        decay: {},
                        distance: {}
                    }
                },
                pointLightShadows: {
                    value: [],
                    properties: {
                        shadowBias: {},
                        shadowNormalBias: {},
                        shadowRadius: {},
                        shadowMapSize: {},
                        shadowCameraNear: {},
                        shadowCameraFar: {}
                    }
                },
                pointShadowMap: {
                    value: []
                },
                pointShadowMatrix: {
                    value: []
                },
                hemisphereLights: {
                    value: [],
                    properties: {
                        direction: {},
                        skyColor: {},
                        groundColor: {}
                    }
                },
                // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
                rectAreaLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        width: {},
                        height: {}
                    }
                },
                ltc_1: {
                    value: null
                },
                ltc_2: {
                    value: null
                }
            },
            points: {
                diffuse: {
                    value: new Color(0xffffff)
                },
                opacity: {
                    value: 1.0
                },
                size: {
                    value: 1.0
                },
                scale: {
                    value: 1.0
                },
                map: {
                    value: null
                },
                alphaMap: {
                    value: null
                },
                alphaTest: {
                    value: 0
                },
                uvTransform: {
                    value: new Matrix3()
                }
            },
            sprite: {
                diffuse: {
                    value: new Color(0xffffff)
                },
                opacity: {
                    value: 1.0
                },
                center: {
                    value: new Vector2(0.5, 0.5)
                },
                rotation: {
                    value: 0.0
                },
                map: {
                    value: null
                },
                alphaMap: {
                    value: null
                },
                alphaTest: {
                    value: 0
                },
                uvTransform: {
                    value: new Matrix3()
                }
            }
        };
    
        const ShaderLib = {
            basic: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.fog]),
                vertexShader: ShaderChunk.meshbasic_vert,
                fragmentShader: ShaderChunk.meshbasic_frag
            },
            lambert: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.fog, UniformsLib.lights, {
                    emissive: {
                        value: new Color(0x000000)
                    }
                }]),
                vertexShader: ShaderChunk.meshlambert_vert,
                fragmentShader: ShaderChunk.meshlambert_frag
            },
            phong: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
                    emissive: {
                        value: new Color(0x000000)
                    },
                    specular: {
                        value: new Color(0x111111)
                    },
                    shininess: {
                        value: 30
                    }
                }]),
                vertexShader: ShaderChunk.meshphong_vert,
                fragmentShader: ShaderChunk.meshphong_frag
            },
            standard: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.roughnessmap, UniformsLib.metalnessmap, UniformsLib.fog, UniformsLib.lights, {
                    emissive: {
                        value: new Color(0x000000)
                    },
                    roughness: {
                        value: 1.0
                    },
                    metalness: {
                        value: 0.0
                    },
                    envMapIntensity: {
                        value: 1
                    } // temporary
    
                }]),
                vertexShader: ShaderChunk.meshphysical_vert,
                fragmentShader: ShaderChunk.meshphysical_frag
            },
            toon: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.gradientmap, UniformsLib.fog, UniformsLib.lights, {
                    emissive: {
                        value: new Color(0x000000)
                    }
                }]),
                vertexShader: ShaderChunk.meshtoon_vert,
                fragmentShader: ShaderChunk.meshtoon_frag
            },
            matcap: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, {
                    matcap: {
                        value: null
                    }
                }]),
                vertexShader: ShaderChunk.meshmatcap_vert,
                fragmentShader: ShaderChunk.meshmatcap_frag
            },
            points: {
                uniforms: mergeUniforms([UniformsLib.points, UniformsLib.fog]),
                vertexShader: ShaderChunk.points_vert,
                fragmentShader: ShaderChunk.points_frag
            },
            dashed: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.fog, {
                    scale: {
                        value: 1
                    },
                    dashSize: {
                        value: 1
                    },
                    totalSize: {
                        value: 2
                    }
                }]),
                vertexShader: ShaderChunk.linedashed_vert,
                fragmentShader: ShaderChunk.linedashed_frag
            },
            depth: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap]),
                vertexShader: ShaderChunk.depth_vert,
                fragmentShader: ShaderChunk.depth_frag
            },
            normal: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, {
                    opacity: {
                        value: 1.0
                    }
                }]),
                vertexShader: ShaderChunk.meshnormal_vert,
                fragmentShader: ShaderChunk.meshnormal_frag
            },
            sprite: {
                uniforms: mergeUniforms([UniformsLib.sprite, UniformsLib.fog]),
                vertexShader: ShaderChunk.sprite_vert,
                fragmentShader: ShaderChunk.sprite_frag
            },
            background: {
                uniforms: {
                    uvTransform: {
                        value: new Matrix3()
                    },
                    t2D: {
                        value: null
                    }
                },
                vertexShader: ShaderChunk.background_vert,
                fragmentShader: ShaderChunk.background_frag
            },
    
            /* -------------------------------------------------------------------------
            //	Cube map shader
             ------------------------------------------------------------------------- */
            cube: {
                uniforms: mergeUniforms([UniformsLib.envmap, {
                    opacity: {
                        value: 1.0
                    }
                }]),
                vertexShader: ShaderChunk.cube_vert,
                fragmentShader: ShaderChunk.cube_frag
            },
            equirect: {
                uniforms: {
                    tEquirect: {
                        value: null
                    }
                },
                vertexShader: ShaderChunk.equirect_vert,
                fragmentShader: ShaderChunk.equirect_frag
            },
            distanceRGBA: {
                uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap, {
                    referencePosition: {
                        value: new Vector3()
                    },
                    nearDistance: {
                        value: 1
                    },
                    farDistance: {
                        value: 1000
                    }
                }]),
                vertexShader: ShaderChunk.distanceRGBA_vert,
                fragmentShader: ShaderChunk.distanceRGBA_frag
            },
            shadow: {
                uniforms: mergeUniforms([UniformsLib.lights, UniformsLib.fog, {
                    color: {
                        value: new Color(0x00000)
                    },
                    opacity: {
                        value: 1.0
                    }
                }]),
                vertexShader: ShaderChunk.shadow_vert,
                fragmentShader: ShaderChunk.shadow_frag
            }
        };
        ShaderLib.physical = {
            uniforms: mergeUniforms([ShaderLib.standard.uniforms, {
                clearcoat: {
                    value: 0
                },
                clearcoatMap: {
                    value: null
                },
                clearcoatRoughness: {
                    value: 0
                },
                clearcoatRoughnessMap: {
                    value: null
                },
                clearcoatNormalScale: {
                    value: new Vector2(1, 1)
                },
                clearcoatNormalMap: {
                    value: null
                },
                sheen: {
                    value: 0
                },
                sheenColor: {
                    value: new Color(0x000000)
                },
                sheenColorMap: {
                    value: null
                },
                sheenRoughness: {
                    value: 1
                },
                sheenRoughnessMap: {
                    value: null
                },
                transmission: {
                    value: 0
                },
                transmissionMap: {
                    value: null
                },
                transmissionSamplerSize: {
                    value: new Vector2()
                },
                transmissionSamplerMap: {
                    value: null
                },
                thickness: {
                    value: 0
                },
                thicknessMap: {
                    value: null
                },
                attenuationDistance: {
                    value: 0
                },
                attenuationColor: {
                    value: new Color(0x000000)
                },
                specularIntensity: {
                    value: 1
                },
                specularIntensityMap: {
                    value: null
                },
                specularColor: {
                    value: new Color(1, 1, 1)
                },
                specularColorMap: {
                    value: null
                }
            }]),
            vertexShader: ShaderChunk.meshphysical_vert,
            fragmentShader: ShaderChunk.meshphysical_frag
        };
    
        function WebGLBackground(renderer, cubemaps, state, objects, alpha, premultipliedAlpha) {
            const clearColor = new Color(0x000000);
            let clearAlpha = alpha === true ? 0 : 1;
            let planeMesh;
            let boxMesh;
            let currentBackground = null;
            let currentBackgroundVersion = 0;
            let currentTonemapping = null;
    
            function render(renderList, scene) {
                let forceClear = false;
                let background = scene.isScene === true ? scene.background : null;
    
                if (background && background.isTexture) {
                    background = cubemaps.get(background);
                } // Ignore background in AR
                // TODO: Reconsider this.
    
    
                const xr = renderer.xr;
                const session = xr.getSession && xr.getSession();
    
                if (session && session.environmentBlendMode === 'additive') {
                    background = null;
                }
    
                if (background === null) {
                    setClear(clearColor, clearAlpha);
                } else if (background && background.isColor) {
                    setClear(background, 1);
                    forceClear = true;
                }
    
                if (renderer.autoClear || forceClear) {
                    renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
                }
    
                if (background && (background.isCubeTexture || background.mapping === CubeUVReflectionMapping)) {
                    if (boxMesh === undefined) {
                        boxMesh = new Mesh(new BoxGeometry(1, 1, 1), new ShaderMaterial({
                            name: 'BackgroundCubeMaterial',
                            uniforms: cloneUniforms(ShaderLib.cube.uniforms),
                            vertexShader: ShaderLib.cube.vertexShader,
                            fragmentShader: ShaderLib.cube.fragmentShader,
                            side: BackSide,
                            depthTest: false,
                            depthWrite: false,
                            fog: false
                        }));
                        boxMesh.geometry.deleteAttribute('normal');
                        boxMesh.geometry.deleteAttribute('uv');
    
                        boxMesh.onBeforeRender = function (renderer, scene, camera) {
                            this.matrixWorld.copyPosition(camera.matrixWorld);
                        }; // enable code injection for non-built-in material
    
    
                        Object.defineProperty(boxMesh.material, 'envMap', {
                            get: function () {
                                return this.uniforms.envMap.value;
                            }
                        });
                        objects.update(boxMesh);
                    }
    
                    boxMesh.material.uniforms.envMap.value = background;
                    boxMesh.material.uniforms.flipEnvMap.value = background.isCubeTexture && background.isRenderTargetTexture === false ? -1 : 1;
    
                    if (currentBackground !== background || currentBackgroundVersion !== background.version || currentTonemapping !== renderer.toneMapping) {
                        boxMesh.material.needsUpdate = true;
                        currentBackground = background;
                        currentBackgroundVersion = background.version;
                        currentTonemapping = renderer.toneMapping;
                    } // push to the pre-sorted opaque render list
    
    
                    renderList.unshift(boxMesh, boxMesh.geometry, boxMesh.material, 0, 0, null);
                } else if (background && background.isTexture) {
                    if (planeMesh === undefined) {
                        planeMesh = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({
                            name: 'BackgroundMaterial',
                            uniforms: cloneUniforms(ShaderLib.background.uniforms),
                            vertexShader: ShaderLib.background.vertexShader,
                            fragmentShader: ShaderLib.background.fragmentShader,
                            side: FrontSide,
                            depthTest: false,
                            depthWrite: false,
                            fog: false
                        }));
                        planeMesh.geometry.deleteAttribute('normal'); // enable code injection for non-built-in material
    
                        Object.defineProperty(planeMesh.material, 'map', {
                            get: function () {
                                return this.uniforms.t2D.value;
                            }
                        });
                        objects.update(planeMesh);
                    }
    
                    planeMesh.material.uniforms.t2D.value = background;
    
                    if (background.matrixAutoUpdate === true) {
                        background.updateMatrix();
                    }
    
                    planeMesh.material.uniforms.uvTransform.value.copy(background.matrix);
    
                    if (currentBackground !== background || currentBackgroundVersion !== background.version || currentTonemapping !== renderer.toneMapping) {
                        planeMesh.material.needsUpdate = true;
                        currentBackground = background;
                        currentBackgroundVersion = background.version;
                        currentTonemapping = renderer.toneMapping;
                    } // push to the pre-sorted opaque render list
    
    
                    renderList.unshift(planeMesh, planeMesh.geometry, planeMesh.material, 0, 0, null);
                }
            }
    
            function setClear(color, alpha) {
                state.buffers.color.setClear(color.r, color.g, color.b, alpha, premultipliedAlpha);
            }
    
            return {
                getClearColor: function () {
                    return clearColor;
                },
                setClearColor: function (color, alpha = 1) {
                    clearColor.set(color);
                    clearAlpha = alpha;
                    setClear(clearColor, clearAlpha);
                },
                getClearAlpha: function () {
                    return clearAlpha;
                },
                setClearAlpha: function (alpha) {
                    clearAlpha = alpha;
                    setClear(clearColor, clearAlpha);
                },
                render: render
            };
        }
    
        function WebGLBindingStates(gl, extensions, attributes, capabilities) {
            const maxVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
            const extension = capabilities.isWebGL2 ? null : extensions.get('OES_vertex_array_object');
            const vaoAvailable = capabilities.isWebGL2 || extension !== null;
            const bindingStates = {};
            const defaultState = createBindingState(null);
            let currentState = defaultState;
    
            function setup(object, material, program, geometry, index) {
                let updateBuffers = false;
    
                if (vaoAvailable) {
                    const state = getBindingState(geometry, program, material);
    
                    if (currentState !== state) {
                        currentState = state;
                        bindVertexArrayObject(currentState.object);
                    }
    
                    updateBuffers = needsUpdate(geometry, index);
                    if (updateBuffers) saveCache(geometry, index);
                } else {
                    const wireframe = material.wireframe === true;
    
                    if (currentState.geometry !== geometry.id || currentState.program !== program.id || currentState.wireframe !== wireframe) {
                        currentState.geometry = geometry.id;
                        currentState.program = program.id;
                        currentState.wireframe = wireframe;
                        updateBuffers = true;
                    }
                }
    
                if (object.isInstancedMesh === true) {
                    updateBuffers = true;
                }
    
                if (index !== null) {
                    attributes.update(index, gl.ELEMENT_ARRAY_BUFFER);
                }
    
                if (updateBuffers) {
                    setupVertexAttributes(object, material, program, geometry);
    
                    if (index !== null) {
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attributes.get(index).buffer);
                    }
                }
            }
    
            function createVertexArrayObject() {
                if (capabilities.isWebGL2) return gl.createVertexArray();
                return extension.createVertexArrayOES();
            }
    
            function bindVertexArrayObject(vao) {
                if (capabilities.isWebGL2) return gl.bindVertexArray(vao);
                return extension.bindVertexArrayOES(vao);
            }
    
            function deleteVertexArrayObject(vao) {
                if (capabilities.isWebGL2) return gl.deleteVertexArray(vao);
                return extension.deleteVertexArrayOES(vao);
            }
    
            function getBindingState(geometry, program, material) {
                const wireframe = material.wireframe === true;
                let programMap = bindingStates[geometry.id];
    
                if (programMap === undefined) {
                    programMap = {};
                    bindingStates[geometry.id] = programMap;
                }
    
                let stateMap = programMap[program.id];
    
                if (stateMap === undefined) {
                    stateMap = {};
                    programMap[program.id] = stateMap;
                }
    
                let state = stateMap[wireframe];
    
                if (state === undefined) {
                    state = createBindingState(createVertexArrayObject());
                    stateMap[wireframe] = state;
                }
    
                return state;
            }
    
            function createBindingState(vao) {
                const newAttributes = [];
                const enabledAttributes = [];
                const attributeDivisors = [];
    
                for (let i = 0; i < maxVertexAttributes; i++) {
                    newAttributes[i] = 0;
                    enabledAttributes[i] = 0;
                    attributeDivisors[i] = 0;
                }
    
                return {
                    // for backward compatibility on non-VAO support browser
                    geometry: null,
                    program: null,
                    wireframe: false,
                    newAttributes: newAttributes,
                    enabledAttributes: enabledAttributes,
                    attributeDivisors: attributeDivisors,
                    object: vao,
                    attributes: {},
                    index: null
                };
            }
    
            function needsUpdate(geometry, index) {
                const cachedAttributes = currentState.attributes;
                const geometryAttributes = geometry.attributes;
                let attributesNum = 0;
    
                for (const key in geometryAttributes) {
                    const cachedAttribute = cachedAttributes[key];
                    const geometryAttribute = geometryAttributes[key];
                    if (cachedAttribute === undefined) return true;
                    if (cachedAttribute.attribute !== geometryAttribute) return true;
                    if (cachedAttribute.data !== geometryAttribute.data) return true;
                    attributesNum++;
                }
    
                if (currentState.attributesNum !== attributesNum) return true;
                if (currentState.index !== index) return true;
                return false;
            }
    
            function saveCache(geometry, index) {
                const cache = {};
                const attributes = geometry.attributes;
                let attributesNum = 0;
    
                for (const key in attributes) {
                    const attribute = attributes[key];
                    const data = {};
                    data.attribute = attribute;
    
                    if (attribute.data) {
                        data.data = attribute.data;
                    }
    
                    cache[key] = data;
                    attributesNum++;
                }
    
                currentState.attributes = cache;
                currentState.attributesNum = attributesNum;
                currentState.index = index;
            }
    
            function initAttributes() {
                const newAttributes = currentState.newAttributes;
    
                for (let i = 0, il = newAttributes.length; i < il; i++) {
                    newAttributes[i] = 0;
                }
            }
    
            function enableAttribute(attribute) {
                enableAttributeAndDivisor(attribute, 0);
            }
    
            function enableAttributeAndDivisor(attribute, meshPerAttribute) {
                const newAttributes = currentState.newAttributes;
                const enabledAttributes = currentState.enabledAttributes;
                const attributeDivisors = currentState.attributeDivisors;
                newAttributes[attribute] = 1;
    
                if (enabledAttributes[attribute] === 0) {
                    gl.enableVertexAttribArray(attribute);
                    enabledAttributes[attribute] = 1;
                }
    
                if (attributeDivisors[attribute] !== meshPerAttribute) {
                    const extension = capabilities.isWebGL2 ? gl : extensions.get('ANGLE_instanced_arrays');
                    extension[capabilities.isWebGL2 ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'](attribute, meshPerAttribute);
                    attributeDivisors[attribute] = meshPerAttribute;
                }
            }
    
            function disableUnusedAttributes() {
                const newAttributes = currentState.newAttributes;
                const enabledAttributes = currentState.enabledAttributes;
    
                for (let i = 0, il = enabledAttributes.length; i < il; i++) {
                    if (enabledAttributes[i] !== newAttributes[i]) {
                        gl.disableVertexAttribArray(i);
                        enabledAttributes[i] = 0;
                    }
                }
            }
    
            function vertexAttribPointer(index, size, type, normalized, stride, offset) {
                if (capabilities.isWebGL2 === true && (type === gl.INT || type === gl.UNSIGNED_INT)) {
                    gl.vertexAttribIPointer(index, size, type, stride, offset);
                } else {
                    gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
                }
            }
    
            function setupVertexAttributes(object, material, program, geometry) {
                if (capabilities.isWebGL2 === false && (object.isInstancedMesh || geometry.isInstancedBufferGeometry)) {
                    if (extensions.get('ANGLE_instanced_arrays') === null) return;
                }
    
                initAttributes();
                const geometryAttributes = geometry.attributes;
                const programAttributes = program.getAttributes();
                const materialDefaultAttributeValues = material.defaultAttributeValues;
    
                for (const name in programAttributes) {
                    const programAttribute = programAttributes[name];
    
                    if (programAttribute.location >= 0) {
                        let geometryAttribute = geometryAttributes[name];
    
                        if (geometryAttribute === undefined) {
                            if (name === 'instanceMatrix' && object.instanceMatrix) geometryAttribute = object.instanceMatrix;
                            if (name === 'instanceColor' && object.instanceColor) geometryAttribute = object.instanceColor;
                        }
    
                        if (geometryAttribute !== undefined) {
                            const normalized = geometryAttribute.normalized;
                            const size = geometryAttribute.itemSize;
                            const attribute = attributes.get(geometryAttribute); // TODO Attribute may not be available on context restore
    
                            if (attribute === undefined) continue;
                            const buffer = attribute.buffer;
                            const type = attribute.type;
                            const bytesPerElement = attribute.bytesPerElement;
    
                            if (geometryAttribute.isInterleavedBufferAttribute) {
                                const data = geometryAttribute.data;
                                const stride = data.stride;
                                const offset = geometryAttribute.offset;
    
                                if (data && data.isInstancedInterleavedBuffer) {
                                    for (let i = 0; i < programAttribute.locationSize; i++) {
                                        enableAttributeAndDivisor(programAttribute.location + i, data.meshPerAttribute);
                                    }
    
                                    if (object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined) {
                                        geometry._maxInstanceCount = data.meshPerAttribute * data.count;
                                    }
                                } else {
                                    for (let i = 0; i < programAttribute.locationSize; i++) {
                                        enableAttribute(programAttribute.location + i);
                                    }
                                }
    
                                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    
                                for (let i = 0; i < programAttribute.locationSize; i++) {
                                    vertexAttribPointer(programAttribute.location + i, size / programAttribute.locationSize, type, normalized, stride * bytesPerElement, (offset + size / programAttribute.locationSize * i) * bytesPerElement);
                                }
                            } else {
                                if (geometryAttribute.isInstancedBufferAttribute) {
                                    for (let i = 0; i < programAttribute.locationSize; i++) {
                                        enableAttributeAndDivisor(programAttribute.location + i, geometryAttribute.meshPerAttribute);
                                    }
    
                                    if (object.isInstancedMesh !== true && geometry._maxInstanceCount === undefined) {
                                        geometry._maxInstanceCount = geometryAttribute.meshPerAttribute * geometryAttribute.count;
                                    }
                                } else {
                                    for (let i = 0; i < programAttribute.locationSize; i++) {
                                        enableAttribute(programAttribute.location + i);
                                    }
                                }
    
                                gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    
                                for (let i = 0; i < programAttribute.locationSize; i++) {
                                    vertexAttribPointer(programAttribute.location + i, size / programAttribute.locationSize, type, normalized, size * bytesPerElement, size / programAttribute.locationSize * i * bytesPerElement);
                                }
                            }
                        } else if (materialDefaultAttributeValues !== undefined) {
                            const value = materialDefaultAttributeValues[name];
    
                            if (value !== undefined) {
                                switch (value.length) {
                                    case 2:
                                        gl.vertexAttrib2fv(programAttribute.location, value);
                                        break;
    
                                    case 3:
                                        gl.vertexAttrib3fv(programAttribute.location, value);
                                        break;
    
                                    case 4:
                                        gl.vertexAttrib4fv(programAttribute.location, value);
                                        break;
    
                                    default:
                                        gl.vertexAttrib1fv(programAttribute.location, value);
                                }
                            }
                        }
                    }
                }
    
                disableUnusedAttributes();
            }
    
            function dispose() {
                reset();
    
                for (const geometryId in bindingStates) {
                    const programMap = bindingStates[geometryId];
    
                    for (const programId in programMap) {
                        const stateMap = programMap[programId];
    
                        for (const wireframe in stateMap) {
                            deleteVertexArrayObject(stateMap[wireframe].object);
                            delete stateMap[wireframe];
                        }
    
                        delete programMap[programId];
                    }
    
                    delete bindingStates[geometryId];
                }
            }
    
            function releaseStatesOfGeometry(geometry) {
                if (bindingStates[geometry.id] === undefined) return;
                const programMap = bindingStates[geometry.id];
    
                for (const programId in programMap) {
                    const stateMap = programMap[programId];
    
                    for (const wireframe in stateMap) {
                        deleteVertexArrayObject(stateMap[wireframe].object);
                        delete stateMap[wireframe];
                    }
    
                    delete programMap[programId];
                }
    
                delete bindingStates[geometry.id];
            }
    
            function releaseStatesOfProgram(program) {
                for (const geometryId in bindingStates) {
                    const programMap = bindingStates[geometryId];
                    if (programMap[program.id] === undefined) continue;
                    const stateMap = programMap[program.id];
    
                    for (const wireframe in stateMap) {
                        deleteVertexArrayObject(stateMap[wireframe].object);
                        delete stateMap[wireframe];
                    }
    
                    delete programMap[program.id];
                }
            }
    
            function reset() {
                resetDefaultState();
                if (currentState === defaultState) return;
                currentState = defaultState;
                bindVertexArrayObject(currentState.object);
            } // for backward-compatilibity
    
    
            function resetDefaultState() {
                defaultState.geometry = null;
                defaultState.program = null;
                defaultState.wireframe = false;
            }
    
            return {
                setup: setup,
                reset: reset,
                resetDefaultState: resetDefaultState,
                dispose: dispose,
                releaseStatesOfGeometry: releaseStatesOfGeometry,
                releaseStatesOfProgram: releaseStatesOfProgram,
                initAttributes: initAttributes,
                enableAttribute: enableAttribute,
                disableUnusedAttributes: disableUnusedAttributes
            };
        }
    
        function WebGLBufferRenderer(gl, extensions, info, capabilities) {
            const isWebGL2 = capabilities.isWebGL2;
            let mode;
    
            function setMode(value) {
                mode = value;
            }
    
            function render(start, count) {
                gl.drawArrays(mode, start, count);
                info.update(count, mode, 1);
            }
    
            function renderInstances(start, count, primcount) {
                if (primcount === 0) return;
                let extension, methodName;
    
                if (isWebGL2) {
                    extension = gl;
                    methodName = 'drawArraysInstanced';
                } else {
                    extension = extensions.get('ANGLE_instanced_arrays');
                    methodName = 'drawArraysInstancedANGLE';
    
                    if (extension === null) {
                        console.error('THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                        return;
                    }
                }
    
                extension[methodName](mode, start, count, primcount);
                info.update(count, mode, primcount);
            } //
    
    
            this.setMode = setMode;
            this.render = render;
            this.renderInstances = renderInstances;
        }
    
        function WebGLCapabilities(gl, extensions, parameters) {
            let maxAnisotropy;
    
            function getMaxAnisotropy() {
                if (maxAnisotropy !== undefined) return maxAnisotropy;
    
                if (extensions.has('EXT_texture_filter_anisotropic') === true) {
                    const extension = extensions.get('EXT_texture_filter_anisotropic');
                    maxAnisotropy = gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
                } else {
                    maxAnisotropy = 0;
                }
    
                return maxAnisotropy;
            }
    
            function getMaxPrecision(precision) {
                if (precision === 'highp') {
                    if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT).precision > 0) {
                        return 'highp';
                    }
    
                    precision = 'mediump';
                }
    
                if (precision === 'mediump') {
                    if (gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision > 0 && gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision > 0) {
                        return 'mediump';
                    }
                }
    
                return 'lowp';
            }
    
            const isWebGL2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext || typeof WebGL2ComputeRenderingContext !== 'undefined' && gl instanceof WebGL2ComputeRenderingContext;
            let precision = parameters.precision !== undefined ? parameters.precision : 'highp';
            const maxPrecision = getMaxPrecision(precision);
    
            if (maxPrecision !== precision) {
                console.warn('THREE.WebGLRenderer:', precision, 'not supported, using', maxPrecision, 'instead.');
                precision = maxPrecision;
            }
    
            const drawBuffers = isWebGL2 || extensions.has('WEBGL_draw_buffers');
            const logarithmicDepthBuffer = parameters.logarithmicDepthBuffer === true;
            const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            const maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
            const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
            const maxCubemapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
            const maxAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
            const maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
            const maxVaryings = gl.getParameter(gl.MAX_VARYING_VECTORS);
            const maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
            const vertexTextures = maxVertexTextures > 0;
            const floatFragmentTextures = isWebGL2 || extensions.has('OES_texture_float');
            const floatVertexTextures = vertexTextures && floatFragmentTextures;
            const maxSamples = isWebGL2 ? gl.getParameter(gl.MAX_SAMPLES) : 0;
            return {
                isWebGL2: isWebGL2,
                drawBuffers: drawBuffers,
                getMaxAnisotropy: getMaxAnisotropy,
                getMaxPrecision: getMaxPrecision,
                precision: precision,
                logarithmicDepthBuffer: logarithmicDepthBuffer,
                maxTextures: maxTextures,
                maxVertexTextures: maxVertexTextures,
                maxTextureSize: maxTextureSize,
                maxCubemapSize: maxCubemapSize,
                maxAttributes: maxAttributes,
                maxVertexUniforms: maxVertexUniforms,
                maxVaryings: maxVaryings,
                maxFragmentUniforms: maxFragmentUniforms,
                vertexTextures: vertexTextures,
                floatFragmentTextures: floatFragmentTextures,
                floatVertexTextures: floatVertexTextures,
                maxSamples: maxSamples
            };
        }
    
        function WebGLClipping(properties) {
            const scope = this;
            let globalState = null,
                    numGlobalPlanes = 0,
                    localClippingEnabled = false,
                    renderingShadows = false;
            const plane = new Plane(),
                        viewNormalMatrix = new Matrix3(),
                        uniform = {
                value: null,
                needsUpdate: false
            };
            this.uniform = uniform;
            this.numPlanes = 0;
            this.numIntersection = 0;
    
            this.init = function (planes, enableLocalClipping, camera) {
                const enabled = planes.length !== 0 || enableLocalClipping || // enable state of previous frame - the clipping code has to
                // run another frame in order to reset the state:
                numGlobalPlanes !== 0 || localClippingEnabled;
                localClippingEnabled = enableLocalClipping;
                globalState = projectPlanes(planes, camera, 0);
                numGlobalPlanes = planes.length;
                return enabled;
            };
    
            this.beginShadows = function () {
                renderingShadows = true;
                projectPlanes(null);
            };
    
            this.endShadows = function () {
                renderingShadows = false;
                resetGlobalState();
            };
    
            this.setState = function (material, camera, useCache) {
                const planes = material.clippingPlanes,
                            clipIntersection = material.clipIntersection,
                            clipShadows = material.clipShadows;
                const materialProperties = properties.get(material);
    
                if (!localClippingEnabled || planes === null || planes.length === 0 || renderingShadows && !clipShadows) {
                    // there's no local clipping
                    if (renderingShadows) {
                        // there's no global clipping
                        projectPlanes(null);
                    } else {
                        resetGlobalState();
                    }
                } else {
                    const nGlobal = renderingShadows ? 0 : numGlobalPlanes,
                                lGlobal = nGlobal * 4;
                    let dstArray = materialProperties.clippingState || null;
                    uniform.value = dstArray; // ensure unique state
    
                    dstArray = projectPlanes(planes, camera, lGlobal, useCache);
    
                    for (let i = 0; i !== lGlobal; ++i) {
                        dstArray[i] = globalState[i];
                    }
    
                    materialProperties.clippingState = dstArray;
                    this.numIntersection = clipIntersection ? this.numPlanes : 0;
                    this.numPlanes += nGlobal;
                }
            };
    
            function resetGlobalState() {
                if (uniform.value !== globalState) {
                    uniform.value = globalState;
                    uniform.needsUpdate = numGlobalPlanes > 0;
                }
    
                scope.numPlanes = numGlobalPlanes;
                scope.numIntersection = 0;
            }
    
            function projectPlanes(planes, camera, dstOffset, skipTransform) {
                const nPlanes = planes !== null ? planes.length : 0;
                let dstArray = null;
    
                if (nPlanes !== 0) {
                    dstArray = uniform.value;
    
                    if (skipTransform !== true || dstArray === null) {
                        const flatSize = dstOffset + nPlanes * 4,
                                    viewMatrix = camera.matrixWorldInverse;
                        viewNormalMatrix.getNormalMatrix(viewMatrix);
    
                        if (dstArray === null || dstArray.length < flatSize) {
                            dstArray = new Float32Array(flatSize);
                        }
    
                        for (let i = 0, i4 = dstOffset; i !== nPlanes; ++i, i4 += 4) {
                            plane.copy(planes[i]).applyMatrix4(viewMatrix, viewNormalMatrix);
                            plane.normal.toArray(dstArray, i4);
                            dstArray[i4 + 3] = plane.constant;
                        }
                    }
    
                    uniform.value = dstArray;
                    uniform.needsUpdate = true;
                }
    
                scope.numPlanes = nPlanes;
                scope.numIntersection = 0;
                return dstArray;
            }
        }
    
        function WebGLCubeMaps(renderer) {
            let cubemaps = new WeakMap();
    
            function mapTextureMapping(texture, mapping) {
                if (mapping === EquirectangularReflectionMapping) {
                    texture.mapping = CubeReflectionMapping;
                } else if (mapping === EquirectangularRefractionMapping) {
                    texture.mapping = CubeRefractionMapping;
                }
    
                return texture;
            }
    
            function get(texture) {
                if (texture && texture.isTexture && texture.isRenderTargetTexture === false) {
                    const mapping = texture.mapping;
    
                    if (mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping) {
                        if (cubemaps.has(texture)) {
                            const cubemap = cubemaps.get(texture).texture;
                            return mapTextureMapping(cubemap, texture.mapping);
                        } else {
                            const image = texture.image;
    
                            if (image && image.height > 0) {
                                const renderTarget = new WebGLCubeRenderTarget(image.height / 2);
                                renderTarget.fromEquirectangularTexture(renderer, texture);
                                cubemaps.set(texture, renderTarget);
                                texture.addEventListener('dispose', onTextureDispose);
                                return mapTextureMapping(renderTarget.texture, texture.mapping);
                            } else {
                                // image not yet ready. try the conversion next frame
                                return null;
                            }
                        }
                    }
                }
    
                return texture;
            }
    
            function onTextureDispose(event) {
                const texture = event.target;
                texture.removeEventListener('dispose', onTextureDispose);
                const cubemap = cubemaps.get(texture);
    
                if (cubemap !== undefined) {
                    cubemaps.delete(texture);
                    cubemap.dispose();
                }
            }
    
            function dispose() {
                cubemaps = new WeakMap();
            }
    
            return {
                get: get,
                dispose: dispose
            };
        }
    
        class OrthographicCamera extends Camera {
            constructor(left = -1, right = 1, top = 1, bottom = -1, near = 0.1, far = 2000) {
                super();
                this.type = 'OrthographicCamera';
                this.zoom = 1;
                this.view = null;
                this.left = left;
                this.right = right;
                this.top = top;
                this.bottom = bottom;
                this.near = near;
                this.far = far;
                this.updateProjectionMatrix();
            }
    
            copy(source, recursive) {
                super.copy(source, recursive);
                this.left = source.left;
                this.right = source.right;
                this.top = source.top;
                this.bottom = source.bottom;
                this.near = source.near;
                this.far = source.far;
                this.zoom = source.zoom;
                this.view = source.view === null ? null : Object.assign({}, source.view);
                return this;
            }
    
            setViewOffset(fullWidth, fullHeight, x, y, width, height) {
                if (this.view === null) {
                    this.view = {
                        enabled: true,
                        fullWidth: 1,
                        fullHeight: 1,
                        offsetX: 0,
                        offsetY: 0,
                        width: 1,
                        height: 1
                    };
                }
    
                this.view.enabled = true;
                this.view.fullWidth = fullWidth;
                this.view.fullHeight = fullHeight;
                this.view.offsetX = x;
                this.view.offsetY = y;
                this.view.width = width;
                this.view.height = height;
                this.updateProjectionMatrix();
            }
    
            clearViewOffset() {
                if (this.view !== null) {
                    this.view.enabled = false;
                }
    
                this.updateProjectionMatrix();
            }
    
            updateProjectionMatrix() {
                const dx = (this.right - this.left) / (2 * this.zoom);
                const dy = (this.top - this.bottom) / (2 * this.zoom);
                const cx = (this.right + this.left) / 2;
                const cy = (this.top + this.bottom) / 2;
                let left = cx - dx;
                let right = cx + dx;
                let top = cy + dy;
                let bottom = cy - dy;
    
                if (this.view !== null && this.view.enabled) {
                    const scaleW = (this.right - this.left) / this.view.fullWidth / this.zoom;
                    const scaleH = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
                    left += scaleW * this.view.offsetX;
                    right = left + scaleW * this.view.width;
                    top -= scaleH * this.view.offsetY;
                    bottom = top - scaleH * this.view.height;
                }
    
                this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
                this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
            }
    
            toJSON(meta) {
                const data = super.toJSON(meta);
                data.object.zoom = this.zoom;
                data.object.left = this.left;
                data.object.right = this.right;
                data.object.top = this.top;
                data.object.bottom = this.bottom;
                data.object.near = this.near;
                data.object.far = this.far;
                if (this.view !== null) data.object.view = Object.assign({}, this.view);
                return data;
            }
    
        }
    
        OrthographicCamera.prototype.isOrthographicCamera = true;
    
        class RawShaderMaterial extends ShaderMaterial {
            constructor(parameters) {
                super(parameters);
                this.type = 'RawShaderMaterial';
            }
    
        }
    
        RawShaderMaterial.prototype.isRawShaderMaterial = true;
    
        const LOD_MIN = 4;
        const LOD_MAX = 8;
        const SIZE_MAX = Math.pow(2, LOD_MAX); // The standard deviations (radians) associated with the extra mips. These are
        // chosen to approximate a Trowbridge-Reitz distribution function times the
        // geometric shadowing function. These sigma values squared must match the
        // variance #defines in cube_uv_reflection_fragment.glsl.js.
    
        const EXTRA_LOD_SIGMA = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582];
        const TOTAL_LODS = LOD_MAX - LOD_MIN + 1 + EXTRA_LOD_SIGMA.length; // The maximum length of the blur for loop. Smaller sigmas will use fewer
        // samples and exit early, but not recompile the shader.
    
        const MAX_SAMPLES = 20;
    
        const _flatCamera = /*@__PURE__*/new OrthographicCamera();
    
        const {
            _lodPlanes,
            _sizeLods,
            _sigmas
        } = /*@__PURE__*/_createPlanes();
    
        const _clearColor = /*@__PURE__*/new Color();
    
        let _oldTarget = null; // Golden Ratio
    
        const PHI = (1 + Math.sqrt(5)) / 2;
        const INV_PHI = 1 / PHI; // Vertices of a dodecahedron (except the opposites, which represent the
        // same axis), used as axis directions evenly spread on a sphere.
    
        const _axisDirections = [/*@__PURE__*/new Vector3(1, 1, 1), /*@__PURE__*/new Vector3(-1, 1, 1), /*@__PURE__*/new Vector3(1, 1, -1), /*@__PURE__*/new Vector3(-1, 1, -1), /*@__PURE__*/new Vector3(0, PHI, INV_PHI), /*@__PURE__*/new Vector3(0, PHI, -INV_PHI), /*@__PURE__*/new Vector3(INV_PHI, 0, PHI), /*@__PURE__*/new Vector3(-INV_PHI, 0, PHI), /*@__PURE__*/new Vector3(PHI, INV_PHI, 0), /*@__PURE__*/new Vector3(-PHI, INV_PHI, 0)];
        /**
         * This class generates a Prefiltered, Mipmapped Radiance Environment Map
         * (PMREM) from a cubeMap environment texture. This allows different levels of
         * blur to be quickly accessed based on material roughness. It is packed into a
         * special CubeUV format that allows us to perform custom interpolation so that
         * we can support nonlinear formats such as RGBE. Unlike a traditional mipmap
         * chain, it only goes down to the LOD_MIN level (above), and then creates extra
         * even more filtered 'mips' at the same LOD_MIN resolution, associated with
         * higher roughness levels. In this way we maintain resolution to smoothly
         * interpolate diffuse lighting while limiting sampling computation.
         *
         * Paper: Fast, Accurate Image-Based Lighting
         * https://drive.google.com/file/d/15y8r_UpKlU9SvV4ILb0C3qCPecS8pvLz/view
        */
    
        class PMREMGenerator {
            constructor(renderer) {
                this._renderer = renderer;
                this._pingPongRenderTarget = null;
                this._blurMaterial = _getBlurShader(MAX_SAMPLES);
                this._equirectShader = null;
                this._cubemapShader = null;
    
                this._compileMaterial(this._blurMaterial);
            }
            /**
             * Generates a PMREM from a supplied Scene, which can be faster than using an
             * image if networking bandwidth is low. Optional sigma specifies a blur radius
             * in radians to be applied to the scene before PMREM generation. Optional near
             * and far planes ensure the scene is rendered in its entirety (the cubeCamera
             * is placed at the origin).
             */
    
    
            fromScene(scene, sigma = 0, near = 0.1, far = 100) {
                _oldTarget = this._renderer.getRenderTarget();
    
                const cubeUVRenderTarget = this._allocateTargets();
    
                this._sceneToCubeUV(scene, near, far, cubeUVRenderTarget);
    
                if (sigma > 0) {
                    this._blur(cubeUVRenderTarget, 0, 0, sigma);
                }
    
                this._applyPMREM(cubeUVRenderTarget);
    
                this._cleanup(cubeUVRenderTarget);
    
                return cubeUVRenderTarget;
            }
            /**
             * Generates a PMREM from an equirectangular texture, which can be either LDR
             * or HDR. The ideal input image size is 1k (1024 x 512),
             * as this matches best with the 256 x 256 cubemap output.
             */
    
    
            fromEquirectangular(equirectangular, renderTarget = null) {
                return this._fromTexture(equirectangular, renderTarget);
            }
            /**
             * Generates a PMREM from an cubemap texture, which can be either LDR
             * or HDR. The ideal input cube size is 256 x 256,
             * as this matches best with the 256 x 256 cubemap output.
             */
    
    
            fromCubemap(cubemap, renderTarget = null) {
                return this._fromTexture(cubemap, renderTarget);
            }
            /**
             * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
             * your texture's network fetch for increased concurrency.
             */
    
    
            compileCubemapShader() {
                if (this._cubemapShader === null) {
                    this._cubemapShader = _getCubemapShader();
    
                    this._compileMaterial(this._cubemapShader);
                }
            }
            /**
             * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
             * your texture's network fetch for increased concurrency.
             */
    
    
            compileEquirectangularShader() {
                if (this._equirectShader === null) {
                    this._equirectShader = _getEquirectShader();
    
                    this._compileMaterial(this._equirectShader);
                }
            }
            /**
             * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
             * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
             * one of them will cause any others to also become unusable.
             */
    
    
            dispose() {
                this._blurMaterial.dispose();
    
                if (this._pingPongRenderTarget !== null) this._pingPongRenderTarget.dispose();
                if (this._cubemapShader !== null) this._cubemapShader.dispose();
                if (this._equirectShader !== null) this._equirectShader.dispose();
    
                for (let i = 0; i < _lodPlanes.length; i++) {
                    _lodPlanes[i].dispose();
                }
            } // private interface
    
    
            _cleanup(outputTarget) {
                this._renderer.setRenderTarget(_oldTarget);
    
                outputTarget.scissorTest = false;
    
                _setViewport(outputTarget, 0, 0, outputTarget.width, outputTarget.height);
            }
    
            _fromTexture(texture, renderTarget) {
                _oldTarget = this._renderer.getRenderTarget();
    
                const cubeUVRenderTarget = renderTarget || this._allocateTargets(texture);
    
                this._textureToCubeUV(texture, cubeUVRenderTarget);
    
                this._applyPMREM(cubeUVRenderTarget);
    
                this._cleanup(cubeUVRenderTarget);
    
                return cubeUVRenderTarget;
            }
    
            _allocateTargets(texture) {
                // warning: null texture is valid
                const params = {
                    magFilter: LinearFilter,
                    minFilter: LinearFilter,
                    generateMipmaps: false,
                    type: HalfFloatType,
                    format: RGBAFormat,
                    encoding: LinearEncoding,
                    depthBuffer: false
                };
    
                const cubeUVRenderTarget = _createRenderTarget(params);
    
                cubeUVRenderTarget.depthBuffer = texture ? false : true;
    
                if (this._pingPongRenderTarget === null) {
                    this._pingPongRenderTarget = _createRenderTarget(params);
                }
    
                return cubeUVRenderTarget;
            }
    
            _compileMaterial(material) {
                const tmpMesh = new Mesh(_lodPlanes[0], material);
    
                this._renderer.compile(tmpMesh, _flatCamera);
            }
    
            _sceneToCubeUV(scene, near, far, cubeUVRenderTarget) {
                const fov = 90;
                const aspect = 1;
                const cubeCamera = new PerspectiveCamera(fov, aspect, near, far);
                const upSign = [1, -1, 1, 1, 1, 1];
                const forwardSign = [1, 1, 1, -1, -1, -1];
                const renderer = this._renderer;
                const originalAutoClear = renderer.autoClear;
                const toneMapping = renderer.toneMapping;
                renderer.getClearColor(_clearColor);
                renderer.toneMapping = NoToneMapping;
                renderer.autoClear = false;
                const backgroundMaterial = new MeshBasicMaterial({
                    name: 'PMREM.Background',
                    side: BackSide,
                    depthWrite: false,
                    depthTest: false
                });
                const backgroundBox = new Mesh(new BoxGeometry(), backgroundMaterial);
                let useSolidColor = false;
                const background = scene.background;
    
                if (background) {
                    if (background.isColor) {
                        backgroundMaterial.color.copy(background);
                        scene.background = null;
                        useSolidColor = true;
                    }
                } else {
                    backgroundMaterial.color.copy(_clearColor);
                    useSolidColor = true;
                }
    
                for (let i = 0; i < 6; i++) {
                    const col = i % 3;
    
                    if (col === 0) {
                        cubeCamera.up.set(0, upSign[i], 0);
                        cubeCamera.lookAt(forwardSign[i], 0, 0);
                    } else if (col === 1) {
                        cubeCamera.up.set(0, 0, upSign[i]);
                        cubeCamera.lookAt(0, forwardSign[i], 0);
                    } else {
                        cubeCamera.up.set(0, upSign[i], 0);
                        cubeCamera.lookAt(0, 0, forwardSign[i]);
                    }
    
                    _setViewport(cubeUVRenderTarget, col * SIZE_MAX, i > 2 ? SIZE_MAX : 0, SIZE_MAX, SIZE_MAX);
    
                    renderer.setRenderTarget(cubeUVRenderTarget);
    
                    if (useSolidColor) {
                        renderer.render(backgroundBox, cubeCamera);
                    }
    
                    renderer.render(scene, cubeCamera);
                }
    
                backgroundBox.geometry.dispose();
                backgroundBox.material.dispose();
                renderer.toneMapping = toneMapping;
                renderer.autoClear = originalAutoClear;
                scene.background = background;
            }
    
            _textureToCubeUV(texture, cubeUVRenderTarget) {
                const renderer = this._renderer;
                const isCubeTexture = texture.mapping === CubeReflectionMapping || texture.mapping === CubeRefractionMapping;
    
                if (isCubeTexture) {
                    if (this._cubemapShader === null) {
                        this._cubemapShader = _getCubemapShader();
                    }
    
                    this._cubemapShader.uniforms.flipEnvMap.value = texture.isRenderTargetTexture === false ? -1 : 1;
                } else {
                    if (this._equirectShader === null) {
                        this._equirectShader = _getEquirectShader();
                    }
                }
    
                const material = isCubeTexture ? this._cubemapShader : this._equirectShader;
                const mesh = new Mesh(_lodPlanes[0], material);
                const uniforms = material.uniforms;
                uniforms['envMap'].value = texture;
    
                if (!isCubeTexture) {
                    uniforms['texelSize'].value.set(1.0 / texture.image.width, 1.0 / texture.image.height);
                }
    
                _setViewport(cubeUVRenderTarget, 0, 0, 3 * SIZE_MAX, 2 * SIZE_MAX);
    
                renderer.setRenderTarget(cubeUVRenderTarget);
                renderer.render(mesh, _flatCamera);
            }
    
            _applyPMREM(cubeUVRenderTarget) {
                const renderer = this._renderer;
                const autoClear = renderer.autoClear;
                renderer.autoClear = false;
    
                for (let i = 1; i < TOTAL_LODS; i++) {
                    const sigma = Math.sqrt(_sigmas[i] * _sigmas[i] - _sigmas[i - 1] * _sigmas[i - 1]);
                    const poleAxis = _axisDirections[(i - 1) % _axisDirections.length];
    
                    this._blur(cubeUVRenderTarget, i - 1, i, sigma, poleAxis);
                }
    
                renderer.autoClear = autoClear;
            }
            /**
             * This is a two-pass Gaussian blur for a cubemap. Normally this is done
             * vertically and horizontally, but this breaks down on a cube. Here we apply
             * the blur latitudinally (around the poles), and then longitudinally (towards
             * the poles) to approximate the orthogonally-separable blur. It is least
             * accurate at the poles, but still does a decent job.
             */
    
    
            _blur(cubeUVRenderTarget, lodIn, lodOut, sigma, poleAxis) {
                const pingPongRenderTarget = this._pingPongRenderTarget;
    
                this._halfBlur(cubeUVRenderTarget, pingPongRenderTarget, lodIn, lodOut, sigma, 'latitudinal', poleAxis);
    
                this._halfBlur(pingPongRenderTarget, cubeUVRenderTarget, lodOut, lodOut, sigma, 'longitudinal', poleAxis);
            }
    
            _halfBlur(targetIn, targetOut, lodIn, lodOut, sigmaRadians, direction, poleAxis) {
                const renderer = this._renderer;
                const blurMaterial = this._blurMaterial;
    
                if (direction !== 'latitudinal' && direction !== 'longitudinal') {
                    console.error('blur direction must be either latitudinal or longitudinal!');
                } // Number of standard deviations at which to cut off the discrete approximation.
    
    
                const STANDARD_DEVIATIONS = 3;
                const blurMesh = new Mesh(_lodPlanes[lodOut], blurMaterial);
                const blurUniforms = blurMaterial.uniforms;
                const pixels = _sizeLods[lodIn] - 1;
                const radiansPerPixel = isFinite(sigmaRadians) ? Math.PI / (2 * pixels) : 2 * Math.PI / (2 * MAX_SAMPLES - 1);
                const sigmaPixels = sigmaRadians / radiansPerPixel;
                const samples = isFinite(sigmaRadians) ? 1 + Math.floor(STANDARD_DEVIATIONS * sigmaPixels) : MAX_SAMPLES;
    
                if (samples > MAX_SAMPLES) {
                    console.warn(`sigmaRadians, ${sigmaRadians}, is too large and will clip, as it requested ${samples} samples when the maximum is set to ${MAX_SAMPLES}`);
                }
    
                const weights = [];
                let sum = 0;
    
                for (let i = 0; i < MAX_SAMPLES; ++i) {
                    const x = i / sigmaPixels;
                    const weight = Math.exp(-x * x / 2);
                    weights.push(weight);
    
                    if (i === 0) {
                        sum += weight;
                    } else if (i < samples) {
                        sum += 2 * weight;
                    }
                }
    
                for (let i = 0; i < weights.length; i++) {
                    weights[i] = weights[i] / sum;
                }
    
                blurUniforms['envMap'].value = targetIn.texture;
                blurUniforms['samples'].value = samples;
                blurUniforms['weights'].value = weights;
                blurUniforms['latitudinal'].value = direction === 'latitudinal';
    
                if (poleAxis) {
                    blurUniforms['poleAxis'].value = poleAxis;
                }
    
                blurUniforms['dTheta'].value = radiansPerPixel;
                blurUniforms['mipInt'].value = LOD_MAX - lodIn;
                const outputSize = _sizeLods[lodOut];
                const x = 3 * Math.max(0, SIZE_MAX - 2 * outputSize);
                const y = (lodOut === 0 ? 0 : 2 * SIZE_MAX) + 2 * outputSize * (lodOut > LOD_MAX - LOD_MIN ? lodOut - LOD_MAX + LOD_MIN : 0);
    
                _setViewport(targetOut, x, y, 3 * outputSize, 2 * outputSize);
    
                renderer.setRenderTarget(targetOut);
                renderer.render(blurMesh, _flatCamera);
            }
    
        }
    
        function _createPlanes() {
            const _lodPlanes = [];
            const _sizeLods = [];
            const _sigmas = [];
            let lod = LOD_MAX;
    
            for (let i = 0; i < TOTAL_LODS; i++) {
                const sizeLod = Math.pow(2, lod);
    
                _sizeLods.push(sizeLod);
    
                let sigma = 1.0 / sizeLod;
    
                if (i > LOD_MAX - LOD_MIN) {
                    sigma = EXTRA_LOD_SIGMA[i - LOD_MAX + LOD_MIN - 1];
                } else if (i === 0) {
                    sigma = 0;
                }
    
                _sigmas.push(sigma);
    
                const texelSize = 1.0 / (sizeLod - 1);
                const min = -texelSize / 2;
                const max = 1 + texelSize / 2;
                const uv1 = [min, min, max, min, max, max, min, min, max, max, min, max];
                const cubeFaces = 6;
                const vertices = 6;
                const positionSize = 3;
                const uvSize = 2;
                const faceIndexSize = 1;
                const position = new Float32Array(positionSize * vertices * cubeFaces);
                const uv = new Float32Array(uvSize * vertices * cubeFaces);
                const faceIndex = new Float32Array(faceIndexSize * vertices * cubeFaces);
    
                for (let face = 0; face < cubeFaces; face++) {
                    const x = face % 3 * 2 / 3 - 1;
                    const y = face > 2 ? 0 : -1;
                    const coordinates = [x, y, 0, x + 2 / 3, y, 0, x + 2 / 3, y + 1, 0, x, y, 0, x + 2 / 3, y + 1, 0, x, y + 1, 0];
                    position.set(coordinates, positionSize * vertices * face);
                    uv.set(uv1, uvSize * vertices * face);
                    const fill = [face, face, face, face, face, face];
                    faceIndex.set(fill, faceIndexSize * vertices * face);
                }
    
                const planes = new BufferGeometry();
                planes.setAttribute('position', new BufferAttribute(position, positionSize));
                planes.setAttribute('uv', new BufferAttribute(uv, uvSize));
                planes.setAttribute('faceIndex', new BufferAttribute(faceIndex, faceIndexSize));
    
                _lodPlanes.push(planes);
    
                if (lod > LOD_MIN) {
                    lod--;
                }
            }
    
            return {
                _lodPlanes,
                _sizeLods,
                _sigmas
            };
        }
    
        function _createRenderTarget(params) {
            const cubeUVRenderTarget = new WebGLRenderTarget(3 * SIZE_MAX, 3 * SIZE_MAX, params);
            cubeUVRenderTarget.texture.mapping = CubeUVReflectionMapping;
            cubeUVRenderTarget.texture.name = 'PMREM.cubeUv';
            cubeUVRenderTarget.scissorTest = true;
            return cubeUVRenderTarget;
        }
    
        function _setViewport(target, x, y, width, height) {
            target.viewport.set(x, y, width, height);
            target.scissor.set(x, y, width, height);
        }
    
        function _getBlurShader(maxSamples) {
            const weights = new Float32Array(maxSamples);
            const poleAxis = new Vector3(0, 1, 0);
            const shaderMaterial = new RawShaderMaterial({
                name: 'SphericalGaussianBlur',
                defines: {
                    'n': maxSamples
                },
                uniforms: {
                    'envMap': {
                        value: null
                    },
                    'samples': {
                        value: 1
                    },
                    'weights': {
                        value: weights
                    },
                    'latitudinal': {
                        value: false
                    },
                    'dTheta': {
                        value: 0
                    },
                    'mipInt': {
                        value: 0
                    },
                    'poleAxis': {
                        value: poleAxis
                    }
                },
                vertexShader: _getCommonVertexShader(),
                fragmentShader:
                /* glsl */
                `
    
                precision mediump float;
                precision mediump int;
    
                varying vec3 vOutputDirection;
    
                uniform sampler2D envMap;
                uniform int samples;
                uniform float weights[ n ];
                uniform bool latitudinal;
                uniform float dTheta;
                uniform float mipInt;
                uniform vec3 poleAxis;
    
                #define ENVMAP_TYPE_CUBE_UV
                #include <cube_uv_reflection_fragment>
    
                vec3 getSample( float theta, vec3 axis ) {
    
                    float cosTheta = cos( theta );
                    // Rodrigues' axis-angle rotation
                    vec3 sampleDirection = vOutputDirection * cosTheta
                        + cross( axis, vOutputDirection ) * sin( theta )
                        + axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );
    
                    return bilinearCubeUV( envMap, sampleDirection, mipInt );
    
                }
    
                void main() {
    
                    vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );
    
                    if ( all( equal( axis, vec3( 0.0 ) ) ) ) {
    
                        axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );
    
                    }
    
                    axis = normalize( axis );
    
                    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
                    gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );
    
                    for ( int i = 1; i < n; i++ ) {
    
                        if ( i >= samples ) {
    
                            break;
    
                        }
    
                        float theta = dTheta * float( i );
                        gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
                        gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );
    
                    }
    
                }
            `,
                blending: NoBlending,
                depthTest: false,
                depthWrite: false
            });
            return shaderMaterial;
        }
    
        function _getEquirectShader() {
            const texelSize = new Vector2(1, 1);
            const shaderMaterial = new RawShaderMaterial({
                name: 'EquirectangularToCubeUV',
                uniforms: {
                    'envMap': {
                        value: null
                    },
                    'texelSize': {
                        value: texelSize
                    }
                },
                vertexShader: _getCommonVertexShader(),
                fragmentShader:
                /* glsl */
                `
    
                precision mediump float;
                precision mediump int;
    
                varying vec3 vOutputDirection;
    
                uniform sampler2D envMap;
                uniform vec2 texelSize;
    
                #include <common>
    
                void main() {
    
                    gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
    
                    vec3 outputDirection = normalize( vOutputDirection );
                    vec2 uv = equirectUv( outputDirection );
    
                    vec2 f = fract( uv / texelSize - 0.5 );
                    uv -= f * texelSize;
                    vec3 tl = texture2D ( envMap, uv ).rgb;
                    uv.x += texelSize.x;
                    vec3 tr = texture2D ( envMap, uv ).rgb;
                    uv.y += texelSize.y;
                    vec3 br = texture2D ( envMap, uv ).rgb;
                    uv.x -= texelSize.x;
                    vec3 bl = texture2D ( envMap, uv ).rgb;
    
                    vec3 tm = mix( tl, tr, f.x );
                    vec3 bm = mix( bl, br, f.x );
                    gl_FragColor.rgb = mix( tm, bm, f.y );
    
                }
            `,
                blending: NoBlending,
                depthTest: false,
                depthWrite: false
            });
            return shaderMaterial;
        }
    
        function _getCubemapShader() {
            const shaderMaterial = new RawShaderMaterial({
                name: 'CubemapToCubeUV',
                uniforms: {
                    'envMap': {
                        value: null
                    },
                    'flipEnvMap': {
                        value: -1
                    }
                },
                vertexShader: _getCommonVertexShader(),
                fragmentShader:
                /* glsl */
                `
    
                precision mediump float;
                precision mediump int;
    
                uniform float flipEnvMap;
    
                varying vec3 vOutputDirection;
    
                uniform samplerCube envMap;
    
                void main() {
    
                    gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );
    
                }
            `,
                blending: NoBlending,
                depthTest: false,
                depthWrite: false
            });
            return shaderMaterial;
        }
    
        function _getCommonVertexShader() {
            return (
                /* glsl */
                `
    
            precision mediump float;
            precision mediump int;
    
            attribute vec3 position;
            attribute vec2 uv;
            attribute float faceIndex;
    
            varying vec3 vOutputDirection;
    
            // RH coordinate system; PMREM face-indexing convention
            vec3 getDirection( vec2 uv, float face ) {
    
                uv = 2.0 * uv - 1.0;
    
                vec3 direction = vec3( uv, 1.0 );
    
                if ( face == 0.0 ) {
    
                    direction = direction.zyx; // ( 1, v, u ) pos x
    
                } else if ( face == 1.0 ) {
    
                    direction = direction.xzy;
                    direction.xz *= -1.0; // ( -u, 1, -v ) pos y
    
                } else if ( face == 2.0 ) {
    
                    direction.x *= -1.0; // ( -u, v, 1 ) pos z
    
                } else if ( face == 3.0 ) {
    
                    direction = direction.zyx;
                    direction.xz *= -1.0; // ( -1, v, -u ) neg x
    
                } else if ( face == 4.0 ) {
    
                    direction = direction.xzy;
                    direction.xy *= -1.0; // ( -u, -1, v ) neg y
    
                } else if ( face == 5.0 ) {
    
                    direction.z *= -1.0; // ( u, v, -1 ) neg z
    
                }
    
                return direction;
    
            }
    
            void main() {
    
                vOutputDirection = getDirection( uv, faceIndex );
                gl_Position = vec4( position, 1.0 );
    
            }
        `
            );
        }
    
        function WebGLCubeUVMaps(renderer) {
            let cubeUVmaps = new WeakMap();
            let pmremGenerator = null;
    
            function get(texture) {
                if (texture && texture.isTexture) {
                    const mapping = texture.mapping;
                    const isEquirectMap = mapping === EquirectangularReflectionMapping || mapping === EquirectangularRefractionMapping;
                    const isCubeMap = mapping === CubeReflectionMapping || mapping === CubeRefractionMapping; // equirect/cube map to cubeUV conversion
    
                    if (isEquirectMap || isCubeMap) {
                        if (texture.isRenderTargetTexture && texture.needsPMREMUpdate === true) {
                            texture.needsPMREMUpdate = false;
                            let renderTarget = cubeUVmaps.get(texture);
                            if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer);
                            renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular(texture, renderTarget) : pmremGenerator.fromCubemap(texture, renderTarget);
                            cubeUVmaps.set(texture, renderTarget);
                            return renderTarget.texture;
                        } else {
                            if (cubeUVmaps.has(texture)) {
                                return cubeUVmaps.get(texture).texture;
                            } else {
                                const image = texture.image;
    
                                if (isEquirectMap && image && image.height > 0 || isCubeMap && image && isCubeTextureComplete(image)) {
                                    if (pmremGenerator === null) pmremGenerator = new PMREMGenerator(renderer);
                                    const renderTarget = isEquirectMap ? pmremGenerator.fromEquirectangular(texture) : pmremGenerator.fromCubemap(texture);
                                    cubeUVmaps.set(texture, renderTarget);
                                    texture.addEventListener('dispose', onTextureDispose);
                                    return renderTarget.texture;
                                } else {
                                    // image not yet ready. try the conversion next frame
                                    return null;
                                }
                            }
                        }
                    }
                }
    
                return texture;
            }
    
            function isCubeTextureComplete(image) {
                let count = 0;
                const length = 6;
    
                for (let i = 0; i < length; i++) {
                    if (image[i] !== undefined) count++;
                }
    
                return count === length;
            }
    
            function onTextureDispose(event) {
                const texture = event.target;
                texture.removeEventListener('dispose', onTextureDispose);
                const cubemapUV = cubeUVmaps.get(texture);
    
                if (cubemapUV !== undefined) {
                    cubeUVmaps.delete(texture);
                    cubemapUV.dispose();
                }
            }
    
            function dispose() {
                cubeUVmaps = new WeakMap();
    
                if (pmremGenerator !== null) {
                    pmremGenerator.dispose();
                    pmremGenerator = null;
                }
            }
    
            return {
                get: get,
                dispose: dispose
            };
        }
    
        function WebGLExtensions(gl) {
            const extensions = {};
    
            function getExtension(name) {
                if (extensions[name] !== undefined) {
                    return extensions[name];
                }
    
                let extension;
    
                switch (name) {
                    case 'WEBGL_depth_texture':
                        extension = gl.getExtension('WEBGL_depth_texture') || gl.getExtension('MOZ_WEBGL_depth_texture') || gl.getExtension('WEBKIT_WEBGL_depth_texture');
                        break;
    
                    case 'EXT_texture_filter_anisotropic':
                        extension = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
                        break;
    
                    case 'WEBGL_compressed_texture_s3tc':
                        extension = gl.getExtension('WEBGL_compressed_texture_s3tc') || gl.getExtension('MOZ_WEBGL_compressed_texture_s3tc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc');
                        break;
    
                    case 'WEBGL_compressed_texture_pvrtc':
                        extension = gl.getExtension('WEBGL_compressed_texture_pvrtc') || gl.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');
                        break;
    
                    default:
                        extension = gl.getExtension(name);
                }
    
                extensions[name] = extension;
                return extension;
            }
    
            return {
                has: function (name) {
                    return getExtension(name) !== null;
                },
                init: function (capabilities) {
                    if (capabilities.isWebGL2) {
                        getExtension('EXT_color_buffer_float');
                    } else {
                        getExtension('WEBGL_depth_texture');
                        getExtension('OES_texture_float');
                        getExtension('OES_texture_half_float');
                        getExtension('OES_texture_half_float_linear');
                        getExtension('OES_standard_derivatives');
                        getExtension('OES_element_index_uint');
                        getExtension('OES_vertex_array_object');
                        getExtension('ANGLE_instanced_arrays');
                    }
    
                    getExtension('OES_texture_float_linear');
                    getExtension('EXT_color_buffer_half_float');
                    getExtension('WEBGL_multisampled_render_to_texture');
                },
                get: function (name) {
                    const extension = getExtension(name);
    
                    if (extension === null) {
                        console.warn('THREE.WebGLRenderer: ' + name + ' extension not supported.');
                    }
    
                    return extension;
                }
            };
        }
    
        function WebGLGeometries(gl, attributes, info, bindingStates) {
            const geometries = {};
            const wireframeAttributes = new WeakMap();
    
            function onGeometryDispose(event) {
                const geometry = event.target;
    
                if (geometry.index !== null) {
                    attributes.remove(geometry.index);
                }
    
                for (const name in geometry.attributes) {
                    attributes.remove(geometry.attributes[name]);
                }
    
                geometry.removeEventListener('dispose', onGeometryDispose);
                delete geometries[geometry.id];
                const attribute = wireframeAttributes.get(geometry);
    
                if (attribute) {
                    attributes.remove(attribute);
                    wireframeAttributes.delete(geometry);
                }
    
                bindingStates.releaseStatesOfGeometry(geometry);
    
                if (geometry.isInstancedBufferGeometry === true) {
                    delete geometry._maxInstanceCount;
                } //
    
    
                info.memory.geometries--;
            }
    
            function get(object, geometry) {
                if (geometries[geometry.id] === true) return geometry;
                geometry.addEventListener('dispose', onGeometryDispose);
                geometries[geometry.id] = true;
                info.memory.geometries++;
                return geometry;
            }
    
            function update(geometry) {
                const geometryAttributes = geometry.attributes; // Updating index buffer in VAO now. See WebGLBindingStates.
    
                for (const name in geometryAttributes) {
                    attributes.update(geometryAttributes[name], gl.ARRAY_BUFFER);
                } // morph targets
    
    
                const morphAttributes = geometry.morphAttributes;
    
                for (const name in morphAttributes) {
                    const array = morphAttributes[name];
    
                    for (let i = 0, l = array.length; i < l; i++) {
                        attributes.update(array[i], gl.ARRAY_BUFFER);
                    }
                }
            }
    
            function updateWireframeAttribute(geometry) {
                const indices = [];
                const geometryIndex = geometry.index;
                const geometryPosition = geometry.attributes.position;
                let version = 0;
    
                if (geometryIndex !== null) {
                    const array = geometryIndex.array;
                    version = geometryIndex.version;
    
                    for (let i = 0, l = array.length; i < l; i += 3) {
                        const a = array[i + 0];
                        const b = array[i + 1];
                        const c = array[i + 2];
                        indices.push(a, b, b, c, c, a);
                    }
                } else {
                    const array = geometryPosition.array;
                    version = geometryPosition.version;
    
                    for (let i = 0, l = array.length / 3 - 1; i < l; i += 3) {
                        const a = i + 0;
                        const b = i + 1;
                        const c = i + 2;
                        indices.push(a, b, b, c, c, a);
                    }
                }
    
                const attribute = new (arrayNeedsUint32(indices) ? Uint32BufferAttribute : Uint16BufferAttribute)(indices, 1);
                attribute.version = version; // Updating index buffer in VAO now. See WebGLBindingStates
                //
    
                const previousAttribute = wireframeAttributes.get(geometry);
                if (previousAttribute) attributes.remove(previousAttribute); //
    
                wireframeAttributes.set(geometry, attribute);
            }
    
            function getWireframeAttribute(geometry) {
                const currentAttribute = wireframeAttributes.get(geometry);
    
                if (currentAttribute) {
                    const geometryIndex = geometry.index;
    
                    if (geometryIndex !== null) {
                        // if the attribute is obsolete, create a new one
                        if (currentAttribute.version < geometryIndex.version) {
                            updateWireframeAttribute(geometry);
                        }
                    }
                } else {
                    updateWireframeAttribute(geometry);
                }
    
                return wireframeAttributes.get(geometry);
            }
    
            return {
                get: get,
                update: update,
                getWireframeAttribute: getWireframeAttribute
            };
        }
    
        function WebGLIndexedBufferRenderer(gl, extensions, info, capabilities) {
            const isWebGL2 = capabilities.isWebGL2;
            let mode;
    
            function setMode(value) {
                mode = value;
            }
    
            let type, bytesPerElement;
    
            function setIndex(value) {
                type = value.type;
                bytesPerElement = value.bytesPerElement;
            }
    
            function render(start, count) {
                gl.drawElements(mode, count, type, start * bytesPerElement);
                info.update(count, mode, 1);
            }
    
            function renderInstances(start, count, primcount) {
                if (primcount === 0) return;
                let extension, methodName;
    
                if (isWebGL2) {
                    extension = gl;
                    methodName = 'drawElementsInstanced';
                } else {
                    extension = extensions.get('ANGLE_instanced_arrays');
                    methodName = 'drawElementsInstancedANGLE';
    
                    if (extension === null) {
                        console.error('THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.');
                        return;
                    }
                }
    
                extension[methodName](mode, count, type, start * bytesPerElement, primcount);
                info.update(count, mode, primcount);
            } //
    
    
            this.setMode = setMode;
            this.setIndex = setIndex;
            this.render = render;
            this.renderInstances = renderInstances;
        }
    
        function WebGLInfo(gl) {
            const memory = {
                geometries: 0,
                textures: 0
            };
            const render = {
                frame: 0,
                calls: 0,
                triangles: 0,
                points: 0,
                lines: 0
            };
    
            function update(count, mode, instanceCount) {
                render.calls++;
    
                switch (mode) {
                    case gl.TRIANGLES:
                        render.triangles += instanceCount * (count / 3);
                        break;
    
                    case gl.LINES:
                        render.lines += instanceCount * (count / 2);
                        break;
    
                    case gl.LINE_STRIP:
                        render.lines += instanceCount * (count - 1);
                        break;
    
                    case gl.LINE_LOOP:
                        render.lines += instanceCount * count;
                        break;
    
                    case gl.POINTS:
                        render.points += instanceCount * count;
                        break;
    
                    default:
                        console.error('THREE.WebGLInfo: Unknown draw mode:', mode);
                        break;
                }
            }
    
            function reset() {
                render.frame++;
                render.calls = 0;
                render.triangles = 0;
                render.points = 0;
                render.lines = 0;
            }
    
            return {
                memory: memory,
                render: render,
                programs: null,
                autoReset: true,
                reset: reset,
                update: update
            };
        }
    
        class DataTexture2DArray extends Texture {
            constructor(data = null, width = 1, height = 1, depth = 1) {
                super(null);
                this.image = {
                    data,
                    width,
                    height,
                    depth
                };
                this.magFilter = NearestFilter;
                this.minFilter = NearestFilter;
                this.wrapR = ClampToEdgeWrapping;
                this.generateMipmaps = false;
                this.flipY = false;
                this.unpackAlignment = 1;
            }
    
        }
    
        DataTexture2DArray.prototype.isDataTexture2DArray = true;
    
        function numericalSort(a, b) {
            return a[0] - b[0];
        }
    
        function absNumericalSort(a, b) {
            return Math.abs(b[1]) - Math.abs(a[1]);
        }
    
        function denormalize(morph, attribute) {
            let denominator = 1;
            const array = attribute.isInterleavedBufferAttribute ? attribute.data.array : attribute.array;
            if (array instanceof Int8Array) denominator = 127;else if (array instanceof Int16Array) denominator = 32767;else if (array instanceof Int32Array) denominator = 2147483647;else console.error('THREE.WebGLMorphtargets: Unsupported morph attribute data type: ', array);
            morph.divideScalar(denominator);
        }
    
        function WebGLMorphtargets(gl, capabilities, textures) {
            const influencesList = {};
            const morphInfluences = new Float32Array(8);
            const morphTextures = new WeakMap();
            const morph = new Vector3();
            const workInfluences = [];
    
            for (let i = 0; i < 8; i++) {
                workInfluences[i] = [i, 0];
            }
    
            function update(object, geometry, material, program) {
                const objectInfluences = object.morphTargetInfluences;
    
                if (capabilities.isWebGL2 === true) {
                    // instead of using attributes, the WebGL 2 code path encodes morph targets
                    // into an array of data textures. Each layer represents a single morph target.
                    const numberOfMorphTargets = geometry.morphAttributes.position.length;
                    let entry = morphTextures.get(geometry);
    
                    if (entry === undefined || entry.count !== numberOfMorphTargets) {
                        if (entry !== undefined) entry.texture.dispose();
                        const hasMorphNormals = geometry.morphAttributes.normal !== undefined;
                        const morphTargets = geometry.morphAttributes.position;
                        const morphNormals = geometry.morphAttributes.normal || [];
                        const numberOfVertices = geometry.attributes.position.count;
                        const numberOfVertexData = hasMorphNormals === true ? 2 : 1; // (v,n) vs. (v)
    
                        let width = numberOfVertices * numberOfVertexData;
                        let height = 1;
    
                        if (width > capabilities.maxTextureSize) {
                            height = Math.ceil(width / capabilities.maxTextureSize);
                            width = capabilities.maxTextureSize;
                        }
    
                        const buffer = new Float32Array(width * height * 4 * numberOfMorphTargets);
                        const texture = new DataTexture2DArray(buffer, width, height, numberOfMorphTargets);
                        texture.format = RGBAFormat; // using RGBA since RGB might be emulated (and is thus slower)
    
                        texture.type = FloatType;
                        texture.needsUpdate = true; // fill buffer
    
                        const vertexDataStride = numberOfVertexData * 4;
    
                        for (let i = 0; i < numberOfMorphTargets; i++) {
                            const morphTarget = morphTargets[i];
                            const morphNormal = morphNormals[i];
                            const offset = width * height * 4 * i;
    
                            for (let j = 0; j < morphTarget.count; j++) {
                                morph.fromBufferAttribute(morphTarget, j);
                                if (morphTarget.normalized === true) denormalize(morph, morphTarget);
                                const stride = j * vertexDataStride;
                                buffer[offset + stride + 0] = morph.x;
                                buffer[offset + stride + 1] = morph.y;
                                buffer[offset + stride + 2] = morph.z;
                                buffer[offset + stride + 3] = 0;
    
                                if (hasMorphNormals === true) {
                                    morph.fromBufferAttribute(morphNormal, j);
                                    if (morphNormal.normalized === true) denormalize(morph, morphNormal);
                                    buffer[offset + stride + 4] = morph.x;
                                    buffer[offset + stride + 5] = morph.y;
                                    buffer[offset + stride + 6] = morph.z;
                                    buffer[offset + stride + 7] = 0;
                                }
                            }
                        }
    
                        entry = {
                            count: numberOfMorphTargets,
                            texture: texture,
                            size: new Vector2(width, height)
                        };
                        morphTextures.set(geometry, entry);
    
                        function disposeTexture() {
                            texture.dispose();
                            morphTextures.delete(geometry);
                            geometry.removeEventListener('dispose', disposeTexture);
                        }
    
                        geometry.addEventListener('dispose', disposeTexture);
                    } //
    
    
                    let morphInfluencesSum = 0;
    
                    for (let i = 0; i < objectInfluences.length; i++) {
                        morphInfluencesSum += objectInfluences[i];
                    }
    
                    const morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;
                    program.getUniforms().setValue(gl, 'morphTargetBaseInfluence', morphBaseInfluence);
                    program.getUniforms().setValue(gl, 'morphTargetInfluences', objectInfluences);
                    program.getUniforms().setValue(gl, 'morphTargetsTexture', entry.texture, textures);
                    program.getUniforms().setValue(gl, 'morphTargetsTextureSize', entry.size);
                } else {
                    // When object doesn't have morph target influences defined, we treat it as a 0-length array
                    // This is important to make sure we set up morphTargetBaseInfluence / morphTargetInfluences
                    const length = objectInfluences === undefined ? 0 : objectInfluences.length;
                    let influences = influencesList[geometry.id];
    
                    if (influences === undefined || influences.length !== length) {
                        // initialise list
                        influences = [];
    
                        for (let i = 0; i < length; i++) {
                            influences[i] = [i, 0];
                        }
    
                        influencesList[geometry.id] = influences;
                    } // Collect influences
    
    
                    for (let i = 0; i < length; i++) {
                        const influence = influences[i];
                        influence[0] = i;
                        influence[1] = objectInfluences[i];
                    }
    
                    influences.sort(absNumericalSort);
    
                    for (let i = 0; i < 8; i++) {
                        if (i < length && influences[i][1]) {
                            workInfluences[i][0] = influences[i][0];
                            workInfluences[i][1] = influences[i][1];
                        } else {
                            workInfluences[i][0] = Number.MAX_SAFE_INTEGER;
                            workInfluences[i][1] = 0;
                        }
                    }
    
                    workInfluences.sort(numericalSort);
                    const morphTargets = geometry.morphAttributes.position;
                    const morphNormals = geometry.morphAttributes.normal;
                    let morphInfluencesSum = 0;
    
                    for (let i = 0; i < 8; i++) {
                        const influence = workInfluences[i];
                        const index = influence[0];
                        const value = influence[1];
    
                        if (index !== Number.MAX_SAFE_INTEGER && value) {
                            if (morphTargets && geometry.getAttribute('morphTarget' + i) !== morphTargets[index]) {
                                geometry.setAttribute('morphTarget' + i, morphTargets[index]);
                            }
    
                            if (morphNormals && geometry.getAttribute('morphNormal' + i) !== morphNormals[index]) {
                                geometry.setAttribute('morphNormal' + i, morphNormals[index]);
                            }
    
                            morphInfluences[i] = value;
                            morphInfluencesSum += value;
                        } else {
                            if (morphTargets && geometry.hasAttribute('morphTarget' + i) === true) {
                                geometry.deleteAttribute('morphTarget' + i);
                            }
    
                            if (morphNormals && geometry.hasAttribute('morphNormal' + i) === true) {
                                geometry.deleteAttribute('morphNormal' + i);
                            }
    
                            morphInfluences[i] = 0;
                        }
                    } // GLSL shader uses formula baseinfluence * base + sum(target * influence)
                    // This allows us to switch between absolute morphs and relative morphs without changing shader code
                    // When baseinfluence = 1 - sum(influence), the above is equivalent to sum((target - base) * influence)
    
    
                    const morphBaseInfluence = geometry.morphTargetsRelative ? 1 : 1 - morphInfluencesSum;
                    program.getUniforms().setValue(gl, 'morphTargetBaseInfluence', morphBaseInfluence);
                    program.getUniforms().setValue(gl, 'morphTargetInfluences', morphInfluences);
                }
            }
    
            return {
                update: update
            };
        }
    
        function WebGLObjects(gl, geometries, attributes, info) {
            let updateMap = new WeakMap();
    
            function update(object) {
                const frame = info.render.frame;
                const geometry = object.geometry;
                const buffergeometry = geometries.get(object, geometry); // Update once per frame
    
                if (updateMap.get(buffergeometry) !== frame) {
                    geometries.update(buffergeometry);
                    updateMap.set(buffergeometry, frame);
                }
    
                if (object.isInstancedMesh) {
                    if (object.hasEventListener('dispose', onInstancedMeshDispose) === false) {
                        object.addEventListener('dispose', onInstancedMeshDispose);
                    }
    
                    attributes.update(object.instanceMatrix, gl.ARRAY_BUFFER);
    
                    if (object.instanceColor !== null) {
                        attributes.update(object.instanceColor, gl.ARRAY_BUFFER);
                    }
                }
    
                return buffergeometry;
            }
    
            function dispose() {
                updateMap = new WeakMap();
            }
    
            function onInstancedMeshDispose(event) {
                const instancedMesh = event.target;
                instancedMesh.removeEventListener('dispose', onInstancedMeshDispose);
                attributes.remove(instancedMesh.instanceMatrix);
                if (instancedMesh.instanceColor !== null) attributes.remove(instancedMesh.instanceColor);
            }
    
            return {
                update: update,
                dispose: dispose
            };
        }
    
        class DataTexture3D extends Texture {
            constructor(data = null, width = 1, height = 1, depth = 1) {
                // We're going to add .setXXX() methods for setting properties later.
                // Users can still set in DataTexture3D directly.
                //
                //	const texture = new THREE.DataTexture3D( data, width, height, depth );
                // 	texture.anisotropy = 16;
                //
                // See #14839
                super(null);
                this.image = {
                    data,
                    width,
                    height,
                    depth
                };
                this.magFilter = NearestFilter;
                this.minFilter = NearestFilter;
                this.wrapR = ClampToEdgeWrapping;
                this.generateMipmaps = false;
                this.flipY = false;
                this.unpackAlignment = 1;
            }
    
        }
    
        DataTexture3D.prototype.isDataTexture3D = true;
    
        /**
         * Uniforms of a program.
         * Those form a tree structure with a special top-level container for the root,
         * which you get by calling 'new WebGLUniforms( gl, program )'.
         *
         *
         * Properties of inner nodes including the top-level container:
         *
         * .seq - array of nested uniforms
         * .map - nested uniforms by name
         *
         *
         * Methods of all nodes except the top-level container:
         *
         * .setValue( gl, value, [textures] )
         *
         * 		uploads a uniform value(s)
         *		the 'textures' parameter is needed for sampler uniforms
         *
         *
         * Static methods of the top-level container (textures factorizations):
         *
         * .upload( gl, seq, values, textures )
         *
         * 		sets uniforms in 'seq' to 'values[id].value'
         *
         * .seqWithValue( seq, values ) : filteredSeq
         *
         * 		filters 'seq' entries with corresponding entry in values
         *
         *
         * Methods of the top-level container (textures factorizations):
         *
         * .setValue( gl, name, value, textures )
         *
         * 		sets uniform with	name 'name' to 'value'
         *
         * .setOptional( gl, obj, prop )
         *
         * 		like .set for an optional property of the object
         *
         */
        const emptyTexture = new Texture();
        const emptyTexture2dArray = new DataTexture2DArray();
        const emptyTexture3d = new DataTexture3D();
        const emptyCubeTexture = new CubeTexture(); // --- Utilities ---
        // Array Caches (provide typed arrays for temporary by size)
    
        const arrayCacheF32 = [];
        const arrayCacheI32 = []; // Float32Array caches used for uploading Matrix uniforms
    
        const mat4array = new Float32Array(16);
        const mat3array = new Float32Array(9);
        const mat2array = new Float32Array(4); // Flattening for arrays of vectors and matrices
    
        function flatten(array, nBlocks, blockSize) {
            const firstElem = array[0];
            if (firstElem <= 0 || firstElem > 0) return array; // unoptimized: ! isNaN( firstElem )
            // see http://jacksondunstan.com/articles/983
    
            const n = nBlocks * blockSize;
            let r = arrayCacheF32[n];
    
            if (r === undefined) {
                r = new Float32Array(n);
                arrayCacheF32[n] = r;
            }
    
            if (nBlocks !== 0) {
                firstElem.toArray(r, 0);
    
                for (let i = 1, offset = 0; i !== nBlocks; ++i) {
                    offset += blockSize;
                    array[i].toArray(r, offset);
                }
            }
    
            return r;
        }
    
        function arraysEqual(a, b) {
            if (a.length !== b.length) return false;
    
            for (let i = 0, l = a.length; i < l; i++) {
                if (a[i] !== b[i]) return false;
            }
    
            return true;
        }
    
        function copyArray(a, b) {
            for (let i = 0, l = b.length; i < l; i++) {
                a[i] = b[i];
            }
        } // Texture unit allocation
    
    
        function allocTexUnits(textures, n) {
            let r = arrayCacheI32[n];
    
            if (r === undefined) {
                r = new Int32Array(n);
                arrayCacheI32[n] = r;
            }
    
            for (let i = 0; i !== n; ++i) {
                r[i] = textures.allocateTextureUnit();
            }
    
            return r;
        } // --- Setters ---
        // Note: Defining these methods externally, because they come in a bunch
        // and this way their names minify.
        // Single scalar
    
    
        function setValueV1f(gl, v) {
            const cache = this.cache;
            if (cache[0] === v) return;
            gl.uniform1f(this.addr, v);
            cache[0] = v;
        } // Single float vector (from flat array or THREE.VectorN)
    
    
        function setValueV2f(gl, v) {
            const cache = this.cache;
    
            if (v.x !== undefined) {
                if (cache[0] !== v.x || cache[1] !== v.y) {
                    gl.uniform2f(this.addr, v.x, v.y);
                    cache[0] = v.x;
                    cache[1] = v.y;
                }
            } else {
                if (arraysEqual(cache, v)) return;
                gl.uniform2fv(this.addr, v);
                copyArray(cache, v);
            }
        }
    
        function setValueV3f(gl, v) {
            const cache = this.cache;
    
            if (v.x !== undefined) {
                if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z) {
                    gl.uniform3f(this.addr, v.x, v.y, v.z);
                    cache[0] = v.x;
                    cache[1] = v.y;
                    cache[2] = v.z;
                }
            } else if (v.r !== undefined) {
                if (cache[0] !== v.r || cache[1] !== v.g || cache[2] !== v.b) {
                    gl.uniform3f(this.addr, v.r, v.g, v.b);
                    cache[0] = v.r;
                    cache[1] = v.g;
                    cache[2] = v.b;
                }
            } else {
                if (arraysEqual(cache, v)) return;
                gl.uniform3fv(this.addr, v);
                copyArray(cache, v);
            }
        }
    
        function setValueV4f(gl, v) {
            const cache = this.cache;
    
            if (v.x !== undefined) {
                if (cache[0] !== v.x || cache[1] !== v.y || cache[2] !== v.z || cache[3] !== v.w) {
                    gl.uniform4f(this.addr, v.x, v.y, v.z, v.w);
                    cache[0] = v.x;
                    cache[1] = v.y;
                    cache[2] = v.z;
                