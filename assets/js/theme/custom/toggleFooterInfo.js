export default function () {
    $('.footer-info').on('click', '.js-footer-info-heading', event => {
        const $currentTarget = $(event.currentTarget).closest('.js-footer-info-heading');
        const $list = $currentTarget.closest('.footer-info-col').find('.footer-info-list');
        if ($list.is(':visible')) {
            $list.slideUp();
            $currentTarget.removeClass('is-open');
        } else {
            $list.slideDown();
            $currentTarget.addClass('is-open');
        }
    });
}
