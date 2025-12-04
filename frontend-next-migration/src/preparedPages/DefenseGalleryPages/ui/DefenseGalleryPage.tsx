'use client';
import {
    DescriptionCardMobile,
    DescriptionCardMobileTheme,
} from '@/shared/ui/v2/DescriptionCardMobile';
import useSizes from '@/shared/lib/hooks/useSizes';
import defenceGalleryMobile from '@/shared/assets/images/descriptionCard/defense_gallery_mobile.png';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import defenceGallery from '@/shared/assets/images/descriptionCard/defense_gallery.png';
import cls from './DefenseGalleryPage.module.scss';
import React from 'react';
import { SearchBar } from './SingleDefensePage';
import { useClientTranslation } from '@/shared/i18n';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';
import { Hero } from '@/entities/Hero';
import { MobileCard, MobileCardLink, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import { PageTitle } from '@/shared/ui/PageTitle';

const DefenseGalleryPage = () => {
    const { isMobileSize, isTabletSize } = useSizes();
    const [searchQuery, setSearchQuery] = React.useState('');
    const { t } = useClientTranslation('heroes');
    const heroGroups = initializeHeroGroups(t);

    // Create an array of all heroes with their group information
    const allHeroesWithGroups = React.useMemo(() => {
        const result: {
            hero: Hero;
            groupName: string;
            groupBgColor: string;
        }[] = [];
        Object.entries(heroGroups).forEach(([_, groupInfo]) => {
            groupInfo.heroes.forEach((hero) => {
                result.push({
                    hero,
                    groupName: groupInfo.name,
                    groupBgColor: groupInfo.bgColour,
                });
            });
        });
        return result;
    }, [heroGroups]);

    const filteredHeroes = React.useMemo(() => {
        if (!searchQuery.trim()) {
            return allHeroesWithGroups;
        }

        const query = searchQuery.toLowerCase();
        return allHeroesWithGroups.filter(
            ({ hero, groupName }) =>
                hero.title.toLowerCase().includes(query) || groupName.toLowerCase().includes(query),
        );
    }, [searchQuery, allHeroesWithGroups]);

    return isMobileSize ? (
        <div>
            <SearchBar
                className={cls.SearchBarMobile}
                value={searchQuery}
                onChange={setSearchQuery}
            />
            <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                <DescriptionCardMobile.Texts title={t('defense-gallery')}>
                    {t('defense-gallery-description')}
                </DescriptionCardMobile.Texts>
                <DescriptionCardMobile.Image
                    src={defenceGalleryMobile}
                    alt="defence gallery"
                />
            </DescriptionCardMobile>
            <div className={cls.MobileCardContainer}>
                {filteredHeroes.map(({ hero, groupName, groupBgColor }, index) => (
                    <MobileCardLink
                        key={index}
                        path={`/heroes/${hero.slug}`}
                        ariaLabel={`link to ${hero.title} page`}
                        withScalableLink={true}
                    >
                        <MobileCard theme={MobileCardTheme.DEFENSEGALLERY}>
                            <MobileCard.Texts
                                title1={groupName}
                                title2={hero.title}
                            />
                            <MobileCard.Image
                                backgroundColor={groupBgColor}
                                src={hero.srcImg}
                                alt={hero.title}
                            />
                        </MobileCard>
                    </MobileCardLink>
                ))}
            </div>
        </div>
    ) : (
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
                <DescriptionCard.Texts width="35%">
                    <DescriptionCard.Texts.Title>
                        {t('defense-gallery')}
                    </DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        {t('defense-gallery-description')}
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image width="65%">
                    <DescriptionCard.Image.Image
                        src={defenceGallery}
                        alt="defence gallery"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
            <div className={cls.DesktopCardContainer}>
                {filteredHeroes.map(({ hero, groupName, groupBgColor }, index) => (
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
                                <ModularCard.Texts.Title>{groupName}</ModularCard.Texts.Title>
                                <ModularCard.Texts.Body>{hero.title}</ModularCard.Texts.Body>
                            </ModularCard.Texts>
                            <ModularCard.Image
                                style={
                                    {
                                        '--before-color': groupBgColor,
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
export default DefenseGalleryPage;
