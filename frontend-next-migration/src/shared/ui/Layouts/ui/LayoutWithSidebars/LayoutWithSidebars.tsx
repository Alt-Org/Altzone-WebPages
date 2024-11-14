import { ReactNode } from 'react';
import cls from './LayoutWithSidebars.module.scss';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';

interface SidebarConfig {
    component: ReactNode;
    hideOnMobile?: boolean;
    hideOnDesktop?: boolean;
}

interface DesktopLeftSidebarLayoutPropsBase {
    children: ReactNode;
    className?: string;
    topIndent?: boolean;
}

type RequireAtLeastOneSidebar<T> =
    | (T & { leftTopSidebar: SidebarConfig; rightBottomSidebar?: SidebarConfig })
    | (T & { leftTopSidebar?: SidebarConfig; rightBottomSidebar: SidebarConfig })
    | (T & { leftTopSidebar?: never; rightBottomSidebar?: never } & {
          error: 'You must provide at least one sidebar: leftTopSidebar or rightBottomSidebar';
      });

type DesktopLeftSidebarLayoutProps = RequireAtLeastOneSidebar<DesktopLeftSidebarLayoutPropsBase>;

const LayoutWithSidebars = (props: DesktopLeftSidebarLayoutProps) => {
    const {
        leftTopSidebar,
        rightBottomSidebar,
        children,
        className = '',
        topIndent = true,
    } = props;

    const hasBothSidebars = !!leftTopSidebar && !!rightBottomSidebar;
    const bothSidebarsVisibleOnDesktop =
        !leftTopSidebar?.hideOnDesktop && !rightBottomSidebar?.hideOnDesktop;

    const shouldBeFluid = hasBothSidebars && bothSidebarsVisibleOnDesktop;

    const leftTopSidebarMods = {
        [cls.hideOnMobile]: leftTopSidebar?.hideOnMobile,
        [cls.hideOnDesktop]: leftTopSidebar?.hideOnDesktop,
        [cls.topIndent]: topIndent,
    };

    const rightBottomSidebarMods = {
        [cls.hideOnMobile]: rightBottomSidebar?.hideOnMobile,
        [cls.hideOnDesktop]: rightBottomSidebar?.hideOnDesktop,
        [cls.topIndent]: topIndent,
    };

    return (
        <Container
            className={classNames(cls.container, {}, [className])}
            fluid={shouldBeFluid}
        >
            {leftTopSidebar && (
                <aside
                    className={classNames(cls.sidebar, leftTopSidebarMods, [cls.leftTopSidebar])}
                >
                    {leftTopSidebar.component}
                </aside>
            )}

            <Container
                className={cls.content}
                fluid={shouldBeFluid}
            >
                {children}
            </Container>

            {rightBottomSidebar && (
                <aside
                    className={classNames(cls.sidebar, rightBottomSidebarMods, [
                        cls.rightBottomSidebar,
                    ])}
                >
                    {rightBottomSidebar.component}
                </aside>
            )}
        </Container>
    );
};

export default LayoutWithSidebars;
