'use client';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { NewsPageNavMenuAsDropdown } from '@/features/NavigateNewsPage';

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <LayoutWithSidebars
                leftTopSidebar={{
                    component: <NewsPageNavMenuAsDropdown />,
                }}
            >
                {children}
            </LayoutWithSidebars>
        </div>
    );
}
