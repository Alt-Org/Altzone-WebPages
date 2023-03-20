import { RouteProps, redirect, Navigate  } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import { AboutPage } from "@/pages/AboutPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export enum AppRoutes {
    MAIN = "main",
    ABOUT = "about",
    FORUM = "forum",
    NOT_FOUND = "notFound",
    NOT_FOUND_CATCH = "notFoundCatch",
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: "/",
    [AppRoutes.ABOUT]: "/about",
    [AppRoutes.FORUM]: "/forum",
    [AppRoutes.NOT_FOUND]: "/404",
    // last one
    [AppRoutes.NOT_FOUND_CATCH]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },

    [AppRoutes.FORUM]: {
        path: RoutePath.forum,
        element: <AboutPage/>
    },

    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.notFound,
        element: <NotFoundPage/>
    },

    [AppRoutes.NOT_FOUND_CATCH]: {
        path: RoutePath.notFoundCatch,
        element: <Navigate to="/404" />
    },
};
