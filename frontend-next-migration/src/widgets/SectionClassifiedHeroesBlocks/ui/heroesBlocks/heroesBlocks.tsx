'use client';
import { HeroCard} from '@/entities/Hero';
import cls from './heroesBlocks.module.scss';
import { useInView } from 'react-intersection-observer';
import {useMemo} from "react";
import {useClientTranslation} from "@/shared/i18n";

type Props = {
  backgroundImageSrc?: string;
  group: string;
  textBgColor?: any;
  heroes: any;
};

const HeroesBlocks = (props: Props) => {
  const {
      heroes,
      backgroundImageSrc,
      group,
      textBgColor
  } = props;

  const { ref, inView } = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: true,
  });

  const {t} = useClientTranslation("heroes");

  const filteredHeroes = useMemo(() => heroes
          .filter((hero: { group: string; }) => hero.group === group)
          .slice(0, 2)
      , [group, heroes]);


    return (
    <div
      className={cls.SectionHeroes2}
      style={{
        backgroundImage: backgroundImageSrc
          ? `url(${backgroundImageSrc})`
          : 'none',
      }}
      ref={ref}>
      <div className={cls.Content}>


        <div className={cls.Group}
        >
            <h3
                className={cls.Title}
                style={{backgroundImage: `url(${textBgColor.src})`}}
            >
              <span>
                  {group}
              </span>
            </h3>

        </div>

          {filteredHeroes
              // @ts-ignore
          .map((item) => (
            <HeroCard
              className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
              key={item.title}
              id={item.title}

              title={t(item.title)}

              imageSrc={item.srcImg}
              imageAlt={item.alt}
              backgroundColor={item.color}
              // group={item.group}
            />
          ))}
      </div>
    </div>
  );
};

export default HeroesBlocks;
