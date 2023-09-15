import { ReactElement } from 'react';
import {Navigate} from 'react-router-dom';
import {MainPage} from "@/pages/MainPage";
import {PictureGalleryPage} from "@/pages/PictureGalleryPage";
import {MembersPage} from "@/pages/MembersPage";
import {AboutPage} from "@/pages/AboutPage";
import {NewsPage} from "@/pages/NewsPage";
import {NewsElementPage} from "@/pages/NewsElementPage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {AppRoutesLinks, RoutePaths} from "@/shared/appLinks/RoutePaths";
// import {RoutePaths,AppRoutesLinks} from "./RoutePaths";

export interface RouteObject {
    path: string;
    element: ReactElement;
    children?: RouteObject[];
}

export const routeConfig: RouteObject[] = Object.values({

    [AppRoutesLinks.MAIN]: {
        path: RoutePaths.MAIN,
        element: <MainPage />,
    },

    [AppRoutesLinks.PICTURE_GALLERY]: {
        path: RoutePaths.PICTURE_GALLERY,
        element: <PictureGalleryPage />,
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
});






