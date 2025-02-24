'use client';
import { ReactNode } from 'react';
import cls from './LayoutWithSidebars.module.scss';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { selectIsCollapsed, selectIsFixed } from '@/widgets/Navbar';

interface SidebarConfig {
    component: ReactNode;
    hideOnMobile?: boolean;
    hideOnDesktop?: boolean;
    collapsed?: boolean;
}

interface DesktopLeftSidebarLayoutPropsBase {
    children: ReactNode;
    className?: string;
}

type RequireAtLeastOneSidebar<T> =
    | (T & { leftTopSidebar: SidebarConfig; rightBottomSidebar?: SidebarConfig })
    | (T & { leftTopSidebar?: SidebarConfig; rightBottomSidebar: SidebarConfig })
    | (T & { leftTopSidebar?: never; rightBottomSidebar?: never } & {
          error: 'You must provide at least one sidebar: leftTopSidebar or rightBottomSidebar';
      });

type DesktopLeftSidebarLayoutProps = RequireAtLeastOneSidebar<DesktopLeftSidebarLayoutPropsBase>;

// eslint-disable-next-line complexity
const LayoutWithSidebars = (props: DesktopLeftSidebarLayoutProps) => {
    const { leftTopSidebar, rightBottomSidebar, children, className = '' } = props;

    const isFixed = useSelector(selectIsFixed);
    const isCollapsed = useSelector(selectIsCollapsed);
    const isTopIndentCustom = isFixed && !isCollapsed;

    const hasBothSidebars = !!leftTopSidebar && !!rightBottomSidebar;
    const bothSidebarsVisibleOnDesktop =
        !leftTopSidebar?.hideOnDesktop && !rightBottomSidebar?.hideOnDesktop;
    const shouldBeFluid = hasBothSidebars && bothSidebarsVisibleOnDesktop;
    const collapsed = leftTopSidebar?.collapsed;
    const leftTopSidebarMods = {
        [cls.hideOnMobile]: leftTopSidebar?.hideOnMobile,
        [cls.hideOnDesktop]: leftTopSidebar?.hideOnDesktop,
        // [cls.topIndent]: topIndent,
    };

    const rightBottomSidebarMods = {
        [cls.hideOnMobile]: rightBottomSidebar?.hideOnMobile,
        [cls.hideOnDesktop]: rightBottomSidebar?.hideOnDesktop,
        // [cls.topIndent]: topIndent,
    };

    return (
        <Container
            className={classNames(cls.container, {}, [className])}
            fluid={shouldBeFluid}
        >
            {leftTopSidebar && (
                <aside
                    style={{
                        minWidth: collapsed ? '1em' : '250px',
                        flexBasis: collapsed ? '1em' : '20%',
                        overflowX: collapsed ? 'hidden' : 'auto',
                        top: !isTopIndentCustom ? '50px' : undefined,
                    }}
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
                    style={{ top: !isTopIndentCustom ? '50px' : undefined }}
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
