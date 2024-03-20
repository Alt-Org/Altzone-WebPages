import cls from "./SectionHeroes2.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import Heroes from "../model/heroes";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import Link from "next/link";
import { SectionHero2 } from "@/widgets/SectionHero2";

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
                    <SectionHero2
                        id={item.id}
                        imageSrc={item.src}
                        imageAlt={item.alt}
                    />

                ))}

            </div>

            <div className={cls.horizonalLines}>
                <HorizontalLines />
            </div>
        </section>

    );
};

export default SectionHeroes2;