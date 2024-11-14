import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/shared/ui/Layouts';
import { HeroNavMenu } from '@/widgets/HeroNavMenu';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <HeroNavMenu />,
            }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
