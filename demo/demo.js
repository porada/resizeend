window.addEventListener("resizeend", callback, false);

function callback(event) {
  var log = document.getElementById(event.type);

  if ( log && log.nodeType === 1 ) {
    var entry, date = new Date();

    entry  = "<code>" + event.type + "</code> was triggered ";
    entry += "at&nbsp;<b>" + pad(date.getUTCHours()) + ":";
    entry += pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + ".";
    entry += pad(Math.floor(date.getUTCMilliseconds() / 10)) + "</b>";

    log.className = "";
    log.innerHTML = entry;
  }
}

function pad(number) {
  return ( number < 10 ) ? "0" + number : "" + number;
}
