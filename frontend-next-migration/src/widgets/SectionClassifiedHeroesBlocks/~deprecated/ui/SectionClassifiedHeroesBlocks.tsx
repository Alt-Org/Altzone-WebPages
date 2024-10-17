'use client'
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { HeroCard, heroes } from "@/entities/Hero";
import cls from "./SectionClassifiedHeroesBlocks.module.scss";

type Props = {
  backgroundImageSrc?: string;
  group: string;
  textBgColor?: any;
  // id: number;
  // srcImg: string;
  // srcGif: string;
  // alt: string;
  // title: string;
  // borderColor: string;
  // description: string;
  // color: string;
};
/**
 * @deprecated
 **/
const SectionClassifiedHeroesBlocks = (props: Props) => {
  const { backgroundImageSrc, group, textBgColor } = props;

  const { ref, inView } = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: true,
  });

  return (
    <section
      className={cls.SectionHeroes2}
      style={{
        backgroundImage: backgroundImageSrc
          ? `url(${backgroundImageSrc})`
          : 'none',
      }}
      ref={ref}>
      <div className={cls.Content}>
        <div className={cls.Group}>
          <h1>{group}</h1>
          {textBgColor && (
            <Image
              src={textBgColor}
              alt='Background Text Color'
              className={cls.TextBgImage}
            />
          )}
          {/* <button>see more</button> */}
        </div>

        {heroes
          .filter((hero) => hero.group === group)
          .slice(0, 2)
          .map((item) => (
            <HeroCard
                title={""}
              className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
              key={item.title}
              id={item.title}
              imageSrc={item.srcImg}
              imageAlt={item.alt}
              backgroundColor={item.color}
              // group={item.group}
            />
          ))}
      </div>
    </section>
  );
};

export default SectionClassifiedHeroesBlocks;
