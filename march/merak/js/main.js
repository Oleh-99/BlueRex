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
		var toTop = $('.to-top')
		$(window).scroll(function () {
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
		$('.swiper-container').each(function(e) {
			var $thisData = $(this).data('option');
			new Swiper(this, renderSlider($thisData));
		})
	}

	function renderSlider(data) {
		var config = {};
		config.loop = data.loop;
		config.slidesPerView = data.slidesPerView;

		if(data.spaceBetween) {
			config.spaceBetween = data.spaceBetween;
		}		
		if(data.pagination) {
			config.pagination={
				el: '.slider-numbers .swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				},
			}
		};
		if(data.navigation) {
			config.navigation= {
				nextEl: '.slider-right',
				prevEl: '.slider-left',
			  }
		};
		if(config.slidesPerView > 1) {
			config.breakpoints={
				993: {
					slidesPerView: config.slidesPerView,
				},
				150: {
					slidesPerView: 1,
				},
			}
		}

		return config;
	}

	function quickView() {
		$('.button-search').magnificPopup({
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
		let grid = new Isotope('.shop-product-grid', {
			itemSelector: '.filter-grid',
			layoutMode: 'fitRows'
		});
		$('.product-menu').on('click', 'li', function(e) {
			e.preventDefault();
			let $this = $(this);
			$this.siblings().removeClass('active');
			$this.addClass('active');
			let filterData = $this.data('filter');
			grid.arrange({
				filter: filterData
			});
		});
	}

	function waypont() {
		var waypoint = new Waypoint({
			element: document.getElementById('basic-waypoint'),
			handler: function() {
			  notify('Basic waypoint triggered')
			}
		  })
	}

$(document).ready(function() {
	productTabs();
	toTop();
	slider();
	quickView();
	filterProduct();	
});

})(jQuery);