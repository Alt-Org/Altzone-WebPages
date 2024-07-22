'use client'
import cls from "./GetToKnowComics.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import Image from "next/image";
import bookImg from "@/shared/assets/images/mainpage/book.webp";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { memo } from "react";
import { useInView } from "react-intersection-observer";

type ButtonParams = {
    href: string;
    innerText: string;
}

export type Props = {
    buttonParams: ButtonParams;
    backgroundImageSrc?: string;
    title: string;
}

const GetToKnowComics = memo((props: Props) => {
    const {
        buttonParams,
        backgroundImageSrc,
        title
    } = props;
    const { href, innerText } = buttonParams;

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
            className={classNames(cls.GetToKnow, mods)}
            style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none' }}
        >
            <h2 className={classNames(cls.title, mods)}>
                {title}
            </h2>
            <Image src={bookImg} alt={"section-get-to-know-book-image"} className={classNames(cls.centeredImage, mods)} />
            <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXL} className={classNames(cls.button, mods)}>
                <Link href={href}>
                    {innerText}
                </Link>
            </Button>
        </section>
    );
})

GetToKnowComics.displayName = "GetToKnowComics";

export default GetToKnowComics;

