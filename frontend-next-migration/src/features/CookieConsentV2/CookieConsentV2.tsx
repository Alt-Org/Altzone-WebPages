import React from 'react';
import { useTranslation } from 'react-i18next';
import './CookieConsentV2.css';

const CookieConsentV2 = () => {
    const { t } = useTranslation();

    return (
        <div className="cookie-consent-v2">
            <p>{t('cookieConsent.message')}</p>
            <div className="cookie-consent-buttons">
                <button>{t('cookieConsent.accept')}</button>
                <button>{t('cookieConsent.decline')}</button>
            </div>
        </div>
    );
};

export default CookieConsentV2;
