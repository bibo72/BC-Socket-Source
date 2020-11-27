import { api } from '@bigcommerce/stencil-utils';
// import Url from 'url';

export default function (cmsPagePath, $selector, className) {
    const options = {
        template: 'custom/cms-page-content',
    };

    if ($selector && $selector.length > 0) {
        api.getPage(cmsPagePath, options, (err, content) => {
            if (err) {
                throw new Error(err);
            }

            $selector.html($(content));

            if (className) {
                if ($(content).text() && $(content).text().trim()) {
                    $('body').addClass(className);
                }
            }
        });
    }
}
