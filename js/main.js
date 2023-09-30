(function ($) {
	"use strict";

	var $window = $(window);

	/* -------------------------------------------*/
	/* --------->>> Navigation Bar <<<-----------*/
	/* -----------------------------------------*/

	/* Navbar */
	$(document).on('click', '.navbar-nav li a, #responsive-menu ul li a', function() {
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
	$window.scroll(function() {
		if ($window.scrollTop() > 60) {
			$('.navbar').addClass('navbar-fixed');
		} else {
			$('.navbar').removeClass('navbar-fixed');
		}
	});

	/* SlickNav */
	$('#main-menu').slicknav({ prependTo: '#responsive-menu', label: '', closeOnClick: true });



	/* ----------------------------------------*/
	/* -------------->>> AOS <<<--------------*/
	/* --------------------------------------*/

	/* Iniciar Animate on Scroll */
	function aos_init() {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out-back",
			once: true
		});
	}
	$window.on('load', function() {aos_init()});



	/* -------------------------------------------------------*/
	/* -------------->>> Filtro de Projetos <<<--------------*/
	/* -----------------------------------------------------*/
	$window.on('load', function() {

		const CENSOR_TOGGLE = '#censor-toggle input[type="checkbox"]';
		var toggleOn = $(CENSOR_TOGGLE).is(':checked');
		var isCensored = !toggleOn;

		// Atualizar filtros dos projetos
		function updateProjects() {
			if(isCensored){									// Com censura:
				$(".nsfw").addClass('censored');					// Colocar filtro
			} else {											// Sem censura:
				$('.nsfw, .censored').removeClass('censored');		// Tirar filtro
			}
		}

		// Filtro dos projetos
		var projectsIsotope = $('.projects-container').isotope({
			itemSelector: '.projects-item',
			filter:'*:not(.censored)',
			layoutMode: 'fitRows'
		});

		// Se o toggle de censura mudar de estado:
		$(CENSOR_TOGGLE).change(function() {
			toggleOn = $(this).is(':checked'); 					// Atualizar toggle
			isCensored = !toggleOn;								// Atualizar censura
			updateProjects(); 									// Atualizar projetos
			var currentFilter = $('li.filter-active').data('filter');	// Pegar o filtro atual
			projectsIsotope.isotope({filter: currentFilter});			// Recarregar filtro
		});

		// Escolher filtro
		$('#projects-filters li').on('click', function() {			// Ao clicar em um filtro:
			$("#projects-filters li").removeClass('filter-active');	// Desativar o anterior
			$(this).addClass('filter-active');						// Ativar o atual
			// ---------------------------------------------------------// ----------------------
			projectsIsotope.isotope({filter: $(this).data('filter')});  // Filtrar o atual
			// ---------------------------------------------------------// ----------------------
			aos_init();										// Animar usando AOS
		});
	});

})(jQuery);