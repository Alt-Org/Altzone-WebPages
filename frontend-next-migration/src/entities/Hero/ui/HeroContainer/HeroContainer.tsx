'use client';
import cls from './HeroContainer.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import infoBg from '@/shared/assets/images/heros/hero-container/info-bg.png';
import rightArrow from '@/shared/assets/images/heros/hero-container/right-arrow.png';
import leftArrow from '@/shared/assets/images/heros/hero-container/left-arrow.png';
import bgAlyllistajat from '@/shared/assets/images/backgrounds/bgAlyllistajat.png';
import bgHamaajat from '@/shared/assets/images/backgrounds/bgHamaajat.png';
import bgPeilaajat from '@/shared/assets/images/backgrounds/bgPeilaajat.png';
import bgSulautujat from '@/shared/assets/images/backgrounds/bgSulautujat.png';
import bgTorjujat from '@/shared/assets/images/backgrounds/bgTorjujat.png';
import bgTottelijat from '@/shared/assets/images/backgrounds/bgTottelijat.png';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  heroImg: any;
  heroGif: any;
  heroImgAlt: string;
  heroName: string;
  heroDescription: string;
  leftArrowLink: any;
  rightArrowLink: any;
  xLink: any;
  group: string;
};

const HeroContainer = ({
  heroImg,
  heroGif,
  heroImgAlt,
  heroName,
  heroDescription,
  leftArrowLink,
  rightArrowLink,
  xLink,
  group,
}: Props) => {
  const { isMobileSize } = useIsMobileSize();
  const router = useRouter();

  const groupBackgrounds: { [key: string]: any } = {
    'ÄLYLLISTÄJÄT // EGOTISMI': bgAlyllistajat,
    'HÄMÄÄJÄT // DEFLEKTIO': bgHamaajat,
    'PEILAAJAT // PROJEKTIO': bgPeilaajat,
    'SULAUTUJAT // KONFLUENSSI': bgSulautujat,
    'TORJUJAT // RETROFLEKTIO': bgTorjujat,
    'TOTTELIJAT // INTROJEKTIO': bgTottelijat,
  };

  const background = groupBackgrounds[group];

  if (!background) {
    console.error(`No background found for hero group: ${group}`);
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.keyCode === 37) {
        router.push(leftArrowLink);
      } else if (event.keyCode === 39) {
        router.push(rightArrowLink);
      } else if (event.keyCode === 27) {
        router.push(xLink);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, leftArrowLink, rightArrowLink, xLink]);

  return (
    <section className={cls.HeroContainer}>
      <div className={cls.backgroundImageWrapper}>
        {background ? (
          <Image
            src={background}
            alt='groupBackground'
            layout='fill'
            objectFit='cover'
          />
        ) : null}
      </div>
      <div className={cls.Content}>
        <Link className={cls.LeftArrow} href={leftArrowLink}>
          <Image src={leftArrow} alt='leftArrow' />
        </Link>
        {!isMobileSize && (
          <Image
            src={heroImg}
            alt={heroImgAlt}
            className={cls.HeroImg}
            priority={true}
          />
        )}
        <div className={cls.HeroInfoDiv}>
          <Image
            src={infoBg}
            alt='infoBg'
            className={cls.InfoBgImg}
            priority={true}
          />
          <div className={cls.HeroInfoHeader}>
            <hr />
            <h2>{heroName}</h2>
            <hr />
          </div>
          <Link href={xLink} className={cls.XButton}>
            <h1>X</h1>
          </Link>
          <div className={cls.HeroInfoMain}>
            {!isMobileSize && (
              <Image
                src={heroGif}
                alt='imagePlaceholder'
                className={cls.InfoImg}
                priority={true}
              />
            )}
            {isMobileSize && (
              <Image
                src={heroImg}
                alt='imagePlaceholder'
                className={cls.InfoImgMobile}
                priority={true}
              />
            )}
            <p className={cls.description}>{heroDescription}</p>
          </div>
        </div>
        <Link className={cls.RightArrow} href={rightArrowLink}>
          <Image src={rightArrow} alt='rightArrow' />
        </Link>
      </div>
    </section>
  );
};

export default HeroContainer;
