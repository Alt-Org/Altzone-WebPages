import './ClanPageLayout.scss';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="container">
            <div className="layoutContainer">
                {/* Header and Sidebar Container */}
                <div className="headerSidebarContainer">
                    <header className="header">
                        <h1>Title</h1>
                    </header>
                    <nav className="mobileNav">Navigation Dropbar</nav>
                    <aside className="sidebar">Navigation Sidebar</aside>
                </div>
                {/* Content */}
                <main className="content">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
