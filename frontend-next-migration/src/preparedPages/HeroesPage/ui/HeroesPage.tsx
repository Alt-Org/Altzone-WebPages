import HeroContainer from "@/shared/ui/HeroContainer/HeroContainer";
import Heroes from "../../../features/HeroesInfo/model/heroes";

type Props = {
    selectedHero: string;
}

export default function HeroPage(props: Props){
    const {
        selectedHero
    } = props;

    
    function findSelectedHero() {
        const selectedHeroData = Heroes.find(hero => hero.title === selectedHero);
        return selectedHeroData ? {
            id: selectedHeroData.id,
            img: selectedHeroData.src,
            alt: selectedHeroData.alt,
            description: selectedHeroData.description,
            borderColor: selectedHeroData.borderColor
        } : null;
    }

   
    function calculateNextIndex(currentIndex: number): string {
        const nextIndex = currentIndex === Heroes.length - 1 ? 0 : currentIndex + 1;
        return Heroes[nextIndex].title;
    }

    
    function calculatePreviousIndex(currentIndex: number): string {
        const previousIndex = currentIndex === 0 ? Heroes.length - 1 : currentIndex - 1;
        return Heroes[previousIndex].title;
    }

    const selectedHeroInfo = findSelectedHero();
    const nextIndex = calculateNextIndex(selectedHeroInfo?.id || 0); 
    const previousIndex = calculatePreviousIndex(selectedHeroInfo?.id || 0); 

    return (
        <>
            {selectedHeroInfo && (
                <HeroContainer
                    heroImg={selectedHeroInfo.img}
                    heroImgAlt={selectedHeroInfo.alt}
                    heroName={selectedHero}
                    heroDescription={selectedHeroInfo.description}
                    onRightClick={nextIndex}
                    onLeftClick={previousIndex}
                    borderColor={selectedHeroInfo.borderColor}
                />
            )}
        </>
    );
}



