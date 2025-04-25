import { BlockSection } from '../types';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import ConnectionImage from '@/shared/assets/images/heros/mirror/Mirror.png';
import teachersImage from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import feedbackImage from '@/shared/assets/images/heros/einstein/einstein.png';
import duunitoriImage from '@/shared/assets/images/heros/purple-girls/purple-girls.png';
import discordImage from '@/shared/assets/images/heros/conman/conman.png';
import instagramImage from '@/shared/assets/images/heros/fate-priest/Believer.png';
import fbIcon from '@/shared/assets/icons/InstagramIcon.svg';
import { block } from 'sharp';

/**
 * Creates a function to generate a `BlockSection` object, using
 * internationalized labels, descriptions, and link text.
 *
 * @param {string} section - The section identifier used to retrieve the appropriate i18n strings.
 * @param {string | string[]} link - The URL(s) associated with this block, to be used in the generated `BlockSection`.
 * @param {string} [img] - Optional image source for the block.
 * @returns {function} - A function that takes a translation function `t` and returns a `BlockSection`
 * populated with i18n strings.
 *
 * @callback t
 * @param {string} key - The i18n key to retrieve the translated string.
 * @returns {BlockSection} - An object adhering to the `BlockSection` interface, containing label,
 * description, link, and linkText fields.
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
            links: link.map((l) => ({
                url: l.url,
                text: l.text,
                isExternal: l.isExternal ?? false,
                iconSrc: l.iconSrc,
            })),
            img: img || '',
            imgAlt: t(`block-image-alt-${section}`),
        };
    };
};

export const makeDiscordBlock = makeBlocksWithI18n(
    'discord',
    [{ text: 'discord.gg/mgjQkCR2Fg', url: AppExternalLinks.discord, isExternal: true }],
    discordImage.src.toString(),
);
export const makeRedditBlock = makeBlocksWithI18n(
    'connection',
    [
        { text: 'proyaleg@gmail.com', url: '', isExternal: true },
        { text: '+358442407396', url: '', isExternal: false },
    ],
    ConnectionImage.src.toString(),
);
export const makeTeachersBlock = makeBlocksWithI18n(
    'teachers',
    [
        { text: 'proyaleg@gmail.com', url: '', isExternal: true },
        { text: '+358442407396', url: '', isExternal: true },
        { text: 'Tutustu opetuspakettiin', url: AppExternalLinks.dlpackage, isExternal: true },
    ],
    teachersImage.src.toString(),
);
export const makeFeedbackBlock = makeBlocksWithI18n(
    'feedback',
    [
        { text: 'Verkkosivu lomake', url: AppExternalLinks.googleWebFeedback, isExternal: true },
        { text: 'Peli lomake', url: AppExternalLinks.googleFeedback, isExternal: true },
    ],
    feedbackImage.src.toString(),
);
export const makeDuunitoriBlock = makeBlocksWithI18n(
    'duunitori',
    [{ text: 'Avoimet paikat Duunitori', url: AppExternalLinks.duunitori, isExternal: true }],
    duunitoriImage.src.toString(),
);
export const makeInstagramBlock = makeBlocksWithI18n(
    'instagram',
    [
        {
            text: '',
            url: 'https://www.instagram.com/yourprofile',
            isExternal: true,
            iconSrc: fbIcon,
        },
        {
            text: '',
            url: 'https://www.instagram.com/yourprofile',
            isExternal: true,
            iconSrc: fbIcon,
        },
        {
            text: '',
            url: 'https://www.instagram.com/yourprofile',
            isExternal: true,
            iconSrc: fbIcon,
        },
    ],
    instagramImage.src.toString(),
);
