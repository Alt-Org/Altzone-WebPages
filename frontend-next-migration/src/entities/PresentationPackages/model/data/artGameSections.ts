import { createSection } from '../createSection';

const i18nKeyPrefixes = [
  'info',
  'intro',
  'implementation',
  'message',
  'content',
  'joinus',
  'literature',
];
// next takes path : \public\images\gameArt
const imageSrcs = [
  '/images/gameArt/info.webp',
  '/images/gameArt/intro.webp',
  '/images/gameArt/implementation.webp',
  '/images/gameArt/message.webp',
  '/images/gameArt/content.webp',
  '/images/gameArt/joinus.webp',
  '/images/gameArt/literature.webp',
];

const logoSrc = '/images/gameArt/gameArtLogo.webp';

// Create ArtGameSections
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
