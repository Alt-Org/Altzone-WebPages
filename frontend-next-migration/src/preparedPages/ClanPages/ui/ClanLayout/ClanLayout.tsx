'use client';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import cls from './ClanLayout.module.scss';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';

type LayoutProps = {
    children: React.ReactNode;
};

const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
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
                    {/* <header className={cls.header}>
                        <h1>Clans</h1>
                    </header> */}
                    <nav className={cls.mobileNav}>
                        <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
                    </nav>
                    <aside className={cls.sidebar}>
                        <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
                    </aside>
                </div>
                <main className={cls.content}>{children}</main>
            </div>
        </div>
    );
};

export default ClanMainPageLayout;
