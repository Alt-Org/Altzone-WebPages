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

    [AppRoutesLinks.NEWS]: news,
    [AppRoutesLinks.NEWSELEMENT]: news + '/:id',
    [AppRoutesLinks.FORUM]: '/forum',
    [AppRoutesLinks.MEMBERS]: '/team',
    [AppRoutesLinks.NOT_FOUND]: '/404',
    [AppRoutesLinks.COMING]: '/coming',

    // last one
    [AppRoutesLinks.NOT_FOUND_CATCH]: '*',
};

export const getMainPageRoute = () => '/';
export const getTeamPageRoute = () => '/team';

export const getAuthPageRoute = () => '/auth';
export const getLogoutPathRoute = () => '/auth/logout';
export const getLoginPageRoute = () => '/auth/login';
export const getRegisterPageRoute = () => '/auth/register';
export const getFPWPathRoute = () => '/auth/forgottenPassword';
export const getSessionExpiredPathRoute = () => '/auth/sessionExpired';

export const getAllNewsPageRoute = () => '/news';
export const getOneNewsPageRoute = (id: string) => `/news/${id}`;

export const getAllHeroesPageRoute = () => '/heroes';
export const getOneHeroPageRoute = (slug: string) => `/heroes/${slug}`;
export const getHeroDevPageRoute = () => '/hero-development';

export const getComicsPageRoute = () => '/comics';
export const getGalleryPageRoute = () => '/picture-galleries';
export const getGameArtPageRoute = () => '/artGame';

export const getMyClanPageRoute = () => '/clans/myclan';
export const getClanLeaderboardPageRoute = () => '/clans/leaderboard';

export const getAllClanPageRoute = () => '/clans';
export const getOneClanPageRoute = (id: string) => `/clans/${id}`;
export const getEveryClansPageRoute = () => '/clans/all';
export const getNewClanPageRoute = () => '/clans/addNew';

export const getPrivacyPageRoute = () => '/privacy';
export const getCookiesPageRoute = () => '/cookies';
export const getAboutPageRoute = () => '/about';
export const getComingPageRoute = () => '/coming';
export const getForumPageRoute = () => '/forum';
export const get404PageRoute = () => '/404';
