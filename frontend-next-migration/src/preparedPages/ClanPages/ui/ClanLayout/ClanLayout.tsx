// remember to remove use client
'use client';
import cls from './ClanLayout.module.scss';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';

type LayoutProps = {
    children: React.ReactNode;
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
