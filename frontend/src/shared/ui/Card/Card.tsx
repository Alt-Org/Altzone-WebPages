import { classNames } from "@/shared/lib/classNames/classNames";
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
 * @typedef {Object} CardProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {CardTheme} [theme=CardTheme.PRIMARY] - Theme for the Card.
 */
interface CardProps  {
    className?: string;
    theme?: CardTheme;
    children: ReactNode;
}

interface CardCompoundProps{
    className?: string;
    children: ReactNode;
}

interface ReadMoreLinkProps extends CardCompoundProps{
    path: string;
    isExternal? : boolean;
    withScalableLink? : boolean;
}


interface CardComponent extends FC<CardProps> {
    Title: FC<CardCompoundProps>;
    Body:  FC<CardCompoundProps>;
    Date:  FC<CardCompoundProps>;
    ReadMoreLink:  FC<ReadMoreLinkProps>;
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

const CardTitle = memo(({ children, className= ''}: CardCompoundProps) => {
    return <h2 className={classNames(cls.Title, {}, [className])}>{children}</h2>;
});

const CardBody = memo( ({ children, className= ''}: CardCompoundProps) => {
    return <p className={classNames(cls.Body, {}, [className])}>{children}</p>;
});

const CardDate = memo( ({ children, className= ''}: CardCompoundProps) => {
    return <h2 className={classNames(cls.Date, {}, [className])}>{children}</h2>;
});

const ReadMoreLink = memo( (props: ReadMoreLinkProps) => {
   const { children, className= '', path , isExternal = false , withScalableLink = false} = props;
    const mods: Record<string, boolean> = {
        [cls.withScalableLink] : withScalableLink,
    } as Record<string, boolean>;
    return (
        <AppLink to={path} isExternal={isExternal} >
            <h2 className={classNames(cls.ReadMoreLink, mods, [className])}>{children}</h2>
        </AppLink>
    )
});


Card.Title = CardTitle;
Card.Body = CardBody;
Card.Date = CardDate;
Card.ReadMoreLink = ReadMoreLink;

export { Card };