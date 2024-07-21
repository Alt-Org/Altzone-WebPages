import cls from './main.module.scss';


import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import HeroesBlocks from './heroesBlocks/heroesBlocks';
import {heroes} from "@/entities/Hero";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button";
import Link from "next/link";


const sameBg = undefined;


export type Props = {
    title: string;
    seeMoreLink: {
        href: string,
        text: string,
    }
}

function Main(props: Props) {

    const {
        title,
        seeMoreLink
    } = props;

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

            <Button withScalableLink={true} theme={ButtonTheme.Graffiti} className={cls.SeeMore} size={ButtonSize.XL}>
                <Link href={seeMoreLink.href}>
                    {seeMoreLink.text}
                </Link>
            </Button>

        </section>
    );
}



export default Main;