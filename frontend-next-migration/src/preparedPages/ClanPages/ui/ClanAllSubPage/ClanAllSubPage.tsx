'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GetClansResponse, useGetClansQuery } from '@/entities/Clan';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import { getRouteOneClanPage } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import {
    SkeletonLoaderForClansDesktop,
    SkeletonLoaderForClansMobile,
} from '@/shared/ui/SkeletonLoader';
import cls from './ClanAllSubPage.module.scss';

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

    //if (error) return <div>Error: {JSON.stringify(error)}</div>;

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
                {isMobileSize ? (
                    <ClansSearchMobile onClickToSearch={onClickToSearch} />
                ) : (
                    <ClansSearchDesktop onClickToSearch={onClickToSearch} />
                )}
                <h2 className={cls.noResults}>{t('no_result')}</h2>
            </>
        );
    }

    if (clans) {
        return (
            <>
                <h1 className={cls.titleText}>{t('clans_title')}</h1>
                {isMobileSize ? (
                    <ClansSearchMobile onClickToSearch={onClickToSearch} />
                ) : (
                    <ClansSearchDesktop onClickToSearch={onClickToSearch} />
                )}
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

type SearchProps = {
    onClickToSearch?: (search: string) => void;
};

const ClansSearchDesktop = ({ onClickToSearch }: SearchProps) => {
    const { t } = useClientTranslation('clan');

    const onClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchField = document.querySelector<HTMLInputElement>('#search');
        if (onClickToSearch && searchField) {
            onClickToSearch(searchField.value);
        }
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
const ClansSearchMobile = ({ onClickToSearch }: SearchProps) => {
    const { t } = useClientTranslation('clan');

    const onClickSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchField = document.querySelector<HTMLInputElement>('#search');
        if (onClickToSearch && searchField) {
            onClickToSearch(searchField.value);
        }
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

    return (
        <>
            <div>
                <Button
                    onClick={() => onClickPage(clanServerResponse.paginationData.currentPage - 1)}
                    theme={ButtonTheme.BACKGROUND}
                    size={ButtonSize.M}
                    className={cls.BtnGame}
                    square={false}
                    disabled={clanServerResponse.paginationData.currentPage === 1}
                >
                    Back
                </Button>
                {clanServerResponse.paginationData.currentPage}
                <Button
                    onClick={() => onClickPage(clanServerResponse.paginationData.currentPage + 1)}
                    theme={ButtonTheme.BACKGROUND}
                    size={ButtonSize.M}
                    className={cls.BtnGame}
                    square={false}
                    disabled={clanServerResponse.paginationData.pageCount === undefined}
                >
                    Next
                </Button>
            </div>
            {clanServerResponse.data.Clan.map((clan, idx) => {
                let bgColor;
                switch (idx) {
                    //     case 0:
                    //         bgColor = 'rgba(218,165,32,0.89)';
                    //         break;
                    //     case 1:
                    //         bgColor = 'rgba(192,192,192,0.75)';
                    //         break;
                    //     case 2:
                    //         bgColor = 'rgb(162,108,62)';
                    //         break;
                    default:
                        bgColor = 'rgba(0,0,0,0.6)';
                        break;
                }
                return (
                    <div
                        key={idx}
                        className={cls.ClanCard}
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
                            <strong>{t('coins')}:</strong> {clan?.gameCoins}
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

    return (
        <div>
            <div>
                <Button
                    onClick={() => onClickPage(clanServerResponse.paginationData.currentPage - 1)}
                    theme={ButtonTheme.BACKGROUND}
                    size={ButtonSize.M}
                    className={cls.BtnGame}
                    square={false}
                    disabled={clanServerResponse.paginationData.currentPage === 1}
                >
                    Back
                </Button>
                {clanServerResponse.paginationData.currentPage}
                <Button
                    onClick={() => onClickPage(clanServerResponse.paginationData.currentPage + 1)}
                    theme={ButtonTheme.BACKGROUND}
                    size={ButtonSize.M}
                    className={cls.BtnGame}
                    square={false}
                    disabled={clanServerResponse.paginationData.pageCount === undefined}
                >
                    Next
                </Button>
            </div>
            <table className={cls.ClanTable}>
                <thead>
                    <tr>
                        <th>{t('rating')}</th>
                        <th>{t('clan')}</th>
                        <th>{t('clan_master')}</th>
                        <th>{t('coins')}</th>
                        <th>{t('members')}</th>
                        <th>{t('tag')}</th>
                    </tr>
                </thead>
                <tbody>
                    {clanServerResponse.data.Clan.map((clan, idx) => {
                        let bgColor;
                        switch (idx) {
                            //     case 0:
                            //         bgColor = 'rgba(218,165,32,0.89)';
                            //         break;
                            //     case 1:
                            //         bgColor = 'rgba(192,192,192,0.75)';
                            //         break;
                            //     case 2:
                            //         bgColor = 'rgb(162,108,62)';
                            //         break;
                            default:
                                bgColor = 'rgba(0,0,0,0.6)';
                                break;
                        }

                        return (
                            <tr
                                key={idx}
                                style={{ backgroundColor: bgColor }}
                                onClick={() => onClick(clan?._id)}
                            >
                                <td>{idx + 1}</td>
                                <td>{clan?.name}</td>
                                <td>Joku Mestari </td>
                                <td>{clan?.gameCoins}</td>
                                <td>{clan?.playerCount}</td>
                                <td>{clan?.tag}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ClanAllSubPage;
