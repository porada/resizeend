/*! https://github.com/porada/resizeend · MIT */

(function(window, document) {
  'use strict';

  document = window.document;

  function initEvent(eventName) {
    var event = document.createEvent('Event');
    event.initEvent(eventName, false, false);
    return event;
  }

  function getOrientation() {
    return Math.abs(parseInt(window.orientation) || 0) % 180;
  }

  var resizeEndEvent = initEvent('resize:end');
  var dispatchResizeEndEvent = function() {
    window.dispatchEvent(resizeEndEvent);
  };

  var initialOrientation = getOrientation();
  var currentOrientation;
  var resizeDebounceTimeout;

  var debounce = function() {
    currentOrientation = getOrientation();

    if ( currentOrientation !== initialOrientation ) {
      dispatchResizeEndEvent();
      initialOrientation = currentOrientation;
    } else {
      clearTimeout(resizeDebounceTimeout);
      resizeDebounceTimeout = setTimeout(dispatchResizeEndEvent, 100);
    }
  };

  window.addEventListener('resize', debounce, false);
})(window);
