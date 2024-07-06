import cls from "./GetToKnowComics.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames";
import Image from "next/image";
import bookImg from "@/shared/assets/images/mainpage/book.webp";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { memo } from "react";


type ButtonParams = {
    href: string;
    innerText: string;
}

type Props = {
    buttonParams: ButtonParams;
    backgroundImageSrc? : string
    title: string;
}

const GetToKnowComics = memo((props: Props) => {

    const {
        buttonParams,
        backgroundImageSrc,
        title
    } = props;
    const { href, innerText } = buttonParams;

    return (
        <section
            className={classNames(cls.GetToKnow)}
            style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none' }}
        >

            <h2 className={cls.title}>
                {title}
            </h2>

            <Image src={bookImg} alt={"section-get-to-know-book-image"} className={cls.centeredImage} />

            <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXL} className={cls.button}>
                <Link href={href} >
                    {innerText}
                </Link>
            </Button>
            

        </section>
    );
})

export default GetToKnowComics;
