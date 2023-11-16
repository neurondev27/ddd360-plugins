(window.ddd360furniture = window.ddd360furniture || {}),
	(function (e) {
		if (
			((ddd360furniture.init = function (e) {
				var t = document.querySelector('.viewer-iframe'),
					n = document.querySelector('.viewer-button');
				if (t) {
					n.removeChild(n.firstChild);
					var i = document.createElement('img');
					return (
						(i.src =
							'https://cdn.jsdelivr.net/gh/neurondev27/hdri@main/open.png'),
						(i.style.width = '60px'),
						(i.style.height = '60px'),
						n.appendChild(i),
						void t.parentNode.removeChild(t)
					);
				}
				n.removeChild(n.firstChild), (n.value = 'close');
				var r = document.createElement('img');
				(r.src = 'https://cdn.jsdelivr.net/gh/neurondev27/hdri@main/close.png'),
					(r.style.width = '60px'),
					(r.style.height = '60px'),
					n.appendChild(r),
					ddd360furniture.setViewer(e);
			}),
			(ddd360furniture.setViewer = function (e) {
				var t = window.location.href.split('/')[5],
					n = document.createElement('iframe');
				n.className = 'viewer-iframe';
				var i = 'https://ddd360furniture-viewer.vercel.app/viewer/'
					.concat(e, '/')
					.concat(t);
				(n.src = i),
					(n.style.position = 'fixed'),
					(n.style.zIndex = '1000'),
					(n.style.border = '2px solid #444548'),
					(n.style.boxShadow = '5px 5px 20px rgba(0, 0, 0, 0.5)'),
					(n.style.width = window.screen.availWidth > 768 ? '80vw' : '90vw'),
					(n.style.height = '80vh'),
					(n.style.top = '50%'),
					(n.style.left = '50%'),
					(n.style.transform = 'translate(-50%, -50%)'),
					(n.style.pointerEvents = 'auto'),
					(n.style.borderRadius = '20px'),
					document.body.appendChild(n),
					n.addEventListener('load', ddd360furniture.listenForOptions);
			}),
			(ddd360furniture.setButton = function (e) {
				var t = document.createElement('div');
				(t.className = 'button-container'),
					document.body.appendChild(t),
					(t.style.display = 'flex'),
					(t.style.justifyContent = 'center'),
					(t.style.alignItems = 'center'),
					(t.style.position = 'fixed'),
					(t.style.bottom = '10%'),
					(t.style.left = '5%'),
					(t.style.zIndex = '1001');
				var n = document.createElement('button');
				(n.className = 'viewer-button'),
					(n.style.background = '#fff'),
					(n.style.borderRadius = '50%'),
					(n.style.boxShadow = '5px 5px 20px rgba(0, 0, 0, 0.5)'),
					(n.style.zIndex = '1001'),
					(n.style.display = 'block'),
					(n.style.margin = '0 5px 0 0'),
					window.screen.availWidth > 768 &&
						(n.addEventListener('mouseover', function () {
							(n.style.opacity = '0.6'),
								(n.style.transition = 'opacity 0.3s ease-in-out');
						}),
						n.addEventListener('mouseout', function () {
							(n.style.opacity = '1'),
								(n.style.transition = 'opacity 0.3s ease-in-out');
						}));
				var i = document.createElement('img');
				(i.src = 'https://cdn.jsdelivr.net/gh/neurondev27/hdri@main/open.png'),
					(i.style.width = '60px'),
					(i.style.height = '60px'),
					n.appendChild(i),
					(n.value = 'open'),
					n.addEventListener('click', function () {
						ddd360furniture.init(e);
					}),
					t.appendChild(n);
			}),
			(ddd360furniture.listenForOptions = function () {
				window.addEventListener('message', function (e) {
					if ('https://ddd360furniture-viewer.vercel.app' === e.origin) {
						var t = document.querySelector('.viewer-iframe');
						switch (
							(t && (t.style.transition = 'all 0.3s ease-in-out'),
							e.data.isMinimized)
						) {
							case !0:
								(t.style.width = '120px'),
									(t.style.height = '68px'),
									(t.style.top = '10%'),
									(t.style.right = '5%'),
									(t.pointerEvents = 'auto'),
									(t.style.overflow = 'hidden'),
									t.setAttribute('scrolling', 'no');
								break;
							case !1:
								(t.style.width =
									window.screen.availWidth > 768 ? '80vw' : '90vw'),
									(t.style.height = '80vh'),
									(t.style.top = '50%'),
									(t.style.right = '50%'),
									(t.style.transform = 'translate(-50%, -50%)'),
									(t.pointerEvents = 'auto'),
									t.removeAttribute('scrolling');
						}
						var n = e.data.selectedOptions;
						n &&
							Array.isArray(n) &&
							document
								.querySelectorAll('table > tbody.xans-product-option')
								.forEach(function (e) {
									var t = e.querySelector('th').innerText.trim(),
										i = n.find(function (e) {
											return e.option_name === t;
										});
									if (i) {
										var r = e.querySelector('select'),
											d = Array.from(r.options).find(function (e) {
												return e.text.includes(i.option_value);
											});
										if (d) {
											r.value = d.value;
											var o = new Event('change');
											r.dispatchEvent(o);
										}
									}
								});
					}
				});
			}),
			'complete' == document.readyState)
		) {
			var t = e.MALL_ID;
			ddd360furniture.setButton(t);
		} else
			window.addEventListener('DOMContentLoaded', function () {
				var t = e.MALL_ID;
				ddd360furniture.setButton(t);
			});
	})(
		CAFE24API.init({
			client_id: 'etxUwNJRBSiGTB3kEFCJwD',
			version: '2023-06-01',
		})
	);
