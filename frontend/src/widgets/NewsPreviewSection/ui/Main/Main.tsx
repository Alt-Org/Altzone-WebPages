import cls from "./Main.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo} from "react";
import {NewsCards} from "../NewsCards/NewsCards";
import {Container} from "@/shared/ui/Container";
import {mockNews} from "@/entities/News";

interface descriptionProps{
    className?: string;
}

export const Main = memo(({className=''}: descriptionProps) => {
    return(
        <div className={classNames(cls.Main, {},[className])}>
            <Container>
                <h2 className={cls.title}>Tuoreimmat uutiset</h2>
                <NewsCards news={mockNews}/>
            </Container>
        </div>)
})


