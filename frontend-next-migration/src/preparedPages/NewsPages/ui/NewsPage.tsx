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
                    <div style={{ display: 'flex' }}>
                        <div style={{ minWidth: '220px', flexBasis: '20%', paddingLeft: '20px' }} />
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
                                <div style={{ border: '1px solid black', width: '220px' }}>
                                    <p>categories desktop</p>
                                </div>
                            ) : (
                                <p>categories mobile</p>
                            ),
                    }}
                    className={classNames(cls.NewsAndSideBar, combinedModCss)}
                >
                    <p>cards</p>
                </LayoutWithSidebars>
                {/* <ComingSoon /> */}
            </main>
        </WallIntroAnimation>
    );
};

export default NewsPage;
