'use client'
import cls from "./HeroContainer.module.scss";
import Image from "next/image";
import Link from "next/link";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import { AppRoutesLinks, RoutePaths } from "@/shared/appLinks/RoutePaths";
import infoBg from "@/shared/assets/images/heros/hero-container/info-bg.svg";
import rightArrow from "@/shared/assets/images/heros/hero-container/right-arrow.png";
import leftArrow from "@/shared/assets/images/heros/hero-container/left-arrow.png";
import {useEffect} from "react";
import {useRouter} from "next/navigation";



type Props = {
    heroImg: any,
    heroGif: any,
    heroImgAlt: string,
    heroName: string,
    borderColor: string,
    heroDescription: string,
    leftArrowLink: any,
    rightArrowLink: any
    xLink: any
}

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
        heroGif
    } = props;

    const { isMobileSize } = useIsMobileSize();

    const router = useRouter()

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.keyCode === 37) {
                router.push(leftArrowLink);
            }
            else if (event.keyCode === 39) {
                router.push(rightArrowLink);
            }
            else if (event.keyCode === 27) {
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
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
            </div>

            <div className={cls.Content}>
                <Link className={cls.LeftArrow} href={leftArrowLink}>
                    <Image src={leftArrow} alt="leftArrow"/>
                    {/* <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 179 158" width="179" height="158"><defs>
                   <image  width="164" height="142" id="img1" href="data:image/png;base64,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"/></defs>
                   <style>{"fill: " + borderColor}</style> 
                   <use  href="#img1" x="7" y="4"/></svg> */}
                </Link>
                {!isMobileSize && (
                    <Image src={heroImg} alt={heroImgAlt} className={cls.HeroImg} />
                )}
                <div className={cls.HeroInfoDiv}>
                    <Image src={infoBg} alt="infoBg" className={cls.InfoBgImg}/>


                    <div className={cls.HeroInfoHeader}>
                        <hr></hr>
                        <h2 >{heroName}</h2>
                        <hr></hr>
                    </div>
                    <Link href={xLink} className={cls.XButton}>
                        <h1>X</h1>
                    </Link>
                    <div className={cls.HeroInfoMain}>
                        {!isMobileSize && (
                            <Image src={heroGif} alt="imagePlaceholder" className={cls.InfoImg}/>
                        )}
                        {isMobileSize && (
                            <Image src={heroImg} alt="imagePlaceholder" className={cls.InfoImgMobile}/>
                        )}
                        <p className={cls.description}>{heroDescription}</p>
                    </div>
                </div>
                <Link className={cls.RightArrow} href={rightArrowLink}>
                {/*<Link className={cls.RightArrow} href={RoutePaths.HEROES_ONE.replace(":id", onRightClick.toString())}>*/}
                    <Image src={rightArrow} alt="rightArrow"/>
                    {/* <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 158" width="184" height="158"><defs>
                    <image  width="169" height="142" id="img1" href="data:image/png;base64,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"/></defs>
                    <style>{"fill: " + borderColor}</style> 
                    <use  href="#img1" x="8" y="4"/></svg> */}
                </Link>
            </div>
        </section>
    );
};

export default HeroContainer;
