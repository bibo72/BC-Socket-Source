import stickyNavigation from './stickyNavigation';

export default function () {
    $(window).on('scroll', (event) => {
        const scrollTop = $(event.target).scrollTop();
        stickyNavigation(scrollTop);
    });

    window.onload = (event) => {
        const scrollTop = $(event.target).scrollTop();
        stickyNavigation(scrollTop);
    };
}
