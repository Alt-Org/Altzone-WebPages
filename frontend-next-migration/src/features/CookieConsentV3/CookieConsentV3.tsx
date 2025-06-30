'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CookieConsent from 'react-cookie-consent';
import cls from './CookieConsentV3.module.scss';
import Sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import Link from 'next/link';

const CookieConsentV3: React.FC = () => {
    const { t, i18n } = useTranslation('cookieConsent');
    const [isMinimized, setIsMinimized] = useState(false);
    const [cookiesHandled, setCookiesHandled] = useState(false);

    useEffect(() => {
        const consent = document.cookie.includes('AltZoneCookieConsent='); // Tarkistetaan CookieConsent-komponentin käyttämä eväste
        if (consent) {
            setCookiesHandled(true);
        }
    }, []);
    const handleEventCookies = (action: 'accept' | 'decline') => {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1 vuoden vanhentumisaika
        document.cookie = `AltZoneCookieConsent=${action === 'accept' ? 'true' : 'false'}; path=/; expires=${expirationDate.toUTCString()}`;
        setCookiesHandled(true);
        setIsMinimized(false);
    };

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

    if (cookiesHandled) {
        return null;
    }

    return (
        <div className={cls.cookieConsentV2}>
            {isMinimized ? (
                <div style={{ flexDirection: 'row' }}>
                    <button onClick={() => handleEventCookies('accept')}>✔️</button>
                    <button onClick={() => handleEventCookies('decline')}>❌</button>
                </div>
            ) : (
                <CookieConsent
                    location="bottom"
                    buttonText={t('acceptButton')}
                    declineButtonText={t('declineButton')}
                    enableDeclineButton
                    cookieName="AltZoneCookieConsent"
                    buttonClasses={cls.acceptButton}
                    declineButtonClasses={cls.declineButton}
                    hideOnAccept
                    hideOnDecline
                    disableStyles
                    onAccept={() => handleEventCookies('accept')}
                    onDecline={() => handleEventCookies('decline')}
                >
                    {!isMinimized && (
                        <>
                            <div className={cls.cookieConsentContent}>
                                <div className={cls.cookieText}>
                                    <h1 className={cls.cookieHeader}>{t('header')}</h1>
                                    <p className={cls.cookieConsentContentText}>
                                        {renderDescription()}
                                    </p>
                                </div>
                                <img
                                    src={Sleeper.src}
                                    alt="Cookie character"
                                    className={cls.cookieImage}
                                />
                            </div>
                            <button
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                }}
                                onClick={() => setIsMinimized(true)} // Minimize toimintoa varten
                            >
                                –
                            </button>
                        </>
                    )}
                </CookieConsent>
            )}
        </div>
    );
};

export default CookieConsentV3;
