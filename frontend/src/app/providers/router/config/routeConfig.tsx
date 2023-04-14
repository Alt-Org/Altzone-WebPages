import { RouteProps, Navigate  } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { AboutPage } from "@/pages/AboutPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import {RoutePaths,AppRoutesLinks} from "@/shared/appLinks/RoutePaths";

export const routeConfig: Record<AppRoutesLinks, RouteProps> = {
    [AppRoutesLinks.MAIN]: {
        path: RoutePaths.MAIN,
        element: <MainPage />,
    },
    [AppRoutesLinks.ABOUT]: {
        path: RoutePaths.ABOUT,
        element: <AboutPage />,
    },

    [AppRoutesLinks.FORUM]: {
        path: RoutePaths.FORUM,
        element: <AboutPage/>
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
