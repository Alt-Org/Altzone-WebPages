'use client';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import cls from './ClanLayout.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useParams } from 'next/navigation';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import Image from 'next/image';
import searchIcon from '@/shared/assets/icons/Search.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

// Search bar for clans
export type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
    wrapperClassName?: string;
    inputClassName?: string;
    'aria-label'?: string;
};

export const SearchBar = ({
    value,
    onChange,
    wrapperClassName,
    inputClassName,
    'aria-label': ariaLabel = 'Search clans',
}: SearchBarProps) => {
    return (
        <div className={classNames(wrapperClassName ?? '')}>
            <Image
                src={searchIcon}
                alt="search icon"
                height={20}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search"
                className={inputClassName}
                aria-label={ariaLabel}
            />
        </div>
    );
};

type LayoutProps = {
    children: React.ReactNode;
};

const ClanMainPageLayout: React.FC<LayoutProps> = ({ children }) => {
    const { t } = useClientTranslation('clan');
    const { isMobileSize, isTabletSize } = useSizes();
    const isCompact = isMobileSize || isTabletSize;
    const params = useParams();
    const lng = params.lng as string;

    const items = [
        { elementText: t('browse-clans'), link: { path: `/${lng}/clans`, isExternal: false } },
        {
            elementText: t('leaderboard-title'),
            link: { path: `/${lng}/clans/leaderboard`, isExternal: false },
        },
        { elementText: t('my_clan'), link: { path: `/${lng}/clans/myclan`, isExternal: false } },
        { elementText: t('store-title'), link: { path: `/${lng}/store`, isExternal: false } },
    ];

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('head-title'),
        openByDefault: true,
        titleAsActive: false,
        staticDropdown: true,
        dropdownItems: items,
    };

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('head-title'),
        openByDefault: false,
        titleAsActive: false,
        dropdownItems: items,
    };

    return (
        <LayoutWithSidebars
            className={cls.container}
            leftTopSidebar={{
                component: <NavMenuWithDropdowns {...navMenuWithDropdownsDesktopProps} />,
                hideOnMobile: true,
                className: cls.sidebar,
                width: '300px',
            }}
        >
            {isCompact && (
                <>
                    <PageTitle
                        titleText={t('browse-clans')}
                        alternate
                        searchVisible={false}
                    />
                    <nav className={cls.mobileNav}>
                        <NavMenuWithDropdowns {...navMenuWithDropdownsMobileProps} />
                    </nav>
                </>
            )}

            <main className={cls.content}>{children}</main>
        </LayoutWithSidebars>
    );
};

export default ClanMainPageLayout;
