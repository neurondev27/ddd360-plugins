(() => {
  var e;
  ((e = window.ddd360furniture = window.ddd360furniture || {}).init = function (
    t
  ) {
    if (document.querySelector('.viewer-iframe')) {
      var r = document.querySelector('.viewer-iframe');
      document.querySelector('.viewer-button').innerText = '3D 뷰어 보기';
      var n = document.querySelector('.imgArea');
      return r.parentNode.removeChild(r), void (n.style.display = 'block');
    }
    var i = document.querySelector('.detailArea'),
      o = document.createElement('iframe');
    (o.className = 'viewer-iframe'),
      (document.querySelector('.imgArea').style.display = 'hidden'),
      i.insertBefore(o, i.firstChild),
      (document.querySelector('.viewer-button').innerText = '뷰어 닫기'),
      e.setViewer(t);
  }),
    (e.closeViewer = function () {}),
    (e.setViewer = function (t) {
      var r = window.location.href.split('/')[5],
        n = document.querySelector('.viewer-iframe'),
        i = 'https://ddd360furniture-viewer.vercel.app/viewer/'
          .concat(t, '/')
          .concat(r);
      (n.src = i),
        (n.width = '100%'),
        (n.height =
          window.innerWidth < 420
            ? 0.65 * window.screen.availHeight
            : 0.7 * window.screen.availHeight),
        n.addEventListener('load', e.listenForOptions);
    }),
    (e.setButton = function () {
      var t = document.querySelector('.viewer-button');
      t.innerText = '3D 뷰어 보기';
      var r = t.id;
      t.addEventListener('click', function () {
        e.init(r);
      });
    }),
    (e.listenForOptions = function () {
      window.addEventListener('message', function (e) {
        if (
          e.data.selectedOptions &&
          'https://ddd360furniture-viewer.vercel.app' === e.origin
        ) {
          var t = e.data.selectedOptions;
          t &&
            Array.isArray(t) &&
            document
              .querySelectorAll('table > tbody.xans-product-option')
              .forEach(function (e) {
                var r = e.querySelector('th').innerText.trim(),
                  n = t.find(function (e) {
                    return e.option_name === r;
                  });
                if (n) {
                  var i = e.querySelector('select'),
                    o = Array.from(i.options).find(function (e) {
                      return e.text.includes(n.option_value);
                    });
                  if (o) {
                    i.value = o.value;
                    var d = new Event('change');
                    i.dispatchEvent(d);
                  }
                }
              });
        }
      });
    }),
    'complete' == document.readyState
      ? e.setButton()
      : window.addEventListener('DOMContentLoaded', e.setButton);
})();
