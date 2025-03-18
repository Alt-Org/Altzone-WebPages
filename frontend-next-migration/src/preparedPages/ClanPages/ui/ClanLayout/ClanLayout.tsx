'use client';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { Container } from '@/shared/ui/Container';
import cls from './ClanLayout.module.scss';
import { useClientTranslation } from '@/shared/i18n';

type PageTitleProps = {
    titleText: string;
    searchVisible?: boolean;
};

type LayoutProps = {
    children: React.ReactNode;
};

/**
 * Displays h1 title and possibly a searchbar
 * @param param0 props
 * @returns ReactNode
 */

const PageTitle = ({ titleText, searchVisible = false }: PageTitleProps) => {
    return (
        <Container className={cls.PageTitleContainer}>
            <div className={cls.PageTitleLeft} />
            <div className={cls.PageTitle}>
                {/* Title */}
                <h1>{titleText}</h1>
            </div>
            {searchVisible && (
                <div className={cls.SearchContainer}>
                    {/* placeholder for search */}
                    <p>Search</p>
                </div>
            )}
        </Container>
    );
};

const ClanMainPageLayout: React.FC<LayoutProps> = ({ children }) => {
    const { t } = useClientTranslation('clan');

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('head-title'),
        openByDefault: true,
        titleAsActive: false,
        staticDropdown: true,
        dropdownItems: [
            { elementText: t('browse-clans'), link: { path: '/clans', isExternal: false } },
            {
                elementText: t('leaderboard-title'),
                link: { path: '/clans/leaderboard', isExternal: false },
            },
            { elementText: t('my_clan'), link: { path: '/clans/myclan', isExternal: false } },
            { elementText: t('store-title'), link: { path: '/store', isExternal: false } },
        ],
    };

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('head-title'),
        openByDefault: false,
        titleAsActive: false,
        dropdownItems: [
            { elementText: t('browse-clans'), link: { path: '/clans', isExternal: false } },
            {
                elementText: t('leaderboard-title'),
                link: { path: '/clans/leaderboard', isExternal: false },
            },
            { elementText: t('my_clan'), link: { path: '/clans/myclan', isExternal: false } },
            { elementText: t('store-title'), link: { path: '/store', isExternal: false } },
        ],
    };
    return (
        <div className={cls.container}>
            {
                <PageTitle
                    titleText="H1 Primary Heading"
                    searchVisible={false}
                />
            }
            <div className={cls.layoutContainer}>
                <div className={cls.headerSidebarContainer}>
                    <nav className={cls.mobileNav}>
                        <NavMenuWithDropdowns {...navMenuWithDropdownsMobileProps} />
                    </nav>
                    <aside className={cls.sidebar}>
                        <NavMenuWithDropdowns {...navMenuWithDropdownsDesktopProps} />
                    </aside>
                </div>
                <main className={cls.content}>{children}</main>
            </div>
        </div>
    );
};

export default ClanMainPageLayout;
