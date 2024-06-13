'use client'
import { HeroCard, heroes } from "@/entities/Hero";
import cls from "./SectionHeroesBlocks.module.scss";
import {useInView} from "react-intersection-observer";
import {useClientTranslation} from "@/shared/i18n";
import {useParams} from "next/navigation";


type Props = {
    backgroundImageSrc? : string
}


const SectionHeroes2 = (props: Props) => {
    const {backgroundImageSrc} = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true
    });

    return (
        <section
            className={cls.SectionHeroes2}
            style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none' }}
            ref={ref}
        >
            <div className={cls.Content} ref={ref}>
                {heroes.map((item, index) => (
                    <HeroCard
                        className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
                        key={item.title}
                        id={item.title}
                        imageSrc={item.srcImg}
                        imageAlt={item.alt}
                    />
                ))}
            </div>
        </section>
    );
};

export default SectionHeroes2;



