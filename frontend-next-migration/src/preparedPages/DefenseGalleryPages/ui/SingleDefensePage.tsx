'use client';
import { HeroGroup, Hero } from '@/entities/Hero';
import { useGetHeroGroupsQuery } from '@/entities/Hero/model/heroApi';
import Image from 'next/image';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';
import { useClientTranslation } from '@/shared/i18n';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import { classNames } from '@/shared/lib/classNames/classNames';
import React from 'react';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import useSizes from '@/shared/lib/hooks/useSizes';
import {
    DescriptionCardMobile,
    DescriptionCardMobileTheme,
} from '@/shared/ui/v2/DescriptionCardMobile';
import { MobileCard, MobileCardLink, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import search from '@/shared/assets/icons/Search.svg';
import cls from './DefenseGalleryPage.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useParams } from 'next/navigation';
import type { StaticImageData } from 'next/image';

export interface Props {
    heroGroup: HeroGroup;
}

export interface SearchBarProps {
    className: string;
    value: string;
    onChange: (value: string) => void;
}

type GroupInfoType = {
    name: string;
    description: string;
    bgColour: string;
    srcImg: string | StaticImageData;
    heroes: Hero[];
};

export const SearchBar = (props: SearchBarProps) => {
    const { className, value, onChange } = props;
    return (
        <div className={classNames(cls.SearchBar, undefined, [className])}>
            <Image
                src={search}
                alt="search icon"
                height={20}
            />
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search"
                className={cls.Input}
            />
        </div>
    );
};

interface MobileViewProps {
    heroGroup: HeroGroup;
    heroGroups: Record<HeroGroup, GroupInfoType>;
    filteredHeroes: Hero[];
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

const MobileView = ({
    heroGroup,
    heroGroups,
    filteredHeroes,
    searchQuery,
    setSearchQuery,
}: MobileViewProps) => {
    const group = heroGroups[heroGroup];
    return (
        <div>
            <SearchBar
                className={cls.SearchBarMobile}
                value={searchQuery}
                onChange={setSearchQuery}
            />
            <div style={{ marginBottom: '1em' }}>
                <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                    <DescriptionCardMobile.Texts title={group?.name || ''}>
                        {group?.description || ''}
                    </DescriptionCardMobile.Texts>
                    <DescriptionCardMobile.Image
                        src={group?.srcImg || ''}
                        alt={group?.name || ''}
                        backgroundColor={group?.bgColour || '#000'}
                    />
                </DescriptionCardMobile>
            </div>
            <div className={cls.MobileCardContainer}>
                {filteredHeroes.map((hero: Hero, index: number) => (
                    <MobileCardLink
                        key={index}
                        path={`/heroes/${hero.slug}`}
                        ariaLabel={`link to ${hero.title} page`}
                        withScalableLink={true}
                    >
                        <MobileCard theme={MobileCardTheme.DEFENSEGALLERY}>
                            <MobileCard.Texts
                                title1={group?.name || ''}
                                title2={hero.title}
                            />
                            <MobileCard.Image
                                backgroundColor={group?.bgColour || '#000'}
                                src={hero.srcImg}
                                alt={hero.title}
                            />
                        </MobileCard>
                    </MobileCardLink>
                ))}
            </div>
        </div>
    );
};

interface DesktopViewProps {
    heroGroup: HeroGroup;
    heroGroups: Record<HeroGroup, GroupInfoType>;
    filteredHeroes: Hero[];
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    isTabletSize: boolean;
    t: (key: string) => string;
}

const DesktopView = ({
    heroGroup,
    heroGroups,
    filteredHeroes,
    searchQuery,
    setSearchQuery,
    isTabletSize,
    t,
}: DesktopViewProps) => {
    const group = heroGroups[heroGroup];
    return (
        <div className={cls.Container}>
            {isTabletSize ? (
                <SearchBar
                    className={cls.SearchBarTablet}
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            ) : (
                <div className={cls.TitleBar}>
                    <PageTitle
                        titleText={t('defense-gallery')}
                        alternate={true}
                        searchVisible={false}
                    />
                    <SearchBar
                        className={cls.SearchBarDesktop}
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>
            )}
            <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>{group?.name || ''}</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        {group?.description || ''}
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image bgColour={group?.bgColour || '#000'}>
                    <DescriptionCard.Image.Triangle />
                    <DescriptionCard.Image.Image
                        src={group?.srcImg || ''}
                        alt={group?.name || ''}
                        height={100}
                        marginLeft="20%"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
            <div className={cls.DesktopCardContainer}>
                {filteredHeroes.map((hero: Hero, index: number) => (
                    <div
                        key={index}
                        style={{ width: 'calc(50% - .5em)' }}
                    >
                        <ModularCard
                            theme={ModularCardTheme.DEFENSECARD}
                            withScalableLink={true}
                            path={`/heroes/${hero.slug}`}
                            height="150px"
                        >
                            <ModularCard.Texts>
                                <ModularCard.Texts.Title>
                                    {group?.name || ''}
                                </ModularCard.Texts.Title>
                                <ModularCard.Texts.Body>{hero.title}</ModularCard.Texts.Body>
                            </ModularCard.Texts>
                            <ModularCard.Image
                                style={
                                    {
                                        '--before-color': group?.bgColour || '#000',
                                    } as React.CSSProperties
                                }
                            >
                                <ModularCard.Image.Image
                                    src={hero.srcImg}
                                    alt={hero.title}
                                />
                            </ModularCard.Image>
                        </ModularCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

function getLocaleFromParams(params: ReturnType<typeof useParams>): 'en' | 'fi' | 'ru' {
    const lng = (params?.lng as string) || 'en';
    if (lng === 'en') return 'en';
    if (lng === 'fi') return 'fi';
    return 'ru';
}

function useHeroGroupsWithFallback(
    locale: 'en' | 'fi' | 'ru',
    t: (key: string) => string,
): Record<HeroGroup, GroupInfoType> {
    const { data: directusGroups, isError, error } = useGetHeroGroupsQuery({ locale });
    const staticGroups = React.useMemo(() => initializeHeroGroups(t), [t]);
    // Use Directus data only if it exists, has keys, and there's no error
    const hasDirectusData = !isError && directusGroups && Object.keys(directusGroups).length > 0;
    if (isError) {
        // eslint-disable-next-line no-console
        console.warn(
            '[useHeroGroupsWithFallback] Directus query failed, using static data:',
            error,
        );
    }
    return React.useMemo(
        () => (hasDirectusData ? directusGroups : staticGroups),
        [hasDirectusData, directusGroups, staticGroups],
    );
}

function filterHeroesByQuery(
    heroGroups: Record<HeroGroup, GroupInfoType>,
    heroGroup: HeroGroup,
    searchQuery: string,
): Hero[] {
    const group = heroGroups[heroGroup];
    if (!group) return [];
    if (!searchQuery.trim()) return group.heroes;

    const query = searchQuery.toLowerCase();
    const matchesQuery = (hero: Hero) =>
        hero.title.toLowerCase().includes(query) || group.name.toLowerCase().includes(query);
    return group.heroes.filter(matchesQuery);
}

const SingleDefensePage = (props: Props) => {
    const { heroGroup } = props;
    const { t } = useClientTranslation('heroes');
    const params = useParams();
    const locale = getLocaleFromParams(params);
    const heroGroups = useHeroGroupsWithFallback(locale, t);
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredHeroes = React.useMemo(
        () => filterHeroesByQuery(heroGroups, heroGroup, searchQuery),
        [searchQuery, heroGroup, heroGroups],
    );

    if (isMobileSize) {
        return (
            <MobileView
                heroGroup={heroGroup}
                heroGroups={heroGroups}
                filteredHeroes={filteredHeroes}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        );
    }

    return (
        <DesktopView
            heroGroup={heroGroup}
            heroGroups={heroGroups}
            filteredHeroes={filteredHeroes}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isTabletSize={isTabletSize}
            t={t}
        />
    );
};

export default SingleDefensePage;
