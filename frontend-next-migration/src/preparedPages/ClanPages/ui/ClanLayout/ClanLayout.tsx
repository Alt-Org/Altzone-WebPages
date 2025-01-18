import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import cls from './ClanLayout.module.scss';
import {
    DropdownItem,
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdowns';

type LayoutProps = {
    children: React.ReactNode;
};

const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
    title: 'Klaanit',
    openByDefault: false,
    dropdownItems: [
        { elementText: 'Klaanit', link: { path: '/option1-1', isExternal: false } },
        { elementText: 'Leaderboard', link: { path: '/option1-2', isExternal: false } },
        { elementText: 'Klaanisivu', link: { path: '/option1-1', isExternal: false } },
        { elementText: 'Kauppa', link: { path: '/option1-2', isExternal: false } },
    ],
};

const ClanMainPageLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={cls.container}>
            <div className={cls.layoutContainer}>
                <div className={cls.headerSidebarContainer}>
                    <header className={cls.header}>
                        <h1>Clans</h1>
                    </header>
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
