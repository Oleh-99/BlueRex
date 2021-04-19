(function($) {
	$.noConflict();

	function productTabs() {
		$('.product-main').each(function() {
			var $productWrapper = $(this);
			var $tabsButton = $productWrapper.find('li');

			$tabsButton.on('click', function (e) {
				e.preventDefault();

				var $this = $(this);
				var $buttonData = $this.data('value');
				var $tabContent = $productWrapper.find(`.product-main-wrapper[data-value='${$buttonData}']`);

				$this.siblings().removeClass('active');
				$this.addClass('active');

				$tabContent.siblings().removeClass('active');
				$tabContent.addClass('active');
			});
		});
	}

	function toTop() {
		var toTop = $('.to-top');

		$(document).scroll(function () {
			if ($(this).scrollTop() > 300) {
				toTop.fadeIn();
			} else {
				toTop.fadeOut();
			}
		});

		toTop.click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);

			return false;
		});
	}

	function slider() {
		var $swipers = $('.swiper-container');

		if (0 === $swipers.length || 'undefined' === typeof Swiper || 0 !== $(".gallery-thumbs").length) {
			return;
		}

		$swipers.each(function(e) {
			var $this = $(this);
			var $thisData = $this .data('option');
			new Swiper(this, renderSlider($thisData));
		});

		function renderSlider(data) {
			var config = {
				loop : data.loop,
				slidesPerView : data.slidesPerView,
			};
	
			if (data.spaceBetween) {
				config.spaceBetween = data.spaceBetween;
			}

			if (data.pagination) {
				config.pagination = {
					el: '.slider-numbers .swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					},
				};
			}

			if (data.navigation) {
				config.navigation = {
					nextEl: '.slider-right',
					prevEl: '.slider-left',
				  };
			}

			if (1 < config.slidesPerView) {
				config.breakpoints = {
					993: {
						slidesPerView: config.slidesPerView,
					},
					150: {
						slidesPerView: 1,
					},
				};
			}

			if (data.loopedSlides) {
				config.loopedSlides = data.loopedSlides;
			}
	
			return config;
		}
	}

	function singleProduct() {
		if('undefined' === typeof Swiper || 0 === $(".gallery-thumbs").length || 0 === $(".gallery-top").length) {
			return;
		}

		var galleryThumbs = new Swiper(".gallery-thumbs", {
			spaceBetween: 10,
			slidesPerView: 4,
			loop: true,
			freeMode: true,
			loopedSlides: 5, 
			watchSlidesVisibility: true,
			watchSlidesProgress: true
		});
			new Swiper(".gallery-top", {
			spaceBetween: 10,
			loop: true,
			loopedSlides: 5,
			thumbs: {
				swiper: galleryThumbs
			}
			});
	}

	function quickView() {
		var $btnSearch = $('.button-search');

		if ('undefined' === typeof $btnSearch.magnificPopup || 0 === $btnSearch.length) {
			return;
		}
		
		$btnSearch.magnificPopup({
			type: 'inline',
			removalDelay: 500,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = this.st.el.data('effect');
				}
			},
			midClick: true 
		});
	}

	function filterProduct() {
		if (0 === $('.shop-product-grid').length || 'undefined' === typeof Isotope) {
			return;
		}

		let grid = new Isotope('.shop-product-grid', {
			itemSelector: '.filter-grid',
			layoutMode: 'fitRows'
		});

		$('.product-menu').on('click', 'li', function(e) {
			e.preventDefault();

			let $this = $(this);
			let filterData = $this.data('filter');

			$this.siblings().removeClass('active');
			$this.addClass('active');
			
			grid.arrange({
				filter: filterData
			});
		});
	}

	function waypointer() {
		var $animated = $('.with-animated');

		if ('undefined' === typeof Waypoint || 0 === $animated.length) {
			return;
		}

		$animated.each(function() {
			var $this = $(this);

			new Waypoint({
				element: this,
				handler: function() {		
					$this.addClass('animate');
				},
				offset: '100%',
			  });
		});
	}

	function tooltip() {
		var $btnTooltip = $('[data-toggle="tooltip"]');

		if ('undefined' === typeof tooltip || 0 === $btnTooltip.length) {
			return;
		}

		$btnTooltip.tooltip();
	}

	function maps() {
		if ('undefined' === typeof Maplace || 0 === $('#gmap').length) {
			return;
		}

		var data = [{
			lat: 55.679224,
			lon: 12.583471,
			title: 'København',
			html: '<h3>København</h3>',
			zoom: 17,
		},{
			lat: 56.155002,
			lon: 10.185312,
			title: 'Aarhus',
			html: '<h3>Aarhus</h3>',
			zoom: 17,
		}];

		new Maplace({
			locations: data,
			controls_type: 'list',
			controls_on_map: true,
			start: 1,
		}).Load();
	}

	function fotoSwipe() {

		if ('undefined' === typeof PhotoSwipe) {
			return;
		}

		var arrOption = [];

		$('.photo-swipe').find('.swiper-slide').each(function(){
			var $link = $(this).find('a'),
				item = {
				  src: $link.attr('href'),
				  w: $link.data('width'),
				  h: $link.data('height')
				};
			arrOption.push(item);
		  });

		  $('.photo-swipe').find('a').click(function(e){
			e.preventDefault();
	
			var $pswp = $('.pswp')[0],
				options = {
					bgOpacity: 0.85,
					showHideOpacity: true
				};
	
			new PhotoSwipe($pswp, PhotoSwipeUI_Default, arrOption, options).init();
		  });
	}

	function contentSticky() {
		// if ('undefined' === typeof stick_in_parent) {

		// }

		// $('.product-sticky').stick_in_parent();
	}

	function autocomplete() {

		$.mockjax({
			url: 'http://api.openweathermap.org/data/2.5/find?q=lviv&appid=35db184017637f2f4de0b6667c28da23&units=metric',
			responseTime: 2000,
			response: function (data) {
				console.log(data);
			}
		});

	}

	$(document).ready(function() {
		productTabs();
		toTop();
		slider();
		singleProduct();
		quickView();
		filterProduct();
		waypointer();	
		tooltip();
		maps();
		fotoSwipe();
		contentSticky();
		autocomplete();
	});

})(jQuery);