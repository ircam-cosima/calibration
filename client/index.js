/**
 * @fileOverview Client-side calibration component
 * @author Jean-Philippe.Lambert@ircam.fr
 */

'use strict';

var debug = require('debug')('soundworks:client:calibration');
var platform = require('platform');

// calibration~calibration type definition
var calibrationType = require('../common/calibration');

var CalibrationClient = (function(){var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var proto$0={};
  /**
   * This is the constructor. See {@linkcode CalibrationClient~save}
   * and {@linkcode CalibrationClient~load}
   *
   * @constructs CalibrationClient
   * @param {Object} [localStorage]
   * @param {Boolean} [localStorage.enabled=false] true to try to use
   * local storage.
   * @param {String} [localStorage.prefix='soundworks:calibration.']
   */
  function CalibrationClient() {var params = arguments[0];if(params === void 0)params = { localStorage: {} };
    this.localStorage = {};
    this.localStorage.enabled = (typeof params.localStorage.enabled !== 'undefined'
                                 ? params.localStorage.enabled
                                 : true);
    // localStorage is requested
    if(this.localStorage.enabled) {
      this.localStorage.data = {};
      this.localStorage.prefix = (typeof params.localStorage.prefix !== 'undefined'
                                  ? params.localStorage.prefix
                                  : 'soundworks:calibration.');
      this.localStorage.enabled = typeof window.localStorage !== 'undefined';
      if(this.localStorage.enabled) {
        try {
          window.localStorage[this.localStorage.prefix + 'storage-enabled'] = true;
          window.localStorage.removeItem(this.localStorage.prefix + 'storage-enabled');
        } catch (error) {
          // localStorage is not available
          this.localStorage.enabled = false;
        }
      }

      this.userAgent = platform.ua;

      // calibrated attributes
      this.audio = {};
      this.network = {};
    }
  }DP$0(CalibrationClient,"prototype",{"configurable":false,"enumerable":false,"writable":false});

  /**
   * Get an identifier for making a request on the server.
   *
   * @see {@linkcode CalibrationServer~load}
   *
   * @function CalibrationClient~getId
   * @returns {String} Identifier
   */
  proto$0.getId = function() {
    return this.userAgent;
  };

  /**
   * Get the calibrated values.
   *
   * @function CalibrationClient~get
   * @returns {calibration} calibration
   */
  proto$0.get = function() {
    return {
      audio: this.audio,
      network: this.network
    };
  };

  /**
   * Set audio calibration from given values.
   *
   * Non audio parameters (like network statistics) are not set.
   *
   * @function CalibrationClient~set
   * @param {calibration} restoreParams
   */
  proto$0.set = function(params) {
    if(typeof params !== 'undefined'
       && typeof params.audio !== 'undefined') {
      this.audio = params.audio;
    }
  };

  /**
   * Store the current calibration locally, if localStorage is
   * enabled.
   *
   * See {@linkcode CalibrationClient~set} to change the current calibration.
   *
   * @function CalibrationClient~save
   */
  proto$0.save = function() {
    var params = {
      audio: this.audio,
      network: this.network
    };
    if(this.localStorage.enabled) {
      try {
        for(var c in params) {
          if(params.hasOwnProperty(c) ) {
            window.localStorage[this.localStorage.prefix + c]
              = JSON.stringify(params[c]);
          }
        }
      } catch (error) {
        console.log(error.message);
        this.localStorage.enabled = false;
      }
    }
    return this.localStorage.enabled;
  };

  /**
   * Return calibration values from local storage, if enabled and
   * available.
   *
   * Note that it does not set it. See {@linkcode
   * CalibrationClient~set}.
   *
   * @function CalibrationClient~load
   * @returns {calibration} or {} if no calibration is available
   */
  proto$0.load = function() {var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function GET_ITER$0(v){if(v){if(Array.isArray(v))return 0;var f;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){if(S_MARK$0)S_MARK$0(void 0);return f.call(v);}if(S_MARK$0)S_MARK$0(void 0);if((v+'')==='[object Generator]')return v;}throw new Error(v+' is not iterable')};var $D$0;var $D$1;var $D$2;
    var calibration = {};
    if(this.localStorage.enabled) {
      var keys = ['audio', 'network'];
      $D$0 = GET_ITER$0(keys);$D$2 = $D$0 === 0;$D$1 = ($D$2 ? keys.length : void 0);for(var k ;$D$2 ? ($D$0 < $D$1) : !($D$1 = $D$0["next"]())["done"];){k = ($D$2 ? keys[$D$0++] : $D$1["value"]);
        if(typeof window.localStorage[this.localStorage.prefix + k]
           !== 'undefined') {
          calibration[k] = JSON.parse(
            window.localStorage[this.localStorage.prefix + k]);
        }
      };$D$0 = $D$1 = $D$2 = void 0;
    }
    return calibration;
  };

MIXIN$0(CalibrationClient.prototype,proto$0);proto$0=void 0;return CalibrationClient;})();

module.exports = CalibrationClient;
