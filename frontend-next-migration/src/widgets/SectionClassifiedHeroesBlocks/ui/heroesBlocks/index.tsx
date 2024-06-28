'use client';
import { HeroCard, heroes } from '@/entities/Hero';
import cls from './heroesBlocks.module.scss';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

type Props = {
  backgroundImageSrc?: string;
  group: string;
  textBgColor?: any;
};

const HeroesBlocks = (props: Props) => {
  const { backgroundImageSrc, group, textBgColor } = props;

  const { ref, inView } = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: true,
  });

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
          {/*<Image*/}
          {/*  src={textBgColor}*/}
          {/*  alt='Background Text Color'*/}
          {/*  className={cls.TextBgImage}*/}
          {/*/>*/}
            <h1
                className={cls.Title}
                style={{backgroundImage: `url(${textBgColor.src})`}}
            >
              <span>
                  {/*PEILAAJAT*/}
                  {/*<wbr/> // <wbr/>*/}
                  {/*PROJEKTIO*/}

                  {group}

              </span>

            </h1>

        </div>

          {heroes
              .filter((hero) => hero.group === group)
          .slice(0, 2)
          .map((item, index) => (
            <HeroCard
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
    </div>
  );
};

export default HeroesBlocks;
