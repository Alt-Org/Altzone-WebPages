'use client'
import cls from "./HeroCard.module.scss";
import Image from "next/image";
import { AppRoutesLinks, RoutePaths } from "@/shared/appLinks/RoutePaths";
import {ClickableBorder} from "@/shared/ui/ClickableBorder";
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import {classNames} from "@/shared/lib/classNames/classNames";
import {useCallback, useRef} from "react";
import useResizeObserver, {ResizeCallback} from "@/shared/lib/hooks/useResizeObserver";
;


type Props = {
    id: string,
    imageSrc: any,
    imageAlt: string,
    className?: string
};


export const HeroCard = (props: Props) => {
    const { id, imageSrc, imageAlt, className = "" } = props;

    const elementRef = useRef(null);

    const handleCardSizeUpdate: ResizeCallback<HTMLDivElement> = useCallback((refCurrent) => {
        const width = refCurrent.clientWidth;
        refCurrent.style.setProperty("--cardWidthLocal", `${width}px`);
    }, []);

    useResizeObserver({elementRef, callback: handleCardSizeUpdate})

    return (
        <ClickableBorder
            ref={elementRef}
            // #todo ask designer to think more about the border image proportions , because currents cause difficulties , see more in the css file
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
