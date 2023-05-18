export enum AppRoutesLinks {
    MAIN = "MAIN",
    ABOUT = "ABOUT",
    FORUM = "FORUM",
    NEWS = "NEWS",
    NEWSELEMENT = "NEWSELEMENT",
    MEMBERS = "MEMBERS",
    NOT_FOUND = "NOT_FOUND",
    NOT_FOUND_CATCH = "NOT_FOUND_CATCH",
}



const news = "/news";


/**
 * The values are used as routesLinks throughout the app,
 * if do update , don't forget update also routeConfig at App layer
 */
export const RoutePaths: Record<AppRoutesLinks, string> = {
    [AppRoutesLinks.MAIN]: "/",
    [AppRoutesLinks.ABOUT]: "/about",
    [AppRoutesLinks.NEWS]: news,
    [AppRoutesLinks.NEWSELEMENT]: news + "/:id",
    [AppRoutesLinks.FORUM]: "/forum",
    [AppRoutesLinks.MEMBERS]: "/members",
    [AppRoutesLinks.NOT_FOUND]: "/404",
    // last one
    [AppRoutesLinks.NOT_FOUND_CATCH]: "*",
};

