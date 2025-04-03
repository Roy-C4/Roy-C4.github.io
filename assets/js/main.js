/*
	Photon by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		  }
		  
		  // Ensure the page always starts at the top
		  window.addEventListener('load', function() {
			window.scrollTo(0, 0);
		  });

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
			  if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			  } else {
				entry.target.classList.remove('visible'); // Remove when out of view
			  }
			});
		  }, {
			threshold: 0.5
		  });
		  
		  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

})(jQuery);