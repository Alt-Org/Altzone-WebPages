import { dir } from 'i18next';
import type { Viewport } from 'next';
import { Urbanist, Rubik, Sedgwick_Ave_Display, DM_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import cls from '@/preparedPages/MainPage/ui/page.module.scss';
import { FeedbackSideButton } from '@/shared/ui/v2/Feedback';
import { ChatBotToggleButton } from '@/shared/ui/v2/Chatbot';
import { languages } from '@/shared/i18n/settings/settings';
import { LayoutWithBackground } from '@/preparedPages/Layouts';
import { Providers } from '../_providers';
import '../_styles/index.scss';
import CookieConsentV3 from '@/features/CookieConsentV3/CookieConsentV3';
// const openSans = Open_Sans({
//   subsets: ['latin'],
//   display: 'swap',
// });

const sedgwickFont = Sedgwick_Ave_Display({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-family-title',
    fallback: ['system-ui', 'arial', 'sans-serif'],
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-family-secondary',
    fallback: ['system-ui', 'arial', 'sans-serif'],
    display: 'swap',
});

const urbanist = Urbanist({
    variable: '--font-family-main',
    subsets: ['latin'],
    weight: '700',
    fallback: ['system-ui', 'arial', 'sans-serif'],
    display: 'swap',
});

const rubik = Rubik({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-family-texts',
    fallback: ['system-ui', 'arial', 'sans-serif'],
    display: 'swap',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

interface Props {
    children: ReactNode;
    params: {
        lng: string;
    };
}

export default function RootLayout(props: Props) {
    const { children, params } = props;

    const { lng } = params;

    return (
        <html
            lang={lng}
            dir={dir(lng)}
            className={`${urbanist.variable} ${rubik.variable} ${sedgwickFont.variable} ${dmSans.variable}`}
        >
            <head>
                <link
                    rel="icon"
                    href="/icons/alt_logo.ico"
                    sizes="72x72"
                />
                <link
                    rel="apple-touch-icon"
                    href="/icons/alt_logo.ico"
                    type="image"
                    sizes="72x72"
                />
            </head>
            <body>
                <LayoutWithBackground>
                    <Providers>
                        <FeedbackSideButton />
                        <ChatBotToggleButton />
                        {children}
                        <CookieConsentV3 />
                    </Providers>
                </LayoutWithBackground>
            </body>
        </html>
    );
}
