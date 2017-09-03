/*
 * Polyfill for URL with client server detection so it can also be used on node server side
 */

/**
 * @returns {boolean} indicating if run on server
 */

function isServer() {
  return !(typeof window != 'undefined' && window.document);
}

/**
 * init global URL and URLSearchParams api
 *
 */
function initURL() {
  if (isServer()) {
    const { URL, URLSearchParams } = require('url');

    global.URL = URL;
    global.URLSearchParams = URLSearchParams;
  } else {
    require('url-polyfill');
  }
}

module.exports = (() => {
  if (!global.URL) {
    initURL();
  }

  return {
    URL: global.URL,
    URLSearchParams: global.URLSearchParams
  };
})();
