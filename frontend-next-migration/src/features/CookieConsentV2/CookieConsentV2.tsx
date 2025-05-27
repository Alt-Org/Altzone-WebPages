'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './CookieConsentV2.css';
import Sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';

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
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-v2">
            <div className="cookie-consent-content">
                <div className="cookie-text">
                    <h1>{t('header')}</h1>
                    <p>
                        {t('description')
                            .split(
                                /(tietosuojan|evästeiden|privacy|cookies|конфиденциальности|файлов cookie)/,
                            )
                            .map((part, index) => (
                                <React.Fragment key={index}>
                                    {[
                                        'tietosuojan',
                                        'evästeiden',
                                        'privacy',
                                        'cookies',
                                        'конфиденциальности',
                                        'файлов cookie',
                                    ].includes(part) ? (
                                        <span className="highlight">{part}</span>
                                    ) : (
                                        part
                                    )}
                                </React.Fragment>
                            ))}
                    </p>
                    <div className="cookie-consent-buttons">
                        <button onClick={handleDecline}>{t('declineButton')}</button>
                        <button onClick={handleAccept}>{t('acceptButton')}</button>
                    </div>
                </div>
                <img
                    src={Sleeper.src}
                    alt="Cookie character"
                    className="cookie-image"
                />
            </div>
        </div>
    );
};

export default CookieConsentV2;
