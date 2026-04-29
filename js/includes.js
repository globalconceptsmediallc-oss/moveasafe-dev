(function () {
  var script = document.currentScript;
  var scriptSrc = script.getAttribute('src');
  var basePath = scriptSrc.replace(/js\/includes\.js$/, '');

  function loadPartial(id, file) {
    var target = document.getElementById(id);
    if (!target) return;

    fetch(basePath + 'partials/' + file)
      .then(function (response) {
        if (!response.ok) throw new Error('Could not load ' + file);
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;

        target.querySelectorAll('[data-href]').forEach(function (link) {
          link.setAttribute('href', basePath + link.getAttribute('data-href'));
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  loadPartial('site-header', 'header.html');
  loadPartial('site-footer', 'footer.html');
})();
