'use client'
import cls from "./HeroContainer.module.scss"
import Image from "next/image";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";

type Props = {
    heroImg  : any, //imageType
    heroImgAlt: string,
    heroName: string,
    heroDescription: string,
    onRightClick : any,
    onLeftClick : any

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
            <div className={cls.Content}>
                <img src={heroImg} alt={heroImgAlt} />
                <div>
                    <div>
                        <h1>{heroName}</h1>
                        {/* the X svg or what ever it is here */}
                        <h2>X</h2> 
                    </div>
                    <div>
                        <video src="#"></video>
                        <p>{heroDescription}</p>
                    </div>
                </div>
            </div>
        </section>
    );

};

export default HeroContainer;