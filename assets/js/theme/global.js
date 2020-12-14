import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import adminBar from './global/adminBar';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import objectFitImages from './global/object-fit-polyfill';
import custom from './custom/index';
import toggleNavigationMenu from './custom/toggleNavigationMenu';
import { defaultModal, modalTypes } from './global/modal';
import swal from './global/sweet-alert';

export default class Global extends PageManager {
    onReady() {
        const {
            channelId, cartId, productId, categoryId, secureBaseUrl, maintenanceModeSettings, adminBarLanguage, showAdminBar,
        } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel();
        const $mainMenu = menu();
        mobileMenuToggle();
        toggleNavigationMenu($mainMenu);
        privacyCookieNotification();
        if (showAdminBar) {
            adminBar(secureBaseUrl, channelId, maintenanceModeSettings, JSON.parse(adminBarLanguage), productId, categoryId);
        }
        loadingProgressBar();
        svgInjector();
        objectFitImages();
        custom(this.context);
        this.fnCheckBeforeShoppinglistModal(this.context);

        const url = 'https://cdn.bundleb2b.net/bundleb2b.2.10.0.js';
        // const url = 'http://127.0.0.1:8080/bundleb2b.2.10.0.js';
        const el = document.createElement('script');
        el.setAttribute('src', url);
        document.querySelector('body').append(el);

        window.b3themeConfig = {};

        window.b3themeConfig.useText = {
            'shopping.list.add.to.list.title': 'Save to List',
        }

        window.b3themeConfig.useJavaScript = {
            login: {
                overwrite: false,
                callback(SS) {
                    console.log('b2bcontext', SS);

                    const getModalShoppingList = async (qty, sku, id) => {
                        const shoppingList = await SS.api.getShoppingLists();
                        console.log(shoppingList);
                        let html = `
                            <div class="modal_content__shopping_list" data-this-qty="${qty}" data-this-sku="${sku}" data-this-id="${id}">
                                <p class="modal_title">${SS.text['shopping.list.add.to.list.title']}</p>
                                <div class="button--trapezoid"><a href="/shopping-lists/" class="button button--primary">New List</a></div>
                                <form action="" class="form form-wishlist form-action form_shoppinglist" data-shoppinglist-add method="post">
                                    <ul class="shopping_lists">
                        `;
                        shoppingList.list.forEach(item => {
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
                        })
                        html += '</ul></form></div>';

                        return html
                    };

                    const addToShoppingListModal = async (e) => {
                        if (e.target.hasAttribute('add-to-list-from-modal')) {
                          e.preventDefault()
                          window.B3Spinner.show()
                          try {
                            const productId = $(e.target).closest('.modal_content__shopping_list').data('thisId');
                            const qty = $(e.target).closest('.modal_content__shopping_list').data('thisQty');
                            const sku = $(e.target).closest('.modal_content__shopping_list').data('thisSku').replace(/(^\s*)|(\s*$)/g, '');
                            const data = await SS.api.getVariantsByProductId({ productId });
                            const hasVariants = (data.length > 0)
                            const shoppingListId = e.target.getAttribute('data-list-id')
                            let status = false
                            let variantId = productId
                    
                            if (hasVariants) {
                              data.forEach(item => {
                                if (item.sku === sku) {
                                  variantId = item.variantId
                                  status = true
                                }
                              })
                            }
                    
                            if (!hasVariants || status) {
                              const optionList = []
                              
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
                    
                              }
                    
                              await SS.api.addProductToShoppingList(Data)
                              SS.utils.Alert.success('Product(s) added to the shopping list successfully.')
                              window.B3Spinner.hide()
                            }
                    
                            if (!status) {
                              SS.utils.Alert.error('Please select all the required product options to add to shopping list')
                            }
                    
                            window.B3Spinner.hide()
                          } catch (error) {
                            console.log(error);
                            SS.utils.Alert.error('Woops! Something went wrong! Please try again later.')
                            window.B3Spinner.hide()
                          }
                        }
                    }

                    const modal = defaultModal();
                    $('body').on('click', '[data-shoppinglist-modal]', async e => {
                      e.stopPropagation();

                      if (SS.isB2CUser) {
                        swal.fire({
                          text: 'Please log in as b2b user for further information.',
                          icon: 'info',
                          timer: '2000',
                          showConfirmButton: false,
                        });
                        return
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
                        console.log('card qty', qty);
                      }

                      const $tableItem = $currentTarget.closest('.table-product-item');
                      console.log($tableItem);
                      if ($tableItem && $tableItem.length) {
                        qty = $tableItem.find('input.js-table-quantity-input').val();
                        console.log('table qty', qty);
                      }

                      const html = await getModalShoppingList(qty, sku, id);
                      if (html) {
                          $('#modal .modal-content').html(html);
                          $('#modal .loadingOverlay').hide();
                      }
                    });

                    document.querySelector('body').addEventListener('click', e => {
                        addToShoppingListModal(e)
                    })
                }
            },
            orderdetail: {
                callback(instance) {
                    (async () => {
                        const {
                            id: orderID,
                        } = instance.state;
                        await instance.api.getOrderDetail(orderID);
                        window.B3Spinner.hide();
                    })();
                },
            },
        };

    }

    // check user clicking on data-shoppinglist-modal
    fnCheckBeforeShoppinglistModal(context) {
      const customer = context.customer;
      $('body').on('click', '[data-shoppinglist-modal]', e => {
        e.stopPropagation();
        console.log(e);
        const $currentTarget = $(e.currentTarget);
        if (!customer) {
          swal.fire({
            text: 'Please log in for further information.',
            icon: 'info',
            timer: '2000',
            showConfirmButton: false,
          });
          return
        }
      });
    }
}
