import addWebContentViaCMSpage from './addWebContentViaCMSpage';
// // import backToTop from './backToTop';
import cardAddToCart from './card-addToCart';
// import cookiesDisplay from './cookies-display';
import cms from './cms';
// import onWindowScroll from './onWindowScroll';
import multilineTextDisplay from './multilineTextDisplay';
import toggleFooterInfo from './toggleFooterInfo';

export default function (context) {
    const {
        secureBaseUrl,
        cartId,
        // customer,
    } = context;
    console.log(context);

    addWebContentViaCMSpage('/footer-about-us-content/', $('#footer-about-us'));
    // backToTop();
    cardAddToCart(secureBaseUrl, cartId);
    // cookiesDisplay();
    cms();
    // onWindowScroll();
    multilineTextDisplay.init();
    toggleFooterInfo();
}
