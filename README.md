# `resizeend.js`

Best of both worlds *slash events*: `resize` and `orientationchange`. [**See the demo.**](http://porada.github.com/resizeend/)

The `resizeend` event is dispatched in two cases:

1. **When a browser window has finished resizing.**

    It’s the cure for those `window.onresize` skips that occur every pixel as long as you keep resizing your browser’s window. Details matter. `performance++`, too.

2. **When changing the device orientation has resized the viewport.**

    Unless the shape of your screen is a square, switching from portrait mode into landscape (and vice versa) triggers `resizeend`. If rotating a device upside down doesn’t alter its viewport dimensions, the event isn’t dispatched, because there’s simply no need to.

Super useful in the [Responsive Web Design](http://en.wikipedia.org/wiki/Responsive_Web_Design) era we’re living and developing in.

Did I mention *it’s tiny*? [**Go through the source code.**](https://github.com/porada/resizeend/blob/master/resizeend.js)

## Example usage

```javascript
window.addEventListener("resizeend", function(event) {
  // Your callback, e.g.
  console.log(event.type);
}, false);
```

## Browser support

Tested in the following browsers:

* Safari 5.1+
* Chrome 20+
* Firefox 14+
* Opera 11+
* Internet Explorer 9+
* Mobile Safari on iOS 5+

**If you require support for IE 8 and below, [use the previous version](https://github.com/porada/resizeend/tree/ie8-support).**

## Feedback

Any suggestions are [welcome](https://github.com/porada/resizeend/issues). You can also shout to me on Twitter: I’m **[@porada](http://twitter.com/porada)**.