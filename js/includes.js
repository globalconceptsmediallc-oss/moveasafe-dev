(function () {
  function getBasePath() {
    var path = window.location.pathname;
    var depth = path.split('/').filter(Boolean).length;

    if (path.endsWith('.html')) {
      depth = depth - 1;
    }

    if (depth <= 0) return './';
    return '../'.repeat(depth);
  }

  function loadPartial(id, file) {
    var target = document.getElementById(id);
    if (!target) return;

    var base = getBasePath();

    fetch(base + 'partials/' + file)
      .then(function (response) {
        if (!response.ok) throw new Error('Could not load ' + file);
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;

        target.querySelectorAll('[data-href]').forEach(function (link) {
          link.setAttribute('href', base + link.getAttribute('data-href'));
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  loadPartial('site-header', 'header.html');
  loadPartial('site-footer', 'footer.html');
})();
