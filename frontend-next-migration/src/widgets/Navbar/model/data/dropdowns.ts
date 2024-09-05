import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';

export const dropdowns = {
  community: [
    {
      elementText: 'join',
      link: {
        path: AppExternalLinks.join,
        isExternal: true,
      },
    },
    {
      elementText: 'clanpage',
      link: {
        path: RoutePaths.COMING,
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
        path: RoutePaths.HEROES,
        isExternal: false,
      },
    },
    {
      elementText: 'development',
      link: {
        path: AppExternalLinks.development,
        isExternal: true,
      },
    },
    {
      elementText: 'clans',
      link: {
        path: RoutePaths.clan,
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
        path: RoutePaths.COMING,
        isExternal: false,
      },
    },
  ],
  gallery: [
    {
      elementText: 'comics',
      link: {
        path: RoutePaths.COMICS_GALLERY,
        isExternal: false,
      },
    },
    {
      elementText: 'galleries',
      link: {
        path: RoutePaths.PICTURE_GALLERY,
        isExternal: false,
      },
    },
  ],
  gameart: [
    {
      elementText: 'gameart',
      link: {
        path: RoutePaths.GAME_ART,
        isExternal: false,
      },
    },
    {
      elementText: 'dlPackage',
      link: {
        path: AppExternalLinks.dlpackage,
        isExternal: false,
      },
    },
    {
      elementText: 'pastversions',
      link: {
        path: RoutePaths.COMING,
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
