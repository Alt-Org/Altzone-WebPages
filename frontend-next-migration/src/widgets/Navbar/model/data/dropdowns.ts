import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import {
    getRouteHeroDevPage,
    getRouteMyClanPage,
    getRouteComicsPage,
    getRouteGalleryPage,
    getRouteGameArtPage,
    getRouteDefenseGalleryPage,
    getRouteAllClanSearchPage,
    getRouteAllCollectionsPage,
    getRouteJoinUsPage,
    getRouteAboutPage,
    getRouteTeamPage,
    getRoutePrgPage,
} from '@/shared/appLinks/RoutePaths';

export const dropdowns = {
    community: [
        {
            elementText: 'clanpage',
            link: {
                path: getRouteMyClanPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'join',
            link: {
                path: getRouteJoinUsPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'forum',
            link: {
                path: AppExternalLinks.reddit,
                isExternal: true,
            },
        },
        {
            elementText: 'about',
            link: {
                path: getRouteAboutPage(),
                isExternal: false,
            },
        },
    ],
    game: [
        {
            elementText: 'play',
            link: {
                path: AppExternalLinks.webgl,
                isExternal: true,
            },
        },
        {
            elementText: 'heroes',
            link: {
                path: getRouteDefenseGalleryPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'development',
            link: {
                path: getRouteHeroDevPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'clans',
            link: {
                path: getRouteAllClanSearchPage(),
                isExternal: false,
            },
            isDisabled: {
                status: false,
                reason: 'Kirjaudu ensin!',
            },
        },
        // {
        //     elementText: 'leaderboard',
        //     link: {
        //         path: getRouteClanLeadeboardPage(),
        //         isExternal: false,
        //     },
        // },
    ],
    gallery: [
        {
            elementText: 'pictures',
            link: {
                path: getRouteGalleryPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'comics',
            link: {
                path: getRouteComicsPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'collections',
            link: {
                path: getRouteAllCollectionsPage(),
                isExternal: false,
            },
            isDisabled: {
                status: false,
                reason: 'Kirjaudu ensin!',
            },
        },
    ],
    gameart: [
        {
            elementText: 'gameart',
            link: {
                path: getRouteGameArtPage(),
                isExternal: false,
            },
        },
        {
            elementText: 'dlPackage',
            link: {
                path: AppExternalLinks.dlpackage,
                isExternal: true,
            },
        },
        {
            elementText: 'pastversions',
            link: {
                path: AppExternalLinks.pastversions,
                isExternal: true,
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
