
/* resizeend.js © 2012 Dominik Porada
 * Distributed under the MIT license: http://porada.mit-license.org
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */

;(function(window, document) {
  "use strict";

  if ( !(window.addEventListener && document.createEvent && window.dispatchEvent) ) {
    return;
  }

  var dispatchResizeEndEvent = function() {
    var event = document.createEvent("Event");
    event.initEvent("resizeend", false, false);
    window.dispatchEvent(event);
  };

  // Assuming `window.orientation` is all about degrees
  // (or nothing), the function returns either 0 or 90
  var getCurrentOrientation = function() {
    return Math.abs(+window.orientation || 0) % 180;
  };

  var initialOrientation = getCurrentOrientation();
  var currentOrientation;
  var resizeDebounceTimeout;

  window.addEventListener("resize", function() {
    currentOrientation = getCurrentOrientation();

    // If `window` is resized due to an orientation change,
    // dispatch `resizeend` immediately; otherwise, slightly delay it
    if ( currentOrientation !== initialOrientation ) {
      dispatchResizeEndEvent();
      initialOrientation = currentOrientation;
    }
    else {
      clearTimeout(resizeDebounceTimeout);
      resizeDebounceTimeout = setTimeout(dispatchResizeEndEvent, 100);
    }
  }, false);

})(window, document);