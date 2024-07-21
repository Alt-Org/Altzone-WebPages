import cls from './main.module.scss';


import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import green from "@/shared/assets/images/heros/textBgColors/green.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import lightBlue from "@/shared/assets/images/heros/textBgColors/light-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import purple from "@/shared/assets/images/heros/textBgColors/purple.webp";
import HeroesBlocks from './heroesBlocks/heroesBlocks';
import {heroes} from "@/entities/Hero";


const sameBg = undefined;


export type Props = {
    title: string;
}

function Main(props: Props) {

    const {title} = props;

    const heroGroups = [
        { group: "TORJUJAT // RETROFLEKTIO", textBgColor: red },
        { group: "SULAUTUJAT // KONFLUENSSI", textBgColor: pink },
        { group: "ÄLYLLISTÄJÄT // EGOTISMI", textBgColor: darkBlue },
        { group: "PEILAAJAT // PROJEKTIO", textBgColor: orange }
    ];

    return (
        <section className={cls.Section}>
            <h2 className={cls.Header}>
                {title}
            </h2>
            {heroGroups.map((group, index) => (
                <HeroesBlocks
                    key={index}
                    heroes={heroes}
                    backgroundImageSrc={sameBg}
                    group={group.group}
                    textBgColor={group.textBgColor}
                />
            ))}
        </section>
    );
}



export default Main;