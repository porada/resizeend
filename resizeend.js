/*! https://github.com/porada/resizeend · MIT */

(function(window) {
  var document = window.document;

  var event;
  var events = ['resize:end', 'resizeend'].map(function(name) {
    event = document.createEvent('Event');
    event.initEvent(name, false, false);
    return event;
  });

  var dispatchResizeEndEvent = function() {
    events.forEach(function(event) {
      window.dispatchEvent(event);
    });
  };

  var getCurrentOrientation = function() {
    return Math.abs(+window.orientation || 0) % 180;
  };

  var initialOrientation = getCurrentOrientation();
  var currentOrientation;
  var resizeDebounceTimeout;

  var debounce = function() {
    currentOrientation = getCurrentOrientation();

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
