import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./HorizontalLines.module.scss";

const HorizontalLines = () => {
    return (
        <div className={classNames(cls.horizontalLineDiv)}>
            <hr className={classNames(cls.horizontalLine)} />
            <hr className={classNames(cls.horizontalLine)} />
        </div>
    );
};

export default HorizontalLines;
