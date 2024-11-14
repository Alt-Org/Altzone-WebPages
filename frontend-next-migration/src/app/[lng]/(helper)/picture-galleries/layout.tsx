import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenu } from '@/features/NavigateGalleries';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <GalleryNavMenu openByDefault={true} />,
                hideOnMobile: true,
            }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
