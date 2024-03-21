import HeroContainer from "@/shared/ui/HeroContainer/HeroContainer";
import Heroes from "../../../widgets/SectionHeroes2/model/heroes"; // Importa el archivo de héroes

type Props = {
    selectedHero: number;
}

export default function HeroPage(props: Props){
    const {
        selectedHero
    } = props;

    
    function findSelectedHero() {
        const selectedHeroData = Heroes.find(hero => hero.id === selectedHero);
        return selectedHeroData ? {
            img: selectedHeroData.src,
            alt: selectedHeroData.alt,
            title: selectedHeroData.title,
            description: selectedHeroData.description
        } : null;
    }

   
    function calculateNextIndex(currentIndex: number): number {
        return currentIndex === Heroes.length ? 1 : currentIndex + 1;
    }

    
    function calculatePreviousIndex(currentIndex: number): number {
        return currentIndex === 1 ? Heroes.length : currentIndex - 1;
    }

    const selectedHeroInfo = findSelectedHero();
    const nextIndex = calculateNextIndex(selectedHero);
    const previousIndex = calculatePreviousIndex(selectedHero);

    return (
        <>
            {selectedHeroInfo && (
                <HeroContainer
                    heroImg={selectedHeroInfo.img}
                    heroImgAlt={selectedHeroInfo.alt}
                    heroName={selectedHeroInfo.title}
                    heroDescription={selectedHeroInfo.description}
                    onRightClick={nextIndex}
                    onLeftClick={previousIndex}
                />
            )}
        </>
    );
}
