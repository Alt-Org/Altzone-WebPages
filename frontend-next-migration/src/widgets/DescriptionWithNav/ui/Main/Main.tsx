'use client'
import cls from "./Main.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {Navs} from "../../model/data/navs";
import {NavElements} from "../NavElements/NavElements";
import {useClientTranslation} from "@/shared/i18n";
import {useParams} from "next/navigation";

interface descriptionProps{
    className?: string;
}

export const Main = memo(({className=''}: descriptionProps) => {

    const params = useParams();
    const lng = params.lng as string;
    const {t} =  useClientTranslation(lng, "description-with-nav");

    return(
        <div className={classNames(cls.Main, {},[className])}>
            <h2>{t("title")}</h2>
            <p>{t("text")}</p>
            <NavElements navElems={Navs} className={cls.navElements} />
        </div>)
});


Main.displayName = "DescriptionWithNav-main";


