import cls from './main.module.scss';


import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import green from "@/shared/assets/images/heros/textBgColors/green.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import lightBlue from "@/shared/assets/images/heros/textBgColors/light-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import purple from "@/shared/assets/images/heros/textBgColors/purple.webp";
import HeroesBlocks from '../heroesBlocks';
// import {SectionClassifiedHeroesBlocks} from "@/widgets/SectionClassifiedHeroesBlocks";


const sameBg = undefined;


function Main ()  {
    return (
        <section className={cls.Section}>
            <HeroesBlocks
                backgroundImageSrc={sameBg}
                group="TORJUJAT // RETROFLEKTIO"
                textBgColor={red}
            />

            <HeroesBlocks
                backgroundImageSrc={sameBg}
                group="SULAUTUJAT // KONFLUENSSI"
                textBgColor={pink}
            />

            <HeroesBlocks
                backgroundImageSrc={sameBg}
                group="ÄLYLLISTÄJÄT // EGOTISMI"
                textBgColor={darkBlue}
            />

            <HeroesBlocks
                backgroundImageSrc={sameBg}
                group="PEILAAJAT // PROJEKTIO"
                textBgColor={orange}
            />
        </section>
    );
}


export default Main;