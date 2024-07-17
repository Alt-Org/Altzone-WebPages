'use client';
import cls from './CookieConsent.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import CookieConsent from 'react-cookie-consent';
import { AppRoutesLinks, RoutePaths } from '@/shared/appLinks/RoutePaths';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

export const CookieConsentComponent = () => (
  <CookieConsent
    location='bottom'
    buttonText='I consent'
    flipButtons
    cookieName='AltZoneCookieConsent'
    declineButtonText='Decline'
    enableDeclineButton
    onDecline={() => {
      alert(
        'You have declined the use of cookies and local storage. For better experience, please enable them in your browser settings.',
      );
    }}
    style={{ background: '#2B373B' }}
    buttonStyle={{
      backgroundColor: 'orange',
      color: '#4e503b',
      fontSize: '15px',
    }}
    expires={150}>
    <p style={{ fontSize: '1.2rem' }}>
      This website uses cookies and a local storage to enhance the user
      experience.
    </p>{' '}
    <span style={{ fontSize: '0.8rem' }}>
      For more information see our{' '}
      <AppLink to={AppRoutesLinks.PRIVACY} className={cls.applink}>
        Privacy
      </AppLink>{' '}
      &{' '}
      <AppLink to={AppRoutesLinks.COOKIES} className={cls.applink}>
        Cookies Policy
      </AppLink>{' '}
    </span>
  </CookieConsent>
);
