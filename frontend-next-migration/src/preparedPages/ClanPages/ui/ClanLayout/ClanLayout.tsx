'use client';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import cls from './ClanLayout.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useParams, usePathname } from 'next/navigation';

type LayoutProps = {
    children: React.ReactNode;
};

const ClanMainPageLayout: React.FC<LayoutProps> = ({ children }) => {
    const { t } = useClientTranslation('clan');

    const params = useParams();
    const lng = params.lng as string;
    const pathname = usePathname();
    const isLeaderboardPage = pathname === `/${lng}/clans/leaderboard`;

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('head-title'),
        openByDefault: true,
        titleAsActive: false,
        staticDropdown: true,
        dropdownItems: [
            { elementText: t('browse-clans'), link: { path: `/${lng}/clans`, isExternal: false } },
            {
                elementText: t('leaderboard-title'),
                link: { path: `/${lng}/leaderboard`, isExternal: false }, // updated
            },
            {
                elementText: t('my_clan'),
                link: { path: `/${lng}/clans/myclan`, isExternal: false },
            },
            { elementText: t('store-title'), link: { path: `/${lng}/store`, isExternal: false } },
        ],
    };

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('head-title'),
        openByDefault: false,
        titleAsActive: false,
        dropdownItems: [
            { elementText: t('browse-clans'), link: { path: `/${lng}/clans`, isExternal: false } },
            {
                elementText: t('leaderboard-title'),
                link: { path: `/${lng}/leaderboard`, isExternal: false }, // updated
            },
            {
                elementText: t('my_clan'),
                link: { path: `/${lng}/clans/myclan`, isExternal: false },
            },
            { elementText: t('store-title'), link: { path: `/${lng}/store`, isExternal: false } },
        ],
    };

    return (
        <div className={cls.container}>
            {
                <PageTitle
                    titleText={t('head-title')}
                    searchVisible={false}
                    dynamicTitle="clan"
                />
            }
            <div className={cls.layoutContainer}>
                <div className={cls.headerSidebarContainer}>
                    {!isLeaderboardPage && (
                        <nav className={cls.mobileNav}>
                            <NavMenuWithDropdowns {...navMenuWithDropdownsMobileProps} />
                        </nav>
                    )}
                    {!isLeaderboardPage && (
                        <aside className={cls.sidebar}>
                            <NavMenuWithDropdowns {...navMenuWithDropdownsDesktopProps} />
                        </aside>
                    )}
                </div>
                <main className={cls.content}>{children}</main>
            </div>
        </div>
    );
};

export default ClanMainPageLayout;
