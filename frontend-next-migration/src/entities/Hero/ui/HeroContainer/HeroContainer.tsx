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
import useFontSizeAdjuster from '@/shared/lib/hooks/useFontSizeAdjuster';
import { useRef } from 'react';

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
    containerRef: imageDistanceContainerRef,
    imageRef,
    distanceToBottom,
    handleImageLoad,
    imagesLoaded,
  } = useImageDistance();

  const heroNameRef = useRef<HTMLDivElement>(null);
  const xLinkAdjustmentRef = useRef<HTMLDivElement>(null); // New reference for font size adjustment

  const adjustHeroNameFontSize = (
    element: HTMLElement,
    container: HTMLElement,
  ) => {
    const containerWidth = container.clientWidth;
    const maxFontSize = containerWidth * 0.04;
    const minFontSize = 7;
    element.style.fontSize = `${Math.max(minFontSize, maxFontSize)}px`;
  };

  useFontSizeAdjuster(
    [heroNameRef, xLinkAdjustmentRef],
    imageDistanceContainerRef,
    adjustHeroNameFontSize,
  );

  useKeyboardNavigation({
    leftArrowLink,
    rightArrowLink,
    xLink,
  });

  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();

  const getAdjustedMaxHeight = (
    distanceToBottom: number,
    isMobileSize: boolean,
    isTabletSize: boolean,
    isDesktopSize: boolean,
    isWidescreenSize: boolean,
  ) => {
    if (isMobileSize) {
      return distanceToBottom - 30;
    } else if (isTabletSize) {
      return distanceToBottom - 40;
    } else if (isDesktopSize) {
      return distanceToBottom - 50;
    } else if (isWidescreenSize) {
      return distanceToBottom - 60;
    } else {
      return distanceToBottom - 20;
    }
  };

  const maxHeight = getAdjustedMaxHeight(
    distanceToBottom,
    isMobileSize,
    isTabletSize,
    isDesktopSize,
    isWidescreenSize,
  );

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
          <div className={cls.container} ref={imageDistanceContainerRef}>
            <div
              className={classNames(cls.heroName, combinedModCss)}
              ref={heroNameRef}>
              <h2>{heroName}</h2>
            </div>
            <div
              className={classNames(cls.xLinkButton, combinedModCss)}
              ref={xLinkAdjustmentRef}>
              {' '}
              {/* Use the new adjustment reference */}
              <Link href={xLink}>
                <h1>X</h1>
              </Link>
            </div>
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
