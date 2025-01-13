'use client';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
// import { ComingSoon } from '@/widgets/ComingSoon';
import { classNames } from '@/shared/lib/classNames/classNames';
import useSizes from '@/shared/lib/hooks/useSizes';
import { WallIntroAnimation } from '@/shared/ui/WallIntroAnimation';
import cls from './NewsPage.module.scss';

const NewsPage = () => {
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
    return (
        <WallIntroAnimation>
            <main className={classNames(cls.NewsPage)}>
                <LayoutWithSidebars
                    leftTopSidebar={{
                        collapsed: false,
                        component:
                            isDesktopSize || isWidescreenSize ? (
                                <div style={{ width: 'fit-content' }}>
                                    <p>menu desktop</p>
                                </div>
                            ) : (
                                <p>menu mobile</p>
                            ),
                    }}
                >
                    <p>Kortit</p>
                </LayoutWithSidebars>
                {/* <ComingSoon /> */}
            </main>
        </WallIntroAnimation>
    );
};

export default NewsPage;
