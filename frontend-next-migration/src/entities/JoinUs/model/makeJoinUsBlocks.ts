import { BlockSection } from '../types';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import ConnectionImage from '@/shared/assets/images/heros/mirror/Mirror.png';
import teachersImage from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import feedbackImage from '@/shared/assets/images/heros/einstein/einstein.png';
import discordImage from '@/shared/assets/images/heros/conman/conman.png';
import igIcon from '@/shared/assets/images/Insta2.svg';
import fbdIcon from '@/shared/assets/images/Facebook2.svg';
import discordIcon from '@/shared/assets/images/Discord2.svg';
import ytIcon from '@/shared/assets/images/Youtube2.svg';

/**
 * Creates a function that generates a `BlockSection` object, used for building blocks on the "Join Us" page.
 * Supports multiple links per block, internationalized text labels, descriptions, and an optional image.
 *
 * @param {string} section -
 * A section identifier used to construct translation keys dynamically.
 * These keys are combined to fetch the localized label, description, link texts, and alt texts.
 *
 * @param {BlockSection['links']} link -
 * An array of link objects. Each object represents a link associated with the block and should include:
 *  - `url` (string): The link's destination URL.
 *  - `text` (string): A key used to find the translated link text via the `t` function.
 *  - `isExternal` (boolean, optional): Indicates if the link should open in a new tab (default is `false` if not specified).
 *  - `iconSrc` (string, optional): An optional source URL for an icon image associated with the link.
 *
 * @param {string} [img] -
 * (Optional) A direct source path for the block's main image (such as a hero image or thumbnail).
 * If not provided, the block will still work but without an associated image.
 *
 * @returns {(t: (key: string) => string) => BlockSection}
 * Returns a function that accepts a translation function `t`.
 * When executed, this function returns a `BlockSection` object fully populated with localized texts
 * and the provided links and images.
 *
 * @callback t
 * @param {string} key -
 * The translation key used to fetch the localized string.
 *
 * @returns {string} -
 * The translated string value associated with the provided key.
 */

export const makeBlocksWithI18n = (
    section: string,
    link: BlockSection['links'],
    img?: string,
): ((t: (key: string) => string) => BlockSection) => {
    return (t: (key: string) => string): BlockSection => {
        return {
            label: t(`block-label-${section}`),
            description: t(`block-description-${section}`),
            links: link.map((linkItem) => ({
                url: linkItem.url,
                text: t(`block-link-text-${linkItem.text}`),
                isExternal: linkItem.isExternal ?? false,
                iconSrc: linkItem.iconSrc,
                showExternalIcon: linkItem.showExternalIcon,
            })),
            img: img || '',
            imgAlt: t(`block-image-alt-${section}`),
        };
    };
};

export const makeGetInTouchAndFollowBlock = makeBlocksWithI18n(
    'getInTouchAndFollow',
    [
        { text: 'phone', url: 'tel:+358442407396', isExternal: true },
        {
            text: 'icone',
            url: AppExternalLinks.discord,
            isExternal: true,
            iconSrc: discordIcon.src,
        },
        {
            text: 'icone',
            url: AppExternalLinks.facebook,
            isExternal: true,
            iconSrc: fbdIcon.src,
        },
        {
            text: 'icone',
            url: AppExternalLinks.youtube,
            isExternal: true,
            iconSrc: ytIcon.src,
        },
        {
            text: 'icone',
            url: AppExternalLinks.instagram,
            isExternal: true,
            iconSrc: igIcon.src,
        },
        { text: 'email', url: 'mailto:proyaleg@gmail.com', isExternal: true },
    ],
    ConnectionImage.src.toString(),
);

export const makeCommunityAndOpportunitiesBlock = makeBlocksWithI18n(
    'communityAndOpportunities',
    [
        {
            text: 'discord',
            url: AppExternalLinks.discord,
            isExternal: true,
            showExternalIcon: true,
        },
        {
            text: 'news',
            url: '/fi/news',
            isExternal: true,
            showExternalIcon: true,
        },
        {
            text: 'duunitori',
            url: AppExternalLinks.duunitori,
            isExternal: true,
            showExternalIcon: true,
        },
    ],
    discordImage.src.toString(),
);

export const makeEducationProfessionalsBlock = makeBlocksWithI18n(
    'educationProfessionals',
    [
        { text: 'phone', url: 'tel:+358442407396', isExternal: true },
        {
            text: 'teacherPg',
            url: AppExternalLinks.dlpackage,
            isExternal: true,
            showExternalIcon: true,
        },
        { text: 'email', url: 'mailto:proyaleg@gmail.com', isExternal: true },
    ],
    teachersImage.src.toString(),
);

export const makeFeedbackBlock = makeBlocksWithI18n(
    'feedback',
    [
        {
            text: 'feedbackWep',
            url: AppExternalLinks.googleWebFeedback,
            isExternal: true,
            showExternalIcon: true,
        },
        {
            text: 'feedbackGame',
            url: AppExternalLinks.googleFeedback,
            isExternal: true,
            showExternalIcon: true,
        },
    ],
    feedbackImage.src.toString(),
);
