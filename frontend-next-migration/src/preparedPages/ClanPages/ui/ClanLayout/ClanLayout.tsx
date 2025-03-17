'use client';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { Container } from '@/shared/ui/Container';
import cls from './ClanLayout.module.scss';

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

const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
    title: 'Klaanit',
    openByDefault: true,
    titleAsActive: true,
    staticDropdown: true,
    dropdownItems: [
        { elementText: 'Selaa Klaaneja', link: { path: '/clans', isExternal: false } },
        { elementText: 'Leaderboard', link: { path: '/clans/leaderboard', isExternal: false } },
        { elementText: 'Klaanisivu', link: { path: '/clans/myclan', isExternal: false } },
        { elementText: 'Kauppa', link: { path: '/store', isExternal: false } },
    ],
};

const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
    title: 'Klaanit',
    openByDefault: false,
    titleAsActive: true,
    dropdownItems: [
        { elementText: 'Selaa Klaaneja', link: { path: '/clans', isExternal: false } },
        { elementText: 'Leaderboard', link: { path: '/clans/leaderboard', isExternal: false } },
        { elementText: 'Klaanisivu', link: { path: '/clans/myclan', isExternal: false } },
        { elementText: 'Kauppa', link: { path: '/store', isExternal: false } },
    ],
};

const ClanMainPageLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={cls.container}>
            {/* The title will be placed here */}
            {/* <PageTitle
                titleText="Tulostaulukko"
                searchVisible
            /> */}
            <div className={cls.layoutContainer}>
                <div className={cls.headerSidebarContainer}>
                    {/* According to Figma plans, header wont be necessary
                    <header className={cls.header}>
                        <h1>Clans</h1>
                    </header> */}
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
