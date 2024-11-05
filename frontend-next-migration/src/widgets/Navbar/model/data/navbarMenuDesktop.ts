import img from '@/shared/assets/images/altLogo.png';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteTeamPage,
    getRouteLoginPage,
} from '@/shared/appLinks/RoutePaths';
import { dropdowns } from './dropdowns';
import { NavbarBuilder } from './NavbarBuilder';

const navbarBuilderV2 = new NavbarBuilder();
navbarBuilderV2.addLogo('Nav logo', img as unknown as string, getRouteMainPage());
navbarBuilderV2.addLink('news', getRouteAllNewsPage(), true);
navbarBuilderV2.addDropDown('game', true, dropdowns.game);
navbarBuilderV2.addDropDown('gallery', true, dropdowns.gallery);
navbarBuilderV2.addDropDown('gameart', true, dropdowns.gameart);
navbarBuilderV2.addDropDown('community', true, dropdowns.community);
navbarBuilderV2.addLink('team', getRouteTeamPage(), true);
navbarBuilderV2.addAuthProfile('profile', dropdowns.profile);
navbarBuilderV2.addAuthLogin('login', getRouteLoginPage());

export const navbarMenuDesktop2 = navbarBuilderV2.build();
export const navbarGameArtDesktop = navbarBuilderV2.build();
export const navbarCookiesDesktop = navbarBuilderV2.build();
export const navbarPrivacyDesktop = navbarBuilderV2.build();
