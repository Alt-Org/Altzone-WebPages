import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Paragraph.module.scss";


type Props = {
    className?: string;
    title?: string,
    text?: string,
    footer?: string;
}

const Paragraph = (props: Props) => {
    const {
        className="",
        title, 
        text ,
        footer
    } = props;

    return (
        <div className={classNames(cls.Paragraph, {}, [className])}>
            {title && <h2>{title}</h2>}
            {text && <p>{text}</p>}
            {footer && <h2>{footer}</h2>}
        </div>
    );
};

export default Paragraph;
