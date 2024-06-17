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
import useSizes from '@/shared/lib/hooks/useSizes';

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

  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();

  const maxHeight = isMobileSize
    ? distanceToBottom - 35
    : distanceToBottom - 50;

  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
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
          className={classNames(cls.outerLeftArrow, combinedModCss, [
            cls.outerArrow,
          ])}
          href={leftArrowLink}>
          <Image src={leftArrow} alt='leftArrow' />
        </Link>

        <div className={classNames(cls.heroImgSideWrapper, combinedModCss)}>
          <Image
            className={cls.heroImgSide}
            src={heroImg}
            alt='hero'
            ref={imageRef}
            onLoad={handleImageLoad}
            priority={true}
          />
        </div>

        <div className={classNames(cls.containerWrapper, combinedModCss)}>
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
                <div className={classNames(cls.heroName, combinedModCss)}>
                  <h2>{heroName}</h2>
                </div>
                <div className={classNames(cls.xLinkButton, combinedModCss)}>
                  <Link href={xLink}>
                    <h1>X</h1>
                  </Link>
                </div>
                <div
                  className={classNames(cls.heroImgWrapper, combinedModCss)}
                  style={{ backgroundColor: heroColor }}>
                  <Link
                    className={classNames(cls.innerLeftArrow, combinedModCss, [
                      cls.innerArrow,
                    ])}
                    href={leftArrowLink}>
                    <Image src={leftArrow} alt='leftArrow' />
                  </Link>

                  <Image
                    quality={100}
                    className={classNames(cls.heroImg, combinedModCss)}
                    src={isMobileSize ? heroImg : heroGif}
                    alt='hero'
                    width={500}
                    height={500}
                    ref={imageRef}
                    onLoad={handleImageLoad}
                    priority={true}
                  />

                  <Link
                    className={classNames(cls.innerRightArrow, combinedModCss, [
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
          className={classNames(cls.outerRightArrow, combinedModCss, [
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
