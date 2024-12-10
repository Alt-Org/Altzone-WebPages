import './ClanPageLayout.scss';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container">
            <div className="layoutContainer">
                <div className="headerSidebarContainer">
                    <header className="header">
                        <h1>Clans</h1>
                    </header>
                    <nav className="mobileNav">Mobile Dropdown</nav>
                    <aside className="sidebar">Sidebar</aside>
                </div>
                <main className="content">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
