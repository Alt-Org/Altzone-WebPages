'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/shared/ui/Layouts';
// import { HeroNavMenu } from '@/features/NavigateHeroes';
import { GalleryNavMenu } from '@/features/NavigateGalleries';
import { useSelector } from 'react-redux';
import { selectIsCollapsed, selectIsFixed } from '@/widgets/Navbar';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const isFixed = useSelector(selectIsFixed);
    const isCollapsed = useSelector(selectIsCollapsed);

    const isTopIndent = isFixed && !isCollapsed;

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <GalleryNavMenu />,
                hideOnMobile: true,
            }}
            topIndent={isTopIndent}
            // rightBottomSidebar={{ component: <HeroNavMenu /> }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
