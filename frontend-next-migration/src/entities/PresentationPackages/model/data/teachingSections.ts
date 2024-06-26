import { createSection } from '../createSection';

/** use them in shared i18n json files **/
const i18nKeyPrefixes = [
  'intro',
  'implementation',
  'visual',
  'functional',
  'connections',
  'online',
  'alliance',
  'characters',
  'mechanics',
  'youthwork',
  'prg',
];

export const TeachingSections = i18nKeyPrefixes.map((key, index) =>
  createSection(key, index),
);
