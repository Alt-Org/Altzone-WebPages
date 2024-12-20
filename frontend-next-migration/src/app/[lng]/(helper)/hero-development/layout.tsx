'use client';
import { ReactNode, useState } from 'react';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { HeroDevelopmentNavMenuAsDropdown, HeroNavMenu } from '@/features/NavigateHeroes';
import useSizes from '@/shared/lib/hooks/useSizes';

type Props = {
    children: ReactNode;
};

export default function HeroDevelopmentLayout({ children }: Props) {
    const { isDesktopSize, isWidescreenSize } = useSizes();
    const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                collapsed: !sidebarVisible,
                component:
                    isDesktopSize || isWidescreenSize ? (
                        <div style={{ width: 'fit-content' }}>
                            <HeroNavMenu
                                sidebarVisible={sidebarVisible}
                                setSidebarVisible={setSidebarVisible}
                            />
                        </div>
                    ) : (
                        <HeroDevelopmentNavMenuAsDropdown />
                    ),
            }}
        >
            {children}
            <FeedbackSideButton />
        </LayoutWithSidebars>
    );
}
