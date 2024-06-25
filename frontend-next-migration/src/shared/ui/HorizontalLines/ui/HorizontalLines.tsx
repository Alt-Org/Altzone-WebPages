import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./HorizontalLines.module.scss";

const HorizontalLines = () => {
    return (
        <div className={cls.horizontalLineDiv}>
            <hr className={classNames(cls.firstLine, {}, [cls.horizontalLine])}/>
            <hr className={classNames(cls.secondLine, {}, [cls.horizontalLine])}/>
        </div>

    );
};

export default HorizontalLines;
