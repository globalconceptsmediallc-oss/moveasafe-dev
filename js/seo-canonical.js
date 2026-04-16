(function () {
  var PRODUCTION_ORIGIN = 'https://www.moveasafe.com';

  var existingCanonicals = document.querySelectorAll('link[rel="canonical"]');
  existingCanonicals.forEach(function (link) {
    link.parentNode.removeChild(link);
  });

  var path = window.location.pathname;

  if (path.endsWith('/index.html')) {
    path = path.replace(/\/index\.html$/, '/');
  } else if (path.endsWith('.html')) {
    path = path.replace(/\.html$/, '');
  }

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  var canonicalUrl = PRODUCTION_ORIGIN + path;

  var link = document.createElement('link');
  link.rel = 'canonical';
  link.href = canonicalUrl;
  document.head.appendChild(link);
})();
