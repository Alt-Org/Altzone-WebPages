'use client';
import cls from './HeroContainer.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { AppRoutesLinks, RoutePaths } from '@/shared/appLinks/RoutePaths';
import infoBg from '@/shared/assets/images/heros/hero-container/info-bg.svg';
import rightArrow from '@/shared/assets/images/heros/hero-container/right-arrow.png';
import leftArrow from '@/shared/assets/images/heros/hero-container/left-arrow.png';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  heroImg: any;
  heroGif: any;
  heroImgAlt: string;
  heroName: string;
  borderColor: string;
  heroDescription: string;
  leftArrowLink: any;
  rightArrowLink: any;
  xLink: any;
};

//todo fix that component, may be even create new duplication with another approach
const HeroContainer = (props: Props) => {
  const {
    heroImg,
    heroImgAlt,
    heroName,
    borderColor,
    heroDescription,
    rightArrowLink,
    leftArrowLink,
    xLink,
    heroGif,
  } = props;

  const { isMobileSize } = useIsMobileSize();

  const router = useRouter();

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

    // Add the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, leftArrowLink, rightArrowLink, xLink]);

  return (
    <section className={cls.HeroContainer}>
      <div className={cls.backgroundImageWrapper}>
        <Image
          src={bgPicture}
          alt='Background'
          layout='fill'
          objectFit='cover'
          quality={100}
        />
      </div>

      <div className={cls.Content}>
        <Link className={cls.LeftArrow} href={leftArrowLink}>
          <Image src={leftArrow} alt='leftArrow' />
        </Link>
        {!isMobileSize && (
          <Image src={heroImg} alt={heroImgAlt} className={cls.HeroImg} />
        )}
        <div className={cls.HeroInfoDiv}>
          <Image src={infoBg} alt='infoBg' className={cls.InfoBgImg} />

          <div className={cls.HeroInfoHeader}>
            <hr></hr>
            <h2>{heroName}</h2>
            <hr></hr>
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
              />
            )}
            {isMobileSize && (
              <Image
                src={heroImg}
                alt='imagePlaceholder'
                className={cls.InfoImgMobile}
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
