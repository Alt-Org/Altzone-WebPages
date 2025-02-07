'use client';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { WallIntroAnimation } from '@/shared/ui/WallIntroAnimation';
import { Container } from '@/shared/ui/Container';
import cls from './NewsPage.module.scss';

const NewsPage = () => {
    // Here could be the props, now this is just hardcoded data
    const { title, news } = {
        title: 'NEWS',
        news: [
            {
                id: 1,
                heading: '[Heading]',
                content:
                    '[body (primary text)] Some very long text. Some very long text. Some very long text. Some very long text. Some very long text. Some very long text.',
                date: '[small-text/footnotes date and time]',
            },
            {
                id: 2,
                heading: '[Heading]',
                content:
                    '[body (primary text)] Some very long text. Some very long text. Some very long text. Some very long text. Some very long text. Some very long text.',
                date: '[small-text/footnotes date and time]',
            },
            {
                id: 3,
                heading: '[Heading]',
                content:
                    '[body (primary text)] Some very long text. Some very long text. Some very long text. Some very long text. Some very long text. Some very long text.',
                date: '[small-text/footnotes date and time]',
            },
        ],
    };
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
    return (
        <WallIntroAnimation>
            <main className={cls.NewsPage}>
                <Container className={cls.TitleAndTabs}>
                    <div className={cls.ContentAlignBox}>
                        {!isMobileSize && !isTabletSize && (
                            <div className={cls.ContentAlignBoxLeftBox} />
                        )}
                        <div className={cls.ContentAlignBoxRightBox}>
                            <div>
                                {/* Title */}
                                <h1>{title}</h1>
                            </div>
                            <div className={cls.Tabs}>
                                {!isMobileSize && !isTabletSize ? (
                                    <div>
                                        {/* Searchbox (desktop, widescreen) */}
                                        <div className={cls.borderBox}>
                                            <p>Search box</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Categories (mobile, tablet) */}
                                        <div className={cls.borderBox}>
                                            <p>categories mobile</p>
                                        </div>
                                        {/* Searchbox (mobile, tablet) */}
                                        <div className={cls.borderBox}>
                                            <p>Search box</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
                <LayoutWithSidebars
                    leftTopSidebar={{
                        component:
                            isDesktopSize || isWidescreenSize ? (
                                // Categories-section (desktop)
                                <div className={cls.CategoriesSection}>
                                    {/* Categories (desktop, widescreen)*/}
                                    <div className={cls.categoriesDesktop}>
                                        <h2>Categories</h2>
                                        <p>Category</p>
                                        <p>Category</p>
                                        <p>Category</p>
                                        <p>Category</p>
                                    </div>
                                </div>
                            ) : (
                                <div />
                            ),
                    }}
                    className={cls.NewsAndSideBar}
                >
                    {/* News-section (all devices) */}
                    <div className={cls.News}>
                        {news.map(
                            (newsArticle: /* This could have it's own type when working with real data*/ {
                                id: number;
                                heading: string;
                                content: string;
                                date: string;
                            }) => (
                                <div
                                    key={newsArticle.id}
                                    className={cls.NewsArticle}
                                >
                                    {/* The card*/}
                                    <div className={cls.newsCard}>
                                        <div>
                                            <h2>{newsArticle.heading}</h2>
                                        </div>
                                        <div>
                                            <p>{newsArticle.content}</p>
                                        </div>
                                        <div>
                                            <p>{newsArticle.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </LayoutWithSidebars>
            </main>
        </WallIntroAnimation>
    );
};

export default NewsPage;
