'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CookieConsent from 'react-cookie-consent';
import cls from './CookieConsentV2.module.scss';
import Sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';

const CookieConsentV2: React.FC = () => {
    const { t } = useTranslation('cookieConsent');

    const descriptionParts = t('description').split(
        /(tietosuojan|evästeiden|privacy|cookies|конфиденциальности|файлов cookie)/,
    );

    const renderDescription = () =>
        descriptionParts.map((part, index) => {
            if (['tietosuojan', 'privacy', 'конфиденциальности'].includes(part)) {
                return (
                    <a
                        key={index}
                        href="https://altzone.fi/en/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls.highlight}
                    >
                        {part}
                    </a>
                );
            }
            if (['evästeiden', 'cookies', 'файлов cookie'].includes(part)) {
                return (
                    <a
                        key={index}
                        href="https://altzone.fi/en/cookies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls.highlight}
                    >
                        {part}
                    </a>
                );
            }
            return <React.Fragment key={index}>{part}</React.Fragment>;
        });

    return (
        <>
            <div className={cls.overlay} />
            <CookieConsent
                location="bottom"
                buttonText={t('acceptButton')}
                declineButtonText={t('declineButton')}
                enableDeclineButton
                cookieName="cookieConsent"
                containerClasses={cls.cookieConsentV2}
                buttonClasses={cls.acceptButton}
                declineButtonClasses={cls.declineButton}
                hideOnAccept
                hideOnDecline
                disableStyles
            >
                <div className={cls.cookieConsentContent}>
                    <div className={cls.cookieText}>
                        <h1 className={cls.cookieHeader}>{t('header')}</h1>
                        <p className={cls.cookieConsentContentText}>{renderDescription()}</p>
                    </div>
                    <img
                        src={Sleeper.src}
                        alt="Cookie character"
                        className={cls.cookieImage}
                    />
                </div>
            </CookieConsent>
        </>
    );
};

export default CookieConsentV2;
