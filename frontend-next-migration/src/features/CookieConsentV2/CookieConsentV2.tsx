'use client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './CookieConsentV2.module.scss';
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
        <div className={cls.cookieConsentV2}>
            <div className={cls.cookieConsentContent}>
                <div className={cls.cookieText}>
                    <h1 className={cls.cookieHeader}>{t('header')}</h1>
                    <p className={cls.cookieConsentContentText}>
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
                                        <span className={cls.highlight}>{part}</span>
                                    ) : (
                                        part
                                    )}
                                </React.Fragment>
                            ))}
                    </p>

                    <div className={cls.cookieConsentButtons}>
                        <button onClick={handleDecline}>{t('declineButton')}</button>
                        <button onClick={handleAccept}>{t('acceptButton')}</button>
                    </div>
                </div>

                <img
                    src={Sleeper.src}
                    alt="Cookie character"
                    className={cls.cookieImage}
                />
            </div>
        </div>
    );
};

export default CookieConsentV2;
