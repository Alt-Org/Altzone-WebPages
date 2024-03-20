import cls from "./SectionHero2.module.scss"
import Image from "next/image";
import Link from "next/link";
import heroBorder from "@/shared/assets/images/heros/hero-border/hero-border.webp"

type Props = {
    id: number,
    imageSrc:any,
    imageAlt:string,

}

export const SectionHero2 = (props: Props) => {

    const {
        id,
        imageSrc,
        imageAlt
    } = props;


    return (

        <div className={cls.Border}>
            <Image src={heroBorder} alt="heroBorder" className={cls.HeroBorder}></Image>
            <Link href={"#"} className={cls.HeroDiv}>
                <Image src={imageSrc} alt={imageAlt} className={cls.HeroImg} />
            </Link>
        </div>

    );
};

SectionHero2.displayName = "SectionHero2";