export enum AppRoutesLinks {
    AUTH = 'auth',
    AUTH_LOGIN = 'auth_login',
    AUTH_REGISTER = 'auth_register',
    AUTH_LOGIN_FPW = 'auth_login_fpw',
    AUTH_LOGOUT = 'auth_logout',
    AUTH_SESSION_EXP = 'auth_session_exp',

    CLAN = 'clan',
    CLAN_ALL = 'CLAN_ALL',
    CLAN_ONE = 'clan_one',
    CLAN_ADD_NEW = 'clan_add_new',
    CLAN_LEADERBOARD = 'CLAN_LEADERBOARD',
    CLAN_MY_CLAN = 'my_clan',

    PICTURE_GALLERY = 'PICTURE_GALLERY',
    COMICS_GALLERY = 'COMICS_GALLERY',

    MAIN = 'MAIN',
    ABOUT = 'ABOUT',
    PRIVACY = 'privacy',
    COOKIES = 'cookies',
    FORUM = 'FORUM',
    GAME_ART = 'GAME_ART',

    NEWS = 'NEWS',
    NEWSELEMENT = 'NEWSELEMENT',
    MEMBERS = 'MEMBERS',

    HEROES = 'HEROES',
    HEROES_ONE = 'HEROES_ONE',

    HERO_DEVELOPMENT = 'HERO_DEVELOPMENT',

    JOIN_US = 'JOIN_US',

    NOT_FOUND = 'NOT_FOUND',
    NOT_FOUND_CATCH = 'NOT_FOUND_CATCH',

    COMING = 'COMING',
}

const news = '/news';
/**
 * The values are used as routesLinks throughout the app,
 * if do update , don't forget update also routeConfig at App layer
 * @deprecated use getters instead
 * add new getter functions if new pages are added
 */
export const RoutePaths: Record<AppRoutesLinks, string> = {
    [AppRoutesLinks.AUTH]: '/auth',
    [AppRoutesLinks.AUTH_REGISTER]: '/auth/register',
    [AppRoutesLinks.AUTH_LOGIN]: '/auth/login',
    [AppRoutesLinks.AUTH_LOGIN_FPW]: '/auth/login/forgottenPassword',
    [AppRoutesLinks.AUTH_LOGOUT]: '/auth/logout',
    [AppRoutesLinks.AUTH_SESSION_EXP]: '/auth/sessionExpired',

    [AppRoutesLinks.CLAN]: '/clans',
    [AppRoutesLinks.CLAN_ALL]: '/clans/all',
    [AppRoutesLinks.CLAN_ADD_NEW]: '/clans/addNew',
    [AppRoutesLinks.CLAN_ONE]: '/clans/:id',
    [AppRoutesLinks.CLAN_MY_CLAN]: '/clans/myclan',
    [AppRoutesLinks.CLAN_LEADERBOARD]: '/clans/leaderboard',

    [AppRoutesLinks.PICTURE_GALLERY]: '/picture-galleries',
    [AppRoutesLinks.COMICS_GALLERY]: '/comics',

    [AppRoutesLinks.MAIN]: '/',
    [AppRoutesLinks.ABOUT]: '/about',
    [AppRoutesLinks.PRIVACY]: '/privacy',
    [AppRoutesLinks.COOKIES]: '/cookies',
    [AppRoutesLinks.GAME_ART]: '/artGame',

    [AppRoutesLinks.HEROES]: '/heroes',
    [AppRoutesLinks.HEROES_ONE]: '/heroes/:slug',
    [AppRoutesLinks.HERO_DEVELOPMENT]: '/hero-development',

    [AppRoutesLinks.JOIN_US]: '/join-us',

    [AppRoutesLinks.NEWS]: news,
    [AppRoutesLinks.NEWSELEMENT]: news + '/:id',
    [AppRoutesLinks.FORUM]: '/forum',
    [AppRoutesLinks.MEMBERS]: '/team',
    [AppRoutesLinks.NOT_FOUND]: '/404',
    [AppRoutesLinks.COMING]: '/coming',

    // last one
    [AppRoutesLinks.NOT_FOUND_CATCH]: '*',
};

export const getRouteMainPage = () => '/';
export const getRouteTeamPage = () => '/team';

export const getRouteAuthPage = () => '/auth';
export const getRouteLogoutPage = () => '/auth/logout';
export const getRouteLoginPage = () => '/auth/login';
export const getRouteRegisterPage = () => '/auth/register';
export const getRouteFPWPage = () => '/auth/forgottenPassword';
export const getRouteSessionExpiredPage = () => '/auth/sessionExpired';

export const getRouteAllNewsPage = () => '/news';
export const getRouteOneNewsPage = (id: string) => `/news/${id}`;

export const getRouteAllHeroesPage = () => '/heroes';
export const getRouteOneHeroPage = (slug: string) => `/heroes/${slug}`;
export const getRouteHeroDevPage = () => '/hero-development';

export const getRouteComicsPage = () => '/comics';
export const getRouteGalleryPage = () => '/picture-galleries';
export const getRouteGameArtPage = () => '/artGame';

export const getRouteMyClanPage = () => '/clans/myclan';
export const getRouteClanLeadeboardPage = () => '/clans/leaderboard';

export const getRouteAllClanSearchPage = () => '/clans';
export const getRouteOneClanPage = (id: string) => `/clans/${id}`;
export const getRouteEveryClansPage = () => '/clans/all';
export const getRouteAddNewClanPage = () => '/clans/addNew';

export const getRouteJoinUsPage = () => '/join-us';

export const getRoutePrivacyPage = () => '/privacy';
export const getRouteCookiesPage = () => '/cookies';
export const getRouteAboutPage = () => '/about';
export const getRouteComingSoonPage = () => '/coming';
export const getRouteForumPage = () => '/forum';
export const getRoute404Page = () => '/404';
