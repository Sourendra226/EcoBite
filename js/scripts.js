"use strict";

$(document).ready(function (){
	// Toggle Active Nav Item
	$('.main_nav li').click(function (){
		$('.main_nav li').removeClass('active');
		$(this).addClass('active');
	});

	// Toggle Side Nav
	$('.menuOpenBtn').click(function (){
		$('.sideNav').css('left','0');
	});
	$('.menuCloseBtn').click(function (){
		$('.sideNav').css('left','-100%');
	});

	// Fixed Header on Scroll
	$(window).scroll(function(){
		let stickyElement = $('header');
		let offsetTop = stickyElement.offset().top;
		let scrollTop = $(window).scrollTop();

		if (scrollTop >= offsetTop) {
			stickyElement.addClass('stickyHeader');
		}
		else {
			stickyElement.removeClass('stickyHeader');
		}
	});

    // Testimonials Slider
	$('.reviewSlider').slick({
		dots: true,
		arrows: false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000
	});

	// Related Products Slider
	$('.related_products_slider').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			}
		]
	});
});


// Best Seller Slider
function initSlickIfMobile() {
	if (window.innerWidth < 768) {
		if (!$('.bestseller_slider').hasClass('slick-initialized')) {
			$('.bestseller_slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
				autoplay: true,
				autoplaySpeed: 2000
			});
		}
	} else {
		if ($('.bestseller_slider').hasClass('slick-initialized')) {
			$('.bestseller_slider').slick('unslick');
		}
	}
}

// Run on load
$(document).ready(initSlickIfMobile);

// Re-run on resize
$(window).on('resize', initSlickIfMobile);


