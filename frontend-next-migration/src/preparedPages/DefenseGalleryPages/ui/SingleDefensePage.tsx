'use client';
import { HeroGroup } from '@/entities/Hero';
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
import { cls } from '@/preparedPages/DefenseGalleryPages';

export interface Props {
    heroGroup: HeroGroup;
}
export interface SearchBarProps {
    className: string;
    value: string;
    onChange: (value: string) => void;
}
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
const SingleDefensePage = (props: Props) => {
    const { heroGroup } = props;
    const { t } = useClientTranslation('heroes');
    const heroGroups = initializeHeroGroups(t);
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredHeroes = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return heroGroups[heroGroup].heroes;
        }

        const query = searchQuery.toLowerCase();
        return heroGroups[heroGroup].heroes.filter(
            (hero) =>
                hero.title.toLowerCase().includes(query) ||
                heroGroups[heroGroup].name.toLowerCase().includes(query),
        );
    }, [searchQuery, heroGroup, heroGroups]);

    if (isMobileSize)
        return (
            <div>
                <SearchBar
                    className={cls.SearchBarMobile}
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
                <div style={{ marginBottom: '1em' }}>
                    <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                        <DescriptionCardMobile.Texts title={heroGroups[heroGroup].name}>
                            {heroGroups[heroGroup].description}
                        </DescriptionCardMobile.Texts>
                        <DescriptionCardMobile.Image
                            src={heroGroups[heroGroup].srcImg}
                            alt={heroGroups[heroGroup].name}
                            backgroundColor={heroGroups[heroGroup].bgColour}
                        />
                    </DescriptionCardMobile>
                </div>
                <div className={cls.MobileCardContainer}>
                    {filteredHeroes.map((hero, index) => (
                        <MobileCardLink
                            key={index}
                            path={`/heroes/${hero.slug}`}
                            ariaLabel={`link to ${hero.title} page`}
                            withScalableLink={true}
                        >
                            <MobileCard theme={MobileCardTheme.DEFENSEGALLERY}>
                                <MobileCard.Texts
                                    title1={heroGroups[heroGroup].name}
                                    title2={hero.title}
                                />
                                <MobileCard.Image
                                    backgroundColor={heroGroups[heroGroup].bgColour}
                                    src={hero.srcImg}
                                    alt={hero.title}
                                />
                            </MobileCard>
                        </MobileCardLink>
                    ))}
                </div>
            </div>
        );
    return (
        <div
            style={{
                marginRight: isTabletSize ? 'auto' : '3em',
                marginLeft: isTabletSize ? 'auto' : '1em',
            }}
        >
            {isTabletSize ? (
                <SearchBar
                    className={cls.SearchBarTablet}
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
            ) : (
                <div className={cls.TitleBar}>
                    <h1 className={cls.Title}>{t('defense-gallery')}</h1>
                    <SearchBar
                        className={cls.SearchBarDesktop}
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>
            )}
            <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>
                        {heroGroups[heroGroup].name}
                    </DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        {heroGroups[heroGroup].description}
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image bgColour={heroGroups[heroGroup].bgColour}>
                    <DescriptionCard.Image.Triangle />
                    <DescriptionCard.Image.Image
                        src={heroGroups[heroGroup].srcImg}
                        alt={heroGroups[heroGroup].name}
                        height={100}
                        marginLeft="20%"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
            <div className={cls.DesktopCardContainer}>
                {filteredHeroes.map((hero, index) => (
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
                                    {heroGroups[heroGroup].name}
                                </ModularCard.Texts.Title>
                                <ModularCard.Texts.Body>{hero.title}</ModularCard.Texts.Body>
                            </ModularCard.Texts>
                            <ModularCard.Image
                                style={
                                    {
                                        '--before-color': heroGroups[heroGroup].bgColour,
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

export default SingleDefensePage;
