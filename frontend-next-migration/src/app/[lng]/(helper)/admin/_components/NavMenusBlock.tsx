'use client';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import {
    NavMenuWithDropdowns,
    type NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';

type Props = { variant: 'forum' | 'clans-collapsed' | 'clans-static' | 'clans-static-with-sub' };

export default function NavMenusBlock({ variant }: Props) {
    const commonClanItems = [
        { elementText: 'Selaa Klaaneja', link: { path: '/clans', isExternal: false } },
        { elementText: 'Leaderboard', link: { path: '/clans/leaderboard', isExternal: false } },
        { elementText: 'Klaanisivu', link: { path: '/clans/myclan', isExternal: false } },
        { elementText: 'Kauppa', link: { path: '/store', isExternal: false } },
    ];

    let props: NavMenuWithDropdownsProps;

    switch (variant) {
        case 'forum':
            props = {
                title: 'Forum',
                openByDefault: true,
                dropdownItems: [
                    {
                        title: 'Heroes',
                        openByDefault: false,
                        elements: [
                            {
                                elementText: 'Hero 1',
                                id: 'hero1',
                                link: { path: RoutePaths.HEROES, isExternal: false },
                            },
                            { elementText: 'Hero 2', id: 'hero2' },
                        ],
                    },
                ],
            };
            break;

        case 'clans-collapsed':
            props = {
                title: 'Klaanit',
                openByDefault: false,
                titleAsActive: true,
                dropdownItems: commonClanItems,
            };
            break;

        case 'clans-static':
            props = { title: 'Klaanit', staticDropdown: true, dropdownItems: commonClanItems };
            break;

        case 'clans-static-with-sub':
            props = {
                title: 'Klaanit',
                staticDropdown: true,
                dropdownItems: [
                    ...commonClanItems.slice(0, 3),
                    {
                        title: 'Heroes',
                        openByDefault: false,
                        elements: [
                            {
                                elementText: 'Hero 1',
                                id: 'hero1',
                                link: { path: RoutePaths.HEROES, isExternal: false },
                            },
                            { elementText: 'Hero 2', id: 'hero2' },
                        ],
                    },
                    commonClanItems[3],
                ],
            };
            break;
    }

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '20px 0' }}>
            <NavMenuWithDropdowns {...props} />
        </div>
    );
}
