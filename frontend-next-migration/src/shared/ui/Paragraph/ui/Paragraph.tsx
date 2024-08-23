import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Paragraph.module.scss";


type Props = {
    className?: string;
    title?: string,
    text?: string,
    footer?: string;
}

/**
 * Paragraph component that renders a title, text, and footer if provided.
 *
 * @param {Object} props The properties object.
 * @param {string} [props.className] Additional className for the component.
 * @param {string} [props.title] The title text.
 * @param {string} [props.text] The main text content.
 * @param {string} [props.footer] The footer text.
 *
 * @example
 * <Paragraph
 *   className="custom-class"
 *   title="Hello World"
 *   text="This is a paragraph."
 *   footer="Footer text here."
 * />
 */
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
