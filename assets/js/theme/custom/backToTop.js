/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */

export default function () {
    // browser window scroll (in pixels) after which the "back to top" link is shown
    const offset = 300;
    // browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    // const offsetOpacity = 1200;
    // duration of the top scrolling animation (in ms)
    const scrollTopDuration = 700;
    // grab the "back to top" link
    const $backToTop = $('#back-to-top');

    // hide or show the "back to top" link
    $(window).scroll(function() {
        /* eslint-disable no-unused-expressions */
        ($(this).scrollTop() > offset) ? $backToTop.addClass('is-visible'): $backToTop.removeClass('is-visible fade-out');
        // if ($(this).scrollTop() > offsetOpacity) {
        //     $backToTop.addClass('fade-out');
        // }
    });
    // smooth scroll to top
    $backToTop.on('click', function(event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, scrollTopDuration);
    });
}
