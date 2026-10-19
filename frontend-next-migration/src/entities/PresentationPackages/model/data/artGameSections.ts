import { createSection } from '../createSection';
import gameArtLogo from '@/shared/assets/images/gameArt/gameArtLogo.webp';

/**
 * This TypeScript code snippet is responsible for creating an array of sections for an art game.
 * Each section represents a specific part of the game, such as informational content, an introduction, and more.
 * Define an array of keys that serve as prefixes for internationalization (i18n).
 * These keys will be used to dynamically generate i18n identifiers for different sections of the game.
 */
const EMPTY_IMAGE = '';

const i18nKeyPrefixes = [
    'info',
    'intro',
    'implementation',
    'message',
    'content',
    'joinus',
    'literature',
];

const AI_IMAGES_PATH = '/images/gameart_AI';

const imageSrcs = [
    `${AI_IMAGES_PATH}/videogames_AI.png`,
    `${AI_IMAGES_PATH}/teachingpackage_AI.png`,
    `${AI_IMAGES_PATH}/teacherspage_AI.png`,
    `${AI_IMAGES_PATH}/structure_AI.png`,
    EMPTY_IMAGE,
    `${AI_IMAGES_PATH}/taskthemes_AI.png`,
    EMPTY_IMAGE,
];

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
