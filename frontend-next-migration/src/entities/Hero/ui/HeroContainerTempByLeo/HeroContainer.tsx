'use client';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import leftArrow from '@/shared/assets/images/heros/hero-container/leftArrow.svg';
import rightArrow from '@/shared/assets/images/heros/hero-container/rightArrow.svg';
import useSizes from '@/shared/lib/hooks/useSizes';
import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import cls from './HeroContainer.module.scss';
import useKeyboardNavigation from './useKeyboardNavigation';

/**
 * group={selectedHero.group}
        groupTextBg={selectedHero.groupTextBg}
        heroColor={selectedHero.heroColor}
        heroImg={selectedHero.img}
        heroName={selectedHero.title}
        heroDescription={selectedHero.description}
        leftArrowLink={prevHeroLink}
        rightArrowLink={nextHeroLink}
        heroGif={selectedHero.imgGif}
        xLink={RoutePaths.HEROES}
 */
type Props = {
  group: string;
  groupTextBg: string;
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
    group
  } = props;

  useKeyboardNavigation({
    leftArrowLink,
    rightArrowLink,
    xLink,
  });

  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();

  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
  };

  return (
      <div className={classNames(cls.componentWrapper, combinedModCss)}>
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
            priority={true}
          />
        </div>

        <div className={classNames(cls.containerWrapper, combinedModCss)}>
          <div className={classNames(cls.container, combinedModCss)} >
            <div className={classNames(cls.contentWrapper, combinedModCss)}   style={{
              backgroundColor: heroColor,
            }}>
              <div className={cls.content}>
                <div className={classNames(cls.xLinkButton, combinedModCss)}>
                  {' '}
                  <Link href={xLink}>
                    <h1>X</h1>
                  </Link>
                </div>
                <div
                  className={classNames(cls.heroName, combinedModCss)}
                >
                  <h1>{heroName}</h1>
                </div>
                <div
                  className={classNames(cls.heroImgWrapper, combinedModCss)}
                >
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
                <div className={cls.heroDescription}>
                  <h3>{heroDescription}</h3>
                </div>
                <HeroGroupLabel heroType={HeroType.FIGHTER} />
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
  );
};

function convertHeroGroupToHeroType(group: string) {
  switch (group) {
    case 'TORJUJAT // RETROFLEKTIO':
      return HeroType.FIGHTER;
    case 'SULAUTUJAT // KONFLUENSSI':
      return HeroType.MERGER;
    case 'ÄLYLLISTÄJÄT // EGOTISMI':
      return HeroType.INTELLECTUAL;
    case 'PEILAAJAT // PROJEKTIO':
      return HeroType.MIRROR_LOOKER;
    default:
      return null;
  }
}


enum HeroType {
  FIGHTER = 'FIGHTER',
  MERGER = 'MERGER',
  INTELLECTUAL = 'INTELLECTUAL',
  MIRROR_LOOKER = 'MIRROR_LOOKER'
}
function defineHeroGroupLabelText(heroType: HeroType) {
  switch (heroType) {
    case 'FIGHTER':
      return 'TORJUJAT // RETROFLEKTIO';
    case 'MERGER':
      return 'SULAUTUJAT // KONFLUENSSI';
    case 'INTELLECTUAL':
      return 'ÄLYLLISTÄJÄT // EGOTISMI';
    case 'MIRROR_LOOKER':
      return 'PEILAAJAT // PROJEKTIO';
    default:
      return '';
  }
}
function defineHeroGroupLabelBg(heroType: HeroType) {
  switch (heroType) {
    case 'FIGHTER':
      return red;
    case 'MERGER':
      return pink;
    case 'INTELLECTUAL':
      return darkBlue;
    case 'MIRROR_LOOKER':
      return orange;
    default:
      return null;
  }
}

type HeroGroupLabelProps = Readonly<{
  heroType: HeroType
}>;
function HeroGroupLabel({heroType}: HeroGroupLabelProps) {
  const labelText = defineHeroGroupLabelText(heroType);
  const labelBg = defineHeroGroupLabelBg(heroType);

  return(
    <div className={`${cls.heroGroupLabel}`}>
      <h3
          className={cls.heroGroupLabelTitle}
          style={labelBg ? {backgroundImage: `url(${labelBg.src})`} : undefined} 
      >
        <span>{labelText}</span>
      </h3>
  </div>
  );
}

export default HeroContainer;
