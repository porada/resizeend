describe('resize:end', function() {
  var sandbox;
  var sandboxWindow;

  beforeEach(function(done) {
    // A browser can’t be reliably resized using `window.resizeTo`,
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

  it('relies on `resize` event', function(done) {
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

  it('has an alias that’s triggered under the same conditions', function(done) {
    sandboxWindow.addEventListener('resizeend', done, false);
    setTimeout(function() {
      sandbox.setAttribute('width', 500);
    }, 0);
  });
});
