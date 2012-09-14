# `resizeend.js`

Best of both worlds: `window.onresize` and `window.onorientationchange`. [**See the demo.**](http://porada.github.com/resizeend/)

The `window.onresizeend` callback is invoked in two cases:

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

If you don’t support IE 8 anymore, just use:

```javascript
window.addEventListener("resizeend", function() {
  // callback
}, false);
```

### Multiple `resizeend` listeners

Should you ever need multiple `resizeend` listeners that work in IE 8 and below:

```javascript
window.addResizeEndListener = function(callback) {
  if ( this.addEventListener ) {
    this.addEventListener("resizeend", callback, false);
  }
  else if ( typeof this.onresizeend === "function" ) {
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

## What about `resizestart`?

The script also invokes `window.onresizestart` callback when the viewport has just started resizing.

If the very resizing has any noticeable impact on performance, e.g. due to presence of many `box-shadow`s or alpha PNGs, I recommend using this technique:

```javascript
window.onresizestart = function() {
  // Use the class name defined in your CSS
  element.className = "hidden";
};

window.onresizeend = function() {
  yourResizeEndCallback();

  // Remove the class this way or another
  element.className = "";
};
```

Naturally, if you don’t support IE 8, use:

```javascript
window.addEventListener("resizestart", function() {
  element.className = "hidden";
}, false);

// and so on…
```

The `resize` event in Opera is designed to work like ideal `resizeend`. It’s dispatched exactly when the browser has finished resizing and this is also when `resizestart` is sent, right *before* `resizeend`.

## Browser support

Tested in the following browsers:

* Safari 5.1+
* Chrome 20+
* Firefox 14+
* Opera 11+
* Internet Explorer 7+
* Mobile Safari on iOS 5+

## Feedback

Any suggestions are [welcome](https://github.com/porada/resizeend/issues). You can also shout to me on Twitter: I’m **[@porada](http://twitter.com/porada)**.