
/* resizestart.js © 2012 Dominik Porada
 * Distributed under the MIT license: http://porada.mit-license.org
••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••• */

;(function(window, document, resizeEnd, resizeStart) {
  "use strict";

  var dispatchCustomEvent = function(eventType) {
    var possibleEventCallback = window["on" + eventType];

    // If the callback is present, invoke it;
    // otherwise, dispatch an actual event (if that’s possible)
    if ( typeof possibleEventCallback === "function" ) {
      possibleEventCallback();
    }
    else if ( document.createEvent && window.dispatchEvent ) {
      var event = document.createEvent("Event");
      event.initEvent(eventType, false, false);
      window.dispatchEvent(event);
    }
  };

  // Assuming `window.orientation` is all about degrees
  // (or nothing), the function returns either 0 or 90
  var getCurrentOrientation = function() {
    return Math.abs(+window.orientation || 0) % 180;
  };

  var initialOrientation = getCurrentOrientation();
  var currentOrientation;
  var resizeDebounceInit;
  var resizeDebounceTimeout;

  var resizeDebounce = function() {
    if ( !resizeDebounceInit ) {
      dispatchCustomEvent(resizeStart);
      resizeDebounceInit = true;
    }

    currentOrientation = getCurrentOrientation();

    // If `window` is resized due to an orientation change,
    // dispatch `resizeend` immediately; otherwise, slightly delay it
    if ( currentOrientation !== initialOrientation ) {
      dispatchCustomEvent(resizeEnd);
      initialOrientation = currentOrientation;
      resizeDebounceInit = false;
    }
    else {
      clearTimeout(resizeDebounceTimeout);
      resizeDebounceTimeout = setTimeout(function() {
        dispatchCustomEvent(resizeEnd);
        resizeDebounceInit = false;
      }, 100);
    }
  };

  if ( window.addEventListener ) {
    window.addEventListener("resize", resizeDebounce, false);
  }
  else if ( window.attachEvent ) {
    window.attachEvent("onresize", resizeDebounce);
  }

})(window, document, "resizeend", "resizestart");