'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GetClansResponse, useGetClansQuery } from '@/entities/Clan';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import { getRouteOneClanPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';
import { ClanCard } from '../ClanCard/ClanCard';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import {
    SkeletonLoaderForClansDesktop,
    SkeletonLoaderForClansMobile,
} from '@/shared/ui/SkeletonLoader';
import cls from './ClanAllSubPage.module.scss';
import clanLogo from '@/shared/assets/images/clanLogos/CommonSelectHeart 1.png';
import iconSpammer from '@/shared/assets/images/clanLabels/ClanLabelSpammer.png';
import iconHumorous from '@/shared/assets/images/clanLabels/ClanLabelHumorous.png';
import iconAnimalLovers from '@/shared/assets/images/clanLabels/ClanLabelAnimalLovers.png';

const labels = [
    { text: 'Spämmääjät', icon: iconSpammer },
    { text: 'Humoristiset', icon: iconHumorous },
    { text: 'Eläinrakkaat', icon: iconAnimalLovers },
];

const ClanAllSubPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSearch, setSearch] = useState('');
    const { isMobileSize } = useIsMobileSize();

    const router = useRouter();
    const { t } = useClientTranslation('clan');
    const {
        data: clans,
        error,
        isLoading,
    } = useGetClansQuery({ page: currentPage, search: currentSearch });

    if (isLoading)
        return isMobileSize ? (
            <SkeletonLoaderForClansMobile
                className={cls.skeletonLoader}
                rating={t('rating')}
                clan={t('clan')}
                clanMaster={t('clan_master')}
                coins={t('coins')}
                members={t('members')}
                tag={t('tag')}
                clansTitle={t('clans_title')}
            />
        ) : (
            <SkeletonLoaderForClansDesktop
                className={cls.skeletonLoader}
                rating={t('rating')}
                clan={t('clan')}
                clanMaster={t('clan_master')}
                coins={t('coins')}
                members={t('members')}
                tag={t('tag')}
                clansTitle={t('clans_title')}
            />
        );

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
            {clanServerResponse.data.Clan.map((clan, idx) => {
                const bgColor = 'rgba(0,0,0,0.6)';
                return (
                    <div
                        key={idx}
                        className={cls.ClanCardGrid}
                        style={{ backgroundColor: bgColor }}
                        onClick={() => onClick(clan?._id)}
                    >
                        <div>
                            <strong>{t('rating')}:</strong> {idx + 1}
                        </div>
                        <div>
                            <strong>{t('clan')}:</strong> {clan?.name}
                        </div>
                        <div>
                            <strong>{t('tag')}:</strong> {clan?.tag}
                        </div>
                        <div>
                            <strong>{t('members')}:</strong> {50}
                        </div>
                        <div>
                            <strong>{t('clan_master')}:</strong> {t('some_master')} {idx + 1}
                        </div>
                    </div>
                );
            })}
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
            <div className={cls.ClanCardGrid}>
                {clanServerResponse.data.Clan.map((clan) => {
                    return (
                        <ClanCard
                            key={clan._id}
                            name={clan?.name}
                            members={clan?.playerCount}
                            capacity={30}
                            coins={clan?.gameCoins}
                            logo={clanLogo}
                            labels={labels}
                            onClick={() => onClick(clan?._id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ClanAllSubPage;
