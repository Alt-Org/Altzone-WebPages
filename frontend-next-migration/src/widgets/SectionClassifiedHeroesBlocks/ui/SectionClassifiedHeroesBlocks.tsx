'use client';
import { HeroCard, heroes } from "@/entities/Hero";
import cls from "./SectionClassifiedHeroesBlocks.module.scss";
import { useInView } from "react-intersection-observer";
import { useClientTranslation } from "@/shared/i18n";
import { useParams } from "next/navigation";
import Image from "next/image";

type Props = {
    backgroundImageSrc?: string;
    group: string;
    textBgColor?: string;
};

const SectionClassifiedHeroesBlocks = (props: Props) => {
    const { backgroundImageSrc, group, textBgColor } = props;

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
            <div className={cls.Content}>
                <div className={cls.Group}>
                    <h1>{group}</h1>
                    {textBgColor && (
                        <Image src={textBgColor} alt="Background Text Color" className={cls.TextBgImage}/>
                    )}
                    {/* <button>see more</button> */}
                </div>

                {heroes
                    .filter(hero => hero.group === group)
                    .slice(0, 2)
                    .map((item, index) => (
                        <HeroCard
                            className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
                            key={item.title}
                            id={item.title}
                            imageSrc={item.srcImg}
                            imageAlt={item.alt}
                            backgroundColor={item.color}
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default SectionClassifiedHeroesBlocks;
