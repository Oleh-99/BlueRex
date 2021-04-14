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

	function testimonials() {
		var swiper = new Swiper('.customers .swiper-container', {
			slidesPerView: 3,
			spaceBetween: 30,
			navigation: {
			  nextEl: '.customers-arrow.arrow-right',
			  prevEl: '.customers-arrow.arrow-left',
			},
		});
	}

	function bestCategory() {
		var swiper = new Swiper('.best-category .swiper-container', {
			loop: true,
			navigation: {
			  nextEl: '.arrow-category.right',
			  prevEl: '.arrow-category.left',
			},
		});
	}

	function mainSlider() {
		var swiper = new Swiper('.slider .swiper-container', {
			loop: true,
			navigation: {
			  nextEl: '.right',
			  prevEl: '.left',
			},
			pagination: {
				el: '.slider-numbers .swiper-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + '</span>';
				},
			},
		});
	}

	function quickView() {
				
		$('.button-search').each(function() {
			$(this).on('click', function(e) {
				e.preventDefault();
				$(this).addClass('active');
				quickViewOn();
			}); 
		});

		$('.quick-view-wraper').on('click', function() {
			quickViewOff();
			$('.button-search').removeClass('active');
		});
	}

	function quickViewOn() {
		$('.quick-view-wraper').fadeIn();
		$('.quick-view').fadeIn();
	}

	function quickViewOff() {
		$('.quick-view-wraper').fadeOut();
		$('.quick-view').fadeOut();
	}

	function filterProduct() {
		var $grid = $('.shop-page-product').find('.row').isotope({
			itemSelector: '.element-item',
  			layoutMode: 'fitRows',
			getSortData: {
				category: '[data-category]',
			}
		})

		$('.product-menu').on('click', 'li', function() {

		})
	}

$(document).ready(function() {
	productTabs();
	toTop();
	testimonials();
	bestCategory();
	mainSlider();
	quickView();
});

})(jQuery);