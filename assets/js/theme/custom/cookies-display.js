const cookiesDisplay = {
    setStyle(height) {
        $('body').css('margin-bottom', `${height}px`);
    },

    restoreStyle() {
        $('body').css('margin-bottom', '0');
    },

    cookiesDisplay() {
        const $consentManager = $('#consent-manager');
        if ($consentManager) {
            const height = $consentManager.height();
            cookiesDisplay.setStyle(height);
        } else {
            cookiesDisplay.restoreStyle();
        }

        const $consentManagerUpdateBanner = $('#consent-manager-update-banner');
        if ($consentManagerUpdateBanner) {
            const height = $consentManagerUpdateBanner.height();
            cookiesDisplay.setStyle(height);
        } else {
            cookiesDisplay.restoreStyle();
        }
    },
};

export default function () {
    cookiesDisplay.cookiesDisplay();
    $(window).on('resize', () => {
        cookiesDisplay.cookiesDisplay();
    });
}
