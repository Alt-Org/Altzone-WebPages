import { createSection } from '../createSection';
import info from '@/shared/assets/images/gameArt/videogames.png';
import intro from '@/shared/assets/images/gameArt/teachingpackage.png';
import implementation from '@/shared/assets/images/gameArt/teacherspage.png';
import message from '@/shared/assets/images/gameArt/structure.png';
import joinus from '@/shared/assets/images/gameArt/taskthemes.png';
import gameArtLogo from '@/shared/assets/images/gameArt/gameArtLogo.webp';

/**
 * This TypeScript code snippet is responsible for creating an array of sections for an art game.
 * Each section represents a specific part of the game, such as informational content, an introduction, and more.
 * Define an array of keys that serve as prefixes for internationalization (i18n).
 * These keys will be used to dynamically generate i18n identifiers for different sections of the game.
 */

const i18nKeyPrefixes = [
    'info',
    'intro',
    'implementation',
    'message',
    'content',
    'joinus',
    'literature',
];

const imageSrcs = [info.src, intro.src, implementation.src, message.src, joinus.src];

const logoSrc = gameArtLogo.src;

/**
 * The `ArtGameSections` array is created by mapping over `i18nKeyPrefixes`.
 * For each key in `i18nKeyPrefixes`, the corresponding index is used to create a section using `createSection`.
 */
export const ArtGameSections = i18nKeyPrefixes.map((key, index) =>
    createSection({
        prefix: key,
        index,
        image: {
            src: imageSrcs[index],
            alt: `${key}-image`,
        },
        logo: {
            src: logoSrc,
            alt: `${key}-logo`,
        },
    }),
);
