'use client'
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, ReactNode} from "react";
import cls from "./SectionHero.module.scss";
// import backgroundImage from '@/shared/assets/heroes.ts/introBackground.avif';
import {Container} from "@/shared/ui/Container/ui/Container";

interface HeroSectionProps {
    className?: string;
    children? : ReactNode;
    backgroundImageUrl?: string;
}

export const SectionHero = memo((props : HeroSectionProps) => {

    const {
        className = '',
        children,
        backgroundImageUrl
    } = props;


    const mods: Record<string, boolean> = {
    } as Record<string, boolean>;

    return (
        <section className={classNames(cls.HeroSection, mods, [className])} style={{backgroundImage : `url(${backgroundImageUrl})`}}>

            <div className={classNames(cls.childrenWrapper)}>
                <Container fluid>
                {children}
                </Container>
            </div>

        </section>
    );
});

SectionHero.displayName = "SectionHero";