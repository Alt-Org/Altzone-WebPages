'use client';
/**
 * SingleHeroPage – detail page for a single hero.
 *
 * The page retrieves hero data from initialized hero groups based on the given `slug`,
 * and renders the description, rarity class, and stats.
 *
 * Also responsible for responsive behavior:
 * - On mobile, the image is shown in a separate card and long descriptions
 *   are clamped with a "Read more" toggle.
 * - On desktop/tablet, headings and layout are two-column.
 */
import { HeroSlug, Hero, HeroWithGroup } from '@/entities/Hero';
import Image from 'next/image';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { BackButton } from '@/shared/ui/v2/BackButton';
import useSizes from '@/shared/lib/hooks/useSizes';
import cls from './SingleHeroPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import { BarIndicator } from '@/shared/ui/v2/BarIndicator';
import { useGetHeroBySlugQuery, useGetHeroStatsByHeroIdQuery } from '@/entities/Hero/model/heroApi';
import { useParams } from 'next/navigation';

/**
 * Props for `SingleHeroPage` component.
 *
 * Renders hero details for a specific hero identified by `slug`.
 */
export interface Props {
    /** Hero identifier (URL slug) used to select a hero from initialized groups */
    slug: HeroSlug;
    /** Hero data from server (optional, will fetch from Directus if not provided) */
    newSelectedHero?: HeroWithGroup;
}

/**
 * SingleHeroPage component that renders a detailed page for a hero.
 *
 * Responsibilities:
 * - Finds the hero by `slug` from groups (already localized via `initializeHeroGroups`).
 * - Displays the title, description, rarity class, and stats (`BarIndicator`).
 * - Handles responsiveness: on mobile, the description can be expanded with a "Read more" button.
 *
 * @param props - Component props
 * @param props.slug - Hero URL slug used to select the hero
 * @returns JSX element that forms the page content
 */
const SingleHeroPage = (props: Props) => {
    const { slug, newSelectedHero } = props;
    const { t } = useClientTranslation('heroes');
    const params = useParams();
    const locale = (params?.lng as 'en' | 'fi' | 'ru') || 'en';
    const { isMobileSize, isTabletSize } = useSizes();

    // Try to fetch from Directus if hero not provided from server
    const { data: directusHero } = useGetHeroBySlugQuery(
        { slug, locale },
        { skip: !!newSelectedHero },
    );
    const selectedHeroForStats = newSelectedHero || directusHero;
    const { data: directusStats } = useGetHeroStatsByHeroIdQuery(
        { heroId: selectedHeroForStats?.id as number },
        { skip: !selectedHeroForStats?.id },
    );

    // Mobile-only: state for clamping description text
    const descRef = useRef<HTMLDivElement | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [needsReadMore, setNeedsReadMore] = useState(false);

    // Determine selected hero and its group to populate localized titles
    const { titleText, hero } = useMemo<{ titleText: string; hero?: Hero }>(() => {
        // Priority: 1. Server-provided hero, 2. Directus hero, 3. Static data fallback
        const selectedHero = newSelectedHero || directusHero;
        if (selectedHero) {
            const mergedStats =
                directusStats && directusStats.length > 0 ? directusStats : selectedHero.stats;
            return {
                titleText: selectedHero.groupName,
                hero: {
                    id: selectedHero.id,
                    slug: selectedHero.slug,
                    srcImg: selectedHero.srcImg,
                    srcGif: selectedHero.srcGif,
                    alt: selectedHero.alt,
                    altGif: selectedHero.altGif,
                    title: selectedHero.title,
                    rarityClass: selectedHero.rarityClass || '',
                    description: selectedHero.description,
                    stats: mergedStats,
                },
            };
        }

        // Fallback to static data
        const heroGroups = initializeHeroGroups(t);
        for (const groupKey in heroGroups) {
            const group = heroGroups[groupKey as keyof typeof heroGroups];
            const hero = group.heroes.find((hero) => hero.slug === slug);
            if (hero) {
                return {
                    titleText: group.name,
                    hero,
                };
            }
        }
        return { titleText: '', hero: undefined };
    }, [newSelectedHero, directusHero, directusStats, slug, t]);

    /**
     * Converts a hero's skill level (`rarityClass`/value) to an i18n key.
     *
     * Mapping examples:
     * 1 -> `master`, 3 -> `expert`, 5 -> `skilled`, 10 -> `unskilled`.
     * Returns `unskilled` by default if the value is not recognized.
     *
     * @param value - Numeric skill level value
     * @returns I18n key string (e.g., `"master"`)
     */
    const getSkillString = (value: number): string => {
        const skills: { [key: number]: string } = {
            1: 'master',
            3: 'expert',
            5: 'skilled',
            6: 'competent',
            7: 'apprentice',
            8: 'beginner',
            10: 'unskilled',
        };
        return skills[value] ?? 'unskilled';
    };

    // Measure if description overflows when clamped (mobile only)
    useEffect(() => {
        if (!isMobileSize) return;
        const el = descRef.current;
        if (!el) return;
        if (isExpanded) {
            // When expanded, no need to show read more button state based on measurement
            setNeedsReadMore(true);
            return;
        }
        const check = () => {
            if (!el) return;
            // clientHeight is the visible height with clamp; scrollHeight is full content height
            setNeedsReadMore(el.scrollHeight > el.clientHeight + 10);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [isMobileSize, isExpanded, hero?.description, slug]);

    // Reset expansion when hero or viewport mode changes
    useEffect(() => {
        setIsExpanded(false);
    }, [slug, isMobileSize]);

    if (isMobileSize)
        return (
            <div className={cls.Container}>
                {hero && (
                    <>
                        <div className={classNames(cls.Card, {}, [cls.ImageCardMobile])}>
                            <div className={cls.ImageWrapper}>
                                <Image
                                    src={hero.srcImg}
                                    alt={hero.title}
                                    fill
                                    sizes="100vw"
                                    className={cls.ResponsiveImage}
                                />
                            </div>
                        </div>
                        <div className={classNames(cls.Card, {}, [cls.TextCard])}>
                            <h3 className={cls.CardTitle}>{t('character-introduction')}</h3>
                            <div className={cls.Rarity}>
                                {t('rarity')}:&nbsp;
                                <span className={cls.Bold}>{hero.rarityClass}</span>
                            </div>
                            <div
                                ref={descRef}
                                className={classNames(
                                    cls.Description,
                                    { [cls.DescriptionClamp]: !isExpanded },
                                    [],
                                )}
                            >
                                {hero.description}
                            </div>
                            {needsReadMore && !isExpanded && (
                                <button
                                    type="button"
                                    className={cls.ReadMore}
                                    onClick={() => setIsExpanded(true)}
                                >
                                    {t('read-more')}
                                </button>
                            )}
                        </div>
                        <div className={classNames(cls.Card, {}, [cls.WideCard])}>
                            <h3 className={cls.CardTitle}>{t('character-skills')}</h3>
                            <div className={cls.StatsContainerMobile}>
                                {hero.stats.map((stat) => {
                                    const label =
                                        stat.name === 'impactForce' ? 'strike' : stat.name;
                                    return (
                                        <div
                                            key={stat.name}
                                            className={cls.StatItem}
                                        >
                                            <BarIndicator
                                                label={label}
                                                value={stat.defaultLevel}
                                                developmentThreshold={t(
                                                    getSkillString(stat.rarityClass),
                                                )}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );

    return (
        <div className={cls.Container}>
            {!isTabletSize && (
                <>
                    <PageTitle
                        titleText={titleText}
                        alternate={true}
                        searchVisible={false}
                    />
                    <p className={cls.Hero}>{hero && hero.title}</p>
                    <BackButton className={cls.BackButton} />
                </>
            )}
            {hero && (
                <>
                    <div className={cls.TwoCol}>
                        <div className={cls.Col}>
                            <div className={classNames(cls.Card, {}, [cls.TextCard])}>
                                <h3 className={cls.CardTitle}>{t('character-introduction')}</h3>
                                <div className={cls.Rarity}>
                                    {t('rarity')}:&nbsp;
                                    <span className={cls.Bold}>{hero.rarityClass}</span>
                                </div>
                                <div className={cls.Description}>{hero.description}</div>
                            </div>
                        </div>
                        <div className={cls.Col}>
                            <div className={classNames(cls.Card, {}, [cls.ImageCard])}>
                                <div className={cls.ImageWrapper}>
                                    <Image
                                        src={hero.srcImg}
                                        alt={hero.title}
                                        fill
                                        className={cls.ResponsiveImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(cls.Card, {}, [cls.WideCard])}>
                        <h3 className={cls.CardTitle}>{t('character-skills')}</h3>
                        <div className={cls.StatsContainer}>
                            {hero.stats.map((stat) => {
                                const label = stat.name === 'impactForce' ? 'strike' : stat.name;
                                return (
                                    <div
                                        key={stat.name}
                                        className={cls.StatItem}
                                    >
                                        <BarIndicator
                                            label={label}
                                            value={stat.defaultLevel}
                                            developmentThreshold={t(
                                                getSkillString(stat.rarityClass),
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SingleHeroPage;
