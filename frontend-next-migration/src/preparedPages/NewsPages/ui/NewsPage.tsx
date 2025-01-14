'use client';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
// import { ComingSoon } from '@/widgets/ComingSoon';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import useSizes from '@/shared/lib/hooks/useSizes';
import { WallIntroAnimation } from '@/shared/ui/WallIntroAnimation';
import { Container } from '@/shared/ui/Container';
import cls from './NewsPage.module.scss';

const NewsPage = () => {
    const { title } = { title: 'NEWS' };
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };
    return (
        <WallIntroAnimation>
            <main className={classNames(cls.NewsPage, combinedModCss)}>
                <Container className={classNames(cls.TitleAndTabs, combinedModCss)}>
                    <div className={classNames(cls.TitleAlignBox, combinedModCss)}>
                        <div style={{ minWidth: '220px', flexBasis: '20%' }} />
                        <div style={{ flex: '1 1' }}>
                            <h1>{title}</h1>
                        </div>
                    </div>
                </Container>
                <LayoutWithSidebars
                    leftTopSidebar={{
                        collapsed: false,
                        component:
                            isDesktopSize || isWidescreenSize ? (
                                <div
                                    style={{
                                        border: '1px solid black',
                                        width: 'calc(100% - 20px)',
                                        padding: '1em',
                                    }}
                                >
                                    <div>
                                        <h2>Categories</h2>
                                        <p>Category</p>
                                        <p>Category</p>
                                        <p>Category</p>
                                        <p>Category</p>
                                    </div>
                                </div>
                            ) : (
                                <p>categories mobile</p>
                            ),
                    }}
                    className={classNames(cls.NewsAndSideBar, combinedModCss)}
                >
                    <div
                        style={{
                            display: 'flex',
                            marginRight: !isMobileSize && !isTabletSize ? '100px' : '0',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Cards */}
                        <div
                            style={{
                                border: '1px solid black',
                                flex: '0 1 49%',
                                marginBottom: '20px',
                            }}
                        >
                            <div>
                                <h2>Title</h2>
                            </div>
                            <div>
                                <p>Some very long text. Some very long text.</p>
                            </div>
                        </div>
                        <div
                            style={{
                                border: '1px solid black',
                                flex: '0 1 49%',
                                marginBottom: '20px',
                            }}
                        >
                            <div>
                                <h2>Title</h2>
                            </div>
                            <div>
                                <p>Some very long text. Some very long text.</p>
                            </div>
                        </div>
                        <div
                            style={{
                                border: '1px solid black',
                                flex: '0 1 49%',
                                marginBottom: '20px',
                            }}
                        >
                            <div>
                                <h2>Title</h2>
                            </div>
                            <div>
                                <p>Some very long text. Some very long text.</p>
                            </div>
                        </div>
                    </div>
                </LayoutWithSidebars>
                {/* <ComingSoon /> */}
            </main>
        </WallIntroAnimation>
    );
};

export default NewsPage;
