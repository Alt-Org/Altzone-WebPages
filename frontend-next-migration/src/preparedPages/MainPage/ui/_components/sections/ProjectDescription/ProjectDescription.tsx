'use client'
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./ProjectDescription.module.scss";
import Image from "next/image";
import greenHaired from "@/shared/assets/images/heros/hannu-hodari/ahmatti.webp"
import { Container } from "@/shared/ui/Container";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import { Paragraph } from "@/shared/ui/Paragraph";
import {useInView} from "react-intersection-observer";

interface Props {
    className?: string;
    title: string;
    description: string;
}

export type ProjectDescriptionProps = Omit<Props, 'className'>;

export const ProjectDescription = (props: Props) => {

    const {
        className= '',
        description,
        title
    } = props;

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView
    }

    const { isMobileSize } = useIsMobileSize();

    return (
        <section
            ref={ref}
            className= {classNames(cls.Section, mods, [className])}
            id="description"
        >
            <Container className={classNames(cls.Container, mods)}>
            <h2 className={cls.titleQuestion}>{title}</h2>
                <div className={classNames(cls.imageTextBlock, mods)}>
                    {!isMobileSize && (
                        <Image
                            src={greenHaired}
                            alt={"description hero"}
                            className={classNames(cls.Image,mods)} />
                    )}
                        <Paragraph
                            className={cls.description}
                            text={description}
                        />
                </div>
            </Container>
        </section>
    )};


