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
import { SearchInput } from '@/features/Search';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './ClanAllSubPage.module.scss';
import clanLogo from '@/shared/assets/images/clanLogos/CommonSelectHeart 1.png';
import iconSpammer from '@/shared/assets/images/clanLabels/ClanLabelSpammer.png';
import iconHumorous from '@/shared/assets/images/clanLabels/ClanLabelHumorous.png';
import iconAnimalLovers from '@/shared/assets/images/clanLabels/ClanLabelAnimalLovers.png';
import iconLeaderboard from '@/shared/assets/images/clanLogos/LeaderboardWinFirstPlace.png';
import iconFlagFi from '@/shared/assets/images/clanLogos/CommonFlagFinland 1.png';
import starGray from '@/shared/assets/images/clanLogos/TopPanelMatchmakingPorvarit.png';

const labels = [
    { text: 'Spämmääjät', icon: iconSpammer },
    { text: 'Humoristiset', icon: iconHumorous },
    { text: 'Eläinrakkaat', icon: iconAnimalLovers },
];

const ClanAllSubPage = () => {
    const [searchRaw, setSearchRaw] = useState('');
    const [currentSearch, setSearch] = useState('');
    const { isMobileSize } = useSizes();

    useEffect(() => {
        const id = setTimeout(() => {
            setSearch(searchRaw ? convertToQuerySearch(searchRaw) : '');
        });
        return () => clearTimeout(id);
    }, [searchRaw]);

    const router = useRouter();
    const { t } = useClientTranslation('clan');
    const { data: clans, error } = useGetClansQuery({ page: 1, search: currentSearch });

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

    if (error) {
        return (
            <>
                <ClansSearch
                    value={searchRaw}
                    onChange={(e) => setSearchRaw(e.target.value)}
                />
                <h2 className={cls.noResults}>{t('no_result')}</h2>
            </>
        );
    }

    if (clans) {
        return (
            <>
                {isMobileSize ? (
                    <>
                        <PageTitle
                            titleText={t('browse-clans')}
                            alternate={true}
                            searchVisible={false}
                        />
                        <ClansSearch
                            value={searchRaw}
                            onChange={(e) => setSearchRaw(e.target.value)}
                            className={cls.SearchBarMobile}
                        />
                    </>
                ) : (
                    <div className={cls.TitleBar}>
                        <PageTitle
                            titleText={t('browse-clans')}
                            alternate={true}
                            searchVisible={false}
                        />
                        <ClansSearch
                            value={searchRaw}
                            onChange={(e) => setSearchRaw(e.target.value)}
                            className={cls.SearchBarDesktop}
                        />
                    </div>
                )}

                {isMobileSize ? (
                    <ClansViewMobile
                        clanServerResponse={clans}
                        onClickToClan={onClickToClan}
                    />
                ) : (
                    <ClansViewDesktop
                        clanServerResponse={clans}
                        onClickToClan={onClickToClan}
                    />
                )}
            </>
        );
    }

    return null;
};

type SearchProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};

const ClansSearch = ({ value, onChange, className }: SearchProps) => {
    return (
        <div className={className}>
            <SearchInput
                value={value}
                onChange={onChange}
            />
        </div>
    );
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
                    <MobileCardLink
                        key={clan._id}
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
                                <div className="ScoreRow">
                                    <div className="MetaItem Score">
                                        <Image
                                            src={starGray}
                                            alt="score"
                                            width={16}
                                            height={16}
                                        />
                                    </div>
                                    <div className="MetaItem Coins">
                                        <span className="Value">
                                            {typeof clan.gameCoins === 'number'
                                                ? clan.gameCoins
                                                : idx + 1}
                                        </span>
                                    </div>
                                </div>

                                <div className="MetaItem Members">
                                    <span className="Value">
                                        {t('members')} {clan.playerCount} / 30
                                    </span>
                                </div>
                            </MobileCard.Texts>
                        </MobileCard>
                    </MobileCardLink>
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
                            height="170px"
                            withScalableLink
                        >
                            <ModularCard.Texts>
                                <ModularCard.Texts.Title>{clan.name}</ModularCard.Texts.Title>

                                <ModularCard.Texts.Body>
                                    <div className="Meta">
                                        <span className="MetaItem">
                                            <Image
                                                src={iconLeaderboard}
                                                alt="leaderboard"
                                                width={18}
                                                height={18}
                                            />
                                        </span>

                                        <span className="MetaItem">
                                            <Image
                                                src={iconFlagFi}
                                                alt="flag"
                                                width={18}
                                                height={18}
                                            />
                                            <span className="Value">
                                                {t('members')} {clan.playerCount} / 30
                                            </span>
                                            <span className="Value">
                                                {typeof clan.gameCoins === 'number'
                                                    ? clan.gameCoins
                                                    : idx + 1}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="Labels">
                                        {labels.map((l) => (
                                            <span
                                                className="Label"
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
