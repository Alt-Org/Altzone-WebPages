/**
 * HeaderDesktop is the desktop layout for the header.
 *
 * Current behavior:
 * - Renders the main page hero image on the left (shared asset).
 * - Renders header content (text/CTA/social) on the right.
 *
 * Important:
 * - Hero image is rendered here to avoid duplicate rendering in MainPage/ProjectDescription.
 */

import { memo } from 'react';
import Image from 'next/image';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { SocialIconLink } from '@/shared/types';
import topimage from '@/shared/assets/images/mainpage/topimage.png';
import cls from './HeaderDesktop.module.scss';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

const HeaderDesktopComponent = memo((props: Props) => {
    const { className = '', socialIconLinks } = props;

    return (
        <header className={classNames(cls.Header, {}, [className])}>
            <div className={cls.container}>
                <div className={cls.left}>
                    <Image
                        src={topimage}
                        alt="Main page hero"
                        priority
                        fill
                        sizes="(min-width: 1200px) 60vw, 100vw"
                    />
                </div>

                <div className={cls.right}>
                    <div className={cls.textBlock}>
                        <h1 className={cls.title}>Mikä ALT Zone?</h1>

                        <p className={cls.subtitle}>
                            ALT Zone 1.0 on vapaaehtoistuotantona toteuttava taidemobiilipeli, jota
                            tehdään yhteistyössä nuorten kanssa.
                        </p>

                        <p className={cls.subtitle}>
                            Pelissä ihmisen suojautumismekanismit kohtaavat toisensa
                            vuorovaikutustilanteiden taistelukentällä.
                        </p>

                        <p className={cls.subtitle}>
                            Pelin oheen luodaan yläasteille ja toisen asteen oppilaitoksille
                            suunnattu pelitaidekasvatuksen materiaali, jota opettaja voi helposti
                            soveltaa käytännössä. Oppilailla on mahdollisuus jatkaa pelin
                            kehittämistä.
                        </p>

                        <p className={cls.subtitle}>
                            Ideoiden pohjalta valmistuva ALT Zone 2.0 -pelin tuotto lahjoitetaan
                            lyhentämättömänä nuorten unelmien tukemiseksi.
                        </p>

                        <div className={cls.ctaRow}>
                            <button
                                type="button"
                                className={cls.ctaPrimary}
                            >
                                ALT Zonen historia
                            </button>
                            <button
                                type="button"
                                className={cls.ctaSecondary}
                            >
                                Mikä on PRG
                            </button>
                        </div>

                        <div className={cls.followText}>Seuraa Alt Zonea somessa</div>
                    </div>

                    <SocialSection
                        className={cls.socialSection}
                        socialIconLinks={socialIconLinks}
                    />
                </div>
            </div>
        </header>
    );
});

HeaderDesktopComponent.displayName = 'HeaderDesktopComponent';

export { HeaderDesktopComponent as HeaderDesktop };
