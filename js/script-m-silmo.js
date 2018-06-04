;(function($, window, document, undefined) {
	var $win           = $(window);
	var $doc           = $(document);
	var $dropdowns     = $('.mn-menu-submenu');
	var $globalWrapper = $('.global-wrapper');
	var wrapperImages  = $('.slider-full img, .list-articles .la-item-img, .grid-la-list .gla-item-img, .article-wrapper .article-title img');
	var $borderHeadingContainer = $('.article-wrapper h2');

	function prepareSlider($slider) {
		var $sliderClone = $slider.clone();

		$slider.after($sliderClone);
		$slider.remove();

		$sliderClone
			.attr('style', '')
			.find('.slider-content')
				.attr('style', '');
	}


	function startSlider($slider, options) {
		var $slidesContainer = $slider.find('.slider-content').length ?  $slider.find('.slider-content') : $slider;

		$slidesContainer.carouFredSel(options);
	}

	// Newsletter 
	if ($('.newsletter-form').length) {
		var $form = $('.newsletter-form');

		$form
			.detach()
			.appendTo('body');
		$form
			.find('.nf-form-input input')
			.attr('placeholder', 'Votre email');
		$form
			.find('.nf-main-content')
			.append('<a href="#" class="form-close"/>');

		$('[href*="#newsletter"]').on('click', function(e){
			e.preventDefault();

			$form.addClass('form-shown');
		});

		$doc.on('click', function(e){
			var $target = $(e.target);

			if (($target.is('.form-close, .form-close *') || !$target.is('.nf-main-content, .nf-main-content *, [href*="#newsletter"], [href*="#newsletter"] *')) && $form.hasClass('form-shown')) {
				e.preventDefault();

				$form.removeClass('form-shown');
			}

			if (!$target.is('.lang-switcher, .lang-switcher * ')) {
				$('.lang-switcher').removeClass('is-visible');
			}
		});

		if (window.location.href.indexOf('#newsletter') >= 0) {
			$form.addClass('form-shown');
		}
	}

	$(wrapperImages).wrap('<figure></figure>');

	$borderHeadingContainer.wrapInner('<span></span>')

	// Nav button functionality
	$('.sb-menu-trigger').on('click', function(e){
		e.preventDefault();

		$(this)
			.add('.global-wrapper')
				.toggleClass('nav-visible');

		$dropdowns.slideUp();				
		
	});

	$('.global-search-form .js-toggle-trigger').on('click', function(e) {
		e.preventDefault();

		$globalWrapper.toggleClass('search-visible')
	});

	// Sub nav
	$('.mn-item-lvl-1 > a').on('click', function(e){
		var $this = $(this);
		var $dropdown = $this.next();
		$this
			.parent()
			.toggleClass('active')

		if ($dropdown.length) {
			e.preventDefault();

			$dropdown.slideToggle();

			$dropdowns
				.not($dropdown)
					.slideUp();
		}
	});

	if ($('.slider-full').length) {
		prepareSlider($('.slider-full'));

		$win.on('load', function(){
			startSlider($('.slider-full'), {
				width: '100%',
				height: 'auto',
				items: 1,
				responsive: true,
				scroll: { 
					duration: 700
				},
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play: true,
					timeoutDuration: 5000
				},
				pagination: {
					container: '.slider-full .slider-pagin'
				},
				infinite: true
			});
		});
	}

	if ($('.slider-evenement').length) {
		prepareSlider($('.slider-evenement'));

		$('.slider-evenement').append('<div class="slider-actions"><span class="slider-prev"></span><span class="slider-next"></span></div>')

		$win.on('load', function(){
			startSlider($('.slider-evenement'), {
				width: '100%',
				items: 1,
				responsive: true,
				scroll: { 
					duration: 700
				},
				swipe: {
					onTouch: true,
					onMouse: false
				},
				auto: {
					play: true,
					timeoutDuration: 5000
				},
				prev: {
					button: '.slider-actions .slider-prev'
				},
				next: {
					button: '.slider-actions .slider-next'
				},
				pagination: {
					container: '.slider-evenement .slider-pagin'
				},
				infinite: true
			});
		});
	}
})(jQuery, window, document);
