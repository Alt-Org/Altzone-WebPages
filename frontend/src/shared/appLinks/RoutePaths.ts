export enum AppRoutesLinks {
    MAIN = "MAIN",
    ABOUT = "ABOUT",
    FORUM = "FORUM",
    NOT_FOUND = "NOT_FOUND",
    NOT_FOUND_CATCH = "NOT_FOUND_CATCH",
}

/**
 * The values are used as routesLinks throughout the app,
 * if do update , don't forget update also routeConfig at App layer
 */
export const RoutePaths: Record<AppRoutesLinks, string> = {
    [AppRoutesLinks.MAIN]: "/",
    [AppRoutesLinks.ABOUT]: "/about",
    [AppRoutesLinks.FORUM]: "/forum",
    [AppRoutesLinks.NOT_FOUND]: "/404",
    // last one
    [AppRoutesLinks.NOT_FOUND_CATCH]: "*",
};

