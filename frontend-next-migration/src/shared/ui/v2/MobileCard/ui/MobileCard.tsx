import React, {
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
import cls from './MobileCard.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

/**
 * Module containing a React CardTheme component with customizable themes, sizes, and square styling. (PRIMARY, DEFENSEGALLERY)
 * @module MobileCard
 */
export enum MobileCardTheme {
    PRIMARY = '',
    DEFENSEGALLERY = 'DefenseGalleryCard',
    FURNITURECOLLECTION = 'FurnitureCollectionsCard',
    CLAN = 'ClanCard',
}

/**
 * Props for the ModularCard component. Extends HTMLDivElement attributes.
 * {Object} ModularCardProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {theme} [theme=MobileCardTheme.PRIMARY] - Theme for the Card.
 * @property {ReactNode} children - The content of the Card.
 */
interface MobileCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    theme?: MobileCardTheme;
    className?: string;
    children: ReactNode;
    ref?: LegacyRef<HTMLDivElement>;
    height?: string;
}

interface MobileCardTextsProps {
    className?: string;
    title1: string;
    title2: string;
    text?: string;
    children?: ReactNode;
}

/**
 * Props for the MobileCardLink component.
 * {Object} LinkProps
 * @property {string} [path] - Link address (optional).
 * @property {string} [isExternal=false] - If path is not in this server (optional).
 * @property {string} [withScalableLink] - Additional styling to link (optional).
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {ReactNode} [children] - The content of the Card.
 */
interface LinkProps {
    path: string;
    ariaLabel: string;
    isExternal?: boolean;
    withScalableLink?: boolean;
    className?: string;
    children?: ReactNode;
}

interface HoverEffectProps {
    children: ReactNode;
}

interface MobileCardImageSectionProps {
    className?: string;
    fill?: boolean;
    alt: string;
    src: StaticImageData | string;
    backgroundColor?: string;
}

interface MobileCardComponent
    extends ForwardRefExoticComponent<
        Omit<MobileCardProps, 'ref'> & RefAttributes<HTMLDivElement>
    > {
    Texts: React.FC<MobileCardTextsProps>;
    Image: React.FC<MobileCardImageSectionProps>;
}

export const MobileCardLink: React.FC<LinkProps> = (props: LinkProps) => {
    const {
        path,
        isExternal = false,
        withScalableLink = false,
        className = '',
        children,
        ariaLabel,
    } = props;

    const mods: Record<string, boolean> = {
        [cls.withScalableLink]: withScalableLink,
    };

    return (
        <AppLink
            to={path}
            isExternal={isExternal}
            ariaLabel={ariaLabel}
            className={classNames(cls.AppLink, mods, [className])}
        >
            {children}
        </AppLink>
    );
};

export const HoverEffect: React.FC<HoverEffectProps> = ({ children }) => (
    <div className={cls.withScalableLink}>{children}</div>
);

const MobileCardBase: any = forwardRef<HTMLDivElement, MobileCardProps>(
    (props: MobileCardProps, ref): JSX.Element => {
        const { className = '', children, theme = MobileCardTheme.PRIMARY, height } = props;
        if (height) {
            return (
                <div
                    ref={ref}
                    tabIndex={0}
                    style={{ height }}
                    className={classNames(cls.MobileCard, undefined, [className, cls[theme]])}
                >
                    {children}
                </div>
            );
        }
        return (
            <div
                ref={ref}
                tabIndex={0}
                className={classNames(cls.MobileCard, undefined, [className, cls[theme]])}
            >
                {children}
            </div>
        );
    },
);
MobileCardBase.displayName = 'MobileCard';
/**
 * A memoized functional component that renders a mobile card with a title, text, and optional children.
 * This component is useful for displaying structured information in a card-like layout for mobile views.
 *
 * @typedef {Object} MobileCardTextsProps
 * @property {string} title1 - The title of the card (group). Defaults to an empty string if not provided.
 * @property {string} title2 - The second title of the card (name). Defaults to an empty string if not provided.
 * @property {React.ReactNode} [children] - Optional additional content to be rendered inside the card.
 *
 * @component
 * @param {MobileCardTextsProps} props - The properties to customize the component.
 * @returns {JSX.Element} A React component rendering a mobile card.
 */
const MobileCardTexts = memo(
    ({ title1 = '', title2 = '', text, children }: MobileCardTextsProps): JSX.Element => {
        return (
            <div className={cls.TextContainer}>
                <h2 className={cls.Title1}>{title1}</h2>
                <p className={cls.Title2}>{title2}</p>
                <p className={cls.Text}>{text}</p>
                {children}
            </div>
        );
    },
);
MobileCardTexts.displayName = 'MobileCard-Texts';
/**
 * MobileCardImageSection is a React functional component that displays an
 * image within an image container. The container's background color can
 * be customized using the `backgroundColor` prop. This component is memoized
 * to optimize rendering performance.
 *
 * @param {Object} props - The properties object for the MobileCardImageSection component.
 * @param {string} [props.className] - Optional CSS class name for additional styling.
 * @param {string} props.alt - Alternate text for the image, used for accessibility.
 * @param {string} props.backgroundColor - Background color for the container.
 * @param {string} props.src - Source URL of the image to be displayed.
 * @returns {JSX.Element} The rendered MobileCardImageSection component.
 */
const MobileCardImageSection = memo(
    ({
        className = '',
        alt,
        backgroundColor,
        src,
        fill,
    }: MobileCardImageSectionProps): JSX.Element => {
        return (
            <div
                className={classNames(cls.ImageContainer, undefined, [className])}
                style={{ backgroundColor }}
            >
                {fill ? (
                    <Image
                        className={cls.Image}
                        src={src}
                        alt={alt}
                        fill
                    />
                ) : (
                    <Image
                        className={cls.Image}
                        src={src}
                        alt={alt}
                    />
                )}
            </div>
        );
    },
);
MobileCardImageSection.displayName = 'MobileCard-Image-Section';
MobileCardBase.Texts = MobileCardTexts;
MobileCardBase.Image = MobileCardImageSection;
/**
 * Card component with composable subcomponents.
 * @example
 *                             <MobileCardLink
 *                                 path="/hero-development"
 *                                 ariaLabel="link to hero development page"
 *                                 withScalableLink={true}
 *                             >
 *                                 <MobileCard
 *                                     ref={cardRef}
 *                                     theme={MobileCardTheme.DEFENSEGALLERY}
 *                                 >
 *                                     <MobileCard.Texts
 *                                         title1="Mikälie"
 *                                         title2="Skitsofreenikko"
 *                                     />
 *                                     <MobileCard.Image
 *                                         backgroundColor="yellow"
 *                                         src={jokester}
 *                                         alt="Jåker"
 *                                     />
 *                                 </MobileCard>
 *                             </MobileCardLink>
 * @example
 *                        <MobileCard
 *                             theme={MobileCardTheme.DEFENSEGALLERY}
 *                         >
 *                             <MobileCard.Texts
 *                                 title1="Torjujat"
 *                                 title2="Ahmatti"
 *                             />
 *                             <MobileCard.Image
 *                                 backgroundColor="#FF0000"
 *                                 src={hannu}
 *                                 alt="hannu hodari"
 *                             />
 *                         </MobileCard>
 */
const MobileCard: MobileCardComponent = MobileCardBase;
export default MobileCard;
