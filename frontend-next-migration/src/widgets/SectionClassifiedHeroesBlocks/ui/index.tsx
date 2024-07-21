'use client'
import cls from './main.module.scss';


import red from "@/shared/assets/images/heros/textBgColors/red.webp";
import darkBlue from "@/shared/assets/images/heros/textBgColors/dark-blue.webp";
import orange from "@/shared/assets/images/heros/textBgColors/orange.webp";
import pink from "@/shared/assets/images/heros/textBgColors/pink.webp";
import HeroesBlocks from './heroesBlocks/heroesBlocks';
import {heroes} from "@/entities/Hero";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button";
import Link from "next/link";
import {useInView} from "react-intersection-observer";
import clsx from "clsx";
import {classNames} from "@/shared/lib/classNames/classNames";


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


    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView
    }
    // @ts-ignore
    return (
        <section className={cls.Section} >
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
            <div ref={ref} className={cls.buttonContainer}>
                <Button withScalableLink={true} theme={ButtonTheme.Graffiti} className={classNames(cls.SeeMore, mods)} size={ButtonSize.XL} ref={ref} >
                    <Link href={seeMoreLink.href}>
                        {seeMoreLink.text}
                    </Link>
                </Button>
            </div>


        </section>
    );
}



export default Main;