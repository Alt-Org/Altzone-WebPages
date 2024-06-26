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
export const ArtGameSections = i18nKeyPrefixes.map((key, index) =>
  createSection(key, index),
);
