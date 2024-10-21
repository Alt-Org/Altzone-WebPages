'use client';
import Image from 'next/image';
import Link from 'next/link';
import leftArrow from '@/shared/assets/images/heros/hero-container/leftArrow.svg';
import rightArrow from '@/shared/assets/images/heros/hero-container/rightArrow.svg';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './HeroContainer.module.scss';
import useKeyboardNavigation from './useKeyboardNavigation';

type Props = {
    heroImg: string;
    heroGif: string;
    heroName: string;
    heroDescription: string;
    heroColor: string;
    leftArrowLink: string;
    rightArrowLink: string;
    xLink: string;
    group: string;
    groupTextBg: string;
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
        // group,
        // groupTextBg,
    } = props;

    // const groupRef = useRef<HTMLDivElement>(null);

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
        <div className={cls.PageWrapper}>
            <div className={cls.backgroundImageWrapper} />
            <div className={classNames(cls.componentWrapper, combinedModCss)}>
                <Link
                    className={classNames(cls.outerLeftArrow, combinedModCss, [cls.outerArrow])}
                    href={leftArrowLink}
                >
                    <Image
                        src={leftArrow}
                        alt="leftArrow"
                    />
                </Link>

                <div className={classNames(cls.heroImgSideWrapper, combinedModCss)}>
                    <Image
                        className={cls.heroImgSide}
                        src={heroImg}
                        alt="hero"
                        priority={true}
                    />
                </div>

                <div className={classNames(cls.containerWrapper, combinedModCss)}>
                    <div className={cls.container}>
                        <div
                            className={classNames(cls.contentWrapper, combinedModCss)}
                            style={{
                                backgroundColor: heroColor,
                            }}
                        >
                            <div className={cls.content}>
                                <div className={classNames(cls.xLinkButton, combinedModCss)}>
                                    {' '}
                                    <Link href={xLink}>
                                        <Button theme={ButtonTheme.Graffiti}>
                                            <h5>X</h5>
                                        </Button>
                                    </Link>
                                </div>
                                <div className={classNames(cls.heroName, combinedModCss)}>
                                    <h1>{heroName}</h1>
                                </div>
                                <div className={classNames(cls.heroImgWrapper, combinedModCss)}>
                                    <Link
                                        className={classNames(cls.innerLeftArrow, combinedModCss, [
                                            cls.innerArrow,
                                        ])}
                                        href={leftArrowLink}
                                    >
                                        <Image
                                            src={leftArrow}
                                            alt="leftArrow"
                                        />
                                    </Link>
                                    <Image
                                        quality={100}
                                        className={classNames(cls.heroImg, combinedModCss)}
                                        src={isMobileSize ? heroImg : heroGif}
                                        alt="hero"
                                        width={500}
                                        height={500}
                                        priority={true}
                                    />

                                    <Link
                                        className={classNames(cls.innerRightArrow, combinedModCss, [
                                            cls.innerArrow,
                                        ])}
                                        href={rightArrowLink}
                                    >
                                        <Image
                                            src={rightArrow}
                                            alt="rightArrow"
                                        />
                                    </Link>
                                </div>
                                <div className={classNames(cls.heroDescription, combinedModCss)}>
                                    <h3>{heroDescription}</h3>
                                </div>
                            </div>
                        </div>
                        <div className={classNames(cls.groupName, combinedModCss)} />
                    </div>
                </div>

                <Link
                    className={classNames(cls.outerRightArrow, combinedModCss, [cls.outerArrow])}
                    href={rightArrowLink}
                >
                    <Image
                        src={rightArrow}
                        alt="rightArrow"
                    />
                </Link>
            </div>
        </div>
    );
};

export default HeroContainer;
