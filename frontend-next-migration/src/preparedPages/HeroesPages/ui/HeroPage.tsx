import { HeroContainer, HeroWithGroup } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import cls from './HeroPage.module.scss';

interface Props {
    newSelectedHero: HeroWithGroup;
    prevHeroLink: string;
    nextHeroLink: string;
}

const HeroPage = (props: Props) => {
    const { prevHeroLink, nextHeroLink, newSelectedHero } = props;

    return (
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
                xLink={RoutePaths.HEROES}
            />
        </main>
    );
};

export default withBackgroundImage<Props>({
    alt: 'Hero underground style background',
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG,
})(HeroPage);
