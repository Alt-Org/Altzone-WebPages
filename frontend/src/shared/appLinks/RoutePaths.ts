export enum AppRoutesLinks {

    AUTH = "auth",
    AUTH_LOGIN = "auth_login",
    AUTH_REGISTER = "auth_register",
    AUTH_LOGIN_FPW = "auth_login_fpw",
    AUTH_LOGOUT = "auth_logout",
    AUTH_SESSION_EXP = "auth_session_exp",

    CLAN = "clan",
    CLAN_ALL = "clan_all",
    CLAN_ONE = "clan_one",
    CLAN_ADD_NEW = "clan_add_new",



    MAIN = "MAIN",
    ABOUT = "ABOUT",
    FORUM = "FORUM",
    PICTURE_GALLERY = "PICTURE_GALLERY",
    COMICS_GALLERY = "COMICS_GALLERY",
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

    [AppRoutesLinks.AUTH]: "/auth",
    [AppRoutesLinks.AUTH_REGISTER]: "/auth/register",
    [AppRoutesLinks.AUTH_LOGIN]: "/auth/login",
    [AppRoutesLinks.AUTH_LOGIN_FPW]: "/auth/login/forgottenPassword",
    [AppRoutesLinks.AUTH_LOGOUT]: "/auth/logout",
    [AppRoutesLinks.AUTH_SESSION_EXP]: "/auth/sessionExpired",


    [AppRoutesLinks.CLAN]: "/clans",
    [AppRoutesLinks.CLAN_ALL]: "/clans/all",
    [AppRoutesLinks.CLAN_ADD_NEW]: "/clans/addNew",
    [AppRoutesLinks.CLAN_ONE]: "/clans/:id",




    [AppRoutesLinks.MAIN]: "/",
    [AppRoutesLinks.ABOUT]: "/about",
    [AppRoutesLinks.PICTURE_GALLERY]: "/pictureGalleries",
    [AppRoutesLinks.COMICS_GALLERY]: "/comicsGalleries",
    [AppRoutesLinks.NEWS]: news,
    [AppRoutesLinks.NEWSELEMENT]: news + "/:id",
    [AppRoutesLinks.FORUM]: "/forum",
    [AppRoutesLinks.MEMBERS]: "/members",
    [AppRoutesLinks.NOT_FOUND]: "/404",
    // last one
    [AppRoutesLinks.NOT_FOUND_CATCH]: "*",
};



