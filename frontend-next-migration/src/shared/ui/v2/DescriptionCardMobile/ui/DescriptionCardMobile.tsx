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
import cls from './DescriptionCardMobile.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

/**
 * Module containing a React CardTheme component with customizable themes, sizes, and square styling. (PRIMARY, DEFENSEGALLERY)
 * @module MobileCard
 */
export enum DescriptionCardMobileTheme {
    PRIMARY = '',
    DEFENSEGALLERY = 'DefenseGalleryCard',
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
    theme?: DescriptionCardMobileTheme;
    className?: string;
    children: ReactNode;
    ref?: LegacyRef<HTMLDivElement>;
}

interface MobileCardTextsProps {
    className?: string;
    title: string;
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

interface MobileCardImageSectionProps {
    className?: string;
    alt: string;
    src: StaticImageData | string;
    backgroundColor?: string;
    paddingLeft?: string;
    height?: number;
}

interface MobileCardComponent
    extends ForwardRefExoticComponent<
        Omit<MobileCardProps, 'ref'> & RefAttributes<HTMLDivElement>
    > {
    Texts: React.FC<MobileCardTextsProps>;
    Image: React.FC<MobileCardImageSectionProps>;
}

export const DescriptionCardMobileLink: React.FC<LinkProps> = (props: LinkProps) => {
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

const MobileCardBase: any = forwardRef<HTMLDivElement, MobileCardProps>(
    (props: MobileCardProps, ref): JSX.Element => {
        const { className = '', children, theme = DescriptionCardMobileTheme.PRIMARY } = props;

        return (
            <div
                ref={ref}
                tabIndex={0}
                className={classNames(cls.DescriptionCardMobile, undefined, [
                    className,
                    cls[theme],
                ])}
            >
                {children}
            </div>
        );
    },
);
MobileCardBase.displayName = 'DescriptionCardMobile';
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
const MobileCardTexts = memo(({ title = '', children }: MobileCardTextsProps): JSX.Element => {
    return (
        <div className={cls.TextContainer}>
            <h2 className={cls.Title}>{title}</h2>
            {children}
        </div>
    );
});
MobileCardTexts.displayName = 'DescriptionCardMobile-Texts';
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
        height,
        paddingLeft,
    }: MobileCardImageSectionProps): JSX.Element => {
        if (backgroundColor) {
            return (
                <div
                    className={classNames(cls.ImageContainer, undefined, [className])}
                    style={{ backgroundColor }}
                >
                    <Image
                        objectFit="contain"
                        objectPosition="center"
                        quality={100}
                        src={src}
                        alt={alt}
                        height={height}
                    />
                </div>
            );
        }
        return (
            <div className={classNames(cls.CoverImageContainer, undefined, [className])}>
                <Image
                    className={cls.Image}
                    src={src}
                    alt={alt}
                />
            </div>
        );
    },
);
MobileCardImageSection.displayName = 'DescriptionCardMobile-Image-Section';
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
const DescriptionCardMobile: MobileCardComponent = MobileCardBase;
export default DescriptionCardMobile;
