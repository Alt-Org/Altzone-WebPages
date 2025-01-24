'use client';
import { useState, ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { GalleryNavMenuAsSidebar } from '@/features/NavigateGalleries';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: (
                    <GalleryNavMenuAsSidebar
                        sidebarVisible={sidebarVisible}
                        setSidebarVisible={setSidebarVisible}
                    />
                ),
                hideOnMobile: true,
            }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
