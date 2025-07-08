'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import CookieConsent from 'react-cookie-consent';
import cls from './CookieConsentV3.module.scss';
import Sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import Link from 'next/link';
import MinimizeButton from '@/shared/assets/icons/MinimizeButton.svg';
import Accept from '@/shared/assets/icons/Correct.svg';
import Decline from '@/shared/assets/icons/X.svg';
import useBreakpoints from '@/shared/lib/hooks/useBreakpoints';

const CookieConsentV4: React.FC = () => {
    const { t, i18n } = useTranslation('cookieConsent');
    const [isMinimized, setIsMinimized] = useState(false);
    const [cookiesHandled, setCookiesHandled] = useState(false);
    const { xs } = useBreakpoints();

    useEffect(() => {
        const consent = document.cookie.includes('AltZoneCookieConsent=');
        if (consent) {
            setCookiesHandled(true);
        }
    }, []);

    const handleEventCookies = (action: 'accept' | 'decline') => {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        document.cookie = `AltZoneCookieConsent=${action === 'accept' ? 'true' : 'false'}; path=/; expires=${expirationDate.toUTCString()}`;
        setCookiesHandled(true);
        setIsMinimized(false);
    };

    const descriptionParts = t('description').split(
        /(tietosuojan|evästeiden|privacy|cookies|конфиденциальности|файлов cookie)/,
    );
    const shortDescriptionParts = t('shortDescription').split(
        /(tietosuojan|evästeiden|privacy|cookies|конфиденциальности|файлов cookie)/,
    );

    const getLocalizedUrl = (base: string) => {
        const lang = i18n.language || 'en';
        if (base === 'privacy') return `/` + lang + `/privacy`;
        if (base === 'cookies') return `/` + lang + `/cookies`;
        return '/';
    };

    const renderDescription = (descriptionParts: string[]) =>
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
        <div
            className={cls.cookieConsentV2}
            style={{
                height: isMinimized ? '130px' : xs ? '690px' : '360px',
                overflow: 'hidden',
                transition: 'height 0.3s ease',
            }}
        >
            {isMinimized ? (
                <div className={cls.alignVertically}>
                    <div
                        style={{ flexGrow: '1' }}
                        className={cls.cookieText}
                    >
                        <h1 className={cls.cookieShortHeader}>{t('shortHeader')}</h1>
                        <p>{renderDescription(shortDescriptionParts)}</p>
                    </div>
                    <button
                        style={{ backgroundColor: 'red' }}
                        className={cls.processButton}
                        onClick={() => handleEventCookies('decline')}
                    >
                        <Image
                            src={Decline}
                            width={40}
                            height={40}
                            alt="Decline button"
                        />
                    </button>
                    <button
                        style={{ backgroundColor: 'green' }}
                        className={cls.processButton}
                        onClick={() => handleEventCookies('accept')}
                    >
                        <Image
                            src={Accept}
                            width={40}
                            height={40}
                            alt="Accept button"
                        />
                    </button>
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
                    <div className={cls.cookieConsentContent}>
                        <div className={cls.cookieText}>
                            <h1 className={cls.cookieHeader}>{t('header')}</h1>
                            <p className={cls.cookieConsentContentText}>
                                {renderDescription(descriptionParts)}
                            </p>
                        </div>
                        <img
                            src={Sleeper.src}
                            alt="Cookie character"
                            className={cls.cookieImage}
                        />
                    </div>
                    <button
                        className={cls.minimizeButton}
                        onClick={() => setIsMinimized(true)}
                    >
                        <Image
                            src={MinimizeButton}
                            width={50}
                            height={50}
                            alt="Minimize button"
                        />
                    </button>
                </CookieConsent>
            )}
        </div>
    );
};

export default CookieConsentV4;
