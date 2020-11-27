export default function stickyNavigation(scrollTop) {
    const height = $('header.header').outerHeight();
    if (scrollTop > height) {
        $('body').addClass('is-fixed--header');
    } else {
        $('body').removeClass('is-fixed--header');
    }
}
