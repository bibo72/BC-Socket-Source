import addWebContentViaCMSpage from './addWebContentViaCMSpage';
// // import backToTop from './backToTop';
// import cookiesDisplay from './cookies-display';
// import onWindowScroll from './onWindowScroll';
import toggleFooterInfo from './toggleFooterInfo';

export default function (context) {
    // const {
    //     secureBaseUrl,
    //     cartId,
    //     customer,
    // } = context;
    console.log(context);

    addWebContentViaCMSpage('/footer-about-us-content/', $('#footer-about-us'));
    // // backToTop();
    // cookiesDisplay();
    // onWindowScroll();
    toggleFooterInfo();
}
