// Wait for the document to be fully loaded before running scripts
$(function() {

    // --- THEME TOGGLE ---
    const themeToggle = $('#theme-toggle');
    const userTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Function to set the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            $('html').attr('data-theme', 'dark');
        } else {
            $('html').removeAttr('data-theme');
        }
    }

    // Check and apply saved theme on load
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
        applyTheme('dark');
    }

    // Listener for theme toggle button
    themeToggle.on('click', function() {
        const currentTheme = $('html').attr('data-theme');
        if (currentTheme === 'dark') {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- SMOOTH SCROLLING ---
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800); // 800ms scroll speed
        }
    });

    // --- REVEAL ON SCROLL ---
    const revealElements = $('.reveal');
    const windowEl = $(window);

    function checkReveal() {
        const windowHeight = windowEl.height();
        const windowTopPosition = windowEl.scrollTop();
        const windowBottomPosition = windowTopPosition + windowHeight;

        $.each(revealElements, function() {
            const el = $(this);
            const elementHeight = el.outerHeight();
            const elementTopPosition = el.offset().top;
            const elementBottomPosition = elementTopPosition + elementHeight;

            // Check if element is in view
            if (elementBottomPosition >= windowTopPosition && elementTopPosition <= windowBottomPosition) {
                el.addClass('visible');
            }
        });
    }

    // Run check on load and on scroll
    checkReveal();
    windowEl.on('scroll', checkReveal);

    // --- SET FOOTER YEAR ---
    $('#year').text(new Date().getFullYear());

});