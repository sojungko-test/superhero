/* Configure Enzyme */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

/* Set up JSDOM, copy over window object to enable Enzyme tests */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost',
});
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function requestAnimationFrame(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function cancelAnimationFrame(id) {
  clearTimeout(id);
};
copyProps(window, global);


/* Prevent mocha from interpreting CSS @import files */
function noop() {
  return null;
}

require.extensions['.css'] = noop;
