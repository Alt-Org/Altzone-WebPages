'use client';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { GetClansResponse, useGetClansQuery } from '@/entities/Clan';
import Image from 'next/image';
import useSizes from '@/shared/lib/hooks/useSizes';
import { getRouteOneClanPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import { MobileCard, MobileCardLink, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import { getClanLabelIcon } from '@/entities/Clan/config/clanLabelIcons';
import { getClanLanguageIcon } from '@/entities/Clan/config/clanLanguageIcons';
import cardCls from '@/shared/ui/v2/ModularCard/ui/ModularCard.module.scss';
import mobileCardCls from '@/shared/ui/v2/MobileCard/ui/MobileCard.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import { SearchBar } from '../ClanLayout/ClanLayout';
import cls from './ClanAllSubPage.module.scss';
import clanLogo from '@/shared/assets/images/clanLogos/ClanLogo_Placeholder.png';
import iconLockClosed from '@/shared/assets/images/clanLogos/lock.png';
import iconClanAgeTeenages from '@/shared/assets/images/clanLogos/ClanAgeTeenages.png';

type ClanItem = GetClansResponse['data']['Clan'][number];

const ClanAllSubPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { isMobileSize, isTabletSize } = useSizes();
    const router = useRouter();
    const { t } = useClientTranslation('clan');
    const { data: clansResponse } = useGetClansQuery({ page: 1 });

    const filteredClans = useMemo(() => {
        if (!clansResponse) return [];

        const allClans = clansResponse.data.Clan;
        const query = searchQuery.trim().toLowerCase();

        if (!query) return allClans;

        return allClans.filter((clan) => clan.name.toLowerCase().includes(query));
    }, [clansResponse, searchQuery]);

    const onClickToClan = (id: string) => {
        router.push(getRouteOneClanPage(id));
    };

    if (!clansResponse) {
        return null;
    }

    return (
        <div className={cls.Container}>
            {isMobileSize ? (
                <>
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        wrapperClassName={`${cls.SearchBar} ${cls.SearchBarMobile}`}
                        inputClassName={cls.Input}
                    />
                    <ClansViewMobile clans={filteredClans} />
                </>
            ) : isTabletSize ? (
                <>
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        wrapperClassName={`${cls.SearchBar} ${cls.SearchBarTablet}`}
                        inputClassName={cls.Input}
                    />
                    <ClansViewDesktop
                        clans={filteredClans}
                        onClickToClan={onClickToClan}
                    />
                </>
            ) : (
                <>
                    <div className={cls.TitleBar}>
                        <PageTitle
                            titleText={t('clans')}
                            alternate
                            searchVisible={false}
                        />
                        <SearchBar
                            value={searchQuery}
                            onChange={setSearchQuery}
                            wrapperClassName={`${cls.SearchBar} ${cls.SearchBarDesktop}`}
                            inputClassName={cls.Input}
                        />
                    </div>
                    <ClansViewDesktop
                        clans={filteredClans}
                        onClickToClan={onClickToClan}
                    />
                </>
            )}
        </div>
    );
};

type MobileProps = {
    clans: ClanItem[];
};

const ClansViewMobile = ({ clans }: MobileProps) => {
    const { t } = useClientTranslation('clan');

    return (
        <div className={cls.MobileCardContainer}>
            {clans.map((clan) => (
                <div
                    key={clan._id}
                    className={cls.MobileCardItemWrap}
                >
                    <MobileCardLink
                        path={getRouteOneClanPage(clan._id)}
                        ariaLabel={`Open clan ${clan.name}`}
                        withScalableLink
                        className={cls.MobileCardItem}
                    >
                        <MobileCard theme={MobileCardTheme.CLAN}>
                            <MobileCard.Image
                                alt={`${clan.name} logo`}
                                src={clanLogo}
                                backgroundColor="transparent"
                            />

                            <MobileCard.Texts
                                title1={clan.name}
                                title2={``}
                            >
                                <div className={mobileCardCls.ClanInfoRow}>
                                    <span className={mobileCardCls.ClanInfoBadges}>
                                        {/* Status badges: render based on backend data */}
                                        {clan.isOpen === false && (
                                            <span title={t('badge_closed')}>
                                                <Image
                                                    src={iconLockClosed}
                                                    alt={t('badge_closed')}
                                                    className={mobileCardCls.ClanInfoIcon}
                                                />
                                            </span>
                                        )}

                                        {clan.ageRange === 'Adults' && (
                                            <span title={t('badge_adults')}>
                                                <Image
                                                    src={iconClanAgeTeenages}
                                                    alt={t('badge_adults')}
                                                    className={mobileCardCls.ClanInfoIcon}
                                                />
                                            </span>
                                        )}

                                        {(() => {
                                            const languageIcon = getClanLanguageIcon(clan.language);
                                            return languageIcon ? (
                                                <span title={`${t('language')}: ${clan.language}`}>
                                                    <Image
                                                        src={languageIcon}
                                                        alt={clan.language ?? t('language')}
                                                        className={mobileCardCls.ClanInfoIcon}
                                                    />
                                                </span>
                                            ) : null;
                                        })()}
                                    </span>
                                </div>

                                <div className={mobileCardCls.ClanInfoStats}>
                                    <p className={mobileCardCls.ClanInfoValue}>
                                        {t('members')} {clan.playerCount} / 30
                                    </p>
                                    <p className={mobileCardCls.ClanInfoValue}>
                                        {t('position')} {clan.positionLeaderboard ?? '-'}
                                    </p>
                                </div>

                                <div className={mobileCardCls.ClanLabels}>
                                    {clan.labels?.slice(0, 3).map((label) => (
                                        <span
                                            className={mobileCardCls.ClanLabel}
                                            key={label}
                                            title={label}
                                        >
                                            <Image
                                                src={getClanLabelIcon(label)}
                                                alt={label}
                                            />
                                        </span>
                                    ))}
                                </div>
                            </MobileCard.Texts>
                        </MobileCard>
                    </MobileCardLink>
                </div>
            ))}
        </div>
    );
};

type DesktopProps = {
    clans: ClanItem[];
    onClickToClan?: (id: string) => void;
};

const ClansViewDesktop = ({ clans, onClickToClan }: DesktopProps) => {
    const { t } = useClientTranslation('clan');

    return (
        <div className={cls.DesktopCardContainer}>
            {clans.map((clan) => (
                <div
                    key={clan._id}
                    style={{ width: 'calc(50% - .5em)' }}
                >
                    <ModularCard
                        theme={ModularCardTheme.CLANCARD}
                        onClick={() => onClickToClan?.(clan._id)}
                        role="button"
                        tabIndex={0}
                        withScalableLink
                    >
                        <ModularCard.Texts>
                            <ModularCard.Texts.Title>{clan.name}</ModularCard.Texts.Title>

                            <ModularCard.Texts.Body>
                                <div className={cardCls.ClanInfoRow}>
                                    <span className={cardCls.ClanInfoBadges}>
                                        {clan.isOpen === false && (
                                            <span title={t('badge_closed')}>
                                                <Image
                                                    src={iconLockClosed}
                                                    alt={t('badge_closed')}
                                                    className={cardCls.ClanInfoIcon}
                                                />
                                            </span>
                                        )}

                                        {clan.ageRange === 'Adults' && (
                                            <span title={t('badge_adults')}>
                                                <Image
                                                    src={iconClanAgeTeenages}
                                                    alt={t('badge_adults')}
                                                    className={cardCls.ClanInfoIcon}
                                                />
                                            </span>
                                        )}

                                        {(() => {
                                            const languageIcon = getClanLanguageIcon(clan.language);
                                            return languageIcon ? (
                                                <span title={`${t('language')}: ${clan.language}`}>
                                                    <Image
                                                        src={languageIcon}
                                                        alt={clan.language ?? t('language')}
                                                        className={cardCls.ClanInfoIcon}
                                                    />
                                                </span>
                                            ) : null;
                                        })()}
                                    </span>
                                </div>
                                <div className={cardCls.ClanInfoStats}>
                                    <span className={cardCls.ClanInfoValue}>
                                        {t('members')} {clan.playerCount} / 30
                                    </span>
                                    <span className={cardCls.ClanInfoValue}>
                                        {t('position')} {clan.positionLeaderboard ?? '-'}
                                    </span>
                                </div>
                                <div className={cardCls.ClanLabels}>
                                    {/* Display 4 labels */}
                                    {clan.labels?.slice(0, 4).map((label) => (
                                        <span
                                            className={cardCls.ClanLabel}
                                            key={label}
                                            title={label}
                                        >
                                            <Image
                                                src={getClanLabelIcon(label)}
                                                alt={label}
                                                className={cardCls.ClanLabelIcon}
                                            />
                                        </span>
                                    ))}
                                </div>
                            </ModularCard.Texts.Body>
                        </ModularCard.Texts>

                        <ModularCard.Image>
                            <ModularCard.Image.Image
                                src={clanLogo}
                                alt={`${clan.name} logo`}
                            />
                        </ModularCard.Image>
                    </ModularCard>
                </div>
            ))}
        </div>
    );
};

export default ClanAllSubPage;
