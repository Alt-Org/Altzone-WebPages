'use client'
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import { HeroCard, heroes } from "@/entities/Hero";
import cls from "./SectionHeroesBlocks.module.scss";
import {useInView} from "react-intersection-observer";

const SectionHeroes2 = () => {
    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true
    });

    return (
        <section
            className={cls.SectionHeroes2}
            style={{ backgroundImage: `url(${bgPicture})`}}
            ref={ref}
        >

            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture}
                       alt="Background" layout="fill"
                       objectFit="cover"/>
            </div>

            <div className={cls.Content} >
                {heroes.map((item, index) => (
                    <HeroCard
                        className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
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
