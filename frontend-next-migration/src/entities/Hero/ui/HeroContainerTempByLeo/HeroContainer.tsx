'use client';
import Image from 'next/image';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import useSizes from '@/shared/lib/hooks/useSizes';
import HeroGroupLabel from '../HeroGroupLabel/HeroGroupLabel';
import ArrowButton from './components/ArrowButton';
import CloseButton from './components/CloseButton';
import { HeroCardTitle } from './components/HeroCardTitle';
import cls from './HeroContainer.module.scss';
import useKeyboardNavigation from './useKeyboardNavigation';

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
        group,
    } = props;

    useKeyboardNavigation({
        leftArrowLink,
        rightArrowLink,
        xLink,
    });

    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();

    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };

    return (
        <div className={classNames(cls.componentWrapper, combinedModCss)}>
            <ArrowButton
                direction="left"
                type="outer"
                href={leftArrowLink}
            />
            <div className={classNames(cls.heroImgSideWrapper, combinedModCss)}>
                <Image
                    className={cls.heroImgSide}
                    src={heroImg}
                    alt="hero"
                    priority={true}
                />
            </div>

            <div className={classNames(cls.containerWrapper, combinedModCss)}>
                <div className={classNames(cls.container, combinedModCss)}>
                    <div
                        className={classNames(cls.contentWrapper, combinedModCss)}
                        style={{
                            backgroundColor: heroColor,
                        }}
                    >
                        <div className={cls.content}>
                            <CloseButton
                                combinedModCss={combinedModCss}
                                href={xLink}
                            />
                            <HeroCardTitle
                                combinedModCss={combinedModCss}
                                title={heroName}
                            />
                            <div className={classNames(cls.heroImgWrapper, combinedModCss)}>
                                <ArrowButton
                                    direction="left"
                                    type="inner"
                                    href={leftArrowLink}
                                />
                                <Image
                                    quality={100}
                                    className={classNames(cls.heroImg, combinedModCss)}
                                    src={isMobileSize ? heroImg : heroGif}
                                    alt="hero"
                                    width={500}
                                    height={500}
                                    priority={true}
                                />
                                <ArrowButton
                                    direction="right"
                                    type="inner"
                                    href={rightArrowLink}
                                />
                            </div>
                            <div className={classNames(cls.heroDescription, combinedModCss)}>
                                {heroDescription}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cls.heroGroup}>
                    <HeroGroupLabel
                        className={cls.heroGroupLabel}
                        group={group}
                    />
                </div>
            </div>

            <ArrowButton
                direction="right"
                type="outer"
                href={rightArrowLink}
            />
        </div>
    );
};

export default HeroContainer;
