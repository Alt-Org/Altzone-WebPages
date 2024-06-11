'use client'
import {RefObject, useEffect, useRef, useState} from 'react';
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
    heroDescription: string,
    heroColor: string,
    leftArrowLink: string,
    rightArrowLink: string,
    xLink: string,
}

const HeroContainer = (props: Props) => {
    const {
        heroImg,
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
        handleImageLoad
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
        distanceToBottom - 40
        : distanceToBottom - 50;

    return (
        <div className={cls.PageWrapper}>
            <div className={cls.componentWrapper}>

                <div className={classNames(cls.heroImgSideWrapper, {
                    [cls.isMobile]: isMobileSize
                })}>
                    <Image
                        className={cls.heroImgSide}
                        src={heroImg}
                        alt="hero"
                        // width={500}
                        // height={500}
                        ref={imageRef}
                        onLoad={handleImageLoad}
                    />
                </div>


                <div className={classNames(cls.containerWrapper, {
                    [cls.isMobile]: isMobileSize
                })}>
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
                                <div className={cls.heroImgWrapper} style={{backgroundColor: heroColor}}>

                                    <Link className={classNames(cls.innerLeftArrow, {}, [])} href={leftArrowLink}>
                                        <Image src={leftArrow} alt="leftArrow"
                                        />
                                    </Link>

                                    <Image
                                        quality={100}
                                        className={cls.heroImg}
                                        src={heroImg}
                                        alt="hero"
                                        width={500}
                                        height={500}
                                        ref={imageRef}
                                        onLoad={handleImageLoad}
                                    />

                                    <Link className={classNames(cls.innerRightArrow, {}, [])} href={rightArrowLink}>
                                        <Image src={rightArrow} alt="rightArrow"/>
                                    </Link>

                                </div>
                                {/*todo distance dif on mobile and pc*/}
                                <div className={cls.heroDescription} style={{maxHeight: maxHeight}}>
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
            </div>
        </div>
    )
};

export default HeroContainer;
