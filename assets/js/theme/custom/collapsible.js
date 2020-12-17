export default function () {
    $('body').on('click', '.product_collapse .product_collapse_trigger', e => {
        e.stopPropagation();

        const $currentTarget = $(e.currentTarget);

        const $siblings = $currentTarget.siblings('.product_collapse_trigger');
        $siblings.each((index, sibling) => {
            const $sibling = $(sibling);
            const siblingCollapsibleInstance = $sibling.data('collapsibleInstance');
            siblingCollapsibleInstance.close();
        });
    });
}