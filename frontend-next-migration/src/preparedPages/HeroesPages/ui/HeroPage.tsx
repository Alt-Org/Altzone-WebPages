import { HeroContainer, HeroWithGroup } from '@/entities/Hero';
import { getRouteAllHeroesPage, RoutePaths } from '@/shared/appLinks/RoutePaths';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import cls from './HeroPage.module.scss';
import { LayoutWithSidebars } from '@/shared/ui/Layouts';
import { NavMenuWithDropdowns, NavMenuWithDropdownsProps } from '@/shared/ui/NavMenuWithDropdowns';

interface Props {
    newSelectedHero: HeroWithGroup;
    prevHeroLink: string;
    nextHeroLink: string;
}

const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
    title: 'Forum',
    openByDefault: true,
    dropdownItems: [
        {
            title: 'Heroes',
            openByDefault: false,
            elements: [
                // links can be used as well, just add the "link" to object
                {
                    elementText: 'Hero 1',
                    id: 'hero1',
                    link: { path: RoutePaths.HEROES, isExternal: false },
                },
                { elementText: 'Hero 2', id: 'hero2' },
            ],
        },
    ],
};

const HeroPage = (props: Props) => {
    const { prevHeroLink, nextHeroLink, newSelectedHero } = props;

    return (
        // <LayoutWithSidebars
        //     leftTopSidebar={{
        //         component: (
        //             <div style={{ width: '100%', maxWidth: '600px' }}>
        //                 <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
        //             </div>
        //         ),
        //     }}
        // >
        <main className={cls.main}>
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
        // </LayoutWithSidebars>
    );
};

export default withBackgroundImage<Props>({
    alt: 'Hero underground style background',
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG,
})(HeroPage);
