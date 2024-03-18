import cls from "./SectionGetToKnowComics.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames";
import Image from "next/image";
import bookImg from "@/shared/assets/images/mainpage/book.webp";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import bgPicture from "@/shared/assets/images/mainpage/background.webp"
import Link from "next/link";
import { memo } from "react";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";


type ButtonParams = {
    href: string;
    innerText: string;
}

type Props = {
    buttonParams: ButtonParams
}

const SectionGetToKnowComics = memo((props: Props) => {

    const { buttonParams } = props;
    const { href, innerText } = buttonParams;

    return (
        <div className={classNames(cls.GetToKnow)}>

            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
            </div>
            <Image src={bookImg} alt={"section-get-to-know-book-image"} className={cls.centeredImage} />

            <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXL} className={cls.button}>
                <Link href={href} >
                    {innerText}
                </Link>
            </Button>
            <div className={cls.horizonalLines}>
                <HorizontalLines />
            </div>

        </div>
    );
})

export default SectionGetToKnowComics;