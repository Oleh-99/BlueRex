(function($) {
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
		var $galleryThumbs;

		if ($swipers.length === 0) {
			return;
		};

		if ('undefined' === typeof Swiper) {
			return;
		};

		$swipers.each(function(e) {
			var $this = $(this);
			var $thisData = $this .data('option');
			new Swiper(this, renderSlider($thisData, $this));
			console.log(renderSlider($thisData, $this));
			if($swipers.hasClass('gallery-thumbs')) {
				$galleryThumbs = new Swiper(this, renderSlider($thisData, $this));
			}
		})

		function renderSlider(data, thisSlider) {
			var config = {
				loop : data.loop,
				slidesPerView : data.slidesPerView,
			};
	
			if (data.spaceBetween) {
				config.spaceBetween = data.spaceBetween;
			};

			if (data.pagination) {
				config.pagination = {
					el: '.slider-numbers .swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					},
				};
			};

			if (data.navigation) {
				config.navigation = {
					nextEl: '.slider-right',
					prevEl: '.slider-left',
				  };
			};

			if (config.slidesPerView > 1) {
				config.breakpoints = {
					993: {
						slidesPerView: config.slidesPerView,
					},
					150: {
						slidesPerView: 1,
					},
				};
			};

			if (data.loopedSlides) {
				config.loopedSlides = data.loopedSlides;
			}

			if (thisSlider.hasClass('gallery-thumbs')) {
				config.watchSlidesVisibility = true,
				config.watchSlidesProgress = true
			}

			if (thisSlider.hasClass('gallery-top')) {
				config.thumbs = {
					swiper: $galleryThumbs
				};
			}
	
			return config;
		};
	}

	function quickView() {
		var $btnSearch = $('.button-search');

		if ('undefined' === typeof $btnSearch.magnificPopup) {
			return;
		};

		if ($btnSearch.length === 0) {
			return;
		};
		
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
		if ($('.shop-product-grid').length === 0) {
			return;
		};

		if ('undefined' === typeof Isotope) {
			return;
		};

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

		if ('undefined' === typeof Waypoint) {
			return;
		};

		if ($animated.length === 0) {
			return;
		};

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

		if ('undefined' === typeof tooltip) {
			return;
		};

		if ($btnTooltip.length === 0) {
			return;
		};

		$btnTooltip.tooltip();
	}

	function maps() {
		if ('undefined' === typeof Maplace) {
			return;
		};

		if ($('#gmap').length === 0) {
			return;
		};

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

	$(document).ready(function() {
		productTabs();
		toTop();
		slider();
		quickView();
		filterProduct();
		waypointer();	
		tooltip();
		maps();
	});

})(jQuery);