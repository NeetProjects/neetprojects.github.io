(function ($) {
	"use strict";

	var $window = $(window);

	/* Fade do Preloader */
	$window.on("load", function () {
		$(".preloader").fadeOut(800);
	});

	/* Navigation Bar */
	$(document).on('click', '.navbar-nav li a, #responsive-menu ul li a', function () {
		if ($(this).hasClass("has-popup")) return false;
		var id = $(this).attr('href');
		if ($(id).length) {
			var h = parseFloat($(id).offset().top);
			$('body,html').stop().animate({
				scrollTop: h - 74
			}, 800);
			return false;
		}
	});

	/* Navigation Bar durante o Scroll */
	$window.scroll(function () {
		if ($window.scrollTop() > 60) {
			$('.navbar').addClass('navbar-fixed');
		} else {
			$('.navbar').removeClass('navbar-fixed');
		}
	});

	/* SlickNav */
	$('#main-menu').slicknav({ prependTo: '#responsive-menu', label: '', closeOnClick: true });

	/* Tirar o menu de contexto */
	/* Tá aqui só por teste :v */
	//document.addEventListener('contextmenu', event => event.preventDefault());

})(jQuery);