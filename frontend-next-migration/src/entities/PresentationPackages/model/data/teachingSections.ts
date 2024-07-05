import { createSection } from '../createSection';

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

const imageSrcs = [
  '/images/teachingPackage/intro.png',
  '/images/teachingPackage/implementation.png',
  '/images/teachingPackage/visual.png',
  '/images/teachingPackage/functional.png',
  '/images/teachingPackage/connections.png',
  '/images/teachingPackage/online.png',
  '/images/teachingPackage/alliance.png',
  '/images/teachingPackage/characters.png',
  '/images/teachingPackage/mechanics.png',
  '/images/teachingPackage/youthwork.png',
  '/images/teachingPackage/prg.png',
];

export const TeachingSections = i18nKeyPrefixes.map((key, index) =>
  createSection(key, index, imageSrcs[index], `${key}-image`),
);
