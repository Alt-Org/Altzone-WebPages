'use client'
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ProjectDescription.module.scss";
import Image from "next/image";
import greenHaired from "@/shared/assets/images/heros/hannu-hodari/ahmatti.webp"
import { Container } from "@/shared/ui/Container";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import { Paragraph } from "@/shared/ui/Paragraph";

interface descriptionProps {
    className?: string;
    title: string;
    description: string;
}

export const ProjectDescription = (props: descriptionProps) => {

    const {
        className= '',
        description,
        title
    } = props;

    const { isMobileSize } = useIsMobileSize();

    return (
        <section
            className= {classNames(cls.Section, {}, [className])}
        >
            <Container className={cls.Container}>
            <h2 className={cls.titleQuestion}>{title}</h2>
                <div className={cls.imageTextBlock}>
                    {!isMobileSize && (
                        <Image src={greenHaired} alt={"description hero"} className={cls.Image} />
                    )}
                        <Paragraph
                            className={cls.description}
                            text={description}
                        />
                </div>
            </Container>
        </section>
    )};


