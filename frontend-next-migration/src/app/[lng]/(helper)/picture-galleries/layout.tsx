'use client';
import { useState, ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenuAsSidebar } from '@/features/NavigateGalleries';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                collapsed: !sidebarVisible,
                component: (
                    <GalleryNavMenuAsSidebar
                        sidebarVisible={sidebarVisible}
                        setSidebarVisible={setSidebarVisible}
                    />
                ),
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
