import cls from "./Main.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {NewsCards} from "../NewsCards/NewsCards";
import {Container} from "@/shared/ui/Container";

interface descriptionProps{
    className?: string;
}

export const Main = memo(({className=''}: descriptionProps) => {
    return(
        <div className={classNames(cls.Main, {},[className])}>
            <Container>
                <h2 className={cls.title}>LATEST NEWS</h2>
                <NewsCards/>
            </Container>
        </div>)
})


