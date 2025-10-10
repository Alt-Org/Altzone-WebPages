import believer from '@/shared/assets/images/heros/fate-priest/Believer.webp';
import believerGif from '@/shared/assets/images/heros/fate-priest/Believer.gif';
import hateSpeech from '@/shared/assets/images/heros/hate-speech/Vihapuhe.png';
import hateSpeechGif from '@/shared/assets/images/heros/hate-speech/Vihapuhe.gif';
import meatwall from '@/shared/assets/images/heros/meatwall/Meatwall.png';
import veteran from '@/shared/assets/images/heros/veteran/Veteran.webp';
import veteranGif from '@/shared/assets/images/heros/veteran/Veteran.gif';
import bullying from '@/shared/assets/images/heros/bullying/bullying.png';
import people_pleaser from '@/shared/assets/images/heros/people-pleaser/people-pleaser.png';
import retroflector from '@/shared/assets/images/descriptionCard/retroflector.png';
import orange from '@/shared/assets/images/heros/textBgColors/orange.webp';
import lightBlue from '@/shared/assets/images/heros/textBgColors/light-blue.webp';
import comingSoon from '@/shared/assets/images/heros/ComingSoon.webp';
import { statData2 } from '../model/stats/statsDataV3';
import { statData3 } from '../model/stats/statsDataV4';
import { GroupInfo, HeroGroup, HeroSlug } from '../types/hero';

export const buildHeroGroupsPart2 = (
    t: (key: string) => string,
): Partial<Record<HeroGroup, GroupInfo>> => ({
    [HeroGroup.OBEDIENT]: {
        name: t('OBEDIENT.name'),
        description: t('OBEDIENT.description'),
        srcImg: retroflector,
        bgColour: '#FFFF00',
        label: orange,
        heroes: [
            {
                id: 524234,
                srcImg: believer,
                srcGif: believerGif,
                alt: t('OBEDIENT.heroes.Believer.alt'),
                altGif: t('OBEDIENT.heroes.Believer.altGif'),
                slug: HeroSlug.BELIEVER,
                title: t('OBEDIENT.heroes.Believer.title'),
                description: t('OBEDIENT.heroes.Believer.description'),
                stats: statData2.BELIEVER,
            },
            {
                id: 524235,
                srcImg: people_pleaser,
                srcGif: comingSoon,
                alt: t('OBEDIENT.heroes.PeoplePleaser.alt'),
                altGif: t('OBEDIENT.heroes.PeoplePleaser.altGif'),
                slug: HeroSlug.PEOPLE_PLEASER,
                title: t('OBEDIENT.heroes.PeoplePleaser.title'),
                description: t('OBEDIENT.heroes.PeoplePleaser.description'),
                stats: statData3.PEOPLE_PLEASER,
            },
        ],
    },

    [HeroGroup.DESENSITIZER]: {
        name: t('DESENSITIZER.name'),
        description: t('DESENSITIZER.description'),
        srcImg: retroflector,
        bgColour: '#00C0C0',
        label: lightBlue,
        heroes: [
            {
                id: 848349,
                srcImg: hateSpeech,
                srcGif: hateSpeechGif,
                alt: t('DESENSITIZER.heroes.HateSpeech.alt'),
                altGif: t('DESENSITIZER.heroes.HateSpeech.altGif'),
                slug: HeroSlug.HATE_SPEECH,
                title: t('DESENSITIZER.heroes.HateSpeech.title'),
                description: t('DESENSITIZER.heroes.HateSpeech.description'),
                stats: statData2.HATE_SPEECH,
            },
            {
                id: 848341,
                srcImg: meatwall,
                srcGif: comingSoon,
                alt: t('DESENSITIZER.heroes.Meatwall.alt'),
                altGif: t('DESENSITIZER.heroes.Meatwall.altGif'),
                slug: HeroSlug.MEATWALL,
                title: t('DESENSITIZER.heroes.Meatwall.title'),
                description: t('DESENSITIZER.heroes.Meatwall.description'),
                stats: statData2.MEATWALL,
            },
            {
                id: 848342,
                srcImg: veteran,
                srcGif: veteranGif,
                alt: t('DESENSITIZER.heroes.Veteran.alt'),
                altGif: t('DESENSITIZER.heroes.Veteran.altGif'),
                slug: HeroSlug.VETERAN,
                title: t('DESENSITIZER.heroes.Veteran.title'),
                description: t('DESENSITIZER.heroes.Veteran.description'),
                stats: statData2.VETERAN,
            },
            {
                id: 848343,
                srcImg: bullying,
                srcGif: comingSoon,
                alt: t('DESENSITIZER.heroes.Bullying.alt'),
                altGif: t('DESENSITIZER.heroes.Bullying.altGif'),
                slug: HeroSlug.BULLYING,
                title: t('DESENSITIZER.heroes.Bullying.title'),
                description: t('DESENSITIZER.heroes.Bullying.description'),
                stats: statData3.BULLYING,
            },
        ],
    },
});
