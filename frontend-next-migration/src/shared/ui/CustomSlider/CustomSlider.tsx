import cls from "./CustomSlider.module.scss";
import {ReactNode, useRef} from "react";
import {classNames} from "@/shared/lib/classNames/classNames";

type Props = {
    className?: string;
    children: ReactNode
}

export const CustomSlider = ({className='', children}: Props) => {

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

    return (
        <div className={classNames(cls.CustomSlider, {}, [className])}>


            <div className={cls.scrollLeft} onClick={handleScrollLeft}>
                <i>{'←'}</i>
            </div>

            <div className={classNames(cls.Cards, {}, [])} ref={scrollRef}>
                <div className={cls.CardContainer}>{children}</div>
            </div>


            <div className={cls.scrollRight} onClick={handleScrollRight}>
                <i>{'→'}</i>
            </div>

        </div>
    )

}