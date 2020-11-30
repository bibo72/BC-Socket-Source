import PageManager from './page-manager';
import 'slick-carousel';

export default class Home extends PageManager {
    onReady() {
        $('.home-reviews div[data-content-region="home_below_top_products"] > div[data-layout-id]').slick({
            dots: true,
            arrows: false,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }
}
