import { createSection } from '../createSection';

const i18nKeyPrefixes = ['intro', 'players', 'employees', 'business', 'society', 'law'];

const imageSrcs = [''];
const logoSrc = '';

export const EthicalGuidelinesSections = i18nKeyPrefixes.map((key, index) =>
    createSection({
        prefix: key,
        index,
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
