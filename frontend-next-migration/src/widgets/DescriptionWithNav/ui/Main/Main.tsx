import cls from "./Main.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {title,text} from "../../model/data/description";
import {Navs} from "../../model/data/navs";
import {NavElements} from "../NavElements/NavElements";

interface descriptionProps{
    className?: string;
}

export const Main = memo(({className=''}: descriptionProps) => {
    return(
        <div className={classNames(cls.Main, {},[className])}>
            <h2>{title}</h2>
            <p>{text}
            </p>
            <NavElements navElems={Navs} className={cls.navElements} />
        </div>)
});


Main.displayName = "DescriptionWithNav-main";


