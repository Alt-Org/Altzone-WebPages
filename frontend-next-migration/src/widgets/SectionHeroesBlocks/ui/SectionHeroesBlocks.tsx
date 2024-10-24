'use client';
import { useInView } from 'react-intersection-observer';
import { HeroCard, HeroManager } from '@/entities/Hero';
import { useClientTranslation } from '@/shared/i18n';
import cls from './SectionHeroesBlocks.module.scss';

type Props = {
    backgroundImageSrc?: string;
};

const SectionHeroes2 = (props: Props) => {
    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);

    const tempHeroes = heroManager.getAllHeroes();

    const { backgroundImageSrc } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    return (
        <section
            className={cls.SectionHeroes2}
            style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none' }}
            ref={ref}
        >
            <div
                className={cls.Content}
                ref={ref}
            >
                {tempHeroes?.map((item) => (
                    <HeroCard
                        title={''}
                        className={`${cls.HeroCard} ${inView ? cls.Visible : ''}`}
                        key={item.title}
                        slug={item.slug}
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
