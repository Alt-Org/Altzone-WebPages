import { StaticImageData } from 'next/image';
import { HeroContainer } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import cls from './HeroPage.module.scss';

type HeroData = {
    id: number;
    img: StaticImageData | string;
    title: string;
    alt: string;
    heroColor: string;
    description: string;
    borderColor: string;
    imgGif: StaticImageData | string;
    group: string;
    groupTextBg: string;
};

interface Props {
    selectedHero: HeroData;
    prevHeroLink: string;
    nextHeroLink: string;
}

const HeroPage = (props: Props) => {
    const { selectedHero, prevHeroLink, nextHeroLink } = props;

    return (
        <main className={cls.main}>
            <HeroContainer
                group={selectedHero.group}
                groupTextBg={selectedHero.groupTextBg}
                heroColor={selectedHero.heroColor}
                heroImg={selectedHero.img}
                heroName={selectedHero.title}
                heroDescription={selectedHero.description}
                leftArrowLink={prevHeroLink}
                rightArrowLink={nextHeroLink}
                heroGif={selectedHero.imgGif}
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
