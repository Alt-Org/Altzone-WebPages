import {classNames} from "@/shared/lib/classNames/classNames";
import {FC, memo, ReactNode} from "react";
import cls from "./Card.module.scss";
import {AppLink} from "@/shared/ui/AppLink/AppLink";

/**
 * Module containing a React CardTheme component with customizable themes, sizes, and square styling.
 * @module Card
 */
export enum CardTheme {
    PRIMARY = "",
}

/**
 * Props for the Card component.
 * {Object} CardProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {CardTheme} [theme=CardTheme.PRIMARY] - Theme for the Card.
 * @property {ReactNode} children - The content of the Card.
 *
 * @example
 * <Card className="customClass" theme={CardTheme.PRIMARY}>
 *    <Card.Title>Title</Card.Title>
 *    <Card.Body>Body</Card.Body>
 *    <Card.Date>2023-10-01</Card.Date>
 *    <Card.ReadMoreLink path="/details" withScalableLink>
 *        Read More
 *    </Card.ReadMoreLink>
 * </Card>
 */
interface CardProps {
    className?: string;
    theme?: CardTheme;
    children: ReactNode;
}

interface CardCompoundProps {
    className?: string;
    children: ReactNode;
}

interface ReadMoreLinkProps extends CardCompoundProps {
    path: string;
    isExternal?: boolean;
    withScalableLink?: boolean;
}

/**
 * Card component with composable subcomponents.
 * @component
 *
 * @example
 * <Card className="customClass" theme={CardTheme.PRIMARY}>
 *    <Card.Title>Title</Card.Title>
 *    <Card.Body>Body</Card.Body>
 *    <Card.Date>2023-10-01</Card.Date>
 *    <Card.ReadMoreLink path="/details" withScalableLink>
 *        Read More
 *    </Card.ReadMoreLink>
 * </Card>
 */
interface CardComponent extends FC<CardProps> {
    Title: FC<CardCompoundProps>;
    Body: FC<CardCompoundProps>;
    Date: FC<CardCompoundProps>;
    ReadMoreLink: FC<ReadMoreLinkProps>;
}

const Card: CardComponent = (props: CardProps) => {
    const {
        className = "",
        theme = CardTheme.PRIMARY,
        children
    } = props;
    return (
        <div
            className={classNames(cls.Card, {}, [className, cls[theme]])}
        >
            {children}
        </div>
    );
};

/**
 * Card.Title component for the Card.
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <Card.Title className="customTitleClass">Card Title</Card.Title>
 */
const CardTitle = memo(({children, className = ''}: CardCompoundProps) => {
    return <h2 className={classNames(cls.Title, {}, [className])}>{children}</h2>;
});

CardTitle.displayName = "CardTitle";

/**
 * Card.Body component for the Card.
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <Card.Body className="customBodyClass">Card Body</Card.Body>
 */
const CardBody = memo(({children, className = ''}: CardCompoundProps) => {
    return <p className={classNames(cls.Body, {}, [className])}>{children}</p>;
});

CardBody.displayName = "CardBody";

/**
 * Card.Date component for the Card.
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <Card.Date className="customDateClass">2023-10-01</Card.Date>
 */
const CardDate = memo(({children, className = ''}: CardCompoundProps) => {
    return <h2 className={classNames(cls.Date, {}, [className])}>{children}</h2>;
});

CardDate.displayName = "CardDate";

/**
 * Card.ReadMoreLink component for the Card.
 * @component
 * @param {ReadMoreLinkProps} props - Props for the component.
 *
 * @example
 * <Card.ReadMoreLink path="/details" className="customLinkClass" withScalableLink>
 *    Read More
 * </Card.ReadMoreLink>
 */
const ReadMoreLink = memo((props: ReadMoreLinkProps) => {
    const {children, className = '', path, isExternal = false, withScalableLink = false} = props;
    const mods: Record<string, boolean> = {
        [cls.withScalableLink]: withScalableLink,
    } as Record<string, boolean>;
    return (
        <AppLink to={path} isExternal={isExternal}>
            <h2 className={classNames(cls.ReadMoreLink, mods, [className])}>{children}</h2>
        </AppLink>
    )
});

ReadMoreLink.displayName = "card-ReadMoreLink";

Card.Title = CardTitle;
Card.Body = CardBody;
Card.Date = CardDate;
Card.ReadMoreLink = ReadMoreLink;

export {Card};