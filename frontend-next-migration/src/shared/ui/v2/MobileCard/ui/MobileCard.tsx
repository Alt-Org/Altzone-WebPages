import {
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
}

/**
 * Props for the ModularCard component. Extends HTMLDivElement attributes.
 * {Object} ModularCardProps
 * @property {string} [className=""] - Additional class name(s) for the Card.
 * @property {theme} [theme=MobileCardTheme.PRIMARY] - Theme for the Card.
 * @property {string} [path] - Link address (optional).
 * @property {string} [isExternal=false] - If path is not in this server (optional).
 * @property {string} [withScalableLink] - Additional styling to link (optional).
 * @property {LegacyRef<HTMLDivElement>} [ref] - Reference to the card (optional)
 * @property {ReactNode} children - The content of the Card.
 */
interface MobileCardProps
    extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    theme?: MobileCardTheme;
    className?: string;
    children: ReactNode;
    path?: string;
    isExternal?: boolean;
    withScalableLink?: boolean;
    ref?: LegacyRef<HTMLDivElement>;
}

interface MobileCardTextsProps {
    className?: string;
    title1: string;
    title2: string;
    children?: ReactNode;
}

interface MobileCardImageSectionProps {
    className?: string;
    alt: string;
    src: StaticImageData | string;
    backgroundColor?: string;
}

interface MobileCardComponent
    extends ForwardRefExoticComponent<
        Omit<MobileCardProps, 'ref'> & RefAttributes<HTMLDivElement>
    > {
    Texts: MobileCardTextsProps;
    Image: MobileCardImageSectionProps;
}

const MobileCardBase: any = forwardRef<HTMLDivElement, MobileCardProps>(
    (props: MobileCardProps, ref): JSX.Element => {
        const {
            path,
            isExternal = false,
            withScalableLink = false,
            className = '',
            children,
            theme = MobileCardTheme.PRIMARY,
        } = props;
        const mods: Record<string, boolean> = {
            [cls.withScalableLink]: withScalableLink,
        };
        if (path) {
            return (
                <AppLink
                    to={path}
                    isExternal={isExternal}
                    className={cls.AppLink}
                >
                    <div
                        ref={ref}
                        tabIndex={0}
                        style={{ width: '100%' }}
                        className={classNames(cls.MobileCard, mods, [className, cls[theme]])}
                    >
                        {children}
                    </div>
                </AppLink>
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
    ({ title1 = '', title2 = '', children }: MobileCardTextsProps): JSX.Element => {
        return (
            <div className={cls.TextContainer}>
                <h2 className={cls.Title1}>{title1}</h2>
                <p className={cls.Title2}>{title2}</p>
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
    ({ className = '', alt, backgroundColor, src }: MobileCardImageSectionProps): JSX.Element => {
        return (
            <div
                className={classNames(cls.ImageContainer, undefined, [className])}
                style={{ backgroundColor }}
            >
                <Image
                    src={src}
                    alt={alt}
                />
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
 *                            <MobileCard
 *                                 path='/hero-development'
 *                                 withScalableLink={true}
 *                                 key={index}
 *                                 theme={MobileCardTheme.DEFENSEGALLERY}>
 *                                 <MobileCard.Texts
 *                                     title1="Mikälie"
 *                                     title2="Tämäonpitkänimi"
 *                                />
 *                                 <MobileCard.Image
 *                                     backgroundColor="yellow"
 *                                     src={jokester}
 *                                     alt="Jåker"
 *                                 />
 *                             </MobileCard>
 * @example
 *                        <MobileCard
 *                             key={index}
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
