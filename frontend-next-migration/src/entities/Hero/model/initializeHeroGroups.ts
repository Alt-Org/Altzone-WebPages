import einstein from '@/shared/assets/images/heros/einstein/einstein.png';
import professorGif from '@/shared/assets/images/heros/einstein/Professor.gif';
import overeater from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import overeaterGif from '@/shared/assets/images/heros/hannu-hodari/Overeater.gif';
import alcoholic from '@/shared/assets/images/heros/alcoholic/Alkoholisti.png';
import provocateur from '@/shared/assets/images/heros/graffitti-gaya/graffitti-gaya.png';
import mirror from '@/shared/assets/images/heros/mirror/Mirror.webp';
import mirrorGif from '@/shared/assets/images/heros/mirror/Mirror.gif';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purple-girls.webp';
import sleepySleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.webp';
import sleeperGif from '@/shared/assets/images/heros/sleeper/Sleeper.gif';
import conman from '@/shared/assets/images/heros/conman/conman.webp';
import conmanGif from '@/shared/assets/images/heros/conman/Conman_new.gif';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.webp';
import believer from '@/shared/assets/images/heros/fate-priest/Believer.webp';
import believerGif from '@/shared/assets/images/heros/fate-priest/Believer.gif';
import hateSpeech from '@/shared/assets/images/heros/hate-speech/Vihapuhe.png';
import hateSpeechGif from '@/shared/assets/images/heros/hate-speech/Vihapuhe.gif';
import meatwall from '@/shared/assets/images/heros/meatwall/Meatwall.png';
import veteran from '@/shared/assets/images/heros/veteran/Veteran.webp';
import veteranGif from '@/shared/assets/images/heros/veteran/Veteran.gif';
import comingSoon from '@/shared/assets/images/heros/ComingSoon.webp';
import red from '@/shared/assets/images/heros/textBgColors/red_cropped.webp';
import yellow from '@/shared/assets/images/heros/textBgColors/yellow.webp';
import orange from '@/shared/assets/images/heros/textBgColors/orange.webp';
import greenBg from '@/shared/assets/images/heros/textBgColors/green2.webp';
import darkBlue from '@/shared/assets/images/heros/textBgColors/dark-blue_cropped.webp';
import lightBlue from '@/shared/assets/images/heros/textBgColors/light-blue.webp';
import purpleBg from '@/shared/assets/images/heros/textBgColors/purple.webp';
import retroflector from '@/shared/assets/images/descriptionCard/retroflector.png';
import { statData } from '../model/stats/statsDataV2';
import { type GroupInfo, HeroGroup, HeroSlug } from '../types/hero';
import { buildHeroGroups } from '@/entities/Hero/model/heroGroupsData';

export const initializeHeroGroups = (t: (key: string) => string): Record<HeroGroup, GroupInfo> => {
    // Local data or overrides specific to initialize step can be defined here and merged in.
    const localData: Partial<Record<HeroGroup, GroupInfo>> = {};

    return {
        ...buildHeroGroups(t),
        ...localData,
    } as Record<HeroGroup, GroupInfo>;
};
