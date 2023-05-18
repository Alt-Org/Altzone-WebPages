import { RouteProps, Navigate  } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { AboutPage } from "@/pages/AboutPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import {RoutePaths,AppRoutesLinks} from "@/shared/appLinks/RoutePaths";
import {NewsPage} from "@/pages/NewsPage";
import {NewsElementPage} from "@/pages/NewsElementPage";
import {MembersPage} from "@/pages/MembersPage";

export const routeConfig: Record<AppRoutesLinks, RouteProps> = {
    [AppRoutesLinks.MAIN]: {
        path: RoutePaths.MAIN,
        element: <MainPage />,
    },

    [AppRoutesLinks.MEMBERS]: {
        path: RoutePaths.MEMBERS,
        element: <MembersPage />,
    },

    [AppRoutesLinks.ABOUT]: {
        path: RoutePaths.ABOUT,
        element: <AboutPage />,
    },

    [AppRoutesLinks.NEWS]: {
        path: RoutePaths.NEWS,
        element: <NewsPage />,
    },

    [AppRoutesLinks.NEWSELEMENT]: {
        path: RoutePaths.NEWSELEMENT,
        element: <NewsElementPage />,
    },

    [AppRoutesLinks.FORUM]: {
        path: RoutePaths.FORUM,
        element: <NotFoundPage/>
    },

    [AppRoutesLinks.NOT_FOUND]: {
        path: RoutePaths.NOT_FOUND,
        element: <NotFoundPage/>
    },

    [AppRoutesLinks.NOT_FOUND_CATCH]: {
        path: RoutePaths.NOT_FOUND_CATCH,
        element: <Navigate to={RoutePaths.NOT_FOUND} />
    },
};
