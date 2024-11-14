import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenu } from '@/features/NavigateGalleries';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <GalleryNavMenu />,
                hideOnMobile: true,
            }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
