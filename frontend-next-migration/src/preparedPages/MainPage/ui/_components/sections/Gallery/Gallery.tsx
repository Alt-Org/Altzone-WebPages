'use client'
import {useInView} from "react-intersection-observer";
import {Container} from "@/shared/ui/Container";
import {SectionGallery} from "@/widgets/SectionGallery";
import cls from "./Gallery.module.scss"
import {classNames} from "@/shared/lib/classNames/classNames";

export type Props = {
    title: string
    infoText: string
    socialsText: string
    seeMoreLink: {
        text: string
        href: string
    }
}

const Gallery = (props: Props) => {
    const { title, infoText, socialsText, seeMoreLink } = props

    const { ref, inView } = useInView({
        rootMargin: '-150px 0px',
        triggerOnce: true,
    });

    const mods = {
        [cls.inView]: inView
    }

    return (
        <section
            ref={ref}
            className={classNames(cls.SectionGallery, mods)}
        >
            <h2 className={classNames(cls.title, mods)}>
                {title}
            </h2>
            <Container className={cls.Container}>
                <SectionGallery
                    infoText={infoText}
                    socialsText={socialsText}
                    version="preview" 
                    seeMoreLink={seeMoreLink}
                />
            </Container>
        </section>
    )
}

export default Gallery