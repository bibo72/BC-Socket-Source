import utils from '@bigcommerce/stencil-utils';
import swal from '../global/sweet-alert';

const cardAddToCart = {
    setConfig: (secureBaseUrl, cartId) => {
        cardAddToCart.secureBaseUrl = secureBaseUrl;
        cardAddToCart.cartId = cartId;
    },

    getCartQuantity: () => {
        utils.api.cart.getCartQuantity({}, (err, response) => {
            $('body').trigger('cart-quantity-update', response);
        });
    },

    listenQuantityChange: (event) => {
        event.preventDefault();
        const $target = $(event.currentTarget);
        console.log(222);
        console.log($target);
    },

    addCardProductToCart: (event) => {
        const $addToCartBtn = $(event.target);
        const $product = $(event.target).closest('.card');
        const originalBtnVal = $addToCartBtn.val();

        // Do not do AJAX if browser doesn't support FormData
        if (window.FormData === undefined) {
            return;
        }

        // Prevent default
        event.preventDefault();

        $addToCartBtn.prop('disabled', true);

        // Add item to cart
        const productId = $product.data('productId');
        const qty = $product.find('input.js-card-quantity-input').val();

        const formData = new FormData();
        formData.append('action', 'add');
        formData.append('product_id', productId);
        formData.append('qty[]', qty);

        utils.api.cart.itemAdd(formData, (err, response) => {
            const errorMessage = err || response.data.error;

            $addToCartBtn
                .val(originalBtnVal)
                .prop('disabled', false);

            // Guard statement
            if (errorMessage) {
                swal.fire({
                    text: errorMessage,
                    icon: 'error',
                    timer: '2000',
                    showConfirmButton: false,
                });
            } else {
                cardAddToCart.getCartQuantity();
                swal.fire({
                    text: 'Add to Cart successfully',
                    icon: 'success',
                    timer: '2000',
                    showConfirmButton: false,
                });
            }
        });
    },

    addTableProductItemToCart: (event) => {
        const $addToCartBtn = $(event.target);
        const $product = $(event.target).closest('.table-product-item');
        const originalBtnVal = $addToCartBtn.val();

        // Do not do AJAX if browser doesn't support FormData
        if (window.FormData === undefined) {
            return;
        }

        // Prevent default
        event.preventDefault();

        $addToCartBtn.prop('disabled', true);

        // Add item to cart
        const productId = $product.data('productId');
        const qty = $product.find('input.js-table-quantity-input').val();

        const formData = new FormData();
        formData.append('action', 'add');
        formData.append('product_id', productId);
        formData.append('qty[]', qty);

        utils.api.cart.itemAdd(formData, (err, response) => {
            const errorMessage = err || response.data.error;

            $addToCartBtn
                .val(originalBtnVal)
                .prop('disabled', false);

            // Guard statement
            if (errorMessage) {
                swal.fire({
                    text: errorMessage,
                    icon: 'error',
                    timer: '2000',
                    showConfirmButton: false,
                });
            } else {
                cardAddToCart.getCartQuantity();
                swal.fire({
                    text: 'Add to Cart successfully',
                    icon: 'success',
                    timer: '2000',
                    showConfirmButton: false,
                });
            }
        });
    },
};

export default function (secureBaseUrl, cartId) {
    const $card = $('.card');

    cardAddToCart.setConfig(secureBaseUrl, cartId);
    $card.on('click', '.js-card-add-to-cart', cardAddToCart.addCardProductToCart);
    $('body').on('click', '.js-table-add-to-cart', cardAddToCart.addTableProductItemToCart);
    $card.on('change', '.js-card-quantity-input', cardAddToCart.listenQuantityChange);
}
