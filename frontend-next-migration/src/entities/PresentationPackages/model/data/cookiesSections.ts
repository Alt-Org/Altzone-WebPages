import { createSection } from '../createSection';

const i18nKeyPrefixes = [
  'policies',
  'cookies',
  'intrepretation',
  'type',
  'choices',
  'moreinfo',
  'contact',
];
// next takes path : \public\images\
const imageSrcs = [''];

const logoSrc = '';

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
