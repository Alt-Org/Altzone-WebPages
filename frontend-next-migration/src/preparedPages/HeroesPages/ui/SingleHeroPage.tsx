'use client';
import { HeroSlug, Hero } from '@/entities/Hero';
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

export interface Props {
    slug: HeroSlug;
}

const SingleHeroPage = (props: Props) => {
    const { slug } = props;
    const { t } = useClientTranslation('heroes');
    const heroGroups = initializeHeroGroups(t);
    const { isMobileSize, isTabletSize } = useSizes();

    // Mobile-only: state for clamping description text
    const descRef = useRef<HTMLDivElement | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [needsReadMore, setNeedsReadMore] = useState(false);

    // Determine selected hero and its group to populate localized titles
    const { titleText, hero } = useMemo<{ titleText: string; hero?: Hero }>(() => {
        // Find hero by slug across all groups
        for (const groupKey in heroGroups) {
            // @ts-ignore iterate typed enum keys safely at runtime
            const group = heroGroups[groupKey as keyof typeof heroGroups];
            const hero = group.heroes.find((hero) => hero.slug === slug);
            if (hero) {
                return {
                    titleText: group.name, // already localized via initializeHeroGroups(t)
                    hero,
                };
            }
        }
        return { titleText: '', hero: undefined };
    }, [heroGroups, slug]);

    function getSkillString(value: number): string {
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
    }

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
