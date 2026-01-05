import { dir } from 'i18next';
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { FeedbackSideButton } from '@/shared/ui/v2/Feedback';
import { ChatBotToggleButton } from '@/shared/ui/v2/Chatbot';
import { languages } from '@/shared/i18n/settings/settings';
import { LayoutWithBackground } from '@/preparedPages/Layouts';
import { Providers } from '../_providers';
import '../_styles/index.scss';
import localFont from 'next/font/local';
//import CookieConsentV2 from '@/features/CookieConsentV2/CookieConsentV2';
import { CookieConsentV3 } from '@/features/CookieConsentV3';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';
import { GoogleAnalytics } from '@next/third-parties/google';
import { envHelper } from '@/shared/const/envHelper';
// const openSans = Open_Sans({
//   subsets: ['latin'],
//   display: 'swap',
// });

const sedgwickFont = localFont({
    src: [
        {
            path: '../fonts/SedgwickAveDisplay-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-family-title',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
    display: 'swap',
});

const dmSans = localFont({
    src: [
        {
            path: '../fonts/DMSans-VariableFont_opsz,wght.ttf',
            style: 'normal',
        },
    ],
    variable: '--font-family-secondary',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
    display: 'swap',
});

const urbanist = localFont({
    src: [
        {
            path: '../fonts/Urbanist-VariableFont_wght.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-family-main',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
    display: 'swap',
});

const rubik = localFont({
    src: [
        {
            path: '../fonts/Rubik-VariableFont_wght.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-family-texts',
    fallback: ['system-ui', 'Arial', 'sans-serif'],
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

export function generateMetadata(): Metadata {
    return {
        metadataBase: new URL(baseUrl),
        openGraph: {
            ...defaultOpenGraph,
        },
    };
}

export default function RootLayout(props: Props) {
    const { children, params } = props;

    const { lng } = params;

    const GA_ID = envHelper.isDevMode ? envHelper.gaDevId : envHelper.gaProdId;

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
            {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        </html>
    );
}
