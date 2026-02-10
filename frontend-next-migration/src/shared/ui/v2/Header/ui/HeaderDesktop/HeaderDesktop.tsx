'use client';
import { memo } from 'react';
import Image from 'next/image';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { SocialIconLink } from '@/shared/types';
import topimage from '@/shared/assets/images/mainpage/topimage.png';
import cls from './HeaderDesktop.module.scss';
// InfoText is coming from here?
import altZoneCls from '@/preparedPages/MainPage/ui/_components/sections/AltZone/AltZone.module.scss';

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
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div className={cls.right}>
                    <h1 className={cls.title}>Mikä ALT Zone?</h1>
                    <div className={altZoneCls.InfoText}>
                        <p>
                            ALT Zone 1.0 on vapaaehtoistuotantona toteuttava taidemobiilipeli, jota
                            tehdään yhteistyössä nuorten kanssa. Pelissä ihmisen
                            suojautumismekanismit kohtaavat toisensa vuorovaikutustilanteiden
                            taistelukentällä.
                        </p>

                        <p>
                            Pelin oheen luodaan yläasteille ja toisen asteen oppilaitoksille
                            suunnattu pelitaidekasvatuksen materiaali, jota opettaja voi helposti
                            soveltaa käytännössä. Oppilailla on mahdollisuus jatkaa pelin
                            kehittämistä. Ideoiden pohjalta valmistuva ALT Zone 2.0 -pelin tuotto
                            lahjoitetaan lyhentämättömänä nuorten unelmien tukemiseksi.
                        </p>
                    </div>
                    <div className={cls.ctaRow}>
                        {' '}
                        {/* Buttons currently not functioning */}
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
                    <div className={cls.followText}>Seuraa Alt Zonea somessa</div>{' '}
                    {/* this is probably going to change */}
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

export default HeaderDesktopComponent;
