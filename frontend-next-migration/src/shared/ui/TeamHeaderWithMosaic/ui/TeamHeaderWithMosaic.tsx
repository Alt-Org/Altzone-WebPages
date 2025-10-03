import { useClientTranslation } from '@/shared/i18n';
import cls from './TeamHeaderWithMosaic.module.scss';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useGetMembersQuery } from '@/entities/Member/api/membersApi';
import { classNames } from '@/shared/lib/classNames/classNames';
import Link from 'next/dist/client/link';
import { MosaicGrid } from '../../v2/MosaicGrid';
import { getRoutePrgPage } from '@/shared/appLinks/RoutePaths';
import ExternalLink from '@/shared/assets/icons/ExternalLink.svg';
import SearchIcon from '@/shared/assets/icons/Search.svg';
import { PageTitle } from '../../PageTitle';
import { Container } from '../../Container';

type Props = {
    dropdown?: ReactNode;
    className?: string;
};

interface SearchBarProps {
    className: string;
    placeholder: string;
}

const SearchBar = (props: SearchBarProps) => {
    const { className, placeholder } = props;
    return (
        <div className={classNames(cls.SearchBar, undefined, [className])}>
            <Image
                src={SearchIcon}
                alt="search icon"
                height={20}
            />
            <input
                type="text"
                name="search"
                placeholder={placeholder}
                className={cls.Input}
                aria-label="Search input"
            />
        </div>
    );
};

export function TeamHeaderWithMosaic(props: Props) {
    const { className, dropdown } = props;
    const { t } = useClientTranslation('members');
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;

    const {
        data: members = [],
        isError,
        isLoading,
    } = useGetMembersQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });
    const membersWithPortrait = members.filter((member) => member.portrait);

    if (isLoading) {
        return (
            <div className={cls.HeaderContainer}>
                <div className={cls.dataContainer}>
                    <div className={cls.TitleContainer}>
                        <h2>{t('head-title')}</h2>
                        {isTouchDevice && dropdown}
                    </div>
                    <SearchBar
                        className={cls.SearchBarTablet}
                        placeholder={t('search-placeholder')}
                    />
                    <div className={cls.MosaicContainer}>
                        <div className={cls.LoadingState}>Loading team members...</div>
                    </div>
                </div>
            </div>
        );
    } else if (isError) {
        return <p>Error fetching data</p>;
    }

    return (
        <div className={classNames(cls.HeaderContainer, undefined, [className ? className : ''])}>
            {!isTouchDevice && <div className={cls.emptyContainer} />}
            <div className={cls.dataContainer}>
                <Container className={cls.Container}>
                    {isTouchDevice ? (
                        <>
                            <PageTitle
                                titleText={t('team-title')}
                                searchVisible={false}
                                alternate={true}
                            />
                            {dropdown}
                            <SearchBar
                                className={cls.SearchBarMobile}
                                placeholder={t('search-placeholder')}
                            />
                        </>
                    ) : (
                        <div className={cls.TitleSearchBarContainer}>
                            <PageTitle
                                titleText={t('team-title')}
                                searchVisible={false}
                                alternate={true}
                            />
                            <SearchBar
                                className={cls.SearchBarDesktop}
                                placeholder={t('search-placeholder')}
                            />
                        </div>
                    )}
                    <div className={cls.MosaicGridContainer}>
                        <h3 className={cls.Title}>{t('team-title')}</h3>
                        <p className={cls.Description}>{t('team-description')}</p>
                        <MosaicGrid
                            className={cls.MosaicGrid}
                            members={membersWithPortrait}
                        />
                        <Link
                            href={getRoutePrgPage()}
                            className={cls.Link}
                        >
                            <span className={cls.LinkText}>{t('link-to-prg')}</span>
                            <Image
                                className={cls.LinkIcon}
                                src={ExternalLink}
                                alt="External Link Icon"
                            />
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
}
