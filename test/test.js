describe('resize:end', function() {
  var sandbox;
  var sandboxWindow;

  beforeEach(function(done) {
    jasmine.addMatchers({
      toApproximatelyEqual: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            var actualRounded = Math.round(actual / 10) * 10;
            return {
              pass: util.equals(actualRounded, expected, customEqualityTesters)
            };
          }
        };
      }
    });

    // A browser can’t be resized reliably using `window.resizeTo`,
    // therefore creating a sandbox iframe that can be resized
    sandbox = document.createElement('iframe');
    sandbox.setAttribute('width', 1000);
    sandbox.addEventListener('load', function() {
      sandboxWindow = sandbox.contentWindow;

      // Looking for the path to `resizeend.js` in order to
      // re-inject the script into the iframe document
      var script = document.querySelector('script[src*="resizeend.js"]');
      var sandboxScript = document.createElement('script');
      sandboxScript.setAttribute('src', script.getAttribute('src'));
      sandboxScript.addEventListener('load', done, false);
      sandboxWindow.document.body.appendChild(sandboxScript);
    });
    document.body.appendChild(sandbox);
  });

  afterEach(function() {
    sandbox.parentNode.removeChild(sandbox);
    sandbox = sandboxWindow = null;
  });

  it('relies on `resize` event which is supported', function(done) {
    // Making sure the sandbox window can be programatically resized,
    // because it’s crucial for the rest of the tests
    sandboxWindow.addEventListener('resize', done, false);
    setTimeout(function() {
      sandbox.setAttribute('width', 500);
    }, 0);
  });

  it('is triggered after the browser is resized', function(done) {
    sandboxWindow.addEventListener('resize:end', done, false);
    setTimeout(function() {
      sandbox.setAttribute('width', 500);
    }, 0);
  });

  it('is triggered within ~100ms after the browser has been resized', function(done) {
    var value = 0;
    var resizeTime = null;
    var resizeEndTime = null;

    sandboxWindow.addEventListener('resize', function() {
      value += 1;
      resizeTime = new Date();
    }, false);

    sandboxWindow.addEventListener('resize:end', function() {
      value += 1;
      resizeEndTime = new Date();
    }, false);

    setTimeout(function() {
      sandbox.setAttribute('width', 500);
    }, 0);

    setTimeout(function() {
      expect(value).toEqual(2);
      expect(resizeEndTime - resizeTime).toApproximatelyEqual(100);
      done();
    }, 500);
  });

  it('is debounced', function(done) {
    var value = 0;
    var width = null;

    sandboxWindow.addEventListener('resize:end', function(event) {
      value += 1;
      width = event.target.innerWidth;
    }, false);

    setTimeout(function() {
      sandbox.setAttribute('width', 500);
      setTimeout(function() {
        sandbox.setAttribute('width', 600);
        setTimeout(function() {
          sandbox.setAttribute('width', 700);
        }, 10);
      }, 10);
    }, 0);

    setTimeout(function() {
      expect(value).toEqual(1);
      expect(width).toEqual(700);
      done();
    }, 500);
  });
});
