import { ReactNode } from 'react';
import cls from './LayoutWithSidebars.module.scss';
import { Container } from '@/shared/ui/Container';

interface SidebarConfig {
    component: ReactNode;
    hideOnMobile?: boolean;
}

interface DesktopLeftSidebarLayoutPropsBase {
    children: ReactNode;
}

type RequireAtLeastOneSidebar<T> =
    | (T & { leftTopSidebar: SidebarConfig; rightBottomSidebar?: SidebarConfig })
    | (T & { leftTopSidebar?: SidebarConfig; rightBottomSidebar: SidebarConfig })
    | (T & { leftTopSidebar?: never; rightBottomSidebar?: never } & {
          error: 'You must provide at least one sidebar: leftTopSidebar or rightBottomSidebar';
      });

type DesktopLeftSidebarLayoutProps = RequireAtLeastOneSidebar<DesktopLeftSidebarLayoutPropsBase>;

const LayoutWithSidebars = (props: DesktopLeftSidebarLayoutProps) => {
    const { leftTopSidebar, rightBottomSidebar, children } = props;
    const shouldBeFluid = !!leftTopSidebar && !!rightBottomSidebar;

    return (
        <Container
            className={cls.container}
            fluid={shouldBeFluid}
        >
            {leftTopSidebar && (
                <aside
                    className={`${cls.sidebar} ${cls.leftTopSidebar} ${
                        leftTopSidebar.hideOnMobile ? cls.hideOnMobile : ''
                    }`}
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
                    className={`${cls.sidebar} ${cls.rightBottomSidebar} ${
                        rightBottomSidebar.hideOnMobile ? cls.hideOnMobile : ''
                    }`}
                >
                    {rightBottomSidebar.component}
                </aside>
            )}
        </Container>
    );
};

export default LayoutWithSidebars;
