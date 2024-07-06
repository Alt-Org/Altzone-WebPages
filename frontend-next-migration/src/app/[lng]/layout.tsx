import type { Metadata } from 'next'
import {Open_Sans, Urbanist, Rubik} from 'next/font/google'
import '../_styles/index.scss';
import {Providers} from "../_providers";


const openSans = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
})

const urbanist = Urbanist(
    {
        variable: "--font-family-main",
        subsets: ['latin'],
        weight: "700"
    }
)

const rubik = Rubik({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-family-texts",
});

export const metadata: Metadata = {
    title: 'AltZone',
    description: 'Altzone tarjoaa pelaajille mahdollisuuden liittyä yhteisöön, pelata pelejä ja tutustua uusiin sarjakuviin.',
    keywords: 'altzone, peli, yhteisö, sarjakuvat, galleriat, pelaa, rekisteröidy, kirjaudu sisään',

};

import { dir } from 'i18next'

import { languages } from '../../shared/i18n/settings/settings'

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default function RootLayout({children,params: {lng}}: {
  children: React.ReactNode,
  params: any,
}) {
    return (
        <html lang={lng} dir={dir(lng)} className={`${urbanist.variable} ${rubik.variable}`}>
        <head>
            <link rel="icon" href="/icons/alt_logo.ico" sizes="72x72"/>
            <link
                rel="apple-touch-icon"
                href="/icons/alt_logo.ico"
                type="image"
                sizes="72x72"
            />
        </head>
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}

