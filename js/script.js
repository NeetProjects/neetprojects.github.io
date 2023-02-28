(function ($) {
	"use strict";

	var $window = $(window);



	/* -------------------------------------------*/
	/* --------->>> Navigation Bar <<<-----------*/
	/* -----------------------------------------*/

	/* Navbar */
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

	/* Navibar durante o Scroll */
	$window.scroll(function () {
		if ($window.scrollTop() > 60) {
			$('.navbar').addClass('navbar-fixed');
		} else {
			$('.navbar').removeClass('navbar-fixed');
		}
	});

	/* SlickNav */
	$('#main-menu').slicknav({ prependTo: '#responsive-menu', label: '', closeOnClick: true });



	/* -------------------------------------------*/
	/* -------------->>> Outros <<<--------------*/
	/* -----------------------------------------*/

	/* Filtro dos Projetos */
	$(window).on('load', function () {
		var projectsIsotope = $('.projects-container').isotope({
			itemSelector: '.projects-item',
			layoutMode: 'fitRows'
		});

		$('#projects-filters li').on('click', function () {
			$("#projects-filters li").removeClass('filter-active');
			$(this).addClass('filter-active');

			projectsIsotope.isotope({
				filter: $(this).data('filter')
			});
			aos_init();
		});
	});

	/* Iniciar Animate on Scroll */
	function aos_init() {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out-back",
			once: true
		});
	}
	$(window).on('load', function () {
		aos_init();
	});



	/* Tirar o menu de contexto */
	/* Tá aqui só por teste :v */
	//document.addEventListener('contextmenu', event => event.preventDefault());

})(jQuery);