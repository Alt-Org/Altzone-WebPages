import { BlockSection } from '../types';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
/**
 * Creates a function to generate a `BlockSection` object, using
 * internationalized labels, descriptions, and link text.
 *
 * @param {string} section - The section identifier used to retrieve the appropriate i18n strings.
 * @param {string} link - The URL associated with this block, to be used in the generated `BlockSection`.
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
    link: string,
): ((t: (key: string) => string) => BlockSection) => {
    return (t: (key: string) => string): BlockSection => {
        return {
            label: t(`block-label-${section}`),
            description: t(`block-description-${section}`),
            link: link,
            linkText: t(`block-link-text-${section}`),
        };
    };
};

export const makeDiscordBlock = makeBlocksWithI18n('discord', AppExternalLinks.discord);
export const makeRedditBlock = makeBlocksWithI18n('reddit', AppExternalLinks.reddit);
export const makeTeachersBlock = makeBlocksWithI18n('teachers', 'https://example.com/');
export const makeFeedbackBlock = makeBlocksWithI18n('feedback', AppExternalLinks.googleFeedback);
export const makeDuunitoriBlock = makeBlocksWithI18n('duunitori', AppExternalLinks.duunitori);
export const makeInstagramBlock = makeBlocksWithI18n('instagram', AppExternalLinks.instagram);
