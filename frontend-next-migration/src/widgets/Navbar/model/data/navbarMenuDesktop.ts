import img from '@/shared/assets/images/altLogo.png';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteTeamPage,
    getRouteLoginPage,
} from '@/shared/appLinks/RoutePaths';
import { dropdowns } from './dropdowns';
import { NavbarBuilder } from './NavbarBuilder';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addDropDown('community', false, dropdowns.community, 'left');
navbarBuilder.addDropDown('game', false, dropdowns.game, 'left');
navbarBuilder.addLogo('Nav logo', img as unknown as string, getRouteMainPage(), 'center');
navbarBuilder.addDropDown('gameart', false, dropdowns.gameart, 'right');
navbarBuilder.addDropDown('gallery', false, dropdowns.gallery, 'right');
navbarBuilder.addLink('team', getRouteTeamPage(), false, 'right');
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', getRouteLoginPage());
export const navbarMenuDesktop = navbarBuilder.build();

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

// const navbarGameArtBuilder = new NavbarBuilder();
export const navbarGameArtDesktop = navbarBuilderV2.build();

// const navbarCookiesBuilder = new NavbarBuilder();
export const navbarCookiesDesktop = navbarBuilderV2.build();

// const navbarPrivacyBuilder = new NavbarBuilder();
export const navbarPrivacyDesktop = navbarBuilderV2.build();
