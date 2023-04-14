import cls from "./NewsCards.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useRef} from "react";
import {NewsCard} from "../NewsCard/NewsCard";
import {mockNews} from "@/widgets/NewsSection/model/data/mockNews";


interface NewsCardProps{
    className?: string;
}

export const NewsCards = memo(({className=''}: NewsCardProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 3000,
                behavior: 'smooth'
            });
        }
    };

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -3000,
                behavior: 'smooth'
            });
        }
    };

    return(
        <div className={cls.CardsWrapper}>

            <div className={cls.scrollLeft} onClick={handleScrollLeft}>
                <i>{'←'}</i>
            </div>


        <div className={classNames(cls.Cards, {},[className])} ref={scrollRef}>

            {mockNews.map(item=>(
                <NewsCard  bodyLength={200} key={item.readMoreLink.path} title={item.title} body={item.body} date={item.date} readMoreLink={item.readMoreLink}/>
            ))}
        </div>

            <div className={cls.scrollRight} onClick={handleScrollRight}>
                <i>{'→'}</i>
            </div>

        </div>
    )
})
