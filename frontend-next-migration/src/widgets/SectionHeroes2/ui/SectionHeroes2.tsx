import cls from "./SectionHeroes2.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import Heroes from "../model/heroes";
import green from "@/shared/assets/images/heros/green-haired/green-haired.webp";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import Link from "next/link";

type Props = {

}

const SectionHeroes2 = (props: Props) => {

    const {

    } = props;


    return (
        <section className={cls.SectionHeroes2}>

            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
            </div>
            <div className={cls.Content}>
                {Heroes.map((item) => (
                    <div className={cls.Border}>
                        <Link href={"#"} key={item.id} className={cls.HeroDiv}>
                            <Image src={green} alt={item.alt} className={cls.HeroImg} />
                        </Link>
                    </div>
                        
                ))}

            </div>

            <div className={cls.horizonalLines}>
                <HorizontalLines />
            </div>
        </section>

    );
};

export default SectionHeroes2;