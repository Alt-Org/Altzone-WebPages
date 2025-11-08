'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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

const labels = [
    { text: 'Spämmääjä', icon: iconSpammer },
    { text: 'Humoristiset', icon: iconHumorous },
    { text: 'Eläinrakkaat', icon: iconAnimalLovers },
];

const ClanAllSubPage = () => {
    const [searchRaw, setSearchRaw] = useState('');
    const [currentSearch, setSearch] = useState('');
    const { isMobileSize, isTabletSize } = useSizes();

    useEffect(() => {
        const id = setTimeout(() => {
            setSearch(searchRaw ? convertToQuerySearch(searchRaw) : '');
        }, 0);
        return () => clearTimeout(id);
    }, [searchRaw]);

    const router = useRouter();
    const { t } = useClientTranslation('clan');
    const { data: clans } = useGetClansQuery({ page: 1, search: currentSearch });

    const onClickToClan = (id: string) => {
        router.push(getRouteOneClanPage(id));
    };

    // Temporary way to convert search query value to case-insensitive in front
    const convertToQuerySearch = (search: string): string => {
        // Converts value "testi" to: 'name=".*[tT][eE][sS][tT][iI].*"'
        const cleanValue = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const convertedValue = cleanValue
            .split('')
            .map((char) => `[${char.toLowerCase()}${char.toUpperCase()}]`)
            .join('');
        const querySearch = `name=".*${convertedValue}.*"`;
        return querySearch;
    };

    if (clans) {
        return (
            <div className={cls.Container}>
                {isMobileSize ? (
                    <>
                        <SearchBar
                            value={searchRaw}
                            onChange={setSearchRaw}
                            wrapperClassName={`${cls.SearchBar} ${cls.SearchBarMobile}`}
                            inputClassName={cls.Input}
                        />
                        <ClansViewMobile
                            clanServerResponse={clans}
                            onClickToClan={onClickToClan}
                        />
                    </>
                ) : isTabletSize ? (
                    <>
                        <SearchBar
                            value={searchRaw}
                            onChange={setSearchRaw}
                            wrapperClassName={`${cls.SearchBar} ${cls.SearchBarTablet}`}
                            inputClassName={cls.Input}
                        />
                        <ClansViewDesktop
                            clanServerResponse={clans}
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
                                value={searchRaw}
                                onChange={setSearchRaw}
                                wrapperClassName={`${cls.SearchBar} ${cls.SearchBarDesktop}`}
                                inputClassName={cls.Input}
                            />
                        </div>
                        <ClansViewDesktop
                            clanServerResponse={clans}
                            onClickToClan={onClickToClan}
                        />
                    </>
                )}
            </div>
        );
    }

    return null;
};

type MobileProps = {
    clanServerResponse: GetClansResponse;
    onClickToClan?: (id: string) => void;
};

const ClansViewMobile = ({ clanServerResponse, onClickToClan }: MobileProps) => {
    const onClick = (id: string) => {
        if (onClickToClan) onClickToClan(id);
    };
    const { t } = useClientTranslation('clan');

    return (
        <div>
            <div className={cls.MobileCardContainer}>
                {clanServerResponse.data.Clan.map((clan, idx) => (
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
                                    <div className={mobileCardCls.ClanScoreRow}>
                                        <Image
                                            src={starGray}
                                            alt="score"
                                            width={18}
                                            height={18}
                                            className={mobileCardCls.ClanScoreStarIcon}
                                        />
                                        <span className={mobileCardCls.ClanScoreValue}>
                                            {typeof clan.gameCoins === 'number'
                                                ? clan.gameCoins
                                                : idx + 1}
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
        </div>
    );
};

type DesktopProps = {
    clanServerResponse: GetClansResponse;
    onClickToClan?: (id: string) => void;
};

const ClansViewDesktop = ({ clanServerResponse, onClickToClan }: DesktopProps) => {
    const { t } = useClientTranslation('clan');

    const onClick = (id: string) => {
        if (onClickToClan) onClickToClan(id);
    };

    return (
        <div>
            <div className={cls.DesktopCardContainer}>
                {clanServerResponse.data.Clan.map((clan, idx) => (
                    <div
                        key={clan._id}
                        style={{ width: 'calc(50% - .5em)' }}
                    >
                        <ModularCard
                            theme={ModularCardTheme.CLAN}
                            onClick={() => onClickToClan?.(clan._id)}
                            role="button"
                            tabIndex={0}
                            withScalableLink
                        >
                            <ModularCard.Texts>
                                <ModularCard.Texts.Title>{clan.name}</ModularCard.Texts.Title>

                                <ModularCard.Texts.Body>
                                    <div className={cardCls.ClanMeta}>
                                        <span className={cardCls.ClanMetaItem}>
                                            <Image
                                                src={iconLeaderboard}
                                                alt="leaderboard"
                                                width={18}
                                                height={18}
                                                className={cardCls.ClanMetaIcon}
                                            />
                                            <Image
                                                src={iconFlagFi}
                                                alt="flag"
                                                width={18}
                                                height={18}
                                                className={cardCls.ClanMetaIcon}
                                            />
                                        </span>

                                        <span className={cardCls.ClanMetaItem}>
                                            <span className={cardCls.ClanMetaValue}>
                                                {t('members')} {clan.playerCount} / 30
                                            </span>
                                            <span className={cardCls.ClanMetaValue}>
                                                {typeof clan.gameCoins === 'number'
                                                    ? clan.gameCoins
                                                    : idx + 1}
                                            </span>
                                        </span>
                                    </div>

                                    <div className={cardCls.ClanLabels}>
                                        {labels.map((l) => (
                                            <span
                                                className={cardCls.ClanLabel}
                                                key={l.text}
                                            >
                                                <Image
                                                    src={l.icon}
                                                    alt={l.text}
                                                    width={16}
                                                    height={16}
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
        </div>
    );
};

export default ClanAllSubPage;
