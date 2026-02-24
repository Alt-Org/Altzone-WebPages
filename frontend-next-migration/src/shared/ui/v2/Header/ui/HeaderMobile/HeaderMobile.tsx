'use client';
import { memo } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import type { SocialIconLink } from '@/shared/types';
import topimage from '@/shared/assets/images/mainpage/topimage.png';
import altZoneCls from '@/preparedPages/MainPage/ui/_components/sections/AltZone/AltZone.module.scss';
import cls from './HeaderMobile.module.scss';
import { useParams, useRouter } from 'next/navigation';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

const HeaderMobileComponent = memo((props: Props) => {
    const { className = '', socialIconLinks } = props;

    const router = useRouter();
    const params = useParams();
    const lng = params?.lng as string;

    return (
        <header className={classNames(cls.Header, {}, [className])}>
            <div className={cls.imageWrap}>
                <Image
                    src={topimage}
                    alt="Main page hero"
                    priority
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className={cls.content}>
                <h1 className={cls.title}>Mikä ALT Zone?</h1>

                <div className={altZoneCls.InfoText}>
                    <p>
                        ALT Zone 1.0 on vapaaehtoistuotantona toteuttava taidemobiilipeli, jota
                        tehdään yhteistyössä nuorten kanssa. Pelissä ihmisen suojautumismekanismit
                        kohtaavat toisensa vuorovaikutustilanteiden taistelukentällä.
                    </p>
                    <p>
                        Pelin oheen luodaan yläasteille ja toisen asteen oppilaitoksille suunnattu
                        pelitaidekasvatuksen materiaali, jota opettaja voi helposti soveltaa
                        käytännössä. Oppilailla on mahdollisuus jatkaa pelin kehittämistä. Ideoiden
                        pohjalta valmistuva ALT Zone 2.0 -pelin tuotto lahjoitetaan lyhentämättömänä
                        nuorten unelmien tukemiseksi.
                    </p>
                </div>

                <div className={cls.ctaCol}>
                    <button
                        type="button"
                        className={cls.ctaPrimary}
                        onClick={() => router.push(`/${lng}/about`)}
                    >
                        ALT Zonen historia
                    </button>
                    <button
                        type="button"
                        className={cls.ctaSecondary}
                        onClick={() => router.push(`/${lng}/prg`)}
                    >
                        Mikä on PRG
                    </button>
                </div>

                <div className={cls.followText}>Seuraa Alt Zonea somessa</div>

                <SocialSection
                    variant="header"
                    className={cls.socialSection}
                    socialIconLinks={socialIconLinks}
                />
            </div>
        </header>
    );
});

HeaderMobileComponent.displayName = 'HeaderMobileComponent';

export default HeaderMobileComponent;
