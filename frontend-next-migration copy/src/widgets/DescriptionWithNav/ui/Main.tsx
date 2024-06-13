'use client';
import React, { memo } from "react";
import { useParams } from "next/navigation";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Main.module.scss";
import { useClientTranslation } from "@/shared/i18n";
import Image from "next/image";
import greenHaired from "@/shared/assets/images/heros/hannu-hodari/ahmatti.webp"
import { Container } from "@/shared/ui/Container";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import { Paragraph } from "@/shared/ui/Paragraph";



interface descriptionProps {
    className?: string;
    // lng: string;
    backgroundImageSrc? : string
}

export const Main = ({ className = '' , backgroundImageSrc}: descriptionProps) => {

    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "description-with-nav");

    const { isMobileSize } = useIsMobileSize();

    return (
        <section
            className= {classNames(cls.Main, {}, [className])}
            style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none' }}
        >

            <Container className={cls.container}>
                <div className={cls.TopBlock}>
                    {!isMobileSize && (
                        <Image src={greenHaired} alt={"greenHaired hero"} className={cls.Image} />
                    )}
                    <div className={cls.description}>
                        <Paragraph
                            title={t("title")}
                            text={t("text")}
                        />
                    </div>
                </div>
            </Container>


        </section>)
};


Main.displayName = "DescriptionWithNav-main";


