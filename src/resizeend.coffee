#
# resizeend.coffee © 2012–2013 Dominik Porada · http://porada.mit-license.org
# ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••

do (window) ->
  document = window.document
  return unless window.addEventListener and document.createEvent

  # Preparing for v2.0
  events = ['resize:end', 'resizeend'].map (event) ->
    event = document.createEvent 'Event'
    event.initEvent 'resizeend', false, false
    event

  dispatchResizeEndEvent = ->
    events.forEach window.dispatchEvent

  # Assuming `window.orientation` is all about degrees (or nothing),
  # the function expression returns either 0 or 90
  getCurrentOrientation = -> Math.abs(+window.orientation or 0) % 180
  initialOrientation = getCurrentOrientation()

  currentOrientation = null
  resizeDebounceTimeout = null

  debounce = ->
    currentOrientation = getCurrentOrientation()

    # If `window` is resized due to an orientation change,
    # dispatch `resizeend` immediately; otherwise, slightly delay it
    unless currentOrientation is initialOrientation
      dispatchResizeEndEvent()
      initialOrientation = currentOrientation
    else
      clearTimeout resizeDebounceTimeout
      resizeDebounceTimeout = setTimeout dispatchResizeEndEvent, 100

  window.addEventListener 'resize', debounce, false
