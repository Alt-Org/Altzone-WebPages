'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CookieConsent from 'react-cookie-consent';
import cls from './CookieConsentV2.module.scss';
import Sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import Link from 'next/link';

const CookieConsentV2: React.FC = () => {
    const { t, i18n } = useTranslation('cookieConsent');

    const descriptionParts = t('description').split(
        /(tietosuojan|evästeiden|privacy|cookies|конфиденциальности|файлов cookie)/,
    );

    const getLocalizedUrl = (base: string) => {
        const lang = i18n.language || 'en';
        if (base === 'privacy') return `/` + lang + `/privacy`;
        if (base === 'cookies') return `/` + lang + `/cookies`;
        return '/';
    };

    const renderDescription = () =>
        descriptionParts.map((part, index) => {
            if (['tietosuojan', 'privacy', 'конфиденциальности'].includes(part)) {
                return (
                    <Link
                        key={index}
                        href={getLocalizedUrl('privacy')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls.highlight}
                    >
                        {part}
                    </Link>
                );
            }
            if (['evästeiden', 'cookies', 'файлов cookie'].includes(part)) {
                return (
                    <Link
                        key={index}
                        href={getLocalizedUrl('cookies')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls.highlight}
                    >
                        {part}
                    </Link>
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
                cookieName="AltZoneCookieConsent"
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
