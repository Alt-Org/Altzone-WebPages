import { FC, memo, ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './ModularCard.module.scss';

/**
 * Module containing a React CardTheme component with customizable themes, sizes, and square styling.
 * @module Card
 */
export enum ModularCardTheme {
    PRIMARY = '',
    TITLEIMAGE = 'TitleImageCard',
    NEWSIMAGE = 'NewsImageCard',
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
    theme?: ModularCardTheme;
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

/* 
a
a
a
a
a
a
a
a
*/
const ModularCard = (props: CardProps) => {
    const { className = '', theme = ModularCardTheme.PRIMARY, children } = props;
    return <div className={classNames(cls.Card, {}, [className, cls[theme]])}>{children}</div>;
};

const ModularCardContent = memo((props: CardProps) => {
    const { className = '', theme = ModularCardTheme.PRIMARY, children } = props;
    return (
        <div className={classNames(cls.ModularCardBase, {}, [className, cls[theme]])}>
            {children}
        </div>
    );
});

ModularCardContent.displayName = 'ModularCardContent';

const ModularCardContainer = memo((props: CardProps) => {
    const { className = '', theme = ModularCardTheme.PRIMARY, children } = props;
    return (
        <div className={classNames(cls.ModularCardContainer, {}, [className, cls[theme]])}>
            {children}
        </div>
    );
});

ModularCardContainer.displayName = 'ModularCardContainer';

const ModularCardTitle = memo((props: CardProps) => {
    const { className = '', theme = ModularCardTheme.PRIMARY, children } = props;
    return (
        <div className={classNames(cls.ModularCardTitle, {}, [className, cls[theme]])}>
            <h2>{children}</h2>
        </div>
    );
});

ModularCardTitle.displayName = 'ModularCardTitle';

const ModularCardBody = memo((props: CardProps) => {
    const { className = '', theme = ModularCardTheme.PRIMARY, children } = props;
    return (
        <div className={classNames(cls.ModularCardBody, {}, [className, cls[theme]])}>
            <p>{children}</p>
        </div>
    );
});

ModularCardBody.displayName = 'ModularCardBody';

const ModularCardFooter = memo((props: CardProps) => {
    const { className = '', theme = ModularCardTheme.PRIMARY, children } = props;
    return (
        <div className={classNames(cls.ModularCardFooter, {}, [className, cls[theme]])}>
            <p>{children}</p>
        </div>
    );
});

ModularCardFooter.displayName = 'ModularCardFooter';

const ModularCardImage = memo(
    (props: {
        className: string;
        theme: ModularCardTheme;
        // children: ReactNode;
        alt: string;
        src: StaticImageData | string;
    }) => {
        const { className = '', theme = ModularCardTheme.PRIMARY, alt, src } = props;
        return (
            <Image
                className={classNames(cls.ModularCardImage, {}, [className, cls[theme]])}
                src={src}
                alt={alt}
            />
        );
    },
);

ModularCardImage.displayName = 'ModularCardImage';

const ModularCardImageTriangle = memo((props: any) => {
    const { className = '', theme = ModularCardTheme.PRIMARY } = props;
    return (
        <span className={classNames(cls.ModularCardImageTriangle, {}, [className, cls[theme]])} />
    );
});

ModularCardImageTriangle.displayName = 'ModularCardImageTriangle';

/* 
a
a
a
a
a
a
a
a
*/
export {
    ModularCardContent,
    ModularCardContainer,
    ModularCardTitle,
    ModularCardBody,
    ModularCardFooter,
    ModularCardImage,
    ModularCardImageTriangle,
};
/**
 * Card.Title component for the Card.
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <Card.Title className="customTitleClass">Card Title</Card.Title>
 */

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
    const { children, className = '', path, isExternal = false, withScalableLink = false } = props;
    const mods: Record<string, boolean> = {
        [cls.withScalableLink]: withScalableLink,
    } as Record<string, boolean>;
    return (
        <AppLink
            to={path}
            isExternal={isExternal}
        >
            <h2 className={classNames(cls.ReadMoreLink, mods, [className])}>{children}</h2>
        </AppLink>
    );
});

ReadMoreLink.displayName = 'card-ReadMoreLink';

// Card.Title = CardTitle;
// Card.Body = CardBody;
// Card.Date = CardDate;
// Card.ReadMoreLink = ReadMoreLink;

export { ModularCard };
