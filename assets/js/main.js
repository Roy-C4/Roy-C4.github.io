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

	// Scroll Restoration
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		  }

	// Ensure the page always starts at the top on load
		window.addEventListener('load', function() {
			window.scrollTo(0, 0);
		});

    // --- NEW Matrix Code Effect ---
    function matrixCodeEffect(targetSelector) {
        const target = $(targetSelector);
        if (!target.length) {
            console.log("Matrix target not found:", targetSelector);
            return;
        }

        const originalText = target.text().trim(); // Trim whitespace
        // More code-like characters
        const chars = '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const totalLetters = originalText.length;
        let html = '';

        // Wrap each letter in a span
        for (let i = 0; i < totalLetters; i++) {
            if (originalText[i] === ' ' || originalText[i] === '\xa0') { // Handle regular space and non-breaking space
                 html += '<span class="letter space">&nbsp;</span>';
            } else {
                 html += `<span class="letter" data-original="${originalText[i]}">${chars[Math.floor(Math.random() * chars.length)]}</span>`; // Start with random char
            }
        }
        target.html(html); // Replace text with spans

        const letters = target.find('.letter:not(.space)');

        letters.each(function(index) {
            const $letter = $(this);
            const originalChar = $letter.data('original');
            let intervalId = null;
            let iteration = 0;
            // Adjust these parameters for desired effect speed/duration
            const totalIterations = 8 + Math.floor(Math.random() * 5); // Randomize scramble duration slightly
            const scrambleInterval = 50 + Math.random() * 30; // Randomize scramble speed slightly
            const revealDelay = index * 75; // Stagger reveal start time

            setTimeout(() => {
                intervalId = setInterval(() => {
                    $letter.text(chars[Math.floor(Math.random() * chars.length)]);
                    iteration++;
                    if (iteration >= totalIterations) {
                        clearInterval(intervalId);
                        $letter.text(originalChar);
                        $letter.addClass('revealed'); // Optional class for final styling
                    }
                }, scrambleInterval);
            }, revealDelay);
        });
    }
    // --- END Matrix Code Effect ---


    $(document).ready(function() {
        // Apply Matrix effect after a short delay on load
        setTimeout(() => {
             matrixCodeEffect('.name-matrix');
        }, 300); // Adjust delay as needed

        // Keep Course Dropdown Toggle if structure exists
        // Checking if the elements exist before binding
        if ($('.course-toggle').length > 0) {
            $('.course-toggle').on('click', function() {
                var $this = $(this);
                var $details = $this.next('.course-details');
                $this.toggleClass('active');
                $details.slideToggle(300);
            });
        } else {
             console.log("Course toggle elements not found in the provided HTML structure.");
        }
    });


	// Scroll Reveal / Unreveal Animation (using Intersection Observer from provided file)
		const observerOptions = {
			threshold: 0.15 // Using 0.15 threshold from previous version
		};

		const observerCallback = (entries, observer) => {
			entries.forEach(entry => {
			  if (entry.isIntersecting) {
				entry.target.classList.add('visible');
			  } else {
				entry.target.classList.remove('visible'); // Remove when out of view
			  }
			});
		};

		const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

		document.querySelectorAll('.scroll-reveal').forEach(el => {
            // console.log("Observing:", el); // Debugging line
            scrollObserver.observe(el);
        });

    // Removed the older DOMContentLoaded scroll listener from provided file as IntersectionObserver is better

})(jQuery);