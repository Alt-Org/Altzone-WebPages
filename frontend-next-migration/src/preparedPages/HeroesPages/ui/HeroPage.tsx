'use client';
import { HeroNavMenuAsDropdown } from '@/features/NavigateHeroes';
import { HeroContainer, HeroWithGroup } from '@/entities/Hero';
import { getRouteAllHeroesPage } from '@/shared/appLinks/RoutePaths';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Container } from '@/shared/ui/Container';
import cls from './HeroPage.module.scss';

export interface Props {
    newSelectedHero: HeroWithGroup;
    prevHeroLink: string;
    nextHeroLink: string;
}

const HeroPage = (props: Props) => {
    const { prevHeroLink, nextHeroLink, newSelectedHero } = props;

    const { isMobileSize } = useSizes();

    const navbarOnMobile = isMobileSize;

    return (
        <Container
            as={'main'}
            fluid={true}
            className={cls.main}
        >
            {navbarOnMobile && <HeroNavMenuAsDropdown className={cls.dropDown} />}

            <HeroContainer
                groupLabel={newSelectedHero.groupLabel}
                groupName={newSelectedHero.groupName}
                heroBgColor={newSelectedHero.groupBgColour}
                heroDescription={newSelectedHero.description}
                heroGif={newSelectedHero.srcGif}
                heroImg={newSelectedHero.srcImg}
                heroTitle={newSelectedHero.title}
                leftArrowLink={prevHeroLink}
                rightArrowLink={nextHeroLink}
                xLink={getRouteAllHeroesPage()}
            />
        </Container>
    );
};

export default HeroPage;
