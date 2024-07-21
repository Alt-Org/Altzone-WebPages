import { createSection } from '../createSection';

const i18nKeyPrefixes = [
  'policies',
  'privacy',
  'interpretation',
  'collecting',
  'children',
  'websites',
  'changes',
  'contact',
  'generate',
];
// next takes path : \public\images\
const imageSrcs = [''];

const logoSrc = '';

export const PrivacySections = i18nKeyPrefixes.map((key, index) =>
  createSection(
    key,
    index,
    imageSrcs[index],
    `${key}-image`,
    logoSrc,
    `${key}-logo`,
  ),
);
