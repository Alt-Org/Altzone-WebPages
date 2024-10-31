'use client';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { HeroManager } from '@/entities/Hero';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import HeroesBlocks from './heroesBlocks/HeroesBlocks';
import cls from './main.module.scss';

const sameBg = undefined;

export type Props = {
    title: string;
    seeMoreLink?: {
        href: string;
        text: string;
    };
    maxHeroesPerGroup?: number;
};

function Main(props: Props) {
    const { title, seeMoreLink, maxHeroesPerGroup = 100 } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView,
    };

    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);
    const heroesGroups2 = heroManager.getGroupsWithHeroesAsArray();

    return (
        <section className={cls.Section}>
            <h2 className={cls.Header}>{title}</h2>

            {heroesGroups2.map((group) => (
                <HeroesBlocks
                    key={group.name}
                    heroes={group.heroes.slice(0, maxHeroesPerGroup)}
                    backgroundImageSrc={sameBg}
                    label={group.label}
                    labelText={group.name}
                    groupBgColor={group.bgColour}
                />
            ))}
            {seeMoreLink && (
                <div
                    ref={ref}
                    className={cls.buttonContainer}
                >
                    <Button
                        withScalableLink={true}
                        theme={ButtonTheme.Graffiti}
                        className={classNames(cls.SeeMore, mods)}
                        size={ButtonSize.XL}
                        ref={ref}
                    >
                        <Link href={seeMoreLink.href}>{seeMoreLink.text}</Link>
                    </Button>
                </div>
            )}
        </section>
    );
}

export default Main;
