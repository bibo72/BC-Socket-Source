import 'jquery.dotdotdot';

const multilineTextDisplay = {
    init: () => {
        // multilineTextDisplay.multilineTextAutoDisplay($('.category-description'));
    },

    multilineTextAutoDisplay: ($selector) => {
        if ($selector.length) {
            $selector.dotdotdot({
                height: 'watch',
                watch: true,
            });
        }
    },

    multilineTextDisplayShowMore: ($selector) => {
        const $showMore = $('.button-show-more', $selector);

        $selector.dotdotdot({
            keep: '.button-show-more',
            height: 'watch',
            watch: true,
        });

        // Get the dotdotdot API
        const api = $selector.data('dotdotdot');

        $selector.on(
            'click',
            '.button-show-more',
            (e) => {
                e.preventDefault();

                // When truncated, restore
                if ($selector.hasClass('ddd-truncated')) {
                    api.restore();
                    $selector.addClass('full');
                    $showMore.html('Read Less');
                } else { // Not truncated, truncate
                    $selector.removeClass('full');
                    $showMore.html('Read More');
                    api.truncate();
                    api.watch();
                }
            },
        );
    },
};
export default multilineTextDisplay;
