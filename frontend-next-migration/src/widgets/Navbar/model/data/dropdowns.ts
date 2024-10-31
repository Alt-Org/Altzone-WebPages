import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import {
    getRouteHeroDevPage,
    getRouteMyClanPage,
    getRouteClanLeadeboardPage,
    getRouteComicsPage,
    getRouteGalleryPage,
    getRouteGameArtPage,
    getRouteAllHeroesPage,
    getRouteAllClanSearchPage,
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
                path: AppExternalLinks.join,
                isExternal: true,
            },
        },
        {
            elementText: 'forum',
            link: {
                path: AppExternalLinks.reddit,
                isExternal: true,
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
                path: getRouteAllHeroesPage(),
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
        {
            elementText: 'leaderboard',
            link: {
                path: getRouteClanLeadeboardPage(),
                isExternal: false,
            },
        },
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
