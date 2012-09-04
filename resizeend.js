
/* resizeend.js © 2012 Dominik Porada
 * This script may be freely distributed under the MIT license.
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */

;(function(window) {
  "use strict";

  // No `resizeend` for IE 8 or below (see the example usage below)
  if ( !window.addEventListener || !window.dispatchEvent ) {
    return;
  }

  var dispatchresizeEndEvent = function() {
    var resizeEndEvent = document.createEvent("Event");
    resizeEndEvent.initEvent("resizeend", false, false);
    window.dispatchEvent(resizeEndEvent);
  };

  // Assuming `window.orientation` is all about degrees
  // (or nothing), the function returns either 0 or 90
  var getCurrentOrientation = function() {
    return Math.abs(+window.orientation || 0) % 180;
  };

  var initialOrientation = getCurrentOrientation();
  var resizeTimeout;

  window.addEventListener("resize", function() {
    var currentOrientation = getCurrentOrientation();

    // If `window` is resized due to an orientation change,
    // fire the `resizeend` event immediately; otherwise,
    // slightly delay the dispatch of `resizeend`
    if ( currentOrientation !== initialOrientation ) {
      dispatchresizeEndEvent();
      initialOrientation = currentOrientation;
    }
    else {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(dispatchresizeEndEvent, 100);
    }
  }, false);

})(window);


/* Example usage
----------------------------------------------------------------------------- */

//  if ( window.addEventListener ) {
//    window.addEventListener("resizeend", callback, false);
//  }
//  else {
//    window.attachEvent("onresize", callback);
//  }
//
//  function callback(event) {
//    console.log(event.type);
//  }