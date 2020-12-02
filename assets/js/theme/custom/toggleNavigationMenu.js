export default function ($mainMenu) {
    $('[data-toggle-item]').on('mouseenter', event => {
        if (window.innerWidth > 1024) {
            event.preventDefault();
            const $target = $(event.target).closest('[data-toggle-item]');
            const $menu = $target.find('[data-toggle-menu]');

            const targetId = $menu.attr('id');

            // Open SubMenu
            $mainMenu.collapsibles.map(collapsible => {
                if (collapsible.targetId === targetId) {
                    collapsible.open();
                }
                return true;
            });
        }
    }).on('mouseleave', event => {
        if (window.innerWidth > 1024) {
            event.preventDefault();
            $mainMenu.collapseAll();
        }
    });

    $('[data-toggle-action]').on('click', (event) => {
        const $target = $(event.target);
        const $link = $target.closest('[data-toggle-action]');
        const url = $link.attr('href');

        if (navigator.userAgent.indexOf('iPad') === -1 && window.innerWidth > 1024 && url) {
            // Desktop
            event.preventDefault();
            event.stopPropagation();
            window.location.href = url;
        }
    });

    $('[data-megaMenu-close]').on('click', (event) => {
        event.preventDefault();
        $mainMenu.collapseAll();
    });

    $('[data-navPages-mobile-toggle]').on('click', (event) => {
        event.preventDefault();
        const $target = $(event.target).closest('[data-open]');
        const id = $target.data('open');

        $('#navPages-list-menu').removeClass('is-show');
        $('#navPages-list-user').removeClass('is-show');
        $(id).addClass('is-show');

        $('[data-open]').removeClass('is-active');
        $target.addClass('is-active');
    });

    $('#navPages-list-menu>.navPages-item>.navPage-subMenu-horizontal>.container>.navPage-subMenu-list>.navPage-subMenu-item-child>.navPage-subMenu-action').on('click', (event) => {
        if (window.innerWidth > 1024) {
            event.preventDefault();
            const $target = $(event.target).closest('.navPage-subMenu-action');

            const url = $target.attr('href');
            if (url) window.location = url;
        }
    });
}
