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
import cls from './DescriptionCard.module.scss';

/**
 * Module containing a React CardTheme component with customizable themes, sizes, and square styling. (PRIMARY, TITLEIMAGE, NEWSCARD)
 * @module DescriptionCard
 */
export enum DescriptionCardTheme {
    PRIMARY = '',
    DEFENSEGALLERY = 'DefenseGalleryCard',
    FURNITURECOLLECTION = 'FurnitureCollectionCard',
    COLLECTIONS = 'CollectionsCard',
    TEACHERS = 'TeachersCard',
    LESSON = 'LessonCard',
}

/**
 * Props for the DescriptionCard component. Extends HTMLDivElement attributes.
 * {Object} DescriptionCardProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {CardTheme} [theme=CardTheme.PRIMARY] - Theme for the Card.
 * @property {string} [path] - Link address (optional).
 * @property {string} [isExternal=false] - If path is not in this server (optional).
 * @property {string} [withScalableLink] - Additional styling to link (optional).
 * @property {LegacyRef<HTMLDivElement>} [ref] - Reference to the card (optional)
 * @property {ReactNode} children - The content of the Card.
 */
interface DescriptionCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    className?: string;
    theme?: DescriptionCardTheme;
    path?: string;
    isExternal?: boolean;
    withScalableLink?: boolean;
    disableHoverDesktop?: boolean;
    ref?: LegacyRef<HTMLDivElement>;
    children: ReactNode;
    height?: string;
}

/**
 * Props for the DescriptionCard component. Extends HTMLDivElement attributes.
 * {Object} CardCompoundProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {ReactNode} children - The content of the Card.
 * @property {string} [width="50%"] - The width of the subcomponent of the DescriptionCard component.
 * @property {string} [bgColour="transparent"] - Background colour of the card.
 */
interface CardCompoundProps {
    className?: string;
    children: ReactNode;
    width?: string;
    bgColour?: string;
}

/**
 * Props for the DescriptionCard component. Extends HTMLDivElement attributes.
 * {Object} DescriptionCardImageProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {string} [alt=""] - Alternative text for the image.
 * @property {string} [src=""] - Source for the image.
 * @property {number} [height=""] - Height of the image in pixels.
 * @property {string} [marginLeft="auto"] - Margin left of the image.
 */
interface DescriptionCardImageProps {
    className?: string;
    alt: string;
    src: StaticImageData | string;
    height?: number;
    marginLeft?: string;
}

interface DescriptionCardTexts extends FC<CardCompoundProps> {
    Title: FC<CardCompoundProps>;
    Body: FC<CardCompoundProps>;
}

interface DescriptionCardImageSection extends FC<CardCompoundProps> {
    Image: FC<DescriptionCardImageProps>;
    Triangle: FC<{ className?: string }>;
}

interface DescriptionCardComponent
    extends ForwardRefExoticComponent<
        Omit<DescriptionCardProps, 'ref'> & RefAttributes<HTMLDivElement>
    > {
    Texts: DescriptionCardTexts;
    Image: DescriptionCardImageSection;
}

const DescriptionCardBase: any = forwardRef<HTMLDivElement, DescriptionCardProps>((props, ref) => {
    const {
        className = '',
        theme = DescriptionCardTheme.PRIMARY,
        path,
        isExternal = false,
        withScalableLink = false,
        disableHoverDesktop = false,
        children,
        ...otherProps
    } = props;

    const isHoverEnabled = (Boolean(path) && !disableHoverDesktop) || withScalableLink;

    const mods: Record<string, boolean> = {
        [cls.clickableHover]: isHoverEnabled,
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

DescriptionCardBase.displayName = 'DescriptionCard';
/**
 * DescriptionCard.Texts.Title component for the DescriptionCard.
 * @module DescriptionCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <DescriptionCard.Texts.Title className="customTitleClass">Card Title</DescriptionCard.Texts.Title>
 */
const DescriptionCardTitle = memo((props: CardCompoundProps) => {
    const { children, className = '' } = props;

    return (
        <div className={classNames(cls.DescriptionCardTitle, {}, [className])}>
            <h2>{children}</h2>
        </div>
    );
});

DescriptionCardTitle.displayName = 'Descriptioncard-Texts-Title';

/**
 * DescriptionCard.Texts.Body component for the DescriptionCard.
 * @module DescriptionCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <DescriptionCard.Texts.Body className="customBodyClass">Card Body</DescriptionCard.Texts.Body>
 */
const DescriptionCardBody = memo((props: CardCompoundProps) => {
    const { children, className = '' } = props;

    return (
        <div className={classNames(cls.DescriptionCardBody, {}, [className])}>
            <p>{children}</p>
        </div>
    );
});

DescriptionCardBody.displayName = 'Descriptioncard-Texts-Body';

/**
 * DescriptionCard.Image.Image component for displaying image in left side.
 * @module DescriptionCard
 * @component
 * @param {DescriptionCardImageProps} props - Props for the component.
 *
 * @example
 * <DescriptionCard.Image.Image
 *      className="customImageClass"
 *      src={image}
 *      alt="alt"
 * />
 */
const DescriptionCardImage = memo((props: DescriptionCardImageProps) => {
    const { className = '', alt, src, height, marginLeft = 'auto' } = props;
    if (height)
        return (
            <div
                style={{ marginLeft }}
                className={cls.DescriptionCardScaledImageContainer}
            >
                <Image
                    src={src}
                    alt={alt}
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    quality={100}
                    height={height}
                />
            </div>
        );
    return (
        <div className={cls.DescriptionCardCoverImageContainer}>
            <Image
                className={classNames(cls.Cover, {}, [className])}
                src={src}
                alt={alt}
                priority={true}
                fill
                sizes="100%"
            />
        </div>
    );
});

DescriptionCardImage.displayName = 'Descriptioncard-Image-Image';

/**
 * DescriptionCard.Image.Triangle component for the being in top of the image.
 * @module DescriptionCard
 * @component
 * @param {{className:string}} props - Props for the component.
 *
 * @example
 * <DescriptionCard.Image.Triangle /> // This is plced before the image is placed.
 * <DescriptionCard.Image.Image
 *      className="customImageClass"
 *      src={image}
 *      alt="alt"
 * />
 */
const DescriptionCardTriangle = memo((props: { className?: string }) => {
    const { className = '' } = props;

    return <span className={classNames(cls.DescriptionCardTriangle, {}, [className])} />;
});

DescriptionCardTriangle.displayName = 'Descriptioncard-Image-Triangle';

/**
 * DescriptionCard.Texts component for the DescriptionCard.
 * @module DescriptionCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <DescriptionCard.Texts>
 *      <DescriptionCard.Title>Card title</DescriptionCard.Title>
 * <DescriptionCard.Texts/>
 */
const DescriptionCardTexts: DescriptionCardTexts = (props: CardCompoundProps) => {
    const { children, className = '', width = '50%' } = props;
    return (
        <div
            style={{ flexBasis: width }}
            className={classNames(cls.DescriptionCardTexts, {}, [className])}
        >
            {children}
        </div>
    );
};

/**
 * DescriptionCard.Image component for the DescriptionCard.
 * @module DescriptionCard
 * @component
 * @param {CardCompoundProps} props - Props for the component.
 *
 * @example
 * <DescriptionCard.Image>
 *      <DescriptionCard.Image.Image
 *          className="customImageClass"
 *          src={image}
 *          alt="alt"
 *      />
 * <DescriptionCard.Image/>
 */
const DescriptionCardImageSection: DescriptionCardImageSection = (props: CardCompoundProps) => {
    const { children, className = '', width = '50%', bgColour = 'transparent' } = props;

    return (
        <div
            style={{ backgroundColor: bgColour, flexBasis: width }}
            className={classNames(cls.DescriptionCardImageSection, {}, [className])}
        >
            {children}
        </div>
    );
};

// ImageSection
DescriptionCardImageSection.Image = DescriptionCardImage;
DescriptionCardImageSection.Triangle = DescriptionCardTriangle;

// Texts
DescriptionCardTexts.Title = DescriptionCardTitle;
DescriptionCardTexts.Body = DescriptionCardBody;

// Adding texts and image section to DescriptionCard
DescriptionCardBase.Texts = DescriptionCardTexts;
DescriptionCardBase.Image = DescriptionCardImageSection;

/**
 * Card component with composable subcomponents.
 * @module DescriptionCard
 *
 * @example
 *              <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
 *                <DescriptionCard.Texts>
 *                     <DescriptionCard.Texts.Title>Torjujat</DescriptionCard.Texts.Title>
 *                     <DescriptionCard.Texts.Body>
 *                         Torjujat ovat ujoudeltaan tehokkaita suojautumaan kilpensä taakse. Heidän kilpensä ei kuitenkaan ole loputon, vaan sekin antaa lopulta periksi paineen kasvaessa.
 *                     </DescriptionCard.Texts.Body>
 *                 </DescriptionCard.Texts>
 *                 <DescriptionCard.Image
 *                     bgColour="#FF0000"
 *                 >
 *                     <DescriptionCard.Image.Triangle />
 *                     <DescriptionCard.Image.Image
 *                         src={retroflector}
 *                         alt="defence gallery"
 *                         height={100}
 *                         marginLeft="20%"
 *                     />
 *                 </DescriptionCard.Image>
 *             </DescriptionCard>
 * @example
 *              <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
 *                 <DescriptionCard.Texts width="30%">
 *                     <DescriptionCard.Texts.Title>Defenssigalleria</DescriptionCard.Texts.Title>
 *                     <DescriptionCard.Texts.Body>
 *                         Lorem ipsum dolor sit amet consectetur. Id tincidunt scelerisque augue leo nam diam tortor eget pharetra.
 *                     </DescriptionCard.Texts.Body>
 *                 </DescriptionCard.Texts>
 *                 <DescriptionCard.Image width="70%">
 *                     <DescriptionCard.Image.Image
 *                         src={defenceGallery}
 *                         alt="defence gallery"
 *                     />
 *                 </DescriptionCard.Image>
 *             </DescriptionCard>
 */
const DescriptionCard: DescriptionCardComponent = DescriptionCardBase;

export default DescriptionCard;
