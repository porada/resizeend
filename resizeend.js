/*! https://github.com/porada/resizeend · MIT */

(function(window, document) {
  'use strict';

  document = window.document;

  function initEvent(eventName) {
    var event = document.createEvent('Event');
    event.initEvent(eventName, false, false);
    return event;
  }

  function debounce(callback, delay) {
    var timeout;
    var timestamp;

    return function() {
      timestamp = new Date();
      var delayed = function() {
        var last = (new Date()) - timestamp;

        if ( last < delay ) {
          timeout = setTimeout(delayed, delay - last);
        } else {
          timeout = null;
          callback();
        }
      };

      if ( !timeout ) {
        timeout = setTimeout(delayed, delay);
      }
    };
  }

  var resizeEndEvent = initEvent('resize:end');
  var handleResizeEvent = debounce(function() {
    window.dispatchEvent(resizeEndEvent);
  }, 100);

  window.addEventListener('resize', handleResizeEvent, false);
})(window);
