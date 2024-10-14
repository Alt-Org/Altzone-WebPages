import type {Viewport} from 'next';
import { Open_Sans, Urbanist, Rubik } from 'next/font/google';
import '../_styles/index.scss';
import {Providers} from "../_providers";
import { CookieConsentComponent } from '@/features/CookieConsent';
import { dir } from 'i18next';
import { languages } from '@/shared/i18n/settings/settings';
import {ReactNode} from "react";

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const urbanist = Urbanist({
  variable: '--font-family-main',
  subsets: ['latin'],
  weight: '700',
});

const rubik = Rubik({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-family-texts',
});


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

interface Props {
  children: ReactNode;
  params: {
    lng: string;
  };
}

export default function RootLayout(props: Props) {
  const {children,params} = props;

  const {lng} = params;

  return (
      <html
          lang={lng}
          dir={dir(lng)}
          className={`${urbanist.variable} ${rubik.variable}`}>
      <head>
        <link rel='icon' href='/icons/alt_logo.ico' sizes='72x72'/>
        <link
            rel='apple-touch-icon'
            href='/icons/alt_logo.ico'
            type='image'
            sizes='72x72'
        />
      </head>
      <body style={{
        backgroundImage: `url("/images/background.webp")`
      }}>
      <Providers>
          {children}
          <CookieConsentComponent/>
      </Providers>
      </body>
      </html>
  );
}
