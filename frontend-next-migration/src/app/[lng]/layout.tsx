import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../preparedApp/styles/index.scss';
import {Providers} from "@/preparedApp/providers/Providers";
import '../../preparedApp/styles/index.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AltZone',
    description: 'Altzone tarjoaa pelaajille mahdollisuuden liittyä yhteisöön, pelata pelejä ja tutustua uusiin sarjakuviin.',
    keywords: 'altzone, peli, yhteisö, sarjakuvat, galleriat, pelaa, rekisteröidy, kirjaudu sisään',

};

import { dir } from 'i18next'

import { languages } from '../../shared/i18n/settings'

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

export default function RootLayout({children,params: {lng}}: {
  children: React.ReactNode,
  params: any
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
      <Providers>
      {children}
      </Providers>
      </body>

    </html>
  )
}

