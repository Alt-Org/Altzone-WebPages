'use client'
import cls from "./HeroContainer.module.scss"
import Image from "next/image";
import Link from "next/link";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import { AppRoutesLinks, RoutePaths } from "@/shared/appLinks/RoutePaths";


type Props = {
    heroImg: any, //imageType
    heroImgAlt: string,
    heroName: string,
    heroDescription: string,
    onRightClick: any,
    onLeftClick: any

}

const HeroContainer = (props: Props) => {

    const {
        heroImg,
        heroImgAlt,
        heroName,
        heroDescription,
        onRightClick,
        onLeftClick
    } = props;

    const { isMobileSize } = useIsMobileSize();

    return (
        <section className={cls.HeroContainer}>
            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
            </div>

            <div className={cls.Content}>


                <Link className={cls.LeftArrow} href={RoutePaths[AppRoutesLinks.HEROES].replace(":id", onLeftClick.toString())}> 
                <p>{onLeftClick}</p>
                </Link>

                <Image src={heroImg} alt={heroImgAlt} className={cls.HeroImg} />
                <div className={cls.HeroInfoDiv}>
                    <div className={cls.HeroInfoHeader}>
                        <h1>{heroName}</h1>
                        {/* the X svg or what ever it is here */}
                        <h2>X</h2>
                    </div>
                    <div className={cls.HeroInfoMain}>
                        <video src="#"></video>
                        <p>{heroDescription}</p>
                    </div>
                </div>
                <Link className={cls.RightArrow} href={RoutePaths[AppRoutesLinks.HEROES].replace(":id", onRightClick.toString())}> 
                <p>{onRightClick}</p>
                </Link>
            </div>
        </section>
    );

};

export default HeroContainer;