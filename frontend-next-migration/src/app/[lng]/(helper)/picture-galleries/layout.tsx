import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/shared/ui/Layouts';
import { HeroNavMenu } from '@/features/NavigateHeroes';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <HeroNavMenu />,
            }}
            // rightBottomSidebar={{ component: <HeroNavMenu /> }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
