import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';

export const dropdowns = {
  community: [
    {
      elementText: 'clanpage',
      link: {
        path: RoutePaths.my_clan,
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
        path: RoutePaths.GAME,
        isExternal: false,
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
        path: RoutePaths.HERO_DEVELOPMENT,
        isExternal: false,
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
        path: RoutePaths.CLAN_LEADERBOARD,
        isExternal: false,
      },
    },
  ],
  gallery: [
    {
      elementText: 'pictures',
      link: {
        path: RoutePaths.PICTURE_GALLERY,
        isExternal: false,
      },
    },
    {
      elementText: 'comics',
      link: {
        path: RoutePaths.COMICS_GALLERY,
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
