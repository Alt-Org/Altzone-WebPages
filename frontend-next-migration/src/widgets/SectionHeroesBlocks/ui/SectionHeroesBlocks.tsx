import cls from "./SectionHeroesBlocks.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import { HeroCard, heroes } from "@/entities/Hero";

type Props = {

}

const SectionHeroes2 = (props: Props) => {

    const {

    } = props;


    return (
        <section
            className={cls.SectionHeroes2}
            style={{ backgroundImage: `url(${bgPicture})`}}
        >

            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture}
                       alt="Background" layout="fill"
                       objectFit="cover"/>
            </div>

            <div className={cls.Content}>
                {heroes.map((item, index) => (
                    <HeroCard
                        className={cls.HeroCard}
                        key={item.title}
                        id={item.title}
                        imageSrc={item.src}
                        imageAlt={item.alt}
                    />
                ))}
            </div>
        </section>
    );
};

export default SectionHeroes2;