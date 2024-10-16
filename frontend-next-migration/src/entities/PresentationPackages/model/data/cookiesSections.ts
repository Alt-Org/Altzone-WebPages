import { createSection } from "../createSection";

const i18nKeyPrefixes = [
  'policies',
  'cookies',
  'interpretation',
  'type',
  'choices',
  'moreinfo',
  'contact',
];

const imageSrcs = [''];
const logoSrc = '';

export const CookiesSections = i18nKeyPrefixes.map((key, index) =>
    createSection({
      prefix: key,
      index: index,
      image: {
        src: imageSrcs[index] || '',
        alt: `${key}-image`,
      },
      logo: {
        src: logoSrc,
        alt: `${key}-logo`,
      },
    })
);
