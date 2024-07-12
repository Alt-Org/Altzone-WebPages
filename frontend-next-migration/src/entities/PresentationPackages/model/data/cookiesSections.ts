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
// next takes path : \public\images\
const imageSrcs = [''];

const logoSrc = '/images/cookies/cookiesLogo.png';

export const CookiesSections = i18nKeyPrefixes.map((key, index) =>
  createSection(
    key,
    index,
    imageSrcs[index],
    `${key}-image`,
    logoSrc,
    `${key}-logo`,
  ),
);
