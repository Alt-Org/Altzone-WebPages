'use client';
import React, { memo } from "react";
import { useParams } from "next/navigation";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Main.module.scss";
import { Navs } from "../../model/data/navs";
import { NavElements } from "../NavElements/NavElements";
import { useClientTranslation } from "@/shared/i18n";
import Image from "next/image";
import greenHaired from "@/shared/assets/images/heros/green-haired/green-haired.webp"
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import { Container } from "@/shared/ui/Container";
import { HorizontalLines } from "@/widgets/HorizontalLines";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";



interface descriptionProps {
    className?: string;
    // lng: string;
}

export const Main = memo(({ className = '' }: descriptionProps) => {

    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "description-with-nav");

    const {isMobileSize} = useIsMobileSize();



    return (
        <div className={classNames(cls.Main, {}, [className])}>

            <Container className={cls.container}>

                <div className={cls.backgroundImageWrapper}>
                    <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
                </div>

                <div className={cls.TopBlock}>
                    {!isMobileSize && (
                        <Image src={greenHaired} alt={"greenHaired hero"} className={cls.Image} />
                    )}
                    <div className={cls.description}>
                        <h2>{t("title")}</h2>
                        <p>{t("text")}</p>
                    </div>
                </div>


                <NavElements navElems={Navs} className={cls.navElements} />

            </Container>
            <HorizontalLines />

        </div>)
});


Main.displayName = "DescriptionWithNav-main";


