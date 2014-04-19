/*! https://github.com/porada/resizeend · MIT */

;(function() {
  'use strict';

  function createEvent(type) {
    var event;

    try {
      event = new Event(type);
    } catch(exception) {
      event = document.createEvent('Event');
      event.initEvent(type, false, false);
    }

    return event;
  }

  function debounce(callback, delay) {
    var callbackContext, callbackArguments;
    var timeout, timestamp;

    return function() {
      callbackContext = this;
      callbackArguments = [].slice.call(arguments, 0);
      timestamp = new Date();

      var delayed = function() {
        var last = (new Date()) - timestamp;

        if ( last < delay ) {
          timeout = setTimeout(delayed, delay - last);
        } else {
          timeout = null;
          callback.apply(callbackContext, callbackArguments);
        }
      };

      if ( !timeout ) {
        timeout = setTimeout(delayed, delay);
      }
    };
  }

  var resizeEndEvent = createEvent('resize:end');
  var handleResizeEvent = debounce(function(event) {
    event.target.dispatchEvent(resizeEndEvent);
  }, 100);

  addEventListener('resize', handleResizeEvent, false);

})();
