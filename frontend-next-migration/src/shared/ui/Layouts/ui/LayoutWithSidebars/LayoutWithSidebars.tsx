import { ReactNode } from 'react';
import cls from './LayoutWithSidebars.module.scss';
import { Container } from '@/shared/ui/Container';

interface DesktopLeftSidebarLayoutPropsBase {
    children: ReactNode;
}

type RequireAtLeastOneSidebar<T> =
    | (T & { leftTopSidebar: ReactNode; rightBottomSidebar?: ReactNode })
    | (T & { leftTopSidebar?: ReactNode; rightBottomSidebar: ReactNode })
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
            {leftTopSidebar && <aside className={cls.sidebar}>{leftTopSidebar}</aside>}

            <Container
                className={cls.content}
                fluid={shouldBeFluid}
            >
                {children}
            </Container>

            {rightBottomSidebar && <aside className={cls.sidebar}>{rightBottomSidebar}</aside>}
        </Container>
    );
};

export default LayoutWithSidebars;
