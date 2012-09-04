# Custom `resizeend` event

Best of both worlds: `window.onresize` and `window.onorientationchange`. [**See the demo.**](http://porada.github.com/resizeend/)

The event is fired in two cases:

1. **When a browser window has finished resizing.**

    It’s the cure for those `window.onresize` skips that occur every pixel when you resize your browser’s window. `performance++` for sure.

2. **When changing the device orientation has resized the viewport.**

    Unless the shape of your screen is a square, switching from portrait mode into landscape (and vice versa) triggers `resizeend`. If rotating a device upside down doesn’t alter its viewport dimensions, the event isn’t dispatched, because there’s simply no need to.

Super useful in the [Responsive Web Design](http://en.wikipedia.org/wiki/Responsive_Web_Design) era we’re living and developing in.

## Usage

```javascript
// Works in every modern browser
if ( window.addEventListener ) {
  window.addEventListener("resizeend", callback, false);
}
// Falls back to `resize` for IE 8 and below
else {
  window.attachEvent("onresize", callback);
}

function callback(event) {
  console.log(event.type);
}
```

## Feedback

Any suggestions are [welcome](https://github.com/porada/resizeend/issues). You can also shout to me on Twitter: I’m **[@porada](http://twitter.com/porada)**.