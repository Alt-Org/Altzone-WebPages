'use client';
import {
    Hero,
    HeroContainer,
    HeroGroup,
    HeroManager,
    HeroSlug,
    HeroWithGroup,
} from '@/entities/Hero';
import { getRouteAllHeroesPage, getRouteOneHeroPage } from '@/shared/appLinks/RoutePaths';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import cls from './HeroPage.module.scss';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropdownItem,
} from '@/shared/ui/NavMenuWithDropdowns';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';

interface Props {
    newSelectedHero: HeroWithGroup;
    prevHeroLink: string;
    nextHeroLink: string;
}

const HeroPage = (props: Props) => {
    const { prevHeroLink, nextHeroLink, newSelectedHero } = props;

    const { isMobileSize } = useSizes();

    const navbarOnMobile = isMobileSize;
    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);

    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();
    const dropdownItems: DropdownItem[] = allHeroGroups.map((group) => ({
        title: group.name,
        openByDefault: false,
        elements: group.heroes.map((hero) => ({
            elementText: hero.title,
            id: hero.id.toString(),
            link: { path: getRouteOneHeroPage(hero.slug), isExternal: false },
        })),
    }));

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    return (
        <main className={cls.main}>
            {navbarOnMobile && (
                <NavMenuWithDropdowns
                    className={cls.dropDown}
                    {...navMenuWithDropdownsProps}
                />
            )}
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
        </main>
    );
};

export default withBackgroundImage<Props>({
    alt: 'Hero underground style background',
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG,
})(HeroPage);
