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
   * @callback CalibrationClient~sendFunction
   * @see {@linkcode CalibrationServer~receiveFunction}
   * @param {String} messageType identification of ping message type
   * @param {Object} params
   **/

  /**
   * @callback CalibrationClient~receiveFunction
   * @see {@linkcode CalibrationServer~sendFunction}
   * @param {String} messageType identification of pong message type
   * @param {SyncClient~receiveCallback} receiveCallback called on
   * each message matching messageType.
   **/

  /**
   * @callback CalibrationClient~receiveCallback
   * @param {...Any} arguments
   */

  /**
   * Function called when an update happened.
   *
   * See {@linkcode ClientCalibration~load}.
   *
   * @callback ClientCalibration~updateFunction
   **/

  /**
   * This is the constructor. See {@linkcode CalibrationClient~save}
   * and {@linkcode CalibrationClient~load}
   *
   * @constructs CalibrationClient
   * @param {Object} [params]
   * @param {Object} [params.localStorage]
   * @param {Boolean} [params.localStorage.enabled=false] true to try to use
   * local storage.
   * @param {String} [params.localStorage.prefix='soundworks:calibration.']
   * @param {ClientCalibration~updateFunction} [param.updateFunction]
   */
  function CalibrationClient() {var params = arguments[0];if(params === void 0)params = {};var this$0 = this;
    this.sendFunction = params.sendFunction; // undefined is fine
    this.receiveFunction = params.receiveFunction; // undefined is fine
    this.updateFunction = params.updateFunction; // undefined is fine

    this.localStorage = {};
    this.localStorage.enabled = (typeof params.localStorage !== 'undefined'
                                 && typeof params.localStorage.enabled !== 'undefined'
                                 ? params.localStorage.enabled
                                 : true);
    // localStorage is requested
    if(this.localStorage.enabled) {
      this.localStorage.data = {};
      this.localStorage.prefix = (typeof params.localStorage !== 'undefined'
                                  && typeof params.localStorage.prefix !== 'undefined'
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

    if(typeof this.receiveFunction !== 'undefined') {
      this.receiveFunction('calibration:set', function(params)  {
        this$0.set(params);
      });
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
   * Set calibration from given values.
   *
   * @function CalibrationClient~set
   * @param {calibration} params
   */
  proto$0.set = function(params) {
    if(typeof params !== 'undefined') {
      if(typeof params.audio !== 'undefined') {
        this.audio = params.audio;
      }
      if(typeof params.audio !== 'undefined') {
        this.network = params.network;
      }
      if(typeof this.updateFunction !== 'undefined') {
        this.updateFunction();
      }
    }
  };

  /**
   * Store the current calibration locally, if localStorage is
   * enabled, and on the server.
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

    this.sendFunction('calibration:save', {
      id: this.getId(),
      calibration: this.get()
    });
  };

  /**
   * Load and set calibration values from local storage, if enabled
   * and available, or from server.
   *
   * It will then call the update function if defined by the
   * constructor. Note that loading from the server is asynchronous.
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

    if(calibration.hasOwnProperty('audio') ) {
      this.set(calibration);
    } else {
      // restore from server
      this.sendFunction('calibration:load', { id: this.getId() } );
    }

    return calibration;
  };

MIXIN$0(CalibrationClient.prototype,proto$0);proto$0=void 0;return CalibrationClient;})();

module.exports = CalibrationClient;
