import { createSection } from '../createSection';

const i18nKeyPrefixes = [
    'interpretation',
    'user',
    'collecting',
    'testing',
    'age-limit',
    'discord',
    'analytics',
    'review',
    'gameteam',
    'datasubject',
    'cookies',
    'ethical-principles',
    'changes',
    'legal-basis',
    'data-retention',
    'rights',
    'security',
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
