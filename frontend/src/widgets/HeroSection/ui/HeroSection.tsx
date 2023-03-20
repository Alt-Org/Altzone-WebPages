import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, ReactNode} from "react";
import cls from "./HeroSection.module.scss";
import backgroundImage from '@/shared/assets/images/introBackground.avif';

interface HeroSectionProps {
    className?: string;
    children? : ReactNode
}

export const HeroSection = memo((props : HeroSectionProps) => {

    const {
        className = '',
        children
    } = props;


    const mods: Record<string, boolean> = {
    } as Record<string, boolean>;

    return (
        <section className={classNames(cls.HeroSection, mods, [className])} style={{backgroundImage : `url(${backgroundImage})`}}>
            <div className={classNames(cls.childrenWrapper)}>
                {children}
            </div>
        </section>
    );
});
