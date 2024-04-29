'use client'
import cls from "./HeroCard.module.scss";
import Image from "next/image";
import { AppRoutesLinks, RoutePaths } from "@/shared/appLinks/RoutePaths";
import {ClickableBorder} from "@/shared/ui/ClickableBorder";
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {classNames} from "@/shared/lib/classNames/classNames";

type Props = {
    id: string,
    imageSrc: any,
    imageAlt: string,
    className?: string
};

export const HeroCard = (props: Props) => {
    const { id, imageSrc, imageAlt, className = "" } = props;

    return (
        <ClickableBorder
            borderImageSource={"/images/hero-border.webp"}
            className={classNames(cls.Wrapper, {}, [className])}
        >
        <div className={cls.HeroDiv}>
            <AppLink to={RoutePaths[AppRoutesLinks.HEROES].replace(":id", id.toString())}>
            <Image src={imageSrc} alt={imageAlt} className={cls.HeroImg} />
            </AppLink>
        </div>
        </ClickableBorder>
    );
};

HeroCard.displayName = "HeroCard";
