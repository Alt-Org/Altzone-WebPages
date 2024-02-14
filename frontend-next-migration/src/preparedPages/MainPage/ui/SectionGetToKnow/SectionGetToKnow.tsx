import cls from "./SectionGetToKnow.module.scss"
import {classNames} from "@/shared/lib/classNames/classNames";
import Image from "next/image";
import bookImg from "@/shared/assets/images/mainpage/book.webp";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";

type Props = {
    // lng: string
}

const  SectionGetToKnow = (props: Props) => {

    const {} = props;


    return (
        <div className={classNames(cls.GetToKnow)}>
            {/*<img src="your_image_url.jpg" alt="Your Image" className={cls.centeredImage}/>*/}
            <Image src={bookImg} alt={"section-get-to-know-book-image"} className={cls.centeredImage}/>

            <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXL} className={cls.button}>
                Check comics
            </Button>
        </div>
    );
}

export default SectionGetToKnow;