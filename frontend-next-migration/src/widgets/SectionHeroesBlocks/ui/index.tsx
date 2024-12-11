'use client';
import { useInView } from 'react-intersection-observer';
import { HeroManager } from '@/entities/Hero';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import HeroesBlocks from './heroesBlocks/HeroesBlocks';
import cls from './main.module.scss';
import { Container } from '@/shared/ui/Container';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

const sameBg = undefined;

export type Props = {
    title: string;
    seeMoreLink?: {
        href: string;
        text: string;
    };
    maxHeroesPerGroup?: number;
    maxGroupsPerPage?: number;
};

function Main(props: Props) {
    const { title, seeMoreLink, maxHeroesPerGroup = 100, maxGroupsPerPage = 100 } = props;

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

    const displayedGroups = maxGroupsPerPage
        ? heroesGroups2.slice(0, maxGroupsPerPage)
        : heroesGroups2;

    return (
        <Container fluid={true}>
            <section className={cls.Section}>
                <h2 className={cls.Header}>{title}</h2>

                {displayedGroups.map((group) => (
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
                            <AppLink to={seeMoreLink.href}>{seeMoreLink.text}</AppLink>
                        </Button>
                    </div>
                )}
            </section>
        </Container>
    );
}

export default Main;
