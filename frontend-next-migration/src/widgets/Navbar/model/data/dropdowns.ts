import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import {
    getHeroDevPageRoute,
    getMyClanPageRoute,
    getClanLeaderboardPageRoute,
    getComicsPageRoute,
    getGalleryPageRoute,
    getGameArtPageRoute,
    getAllHeroesPageRoute,
    getAllClanPageRoute,
} from '@/shared/appLinks/RoutePaths';

export const dropdowns = {
    community: [
        {
            elementText: 'clanpage',
            link: {
                path: getMyClanPageRoute(),
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
                path: getAllHeroesPageRoute(),
                isExternal: false,
            },
        },
        {
            elementText: 'development',
            link: {
                path: getHeroDevPageRoute(),
                isExternal: false,
            },
        },
        {
            elementText: 'clans',
            link: {
                path: getAllClanPageRoute(),
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
                path: getClanLeaderboardPageRoute(),
                isExternal: false,
            },
        },
    ],
    gallery: [
        {
            elementText: 'pictures',
            link: {
                path: getGalleryPageRoute(),
                isExternal: false,
            },
        },
        {
            elementText: 'comics',
            link: {
                path: getComicsPageRoute(),
                isExternal: false,
            },
        },
    ],
    gameart: [
        {
            elementText: 'gameart',
            link: {
                path: getGameArtPageRoute(),
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
