'use client';
import CookieConsent from 'react-cookie-consent';
import { toast } from 'react-toastify';
import { getRoutePrivacyPage, getRouteCookiesPage } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './CookieConsent.module.scss';

export const CookieConsentComponent = () => (
    <CookieConsent
        location="bottom"
        buttonText="I consent"
        cookieName="AltZoneCookieConsent"
        declineButtonText="Decline"
        enableDeclineButton
        onDecline={() => {
            toast.error(
                'You have declined cookies, some features on this website may be limited.',
                {
                    position: 'bottom-center',
                    autoClose: 10000,
                    theme: 'light',
                },
            );
        }}
        onAccept={() => {
            toast.success('cookies accepted', {
                position: 'bottom-center',
                autoClose: 3000,
                theme: 'light',
            });
        }}
        style={{ background: '#2B373B' }}
        buttonStyle={{
            backgroundColor: 'orange',
            color: '#4e503b',
            fontSize: '15px',
        }}
        expires={365}
    >
        <p style={{ fontSize: '1.2rem' }}>
            This website uses cookies and local storage to enhance the user experience.You can still
            continue using the website, but certain functions may be limited.
        </p>{' '}
        <span style={{ fontSize: '0.8rem' }}>
            By using our website, you agree to our use of{' '}
            <AppLink
                to={getRoutePrivacyPage()}
                className={cls.applink}
            >
                Privacy
            </AppLink>{' '}
            &{' '}
            <AppLink
                to={getRouteCookiesPage()}
                className={cls.applink}
            >
                Cookies policies
            </AppLink>{' '}
        </span>
    </CookieConsent>
);
