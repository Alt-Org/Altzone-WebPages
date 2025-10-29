'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GetClansResponse, useGetClansQuery } from '@/entities/Clan';
import useSizes from '@/shared/lib/hooks/useSizes';
import { getRouteOneClanPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';
import Image from 'next/image';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import { MobileCard, MobileCardLink, MobileCardTheme } from '@/shared/ui/v2/MobileCard';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearch, setSearch] = useState('');
    const { isMobileSize, isTabletSize } = useSizes();

    const router = useRouter();
    const { t } = useClientTranslation('clan');
    const { data: clans, error } = useGetClansQuery({ page: currentPage, search: currentSearch });

    const onClickToClan = (id: string) => {
        router.push(getRouteOneClanPage(id));
    };

    const onClickToPage = (page: number) => {
        setCurrentPage(page);
    };

    const onClickToSearch = (search: string) => {
        setSearch(convertToQuerySearch(search));
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
                <h1 className={cls.titleText}>{t('clans_title')}</h1>
                <ClansSearch onClickToSearch={onClickToSearch} />
                <h2 className={cls.noResults}>{t('no_result')}</h2>
            </>
        );
    }

    if (clans) {
        return (
            <>
                <h1 className={cls.titleText}>{t('clans_title')}</h1>
                <ClansSearch onClickToSearch={onClickToSearch} />
                {isMobileSize ? (
                    <ClansViewMobile
                        clanServerResponse={clans}
                        onClickToClan={onClickToClan}
                        onClickToPage={onClickToPage}
                    />
                ) : (
                    <ClansViewDesktop
                        clanServerResponse={clans}
                        onClickToClan={onClickToClan}
                        onClickToPage={onClickToPage}
                    />
                )}
            </>
        );
    }

    return null;
};

type SearchProps = { onClickToSearch?: (search: string) => void };

const ClansSearch = ({ onClickToSearch }: SearchProps) => {
    const { t } = useClientTranslation('clan');

    const onClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchField = document.querySelector<HTMLInputElement>('#search');
        if (onClickToSearch && searchField) onClickToSearch(searchField.value);
    };

    return (
        <form onSubmit={onClickSearch}>
            <input
                name="search"
                placeholder={t('search_placeholder')}
                type="text"
                id="search"
            />
            <Button
                type="submit"
                theme={ButtonTheme.BACKGROUND}
                size={ButtonSize.M}
                className={cls.BtnGame}
                square={false}
            >
                Find
            </Button>
        </form>
    );
};

type PaginationProps = {
    currentPage: number;
    disablePrev: boolean;
    disableNext: boolean;
    onPrev: () => void;
    onNext: () => void;
};

const Pagination = ({ currentPage, disablePrev, disableNext, onPrev, onNext }: PaginationProps) => {
    return (
        <div>
            <Button
                onClick={onPrev}
                theme={ButtonTheme.BACKGROUND}
                size={ButtonSize.M}
                className={cls.BtnGame}
                square={false}
                disabled={disablePrev}
            >
                Back
            </Button>
            {currentPage}
            <Button
                onClick={onNext}
                theme={ButtonTheme.BACKGROUND}
                size={ButtonSize.M}
                className={cls.BtnGame}
                square={false}
                disabled={disableNext}
            >
                Next
            </Button>
        </div>
    );
};

type MobileProps = {
    clanServerResponse: GetClansResponse;
    onClickToClan?: (id: string) => void;
    onClickToPage?: (page: number) => void;
};

const ClansViewMobile = ({ clanServerResponse, onClickToClan, onClickToPage }: MobileProps) => {
    const onClick = (id: string) => {
        if (onClickToClan) onClickToClan(id);
    };
    const { t } = useClientTranslation('clan');
    const onClickPage = (page: number) => {
        if (onClickToPage) onClickToPage(page);
    };

    const { currentPage, pageCount } = clanServerResponse.paginationData;
    const disablePrev = currentPage === 1;
    const disableNext = pageCount === undefined;

    return (
        <>
            <Pagination
                currentPage={currentPage}
                disablePrev={disablePrev}
                disableNext={disableNext}
                onPrev={() => onClickPage(currentPage - 1)}
                onNext={() => onClickPage(currentPage + 1)}
            />
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
        </>
    );
};

type DesktopProps = {
    clanServerResponse: GetClansResponse;
    onClickToClan?: (id: string) => void;
    onClickToPage?: (page: number) => void;
};

const ClansViewDesktop = ({ clanServerResponse, onClickToClan, onClickToPage }: DesktopProps) => {
    const { t } = useClientTranslation('clan');

    const onClick = (id: string) => {
        if (onClickToClan) onClickToClan(id);
    };
    const onClickPage = (page: number) => {
        if (onClickToPage) onClickToPage(page);
    };

    const { currentPage, pageCount } = clanServerResponse.paginationData;
    const disablePrev = currentPage === 1;
    const disableNext = pageCount === undefined;

    return (
        <div>
            <Pagination
                currentPage={currentPage}
                disablePrev={disablePrev}
                disableNext={disableNext}
                onPrev={() => onClickPage(currentPage - 1)}
                onNext={() => onClickPage(currentPage + 1)}
            />
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
