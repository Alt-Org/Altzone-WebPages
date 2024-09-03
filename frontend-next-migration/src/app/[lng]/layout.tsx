'use client'
import { dir } from "i18next";
import type { Metadata, Viewport } from "next";
import { Open_Sans, Urbanist, Rubik } from "next/font/google";
import { ReactNode } from "react";
import { CookieConsentComponent } from "@/features/CookieConsent";
import { languages } from "@/shared/i18n/settings/settings";
import { Providers } from "../_providers";
import "../_styles/index.scss";

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

// todo add i18n if it possible
export const metadata: Metadata = {
  title: 'AltZone',
  description:
    'Altzone tarjoaa pelaajille mahdollisuuden liittyä yhteisöön, pelata pelejä ja tutustua uusiin sarjakuviin.',
  keywords:
    'altzone, peli, yhteisö, sarjakuvat, galleriat, pelaa, rekisteröidy, kirjaudu sisään',
};


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}


export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: ReactNode;
  params: any;
}) {
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
