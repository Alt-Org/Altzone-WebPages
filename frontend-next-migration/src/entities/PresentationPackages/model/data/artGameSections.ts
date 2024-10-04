import { createSection } from '../createSection';

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

const imageSrcs = [
  '/images/gameArt/info.webp',
  '/images/gameArt/intro.webp',
  '/images/gameArt/implementation.webp',
  '/images/gameArt/message.webp',
  '/images/gameArt/joinus.webp',
];

const logoSrc = '/images/gameArt/gameArtLogo.webp';

/**
 * The `ArtGameSections` array is created by mapping over `i18nKeyPrefixes`.
 * For each key in `i18nKeyPrefixes`, the corresponding index is used to create a section using `createSection`.
 *
 * Each section is created with the following parameters:
 * - `key`: The key prefix used for i18n purposes.
 * - `index`: The index representing the order of the section.
 * - `imageSrcs[index]`: The image source path corresponding to the current index.
 * - `${key}-image`: A unique identifier for the image element of the section.
 * - `logoSrc`: A common logo source for all sections.
 * - `${key}-logo`: A unique identifier for the logo element of the section.
 *
 * Note: `imageSrcs` has fewer elements than `i18nKeyPrefixes`. Be mindful of possible `undefined` values.
 */
export const ArtGameSections = i18nKeyPrefixes.map((key, index) =>
  createSection(
    key,
    index,
    imageSrcs[index],
    `${key}-image`,
    logoSrc,
    `${key}-logo`,
  ),
);
