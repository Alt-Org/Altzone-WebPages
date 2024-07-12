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
<<<<<<< HEAD
// next takes path : \public\images\
=======
// next takes path : \public\images\teachingPackage
>>>>>>> e87127dbb1045e9d3e6cc55c2ac238fdeecbdd6a
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
