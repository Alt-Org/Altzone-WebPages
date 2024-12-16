import cls from './ClanMainPageLayout.module.scss';

type LayoutProps = {
    children: React.ReactNode;
};

const ClanMainPageLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={cls.container}>
            <div className={cls.layoutContainer}>
                <div className={cls.headerSidebarContainer}>
                    <header className={cls.header}>
                        <h1>Clans</h1>
                    </header>
                    <nav className={cls.mobileNav}>Mobile Dropdown</nav>
                    <aside className={cls.sidebar}>Sidebar</aside>
                </div>
                <main className={cls.content}>{children}</main>
            </div>
        </div>
    );
};

export default ClanMainPageLayout;
