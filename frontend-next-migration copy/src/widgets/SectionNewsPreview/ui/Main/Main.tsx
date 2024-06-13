import cls from "./Main.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useMemo} from "react";
import {NewsCards} from "../NewsCards/NewsCards";
import {Container} from "@/shared/ui/Container";
import {newsDataLocally} from "@/entities/News";
import {sortPostsByDatesDesc} from "@/shared/ui/Post";

interface descriptionProps{
    className?: string;
}

export const Main = memo(({className=''}: descriptionProps) => {
    const sortedNews = useMemo(() => sortPostsByDatesDesc(newsDataLocally), []);
    return(
        <div className={classNames(cls.Main, {},[className])}>
            <Container>
                <h2 className={cls.title}>Tuoreimmat uutiset</h2>
                <NewsCards news={sortedNews}/>
            </Container>
        </div>)
})

Main.displayName = "NewsPreviewSectionMain";

