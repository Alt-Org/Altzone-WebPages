import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./HorizontalLines.module.scss";
import divider from "@/shared/assets/images/mainpage/divider.webp";
import Image from "next/image";

const HorizontalLines = () => {
    return (
        // <div className={classNames(cls.horizontalLineDiv)}>
        //     <hr className={classNames(cls.horizontalLine)} />
        //     <hr className={classNames(cls.horizontalLine)} />
        // </div>
        <div className={classNames(cls.horizontalLineDiv)}>
            <Image src={divider} alt ="divider" className={classNames(cls.DividerImg)}></Image>
        </div>
    );
};

export default HorizontalLines;
