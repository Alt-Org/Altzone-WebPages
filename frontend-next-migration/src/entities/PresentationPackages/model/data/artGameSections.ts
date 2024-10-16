import { createSection } from "../createSection";

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
 */
export const ArtGameSections = i18nKeyPrefixes.map((key, index) =>
    createSection({
      prefix: key,
      index: index,
      image: {
        src: imageSrcs[index],
        alt: `${key}-image`,
      },
      logo: {
        src: logoSrc,
        alt: `${key}-logo`,
      },
    })
);
