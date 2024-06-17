'use client';
import Image from 'next/image';
import bgBox from '@/shared/assets/images/heros/hero-container/readyContainer.png';
import groupBg from '@/shared/assets/images/backgrounds/groupBg.png';
import cls from './HeroContainer.module.scss';
import Link from 'next/link';
import leftArrow from '@/shared/assets/images/heros/hero-container/leftArrow.svg';
import rightArrow from '@/shared/assets/images/heros/hero-container/rightArrow.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import useImageDistance from './useImageDistance';
import useKeyboardNavigation from './useKeyboardNavigation';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import useIsTabletSize from '@/shared/lib/hooks/useIsTabletSize';

type Props = {
  heroImg: string;
  heroGif: string;
  heroName: string;
  heroDescription: string;
  heroColor: string;
  leftArrowLink: string;
  rightArrowLink: string;
  xLink: string;
};

const HeroContainer = (props: Props) => {
  const {
    heroImg,
    heroGif,
    heroDescription,
    heroColor,
    leftArrowLink,
    rightArrowLink,
    xLink,
    heroName,
  } = props;

  const {
    containerRef,
    imageRef,
    distanceToBottom,
    handleImageLoad,
    imagesLoaded,
  } = useImageDistance();

  useKeyboardNavigation({
    leftArrowLink,
    rightArrowLink,
    xLink,
  });
  const { isMobileSize } = useIsMobileSize();
  const { isTabletSize } = useIsTabletSize();

  const maxHeight = isMobileSize
    ? distanceToBottom - 35
    : distanceToBottom - 50;

  const mobileModCss: Mods = {
    [cls.isMobile]: isMobileSize,
  };

  const tabletModCss: Mods = {
    [cls.isTablet]: isTabletSize,
  };

  return (
    <div className={cls.PageWrapper}>
      <div className={cls.backgroundImageWrapper}>
        <Image
          src={groupBg}
          alt='Background Image'
          quality={100}
          className={cls.backgroundImage}
          style={{ backgroundColor: heroColor }}
          priority={true}
        />
      </div>
      <div className={cls.componentWrapper}>
        <Link
          className={classNames(cls.outerLeftArrow, mobileModCss, [
            cls.outerArrow,
          ])}
          href={leftArrowLink}>
          <Image src={leftArrow} alt='leftArrow' />
        </Link>

        <div
          className={classNames(
            cls.heroImgSideWrapper,
            mobileModCss,
            tabletModCss,
          )}>
          <Image
            className={cls.heroImgSide}
            src={heroImg}
            alt='hero'
            ref={imageRef}
            onLoad={handleImageLoad}
            priority={true}
          />
        </div>

        <div
          className={classNames(
            cls.containerWrapper,
            mobileModCss,
            tabletModCss,
          )}>
          <div className={cls.container} ref={containerRef}>
            <Image
              className={cls.bgImg}
              src={bgBox}
              alt='hero'
              width={400}
              height={400}
              onLoad={handleImageLoad}
              priority={true}
            />
            <div className={cls.contentWrapper}>
              <div className={cls.content}>
                <div
                  className={classNames(
                    cls.heroName,
                    mobileModCss,
                    tabletModCss,
                  )}>
                  <h2>{heroName}</h2>
                </div>
                <div
                  className={classNames(
                    cls.xLinkButton,
                    mobileModCss,
                    tabletModCss,
                  )}>
                  <Link href={xLink}>
                    <h1>X</h1>
                  </Link>
                </div>
                <div
                  className={classNames(
                    cls.heroImgWrapper,
                    mobileModCss,
                    tabletModCss,
                  )}
                  style={{ backgroundColor: heroColor }}>
                  <Link
                    className={classNames(cls.innerLeftArrow, mobileModCss, [
                      cls.innerArrow,
                    ])}
                    href={leftArrowLink}>
                    <Image src={leftArrow} alt='leftArrow' />
                  </Link>

                  <Image
                    quality={100}
                    className={classNames(
                      cls.heroImg,
                      mobileModCss,
                      tabletModCss,
                    )}
                    src={isMobileSize ? heroImg : heroGif}
                    alt='hero'
                    width={500}
                    height={500}
                    ref={imageRef}
                    onLoad={handleImageLoad}
                    priority={true}
                  />

                  <Link
                    className={classNames(cls.innerRightArrow, mobileModCss, [
                      cls.innerArrow,
                    ])}
                    href={rightArrowLink}>
                    <Image src={rightArrow} alt='rightArrow' />
                  </Link>
                </div>
                <div className={cls.heroDescription} style={{ maxHeight }}>
                  <p>
                    {/*todo delete after testing*/}
                    {heroDescription}
                    {heroDescription}
                    {heroDescription}
                    {heroDescription}
                    {heroDescription}
                    {heroDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          className={classNames(cls.outerRightArrow, mobileModCss, [
            cls.outerArrow,
          ])}
          href={rightArrowLink}>
          <Image src={rightArrow} alt='rightArrow' />
        </Link>
      </div>
    </div>
  );
};

export default HeroContainer;
