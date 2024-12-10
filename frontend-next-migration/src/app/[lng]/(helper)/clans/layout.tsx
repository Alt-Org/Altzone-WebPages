import './ClanPageLayout.scss';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout-container">
            {/* Header for Title */}
            <header className="header">
                <h1>Clans</h1>
                <nav className="mobile-nav">Navigation Dropbar</nav>
            </header>

            {/* Main Content */}
            <div className="main-content">
                {/* Sidebar for Desktop */}
                <aside className="sidebar">Navigation Sidebar</aside>

                {/* Children Area */}
                <main className="content">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
