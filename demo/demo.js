(function(window, document) {

  window.addEventListener('resizeend', logTime, false);

  /**
   * Updates the message in the log.
  */
  function logTime(event) {
    var log = document.getElementById(event.type);

    if ( log && log.nodeType === 1 ) {
      log.className = '';
      log.innerHTML = createEntry(event.type, new Date());
    }
  }

  /**
   * Creates the very string of the log.
  */
  function createEntry(trigger, date) {
    return '<code>' + trigger + '</code> was triggered at <b>' + pad(date.getUTCHours())
      + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds())
      + '.' + pad(Math.floor(date.getUTCMilliseconds() / 10)) + '</b>';
  }

  /**
   * Makes sure that a given number contains a leading zero if necessary.
  */
  function pad(number) {
    return (( number < 10 ) ? '0' : '') + number;
  }

})(window, document);
