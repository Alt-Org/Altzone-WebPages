import { HeroContainer } from '@/entities/Hero';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { Navbar } from '@/widgets/Navbar';
import { Footer } from '@/widgets/Footer';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';

type HeroData = {
    id: number;
    img: string;
    title: string;
    alt: string;
    heroColor: string;
    description: string;
    borderColor: string;
    imgGif?: string;
    group?: string;
};

interface Props  {
    selectedHero: HeroData;
    prevHeroLink: string;
    nextHeroLink: string;
};

export default function HeroPage(props: Props) {

    const {
        selectedHero,
        prevHeroLink,
        nextHeroLink
         } = props;

    return (
        <>
            <HeroContainer
                heroColor={selectedHero.heroColor}
                heroImg={selectedHero.img}
                heroName={selectedHero.title}
                heroDescription={selectedHero.description}
                leftArrowLink={prevHeroLink}
                rightArrowLink={nextHeroLink}
                heroGif={selectedHero.imgGif as unknown as string}
                xLink={RoutePaths.HEROES}
            />
            <HorizontalLines />
        </>
    );
}
