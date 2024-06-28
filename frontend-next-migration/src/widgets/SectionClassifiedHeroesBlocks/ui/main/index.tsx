import cls from './main.module.scss';


import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import green from "@/shared/assets/images/heros/textBgColors/green.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import lightBlue from "@/shared/assets/images/heros/textBgColors/light-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import purple from "@/shared/assets/images/heros/textBgColors/purple.webp";
import SectionClassifiedHeroesBlocks from '../SectionClassifiedHeroesBlocks';
// import {SectionClassifiedHeroesBlocks} from "@/widgets/SectionClassifiedHeroesBlocks";


const sameBg = undefined;


function Main ()  {
    return (
        <>
            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="TORJUJAT // RETROFLEKTIO"
                textBgColor={red}
            />

            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="SULAUTUJAT // KONFLUENSSI"
                textBgColor={pink}
            />

            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="ÄLYLLISTÄJÄT // EGOTISMI"
                textBgColor={darkBlue}
            />

            <SectionClassifiedHeroesBlocks
                backgroundImageSrc={sameBg}
                group="PEILAAJAT // PROJEKTIO"
                textBgColor={orange}
            />
        </>
    );
}


export default Main;