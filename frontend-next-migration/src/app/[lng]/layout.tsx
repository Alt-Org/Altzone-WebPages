import { dir } from 'i18next';
import type { Viewport } from 'next';
import { Urbanist, Rubik, Sedgwick_Ave_Display, DM_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import cls from '@/preparedPages/MainPage/ui/page.module.scss';
import { CookieConsentComponent } from '@/features/CookieConsent';
import { FeedbackSideButton } from '@/shared/ui/v2/Feedback';
import { languages } from '@/shared/i18n/settings/settings';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import bgPictureCompressed from '@/shared/assets/images/backgrounds/background-compressed.webp';
import { Providers } from '../_providers';
import '../_styles/index.scss';
// const openSans = Open_Sans({
//   subsets: ['latin'],
//   display: 'swap',
// });

const sedgwickFont = Sedgwick_Ave_Display({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-family-title',
    fallback: ['system-ui', 'arial'],
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-family-secondary',
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
};

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }));
}

interface Props {
    children: ReactNode;
    params: {
        lng: string;
    };
}

const ContentWithBackground = withBackgroundImage({
    alt: 'Main-Page underground style background',
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG,
    shouldBeLazyLoaded: true,
})(({ children }: any) => children);

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
            <body
                style={{
                    // backgroundImage: `url("/images/background.webp")`,
                    backgroundImage: `url("${bgPicture.src}")`,
                }}
            >
                <Providers>
                    <FeedbackSideButton />
                    {children}
                    <CookieConsentComponent />
                </Providers>
            </body>
        </html>
    );
}
