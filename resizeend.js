
/* resizeend.js © 2012 Dominik Porada
 * Distributed under the MIT license: http://porada.mit-license.org
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */

;(function(window) {
  "use strict";

  // Quite loosely named function
  var dispatchResizeEndEvent = function() {
    if ( typeof window.onresizeend === "function" ) {
      window.onresizeend();
    }
  };

  // Assuming `window.orientation` is all about degrees
  // (or nothing), the function returns either 0 or 90
  var getCurrentOrientation = function() {
    return Math.abs(+window.orientation || 0) % 180;
  };

  var initialOrientation = getCurrentOrientation();
  var currentOrientation;
  var resizeTimeout;

  var resizeDebounce = function() {
    currentOrientation = getCurrentOrientation();

    // If `window` is resized due to an orientation change,
    // invoke `onresizeend` immediately; otherwise, slightly delay it
    if ( currentOrientation !== initialOrientation ) {
      dispatchResizeEndEvent();
      initialOrientation = currentOrientation;
    }
    else {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(dispatchResizeEndEvent, 100);
    }
  };

  if ( window.addEventListener ) {
    window.addEventListener("resize", resizeDebounce, false);
  }
  else if ( window.attachEvent ) {
    window.attachEvent("onresize", resizeDebounce);
  }

})(window);


/* Example usage
----------------------------------------------------------------------------- */

//  window.onresizeend = function(event) {
//    console.log(event.type);
//  }