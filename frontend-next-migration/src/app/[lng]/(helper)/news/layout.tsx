'use client';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { NavMenuWithDropdowns } from '@/shared/ui/NavMenuWithDropdownsV2';

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: (
                    <NavMenuWithDropdowns
                        title="Categories"
                        dropdownItems={[
                            { elementText: 'All News', link: { path: '/news', isExternal: false } },
                            { elementText: 'Updates', link: { path: '/news/', isExternal: false } },
                            { elementText: 'Events', link: { path: '/news/', isExternal: false } },
                            {
                                elementText: 'Announcements',
                                link: { path: '/news/', isExternal: false },
                            },
                        ]}
                        openByDefault={true}
                    />
                ),
            }}
        >
            {children}
        </LayoutWithSidebars>
    );
}
