(function () {
  function init() {
    var script = document.createElement('script');
    script.type = 'application/javascript';

    script.src =
      'https://ddd360-plugins.s3.ap-northeast-2.amazonaws.com/pluginV1.js';

    document.body.appendChild(script);
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init, { once: true });
  }
})();
