'use client'
import bgBox from "@/shared/assets/images/heros/hero-container/readyContainer.png";
import Image from 'next/image';
import cls from "./HeroContainer.module.scss";
import Link from "next/link";
import leftArrow from "@/shared/assets/images/heros/hero-container/leftArrow.svg";
import rightArrow from "@/shared/assets/images/heros/hero-container/rightArrow.svg";
import {classNames} from "@/shared/lib/classNames/classNames";
import useImageDistance from "./useImageDistance";
import useKeyboardNavigation from "./useKeyboardNavigation";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";

type Props = {
    heroImg: string,
    heroGif: string,
    heroDescription: string,
    heroColor: string,
    leftArrowLink: string,
    rightArrowLink: string,
    xLink: string,
}

const HeroContainer = (props: Props) => {
    const {
        heroImg,
        heroGif,
        heroDescription,
        heroColor,
        leftArrowLink,
        rightArrowLink,
        xLink,
    } = props;

    const {
        containerRef,
        imageRef,
        distanceToBottom,
        handleImageLoad,
        imagesLoaded
    } = useImageDistance();

    useKeyboardNavigation(
        {
            leftArrowLink,
            rightArrowLink,
            xLink
        }
    );
    const {isMobileSize} = useIsMobileSize();

    const maxHeight = isMobileSize
        ?
        distanceToBottom - 35
        : distanceToBottom - 50;


    const mobileModCss = {
        [cls.isMobile]: isMobileSize
    }

    return (
        <div className={cls.PageWrapper}>
            <div className={cls.componentWrapper}>

                <Link className={classNames(cls.outerLeftArrow, mobileModCss, [cls.outerArrow])} href={leftArrowLink}>
                    <Image src={leftArrow} alt="leftArrow"
                    />
                </Link>


                <div className={classNames(cls.heroImgSideWrapper, mobileModCss)}>
                    <Image
                        className={cls.heroImgSide}
                        src={heroImg}
                        alt="hero"
                        ref={imageRef}
                        onLoad={handleImageLoad}
                    />
                </div>


                <div className={classNames(cls.containerWrapper, mobileModCss)}>
                    <div className={cls.container} ref={containerRef}>
                        <Image
                            className={cls.bgImg}
                            src={bgBox}
                            alt="hero"
                            width={400}
                            height={400}
                            onLoad={handleImageLoad}/>
                        <div className={cls.contentWrapper}>
                            <div className={cls.content}>
                                <div className={
                                    classNames(cls.heroImgWrapper,mobileModCss)
                                } style={{backgroundColor: heroColor}}>

                                    <Link className={classNames(cls.innerLeftArrow, mobileModCss, [cls.innerArrow])} href={leftArrowLink}>
                                        <Image src={leftArrow} alt="leftArrow"
                                        />
                                    </Link>

                                    <Image
                                        quality={100}
                                        className={classNames(cls.heroImg, mobileModCss)}
                                        src={
                                        isMobileSize
                                            ?
                                            heroImg
                                            :
                                            heroGif
                                    }
                                        alt="hero"
                                        width={500}
                                        height={500}
                                        ref={imageRef}
                                        onLoad={handleImageLoad}
                                    />

                                    <Link className={classNames(cls.innerRightArrow, mobileModCss, [cls.innerArrow])} href={rightArrowLink}>
                                        <Image src={rightArrow} alt="rightArrow"/>
                                    </Link>

                                </div>
                                <div className={cls.heroDescription} style={{maxHeight}}>
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

                <Link className={classNames(cls.outerRightArrow, mobileModCss, [cls.outerArrow])} href={rightArrowLink}>
                    <Image src={rightArrow} alt="leftArrow"
                    />
                </Link>

            </div>
        </div>
    )
};

export default HeroContainer;
