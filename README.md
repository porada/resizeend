# `resize:end` [![Build Status](https://travis-ci.org/porada/resizeend.png)](https://travis-ci.org/porada/resizeend)

> The blend of debounced `resize` event with `orientationchange` flavor. **[See the demo.](http://porada.github.com/resizeend/demo/)**

## Example usage

```javascript
window.addEventListener('resize:end', function(event) {
  // Your callback, e.g.
  console.log(event.type);
}, false);
```

## How it works

The `resize:end` (and `resizeend`) event is dispatched in two cases:

#### Browser window has finished resizing

It’s the cure for those `window.onresize` skips that occur every pixel as long as you keep resizing your browser’s window. Details matter. `performance++`, too.

#### Changing device orientation resizes the viewport

Switching from portrait mode into landscape (and vice versa) triggers `resize:end`. If rotating a device doesn’t alter its viewport dimensions (e.g. rotating it upside down), the event isn’t dispatched, because there’s simply no need to.

## Browser support

Tested in the following browsers:

* Safari 6+
* Chrome 20+
* Firefox 14+
* Opera 12+
* Internet Explorer 9+
* Mobile Safari on iOS 6+

## Feedback

Any suggestions are [welcome](https://github.com/porada/resizeend/issues). You can also shout to me on Twitter: I’m **[@porada](http://twitter.com/porada)**.

## License

Distributed under [MIT license](http://porada.mit-license.org).
