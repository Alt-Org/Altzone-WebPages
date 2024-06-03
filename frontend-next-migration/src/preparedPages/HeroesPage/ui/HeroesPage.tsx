'use client'
import {HeroContainer} from "@/entities/Hero";
import {heroes} from "@/entities/Hero";
import {useParams} from "next/navigation";
import {useClientTranslation} from "@/shared/i18n";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

type Props = {
    selectedHero: string;
}

export default function HeroPage(props: Props){
    const {
        selectedHero
    } = props;

    const {lng} = useParams();
    const { t } = useClientTranslation(lng as string, "heroes");


    
    function findSelectedHero() {
        const selectedHeroData = heroes.find(hero => hero.title === selectedHero);
        return selectedHeroData ? {
            id: selectedHeroData.id,
            img: selectedHeroData.srcImg,
            title:  t(`${selectedHeroData.title}`),
            alt: t(`${selectedHeroData.alt}`),
            // alt: selectedHeroData.alt,
            description: t(`${selectedHeroData.description}`),
            // description: selectedHeroData.description,
            borderColor: selectedHeroData.borderColor,
            imgGif: selectedHeroData?.srcGif || undefined
        } : null;
    }

   
    function calculateNextIndex(currentIndex: number): string {
        const nextIndex = currentIndex === heroes.length - 1 ? 0 : currentIndex + 1;
        return heroes[nextIndex].title;
    }

    
    function calculatePreviousIndex(currentIndex: number): string {
        const previousIndex = currentIndex === 0 ? heroes.length - 1 : currentIndex - 1;
        return heroes[previousIndex].title;
    }

    const selectedHeroInfo = findSelectedHero();
    const previousIndex = calculatePreviousIndex(selectedHeroInfo?.id || 0);
    const nextIndex = calculateNextIndex(selectedHeroInfo?.id || 0); 


    const leftArrowLink = `/${lng}/${RoutePaths.HEROES_ONE.replace(":id", previousIndex.toString())}`
    const rightArrowLink = `/${lng}/${RoutePaths.HEROES_ONE.replace(":id", nextIndex.toString())}`

    return (
        <>
            {selectedHeroInfo && (
                <HeroContainer
                    heroImg={selectedHeroInfo.img}
                    heroImgAlt={selectedHeroInfo.alt}
                    heroName={selectedHeroInfo.title}
                    heroDescription={selectedHeroInfo.description}
                    leftArrowLink={leftArrowLink}
                    rightArrowLink={rightArrowLink}
                    borderColor={selectedHeroInfo.borderColor}
                    heroGif={selectedHeroInfo.imgGif}
                    xLink={RoutePaths.MAIN}
                />
            )}
        </>
    );
}



