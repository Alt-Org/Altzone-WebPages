import { createSection } from '../createSection';

const i18nKeyPrefixes = [
  'info',
  'artistic',
  'storytelling',
  'creation',
  'culture',
  'literature',
  'sources',
  'prg',
];

const imageSrcs = [
  '/images/gameArt/info.png',
  '/images/gameArt/artistic.png',
  '/images/gameArt/storytelling.png',
  '/images/gameArt/creation.png',
  '/images/gameArt/culture.png',
  '/images/gameArt/literature.png',
  '/images/gameArt/sources.png',
  '/images/gameArt/prg.png',
];

export const ArtGameSections = i18nKeyPrefixes.map((key, index) =>
  createSection(key, index, imageSrcs[index], `${key}-image`),
);
