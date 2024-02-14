'use client';
import {memo} from "react";
import {useParams} from "next/navigation";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./Main.module.scss";
import {Navs} from "../../model/data/navs";
import {NavElements} from "../NavElements/NavElements";
import {useClientTranslation} from "@/shared/i18n";
import Image from "next/image";
import greenHaired from "@/shared/assets/images/heros/green-haired/green-haired.webp"


interface descriptionProps{
    className?: string;
    // lng: string;
}

export const Main = memo( ({className=''}: descriptionProps) => {

    const params = useParams();
    const lng = params.lng as string;
    const {t} =  useClientTranslation(lng, "description-with-nav");

    return(
        <div className={classNames(cls.Main, {}, [className])}>


            <div className={cls.TopBlock}>
                <Image src={greenHaired} alt={"greenHaired hero"} className={cls.Image} width={300}/>


                <div className={cls.description}>
                    <h2>{t("title")}</h2>
                    <p>{t("text")}</p>
                </div>

            </div>


            <NavElements navElems={Navs} className={cls.navElements}/>

        </div>)
});


Main.displayName = "DescriptionWithNav-main";


