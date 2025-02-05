import {
    FC,
    memo,
    ReactNode,
    forwardRef,
    LegacyRef,
    HTMLAttributes,
    DetailedHTMLProps,
    ForwardRefExoticComponent,
    RefAttributes,
} from 'react';
import Image, { StaticImageData } from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './ModularCard.module.scss';

/**
 * Module containing a React CardTheme component with customizable themes, sizes, and square styling. (PRIMARY, TITLEIMAGE, NEWSCARD)
 * @module ModularCard
 */
export enum ModularCardTheme {
    PRIMARY = '',
    TITLEIMAGE = 'TitleImageCard',
    NEWSCARD = 'NewsImageCard',
}

/**
 * Props for the ModularCard component. Extends HTMLDivElement attributes.
 * {Object} ModularCardProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {CardTheme} [theme=CardTheme.PRIMARY] - Theme for the Card.
 * @property {string} [path] - Link address (optional).
 * @property {string} [isExternal=false] - If path is not in this server (optional).
 * @property {string} [withScalableLink] - Additional styling to link (optional).
 * @property {LegacyRef<HTMLDivElement>} [ref] - Reference to the card (optional)
 * @property {ReactNode} children - The content of the Card.
 */
interface ModularCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    theme?: ModularCardTheme;
    path?: string;
    isExternal?: boolean;
    withScalableLink?: boolean;
    ref?: LegacyRef<HTMLDivElement>;
    children: ReactNode;
}

interface CardCompoundProps {
    className?: string;
    children: ReactNode;
}

interface ModularCardImageProps {
    className?: string;
    alt: string;
    src: StaticImageData | string;
}

interface ModularCardTexts extends FC<CardCompoundProps> {
    Title: FC<CardCompoundProps>;
    Body: FC<CardCompoundProps>;
    Footnote: FC<CardCompoundProps>;
}

interface ModularCardImageSection extends FC<CardCompoundProps> {
    Image: FC<ModularCardImageProps>;
    Triangle: FC<{ className?: string }>;
}

interface ModularCardComponent
    extends ForwardRefExoticComponent<
        Omit<ModularCardProps, 'ref'> & RefAttributes<HTMLDivElement>
    > {
    Texts: ModularCardTexts;
    Image: ModularCardImageSection;
}

const ModularCardBase: any = forwardRef<HTMLDivElement, ModularCardProps>((props, ref) => {
    const {
        className = '',
        theme = ModularCardTheme.PRIMARY,
        path,
        isExternal = false,
        withScalableLink = false,
        children,
        ...otherProps
    } = props;
    const mods: Record<string, boolean> = {
        [cls.withScalableLink]: withScalableLink,
    };
    if (path) {
        return (
            <AppLink
                to={path}
                isExternal={isExternal}
            >
                <div
                    className={classNames(cls.Card, mods, [className, cls[theme]])}
                    ref={ref}
                    {...otherProps}
                >
                    {children}
                </div>
            </AppLink>
        );
    }
    return (
        <div
            className={classNames(cls.Card, mods, [className, cls[theme]])}
            ref={ref}
            {...otherProps}
        >
            {children}
        </div>
    );
});

ModularCardBase.displayName = 'modularcard';
/**
 * ModularCard.Texts.Title component for the ModularCard.
 * @module ModularCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <ModularCard.Texts.Title className="customTitleClass">Card Title</ModularCard.Texts.Title>
 */
const ModularCardTitle = memo((props: CardCompoundProps) => {
    const { children, className = '' } = props;

    return (
        <div className={classNames(cls.ModularCardTitle, {}, [className])}>
            <h2>{children}</h2>
        </div>
    );
});

ModularCardTitle.displayName = 'modularcard-Texts-Title';

/**
 * ModularCard.Texts.Body component for the ModularCard.
 * @module ModularCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <ModularCard.Texts.Body className="customBodyClass">Card Body</ModularCard.Texts.Body>
 */
const ModularCardBody = memo((props: CardCompoundProps) => {
    const { children, className = '' } = props;

    return (
        <div className={classNames(cls.ModularCardBody, {}, [className])}>
            <p>{children}</p>
        </div>
    );
});

ModularCardBody.displayName = 'modularcard-Texts-Body';

/**
 * ModularCard.Texts.Footnote component for the ModularCard.
 * @module ModularCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <ModularCard.Texts.Footnote className="customFootnoteClass">Card Footnote</ModularCard.Texts.Footnote>
 */
const ModularCardFootnote = memo((props: CardCompoundProps) => {
    const { children, className = '' } = props;

    return (
        <div className={classNames(cls.ModularCardFootnote, {}, [className])}>
            <p>{children}</p>
        </div>
    );
});

ModularCardFootnote.displayName = 'modularcard-Texts-Footnote';

/**
 * ModularCard.Image.Image component for displaying image in left side.
 * @module ModularCard
 * @component
 * @param {ModularCardImageProps} props - Props for the component.
 *
 * @example
 * <ModularCard.Image.Image
 *      className="customImageClass"
 *      src={image}
 *      alt="alt"
 * />
 */
const ModularCardImage = memo((props: ModularCardImageProps) => {
    const { className = '', alt, src } = props;

    return (
        <Image
            className={classNames(cls.ModularCardImage, {}, [className])}
            src={src}
            alt={alt}
        />
    );
});

ModularCardImage.displayName = 'modularcard-Image-Image';

/**
 * ModularCard.Image.Triangle component for the being in top of the image.
 * @module ModularCard
 * @component
 * @param {{className:string}} props - Props for the component.
 *
 * @example
 * <ModularCard.Image.Triangle /> // This is plced before the image is placed.
 * <ModularCard.Image.Image
 *      className="customImageClass"
 *      src={image}
 *      alt="alt"
 * />
 */
const ModularCardTriangle = memo((props: { className?: string }) => {
    const { className = '' } = props;

    return <span className={classNames(cls.ModularCardTriangle, {}, [className])} />;
});

ModularCardTriangle.displayName = 'modularcard-Image-Triangle';

/**
 * ModularCard.Texts component for the ModularCard.
 * @module ModularCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <ModularCard.Texts>
 *      <ModularCard.Title>Card title</ModularCard.Title>
 * <ModularCard.Texts/>
 */
const ModularCardTexts: ModularCardTexts = (props: CardCompoundProps) => {
    const { children, className = '' } = props;
    return <div className={classNames(cls.ModularCardTexts, {}, [className])}>{children}</div>;
};

/**
 * ModularCard.Image component for the ModularCard.
 * @module ModularCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <ModularCard.Image>
 *      <ModularCard.Image.Image
 *          className="customImageClass"
 *          src={image}
 *          alt="alt"
 *      />
 * <ModularCard.Image/>
 */
const ModularCardImageSection: ModularCardImageSection = (props: CardCompoundProps) => {
    const { children, className = '' } = props;
    return (
        <div className={classNames(cls.ModularCardImageSection, {}, [className])}>{children}</div>
    );
};

// ImageSection
ModularCardImageSection.Image = ModularCardImage;
ModularCardImageSection.Triangle = ModularCardTriangle;

// Texts
ModularCardTexts.Title = ModularCardTitle;
ModularCardTexts.Body = ModularCardBody;
ModularCardTexts.Footnote = ModularCardFootnote;

// Adding texts and imagesection to modularcard
ModularCardBase.Texts = ModularCardTexts;
ModularCardBase.Image = ModularCardImageSection;

/**
 * Card component with composable subcomponents.
 * @module ModularCard
 *
 * @example
 * // With TITLEIMAGE theme
 * <ModularCard
 *      className="customClass"
 *      theme={ModularCardTheme.TITLEIMAGE}
 *      path='/fi/page/details'
 *      isExternal={false}
 *      withScalableLink={true}
 * >
 *      <ModularCard.Texts>
 *          <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
 *      </ModularCard.Texts>
 *      <ModularCard.Image>
 *          <ModularCard.Image.Triangle />
 *          <ModularCard.Image.Image
 *              src={image}
 *              alt="alt"
 *          />
 *      </ModularCard.Image>
 * </ModularCard>
 * @example
 * // With NEWSCARD theme
 * <ModularCard
 *      className="customClass"
 *      theme={ModularCardTheme.NEWSCARD}
 *      onClick={onClickHandler} // When using this property, 'use client' is required in parent
 *      withScalableLink={true} // Can be used even without interactivity
 * >
 *      <ModularCard.Texts>
 *          <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
 *          <ModularCard.Texts.Body>Body</ModularCard.Texts.Body>
 *          <ModularCard.Texts.Footnote>Footnote</ModularCard.Texts.Footnote>
 *      </ModularCard.Texts>
 *      <ModularCard.Image>
 *          <ModularCard.Image.Triangle />
 *          <ModularCard.Image.Image
 *              src={image}
 *              alt="alt"
 *          />
 *      </ModularCard.Image>
 * </ModularCard>
 */
const ModularCard: ModularCardComponent = ModularCardBase;

export default ModularCard;
