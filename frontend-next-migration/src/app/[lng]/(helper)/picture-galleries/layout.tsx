import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/shared/ui/Layouts';
// import { HeroNavMenu } from '@/features/NavigateHeroes';
import { GalleryNavMenu } from '@/features/NavigateGalleries';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <GalleryNavMenu />,
            }}
            // rightBottomSidebar={{ component: <HeroNavMenu /> }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
