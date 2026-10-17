import {
    getRouteComicsPage,
    getRouteGameArtPage,
    getRouteDefenseGalleryPage,
    getRouteAllFurnitureSetsPage,
    getRouteAllMusicCollectionsPage,
    getRouteAboutPage,
    getRouteTeamPage,
    getRoutePrgPage,
    getRouteGamePage,
    getRouteComingSoonPage,
    getRouteAllClanSearchPage,
    getRouteLeaderboardPage,
} from '@/shared/appLinks/RoutePaths';

export const dropdowns = {
    community: [
        {
            elementText: 'whatIsPrg',
            link: {
                path: getRoutePrgPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'altZoneHistory',
            link: {
                path: getRouteAboutPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'developersAndDesigners',
            link: {
                path: getRouteTeamPage(),
                isExternal: false,
            },
        },
    ],
    game: [
        {
            elementText: 'learnTheGame',
            link: {
                path: getRouteGamePage(),
                isExternal: false,
            },
        },
        {
            elementText: 'story',
            link: {
                path: getRouteComingSoonPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'defenseHeroes',
            link: {
                path: getRouteDefenseGalleryPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'balanceVoting',
            link: {
                path: getRouteComingSoonPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'clans',
            link: {
                path: getRouteAllClanSearchPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'scoreboard',
            link: {
                path: getRouteLeaderboardPage(),
                isExternal: false,
            },
        },
    ],
    gallery: [
        {
            elementText: 'sarjakuvat',
            link: {
                path: getRouteComicsPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'characterDevelopment',
            link: {
                path: getRouteComingSoonPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'soulCastleFurniture',
            link: {
                path: getRouteAllFurnitureSetsPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'gameIcons',
            link: {
                path: getRouteComingSoonPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'gameMusic',
            link: {
                path: getRouteAllMusicCollectionsPage(),
                isExternal: false,
            },
        },
    ],
    gameart: [
        {
            elementText: 'opetuspaketti',
            link: {
                path: getRouteComingSoonPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'pelitaide',
            link: {
                path: getRouteGameArtPage(),
                isExternal: false,
            },
        },
    ],
    team: [
        {
            elementText: 'team',
            link: {
                path: getRouteTeamPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'PRG',
            link: {
                path: getRoutePrgPage(),
                isExternal: false,
            },
        },
    ],
    profile: [
        //     {
        //         elementText: 'forum',
        //         link: {
        //             path: AppExternalLinks.reddit,
        //             isExternal: true
        //         }
        //     }
        // ]
    ],
};
