'use client';
import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import { GetClansResponse, useGetClansQuery } from '@/entities/Clan';
import useSizes from '@/shared/lib/hooks/useSizes';
import { getRouteOneClanPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';
import Image from 'next/image';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import { MobileCard, MobileCardLink, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import cardCls from '@/shared/ui/v2/ModularCard/ui/ModularCard.module.scss';
import mobileCardCls from '@/shared/ui/v2/MobileCard/ui/MobileCard.module.scss';
import { PageTitle } from '@/shared/ui/PageTitle';
import { SearchBar } from '../ClanLayout/ClanLayout';
import cls from './ClanAllSubPage.module.scss';
import clanLogo from '@/shared/assets/images/clanLogos/CommonSelectHeart 1.png';
import iconSpammer from '@/shared/assets/images/clanLabels/ClanLabelSpammer.png';
import iconHumorous from '@/shared/assets/images/clanLabels/ClanLabelHumorous.png';
import iconAnimalLovers from '@/shared/assets/images/clanLabels/ClanLabelAnimalLovers.png';
import iconLeaderboard from '@/shared/assets/images/clanLogos/LeaderboardWinFirstPlace.png';
import iconFlagFi from '@/shared/assets/images/clanLogos/CommonFlagFinland 1.png';
import starGray from '@/shared/assets/images/clanLogos/TopPanelMatchmakingPorvarit.png';

// use real clan labels from API when available
const MOCK_LABELS = [
    { text: 'Spämmääjä', icon: iconSpammer },
    { text: 'Humoristiset', icon: iconHumorous },
    { text: 'Eläinrakkaat', icon: iconAnimalLovers },
];

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
                            <MobileCard.Texts
                                title1={clan.name}
                                title2={''}
                            />

                            <MobileCard.Image
                                alt={`${clan.name} logo`}
                                src={clanLogo}
                                backgroundColor="transparent"
                            />

                            <MobileCard.Texts
                                title1={''}
                                title2={''}
                            >
                                <div className={mobileCardCls.ClanInfoRow}>
                                    <Image
                                        src={starGray}
                                        alt="score"
                                        className={mobileCardCls.ClanInfoIcon}
                                    />
                                    <span className={mobileCardCls.ClanInfoValue}>
                                        {clan.gameCoins}
                                    </span>
                                </div>

                                <div className={mobileCardCls.ClanMembersRow}>
                                    {t('members')} {clan.playerCount} / 30
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
                                        <Image
                                            src={iconLeaderboard}
                                            alt="leaderboard"
                                            className={cardCls.ClanInfoIcon}
                                        />
                                        <Image
                                            src={iconFlagFi}
                                            alt="flag"
                                            className={cardCls.ClanInfoIcon}
                                        />
                                    </span>

                                    <span className={cardCls.ClanInfoStats}>
                                        <span className={cardCls.ClanInfoValue}>
                                            {t('members')} {clan.playerCount} / 30
                                        </span>
                                        <span className={cardCls.ClanInfoValue}>
                                            {clan.gameCoins}
                                        </span>
                                    </span>
                                </div>

                                <div className={cardCls.ClanLabels}>
                                    {MOCK_LABELS.map((l) => (
                                        <span
                                            className={cardCls.ClanLabel}
                                            key={l.text}
                                        >
                                            <Image
                                                src={l.icon}
                                                alt={l.text}
                                            />
                                            {l.text}
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
