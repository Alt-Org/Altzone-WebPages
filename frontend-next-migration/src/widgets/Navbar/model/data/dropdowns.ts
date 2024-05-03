import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

export const dropdowns = {
    community: [
        {
            elementText: "forum",
            link: {
                path: AppExternalLinks.reddit,
                isExternal: true
            }
        },
        {
            elementText: "feedback",
            link: {
                path: AppExternalLinks.googleFeedback,
                isExternal: true
            }
        },
        {
            elementText: "gameArt",
            link: {
                path: RoutePaths.GAME_ART,
                isExternal: false
            }
        },
        {
            elementText: "teachingPackage",
            link: {
                path: RoutePaths.TEACHING_PACKAGE,
                isExternal: false
            }
        }
    ],
    game: [
        {
            elementText: "clans",
            link: {
                path: RoutePaths.clan_all,
                isExternal: false
            },
            isDisabled: {
                status: false,
                reason: "Kirjaudu ensin!"
            }
        },
        {
            elementText: "leaderboard",
            link: {
                path: AppExternalLinks.stub,
                isExternal: false
            }
        }
    ],
    art: [
        {
            elementText: "comics",
            link: {
                path: RoutePaths.COMICS_GALLERY,
                isExternal: false
            }
        },
        {
            elementText: "galleries",
            link: {
                path: RoutePaths.PICTURE_GALLERY,
                isExternal: false
            }
        }
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
    ]

};