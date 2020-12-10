import collapsibleFactory from '../common/collapsible';

export default function () {
    if ($('.cms-accordion') && $('.cms-accordion').length > 0) collapsibleFactory();
}
