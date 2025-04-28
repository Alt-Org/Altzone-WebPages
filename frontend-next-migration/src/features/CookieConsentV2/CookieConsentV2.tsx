import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CookieConsentV2.css';

const CookieConsentV2 = () => {
    const { t } = useTranslation('cookieConsent');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        setIsVisible(!consent);
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
        // Here you can add any additional logic for when the user accepts cookies
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-v2">
            <p>{t('description')}</p>
            <p>{t('note')}</p>
            <p>{t('terms')}</p>
            <div className="cookie-consent-buttons">
                <button onClick={handleDecline}>{t('declineButton')}</button>
                <button onClick={handleAccept}>{t('acceptButton')}</button>
            </div>
        </div>
    );
};

export default CookieConsentV2;
