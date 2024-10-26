import { createSection } from '../createSection';

const i18nKeyPrefixes = [
    'privacy',
    'interpretation',
    'collecting',
    'analytics',
    'legal-basis',
    'data-retention',
    'rights',
    'security',
    'changes',
    'contact',
];

const imageSrcs = [''];
const logoSrc = '';

export const PrivacySections = i18nKeyPrefixes.map((key, index) =>
    createSection({
        prefix: key,
        index: index,
        image: {
            src: imageSrcs[index],
            alt: `${key}-image`,
        },
        logo: {
            src: logoSrc,
            alt: `${key}-logo`,
        },
    }),
);
