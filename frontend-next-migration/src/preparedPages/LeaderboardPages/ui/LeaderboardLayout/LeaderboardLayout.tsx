'use client';
import { ReactNode, useState, useEffect, useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { useClientTranslation } from '@/shared/i18n';
import { CustomSwitch, CustomSwitchItems, ToggleLink } from '@/shared/ui/CustomSwitch';
import { NavMenuWithDropdowns } from '@/shared/ui/NavMenuWithDropdownsV2';
import cls from './LeaderboardLayout.module.scss';

const LeaderboardLayout = ({ children }: { children: ReactNode }) => {
    const { t } = useClientTranslation('leaderboard');
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

    const CustomSwitchElements: ToggleLink[] = useMemo(() => {
        return [
            {
                children: <p>{t('global')}</p>,
                path: `/${lng}/leaderboard`,
            },
            {
                children: <p>{t('clan')}</p>,
                path: `/${lng}/leaderboard/clans`,
            },
            {
                children: <p>{t('friends')}</p>,
                path: `/${lng}/leaderboard/friends`,
            },
        ].map((elem) => {
            return {
                type: CustomSwitchItems.ToggleLink,
                isOpen: elem.path === realPath,
                ...elem,
            };
        });
    }, [realPath, lng]);

    return (
        <LayoutWithSidebars
            className={cls.LayoutWithSidebars}
            leftTopSidebar={{
                component: (
                    <NavMenuWithDropdowns
                        openByDefault={true}
                        dropdownItems={[
                            { elementText: 'Item 1', link: { path: '/item1', isExternal: false } },
                            {
                                title: 'Category 1',
                                openByDefault: false,
                                elements: [
                                    {
                                        id: '1',
                                        elementText: 'Item 2',
                                        link: { path: '/item2', isExternal: false },
                                    },
                                    {
                                        id: '2',
                                        elementText: 'Item 3',
                                        link: { path: '/item3', isExternal: false },
                                    },
                                ],
                            },
                            {
                                title: 'Category 2',
                                openByDefault: false,
                                elements: [
                                    {
                                        id: '3',
                                        elementText: 'Item 4',
                                        link: { path: '/item4', isExternal: false },
                                    },
                                    {
                                        id: '4',
                                        elementText: 'Item 5',
                                        link: { path: '/item5', isExternal: false },
                                    },
                                ],
                            },
                        ]}
                        title={'Kategoriat'}
                    />
                ),
            }}
        >
            <main className={cls.Content}>
                <CustomSwitch elements={CustomSwitchElements} />
                {children}
            </main>
        </LayoutWithSidebars>
    );
};

export default LeaderboardLayout;
