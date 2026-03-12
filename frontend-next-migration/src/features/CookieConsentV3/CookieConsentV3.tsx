'use client';
/**
 * CookieConsentV3 – GDPR-compliant cookie consent banner for ALT Zone.
 *
 * This client-side component displays a cookie consent banner that:
 * - Allows users to accept or decline cookies
 * - Stores consent persistently in a cookie for 1 year
 * - Supports minimized and expanded banner states
 * - Localizes text using `react-i18next`
 * - Links to Privacy Policy and Cookie Policy pages based on the current locale
 *
 * If cookie consent has already been handled, the component renders nothing.
 *
 * UI Behavior:
 * - Minimized mode shows a short description and action buttons
 * - Expanded mode shows full description and a character image
 *
 * @returns {JSX.Element | null} The cookie consent banner, or null if consent exists
 */
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
import { classNames } from '@/shared/lib/classNames/classNames';

const CookieConsentV3: React.FC = () => {
    const { t, i18n } = useTranslation('cookieConsent');
    const [isMinimized, setIsMinimized] = useState(false);
    const [cookiesHandled, setCookiesHandled] = useState(false);

    // Check if cookie consent is already present
    useEffect(() => {
        const consent = document.cookie.includes('AltZoneCookieConsent=');
        if (consent) {
            setCookiesHandled(true);
        }
    }, []);

    /**
     * Handles user action for cookie consent.
     *
     * @param action - 'accept' or 'decline'
     * @returns void
     */
    const handleEventCookies = (action: 'accept' | 'decline') => {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        document.cookie = `AltZoneCookieConsent=${action === 'accept' ? 'true' : 'false'}; path=/; expires=${expirationDate.toUTCString()}`;
        setCookiesHandled(true);
        setIsMinimized(false);
    };

    const descriptionParts = t('description').split(
        /(Tietosuojaseloste|evästekäytäntö|Privacy Policy|Cookie Policy|конфиденциальности|файлов cookie)/,
    );
    const shortDescriptionParts = t('shortDescription').split(
        /(Tietosuojaseloste|evästekäytäntö|Privacy Policy|Cookie Policy|конфиденциальности|файлов cookie)/,
    );

    /**
     * Returns a localized URL for privacy or cookie pages based on current language.
     *
     * @param base - 'privacy' or 'cookies'
     * @returns {string} Localized URL
     */
    const getLocalizedUrl = (base: string) => {
        const lang = i18n.language || 'en';
        if (base === 'privacy') return '/' + lang + '/privacy';
        if (base === 'cookies') return '/' + lang + '/cookies';
        return '/';
    };

    /**
     * Renders description text with links for Privacy Policy / Cookie Policy.
     *
     * @param parts - Array of strings from description split by policy keywords
     * @returns JSX.Element[]
     */
    const renderDescription = (descriptionParts: string[]) =>
        descriptionParts.map((part, index) => {
            if (['Tietosuojaseloste', 'Privacy Policy', 'конфиденциальности'].includes(part)) {
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
            if (['evästekäytäntö', 'Cookie Policy', 'файлов cookie'].includes(part)) {
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
    const mods = { [cls.minimized]: isMinimized };
    return (
        <div className={classNames(cls.cookieConsentV2, mods, [])}>
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
                        <Image
                            src={Sleeper}
                            alt="Cookie character"
                            className={cls.cookieImage}
                            width={Sleeper.width}
                            height={Sleeper.height}
                            priority
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

export default CookieConsentV3;
