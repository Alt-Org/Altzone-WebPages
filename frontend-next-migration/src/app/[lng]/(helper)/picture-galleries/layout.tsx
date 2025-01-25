import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenuAsDropdown } from '@/features/NavigateGalleries';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <GalleryNavMenuAsDropdown openByDefault={true} />,
                hideOnMobile: true,
            }}
            // rightBottomSidebar={
            // {
            //     component: <GalleryNavMenuAsDropdown openByDefault={true} />,
            //     hideOnMobile: true,
            // }
            // }
        >
            {children}
        </LayoutWithSidebars>
    );
}
