(function (ddd360furniture) {
  ddd360furniture.init = function (mallId) {
    // 뷰어가 이미 열려있어서 닫으려는 경우
    if (document.querySelector('.viewer-iframe')) {
      const viewer = document.querySelector('.viewer-iframe');
      const viewerButton = document.querySelector('.viewer-button');
      viewerButton.innerText = '3D 뷰어 보기';
      const $PrevImgArea = document.querySelector('.imgArea');

      viewer.parentNode.removeChild(viewer);
      $PrevImgArea.style.display = 'block';
      return;
    }

    // 뷰어를 여는 경우
    const $ProductDetailSection = document.querySelector('.detailArea');
    const viewer = document.createElement('iframe');
    viewer.className = 'viewer-iframe';

    const $PrevImgArea = document.querySelector('.imgArea');
    $PrevImgArea.style.display = 'hidden';

    // product-detail 모듈 div 영역의 첫번째 자식으로 뷰어 삽입
    $ProductDetailSection.insertBefore(
      viewer,
      $ProductDetailSection.firstChild
    );

    // 뷰어 보기 -> 뷰어 닫기 버튼으로 변경
    const viewerButton = document.querySelector('.viewer-button');
    viewerButton.innerText = '뷰어 닫기';

    // 다음 동작으로 이동
    ddd360furniture.setViewer(mallId);
  };

  ddd360furniture.closeViewer = function () {};

  ddd360furniture.setViewer = function (mallId) {
    // 상품 UID값 추출
    const url = window.location.href;
    const urlParts = url.split('/');
    const productNo = urlParts[5];

    // 뷰어에 쇼핑몰 ID와 상품 UID값을 전달하여 뷰어 URL 생성
    const viewer = document.querySelector('.viewer-iframe');
    const iframeSrc = `https://ddd360furniture-viewer.vercel.app/viewer/${mallId}/${productNo}`;
    viewer.src = iframeSrc;
    viewer.width = '100%';
    viewer.height =
      window.innerWidth < 420
        ? window.screen.availHeight * 0.65
        : window.screen.availHeight * 0.7;
    // 뷰어 위치로 스크롤 이동
    // viewer.scrollIntoView();

    viewer.addEventListener('load', ddd360furniture.listenForOptions);
  };

  ddd360furniture.setButton = function () {
    const viewerButton = document.querySelector('.viewer-button');
    viewerButton.innerText = '3D 뷰어 보기';
    const mallId = viewerButton.id;

    viewerButton.addEventListener('click', function () {
      ddd360furniture.init(mallId);
    });
  };

  ddd360furniture.listenForOptions = function () {
    window.addEventListener('message', function (event) {
      if (
        !event.data.selectedOptions ||
        event.origin !== 'https://ddd360furniture-viewer.vercel.app'
      )
        return;
      const receivedOptions = event.data.selectedOptions;

      if (!receivedOptions || !Array.isArray(receivedOptions)) return;

      const tbodies = document.querySelectorAll(
        'table > tbody.xans-product-option'
      );

      tbodies.forEach((tbody) => {
        const thText = tbody.querySelector('th').innerText.trim();

        // Find matching option from receivedOptions
        const matchingReceivedOption = receivedOptions.find(
          (opt) => opt.option_name === thText
        );

        if (matchingReceivedOption) {
          const selectElement = tbody.querySelector('select');
          const matchingOption = Array.from(selectElement.options).find(
            (option) => {
              return option.text.includes(matchingReceivedOption.option_value);
            }
          );

          if (matchingOption) {
            selectElement.value = matchingOption.value;

            // Trigger the change event
            const changeEvent = new Event('change');
            selectElement.dispatchEvent(changeEvent);
          }
        }
      });
    });
  };

  if (document.readyState == 'complete') {
    ddd360furniture.setButton();
  } else {
    window.addEventListener('DOMContentLoaded', ddd360furniture.setButton);
  }
})((window.ddd360furniture = window.ddd360furniture || {}));
