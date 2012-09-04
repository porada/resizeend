# `window.onresizeend`

Best of both worlds: `window.onresize` and `window.onorientationchange`. [**See the demo.**](http://porada.github.com/resizeend/)

The `resizeend` callback is invoked in two cases:

1. **When a browser window has finished resizing.**

    It’s the cure for those `window.onresize` skips that occur every pixel as long as you keep resizing your browser’s window. Details matter. `performance++`, too.

2. **When changing the device orientation has resized the viewport.**

    Unless the shape of your screen is a square, switching from portrait mode into landscape (and vice versa) triggers `window.onresizeend`. If rotating a device upside down doesn’t alter its viewport dimensions, the callback isn’t invoked, because there’s simply no need to.

Super useful in the [Responsive Web Design](http://en.wikipedia.org/wiki/Responsive_Web_Design) era we’re living and developing in.

Did I mention *it’s tiny*? [**Go through the source code.**](https://github.com/porada/resizeend/blob/master/resizeend.js)

## Example usage

```javascript
window.onresizeend = function() {
  // callback
};
```

Should your need multiple `resizeend` listeners:

```javascript
window.addResizeEndListener = function(callback) {
  if ( typeof this.onresizeend === "function" ) {
    var currentCallback = this.onresizeend;

    this.onresizeend = function() {
      currentCallback();
      callback();
    };
  }
  else {
    this.onresizeend = callback;
  }
};

window.addResizeEndListener(callback1);
window.addResizeEndListener(callback2);
//                                  …
window.addResizeEndListener(callbackN);
```

## Browser support

Tested in the following browsers:

* Safari 5.1+,
* Chrome 20+,
* Firefox 14+,
* Opera 11+,
* Internet Explorer **7+**,
* Mobile Safari on iOS 5+.

I haven’t tested `resizeend.js` in IE 10 yet, but I think it’s safe to assume the script will do just fine in that browser.

## Feedback

Any suggestions are [welcome](https://github.com/porada/resizeend/issues). You can also shout to me on Twitter: I’m **[@porada](http://twitter.com/porada)**.