'use client';
import { StaticImageData } from 'next/image';
import { useInView } from 'react-intersection-observer';
import { HeroCard, HeroWithGroup, HeroGroupLabel } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import cls from './HeroesBlocks.module.scss';

type Props = {
    backgroundImageSrc?: string;
    labelText: string;
    label: StaticImageData | string;
    heroes: any;
};

const HeroesBlocks = (props: Props) => {
    const { heroes, backgroundImageSrc, labelText, label } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const { t } = useClientTranslation('heroes');

    // // const filteredHeroes = useMemo(
    // //     () => heroes.filter((hero: { group: string }) => hero.group === group).slice(0, 2),
    // //     [group, heroes],
    // // );
    //
    // const filteredHeroes = heroes.slice(0, 2);

    return (
        <div
            className={cls.SectionHeroes2}
            style={{
                backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none',
            }}
            ref={ref}
        >
            <div className={cls.Content}>
                {/*<div className={cls.Group}>*/}
                {/*    <h3*/}
                {/*        className={cls.Title}*/}
                {/*        // @ts-ignore*/}
                {/*        style={{ backgroundImage: label}}*/}
                {/*        // style={{ backgroundImage: `url(${label.src})` }}*/}
                {/*    >*/}
                {/*        <span>{labelText}</span>*/}
                {/*    </h3>*/}
                {/*</div>*/}

                <HeroGroupLabel
                    labelText={labelText}
                    label={label}
                    className={cls.Group}
                />

                {heroes
                    // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
                    .map((item) => (
                        <HeroCard
                            className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
                            key={item.title}
                            slug={item.slug}
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
