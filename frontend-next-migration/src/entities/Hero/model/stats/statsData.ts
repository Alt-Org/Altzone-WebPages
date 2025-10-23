import { HeroSlug } from '../../types/hero';
import { HeroStats, HeroLevel } from '../../types/HeroStats';
import { sharedHeroStats } from '../../heroes/sharedStats';

export const statsData: Record<HeroSlug, Record<HeroLevel, HeroStats>> = {
    [HeroSlug.OVEREATER]: sharedHeroStats,
    [HeroSlug.PROVOCATEUR]: sharedHeroStats,
    [HeroSlug.MIRROR]: sharedHeroStats,
    [HeroSlug.RESEARCHER]: sharedHeroStats,
    [HeroSlug.CONMAN]: sharedHeroStats,
    [HeroSlug.JOKESTER]: sharedHeroStats,
    [HeroSlug.SLEEPY_SLEEPER]: sharedHeroStats,
    [HeroSlug.BELIEVER]: sharedHeroStats,
    [HeroSlug.SOUL_SISTERS]: sharedHeroStats,
    [HeroSlug.ALCOHOLIC]: sharedHeroStats,
    [HeroSlug.HATE_SPEECH]: sharedHeroStats,
    [HeroSlug.MEATWALL]: sharedHeroStats,
    [HeroSlug.VETERAN]: sharedHeroStats,
    [HeroSlug.LOVERS]: sharedHeroStats,
    [HeroSlug.SCAPEGOATER]: sharedHeroStats,
    [HeroSlug.WISEACRE]: sharedHeroStats,
    [HeroSlug.CAPITALIST]: sharedHeroStats,
    [HeroSlug.OCD]: sharedHeroStats,
    [HeroSlug.PRANKING]: sharedHeroStats,
    [HeroSlug.SEDUCER]: sharedHeroStats,
    [HeroSlug.PEOPLE_PLEASER]: sharedHeroStats,
    [HeroSlug.BULLYING]: sharedHeroStats,
};
