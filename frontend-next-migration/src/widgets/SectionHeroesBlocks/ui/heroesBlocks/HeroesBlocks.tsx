'use client';
import { StaticImageData } from 'next/image';
import { useInView } from 'react-intersection-observer';
import { HeroCard, Hero, HeroGroupLabel } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import cls from './HeroesBlocks.module.scss';

type Props = {
    backgroundImageSrc?: string;
    labelText: string;
    label: StaticImageData | string;
    heroes: Hero[];
    groupBgColor: string;
};

const HeroesBlocks = (props: Props) => {
    const { heroes, backgroundImageSrc, labelText, label, groupBgColor } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const { t } = useClientTranslation('heroes');

    return (
        <div
            className={cls.SectionHeroes2}
            style={{
                backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none',
            }}
            ref={ref}
        >
            <div className={cls.Content}>
                <HeroGroupLabel
                    labelText={labelText}
                    label={label}
                    className={cls.Group}
                    labelTextClassName={cls.labelTextClassName}
                />

                {heroes.map((item) => (
                    <HeroCard
                        className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
                        key={item.title}
                        slug={item.slug}
                        id={item.title}
                        title={t(item.title)}
                        imageSrc={item.srcImg}
                        imageAlt={item.alt}
                        backgroundColor={groupBgColor}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroesBlocks;
