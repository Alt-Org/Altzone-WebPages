import cls from "./NewsCards.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useRef} from "react";
import {NewsCard} from "../NewsCard/NewsCard";
import {INewsElement} from "@/entities/News";

interface NewsCardProps{
    className?: string;
    news: INewsElement[]
}

export const NewsCards = memo(({className='', news}: NewsCardProps) => {
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

            {news.map(item=>(
                <NewsCard  bodyLength={200} key={item.id} title={item.title} bodyPreview={item.bodyPreview} date={item.date} id={item.id}/>
            ))}
        </div>

            <div className={cls.scrollRight} onClick={handleScrollRight}>
                <i>{'→'}</i>
            </div>

        </div>
    )
})
