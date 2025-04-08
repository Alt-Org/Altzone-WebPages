'use client';
import { ReactNode, useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { CustomSwitch, CustomSwitchItems, ToggleLink } from '@/shared/ui/CustomSwitch';

const LeaderboardLayout = ({ children }: { children: ReactNode }) => {
    const params = useParams();
    const lng = params.lng as string;

    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPath = `/${pathSegments.slice(0, 4).join('/')}`;
        // console.log(newPath);
        // console.log(pathSegments);
        setRealPath(newPath);
    }, [pathname]);

    const CustomSwitchElements: ToggleLink[] = [
        {
            children: <p>Globaali</p>,
            path: `/${lng}/leaderboard`,
        },
        {
            children: <p>Klaani</p>,
            path: `/${lng}/leaderboard/clan`,
        },
        {
            children: <p>Kaverit</p>,
            path: `/${lng}/leaderboard/friends`,
        },
    ].map((elem) => {
        return {
            type: CustomSwitchItems.ToggleLink,
            isOpen: elem.path === realPath,
            ...elem,
        };
    });

    return (
        <LayoutWithSidebars
            rightBottomSidebar={{
                component: <p>categories</p>,
                hideOnMobile: true,
            }}
        >
            <CustomSwitch elements={CustomSwitchElements} />
            {children}
        </LayoutWithSidebars>
    );
};

export default LeaderboardLayout;
