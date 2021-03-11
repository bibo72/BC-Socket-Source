import { defaultModal } from './global/modal';
import swal from './global/sweet-alert';

// check user clicking on data-shoppinglist-modal
function fnCheckBeforeShoppinglistModal(context) {
    const customer = context.customer;
    $('body').on('click', '[data-shoppinglist-modal]', (e) => {
        e.stopPropagation();

        if (!customer) {
            swal.fire({
                text: 'Please log in for further information.',
                icon: 'info',
                timer: '2000',
                showConfirmButton: false,
            });
        }
    });
}
function removeAccountNav() {
    // add the following code
    const inPages = () => {
        const urlArray = [
            '/account.php',
            '/buy-again/',
            '/address-book/',
            '/create-quote/',
            '/quote-detail/',
            '/quote-edit/',
            '/quote-list/',
            '/dashboard/',
            '/order-detail/',
            '/quick-order-pad/',
            '/shopping-list/',
            '/shopping-lists/',
            '/user-management/',
        ];
        const current = window.location.pathname;
        return urlArray.includes(current);
    };
    if (!inPages()) {
        $('body').addClass('non-b2b');
    }
}
export default function (context) {
    removeAccountNav();
    fnCheckBeforeShoppinglistModal(context);

    const url = 'https://cdn.bundleb2b.net/bundleb2b.2.10.0.js';
    const el = document.createElement('script');
    el.setAttribute('src', url);
    document.querySelector('body').append(el);

    window.b3themeConfig = {};

    window.b3themeConfig.useText = {
        'shopping.list.add.to.list.title': 'Save to List',
    };

    window.b3themeConfig.useJavaScript = {
        tpa: {
            callback() {
                // hide extra field on frontend
                const $customerId = $('input[name="customerId"]');
                const $contactId = $('input[name="mainContactId"]');
                if ($customerId.length) {
                    $customerId.parents('.form-field').hide();
                }
                if ($contactId.length) {
                    $contactId.parents('.form-field').hide();
                }

                // $('#tpa_submit_btn').on('click', (event) => {
                //     event.preventDefault();
                //     const billingAddress = {
                //         firstName: $('[data-field-type="FirstName"]').val() || '',
                //         lastName: $('[data-field-type="LastName"]').val() || '',
                //         phoneNumber: $('[data-field-type="Phone"]').val() || '',
                //         addressLine1: $('[data-field-type="AddressLine1"]').val() || '',
                //         addressLine2: $('[data-field-type="AddressLine2"]').val() || '',
                //         city: $('[data-field-type="City"]').val() || '',
                //         state: {
                //             stateName: $('[data-field-type="State"]').val() || '',
                //             stateCode: '',
                //         },
                //         zipCode: $('[data-field-type="Zip"]').val() || '',
                //         country: {
                //             countryName: $('[data-field-type="Country"]').val() || '',
                //             countryCode: '',
                //         },
                //         isBilling: '1',
                //         isDefaultBilling: '1',
                //         isDefaultShipping: '0',
                //         isShipping: '0',
                //         label: '',
                //     };
                //     const shippingAddress = {
                //         firstName: $('[data-field-type="FirstName"]').val() || '',
                //         lastName: $('[data-field-type="LastName"]').val() || '',
                //         phoneNumber: $('[data-field-type="Phone"]').val() || '',
                //         addressLine1: $('[data-field-type="s-AddressLine1"]').val() || '',
                //         addressLine2: $('[data-field-type="s-AddressLine2"]').val() || '',
                //         city: $('[data-field-type="s-City"]').val() || '',
                //         state: {
                //             stateName: $('[data-field-type="s-State"]').val() || '',
                //             stateCode: '',
                //         },
                //         zipCode: $('[data-field-type="s-Zip"]').val() || '',
                //         country: {
                //             countryName: $('[data-field-type="s-Country"]').val() || '',
                //             countryCode: '',
                //         },
                //         isBilling: '0',
                //         isDefaultBilling: '0',
                //         isDefaultShipping: '1',
                //         isShipping: '1',
                //         label: '',
                //     };
                //     const addresses = {
                //         billing: billingAddress,
                //         shipping: shippingAddress,
                //     };
                //     sessionStorage.setItem(
                //         'bundleCompanyAddress',
                //         JSON.stringify(addresses),
                //     );
                // });
            },
        },
        login: {
            overwrite: false,
            callback(SS) {
                // const companyId = sessionStorage.getItem('B3CompanyId');
                // const companyAddress = sessionStorage.getItem('bundleCompanyAddress');
                // if (companyAddress) {
                //     const addresses = JSON.parse(companyAddress);
                //     console.log('set company address');
                //     if (companyId) {
                //         SS.api.getCountries().then((data) => {
                //             if (!data || !data.list) return;

                //             const matched = data.list.filter(country => country.countryName === addresses.shipping.country.countryName);
                //             if (matched.length) {
                //                 addresses.shipping.country.countryCode = matched[0].countryCode;
                //                 // state
                //                 const matchedState = matched[0].states.filter(state => state.stateName === addresses.shipping.state.stateName);
                //                 if (matchedState.length) {
                //                     addresses.shipping.state.stateCode = matchedState[0].stateCode;
                //                 }
                //             }
                //             const matchedBilling = data.list.filter(country => country.countryName === addresses.billing.country.countryName);
                //             if (matchedBilling.length) {
                //                 addresses.billing.country.countryCode = matchedBilling[0].countryCode;
                //                 // state
                //                 const matchedBillingState = matchedBilling[0].states.filter(state => state.stateName === addresses.billing.state.stateName);
                //                 if (matchedBillingState.length) {
                //                     addresses.billing.state.stateCode = matchedBillingState[0].stateCode;
                //                 }
                //             }

                //             SS.api.createAddressBook(companyId, addresses.shipping)
                //                 .then(() => SS.api.createAddressBook(companyId, addresses.billing))
                //                 .then(() => {
                //                     sessionStorage.removeItem('bundleCompanyAddress');
                //                 });
                //         });
                //     }
                // }
                const getModalShoppingList = async (qty, sku, id) => {
                    const shoppingList = await SS.api.getShoppingLists();
                    let html = `
                            <div class="modal_content__shopping_list" data-this-qty="${qty}" data-this-sku="${sku}" data-this-id="${id}">
                                <p class="modal_title">${SS.text['shopping.list.add.to.list.title']}</p>
                                <div class="button--trapezoid"><a href="/shopping-lists/" class="button button--primary">New List</a></div>
                                <form action="" class="form form-wishlist form-action form_shoppinglist" data-shoppinglist-add method="post">
                                    <ul class="shopping_lists">
                        `;
                    shoppingList.list.forEach((item) => {
                        html += `
                            <li class="shopping_list">
                                <div data-click='addToShoppingList' 
                                    data-stop 
                                    class="shopping_list_div" 
                                    add-to-list-from-modal
                                    data-list-id="${item.id}" 
                                    data-list-status="${item.status}">
                                    ${item.name}
                                </div>
                            </li>
                            `;
                    });
                    html += '</ul></form></div>';

                    return html;
                };

                const addToShoppingListModal = async (e) => {
                    if (e.target.hasAttribute('add-to-list-from-modal')) {
                        e.preventDefault();
                        window.B3Spinner.show();
                        try {
                            const productId = $(e.target)
                                .closest('.modal_content__shopping_list')
                                .data('thisId');
                            const qty = $(e.target)
                                .closest('.modal_content__shopping_list')
                                .data('thisQty');
                            const sku = $(e.target)
                                .closest('.modal_content__shopping_list')
                                .data('thisSku')
                                .replace(/(^\s*)|(\s*$)/g, '');
                            const data = await SS.api.getVariantsByProductId({ productId });
                            const hasVariants = data.length > 0;
                            const shoppingListId = e.target.getAttribute('data-list-id');
                            let status = false;
                            let variantId = productId;

                            if (hasVariants) {
                                data.forEach((item) => {
                                    if (item.sku === sku) {
                                        variantId = item.variantId;
                                        status = true;
                                    }
                                });
                            }

                            if (!hasVariants || status) {
                                const optionList = [];

                                const Data = {
                                    id: shoppingListId,
                                    items: [
                                        {
                                            productId,
                                            variantId,
                                            qty,
                                            optionList,
                                        },
                                    ],
                                };

                                await SS.api.addProductToShoppingList(Data);
                                SS.utils.Alert.success('Product(s) added to the shopping list successfully.');
                                window.B3Spinner.hide();
                            }

                            if (!status) {
                                SS.utils.Alert.error('Please select all the required product options to add to shopping list');
                            }

                            window.B3Spinner.hide();
                        } catch (error) {
                            SS.utils.Alert.error('Woops! Something went wrong! Please try again later.');
                            window.B3Spinner.hide();
                        }
                    }
                };

                const modal = defaultModal();
                $('body').on('click', '[data-shoppinglist-modal]', async (e) => {
                    e.stopPropagation();

                    if (SS.isB2CUser) {
                        swal.fire({
                            text: 'Please log in as b2b user for further information.',
                            icon: 'info',
                            timer: '2000',
                            showConfirmButton: false,
                        });
                        return;
                    }

                    const $currentTarget = $(e.currentTarget);

                    const id = $currentTarget.data('productId');
                    const sku = $currentTarget.data('productSku');

                    modal.open({ size: 'small' });

                    let qty = 1; // init num at least 1

                    const $card = $currentTarget.closest('.card');
                    console.log($card);
                    if ($card && $card.length) {
                        qty = $card.find('input.js-card-quantity-input').val();
                    }

                    const $tableItem = $currentTarget.closest('.table-product-item');
                    console.log($tableItem);
                    if ($tableItem && $tableItem.length) {
                        qty = $tableItem.find('input.js-table-quantity-input').val();
                    }

                    const html = await getModalShoppingList(qty, sku, id);
                    if (html) {
                        $('#modal .modal-content').html(html);
                        $('#modal .loadingOverlay').hide();
                    }
                });

                document.querySelector('body').addEventListener('click', (e) => {
                    addToShoppingListModal(e);
                });
            },
        },
        orderdetail: {
            callback(instance) {
                (async () => {
                    const { id: orderID } = instance.state;
                    await instance.api.getOrderDetail(orderID);
                    window.B3Spinner.hide();
                })();
            },
        },
    };
}
