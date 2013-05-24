(function(window) {
  var currentOrientation, debounce, dispatchResizeEndEvent, document, events, getCurrentOrientation, initialOrientation, resizeDebounceTimeout;

  document = window.document;
  if (!(window.addEventListener && document.createEvent)) {
    return;
  }
  events = ['resize:end', 'resizeend'].map(function(event) {
    event = document.createEvent('Event');
    event.initEvent('resizeend', false, false);
    return event;
  });
  dispatchResizeEndEvent = function() {
    return events.forEach(window.dispatchEvent);
  };
  getCurrentOrientation = function() {
    return Math.abs(+window.orientation || 0) % 180;
  };
  initialOrientation = getCurrentOrientation();
  currentOrientation = null;
  resizeDebounceTimeout = null;
  debounce = function() {
    currentOrientation = getCurrentOrientation();
    if (currentOrientation !== initialOrientation) {
      dispatchResizeEndEvent();
      return initialOrientation = currentOrientation;
    } else {
      clearTimeout(resizeDebounceTimeout);
      return resizeDebounceTimeout = setTimeout(dispatchResizeEndEvent, 100);
    }
  };
  return window.addEventListener('resize', debounce, false);
})(window);
