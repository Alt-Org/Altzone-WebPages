import img from '@/shared/assets/images/altLogo.png';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteLoginPage,
} from '@/shared/appLinks/RoutePaths';
import { dropdowns } from './dropdowns';
import { NavbarBuilder } from './NavbarBuilder';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLogo('Nav logo', img as unknown as string, getRouteMainPage());
navbarBuilder.addLink('news', getRouteAllNewsPage(), true);
navbarBuilder.addDropDown('game', true, dropdowns.game);
navbarBuilder.addDropDown('gallery', true, dropdowns.gallery);
navbarBuilder.addDropDown('gameart', true, dropdowns.gameart);
navbarBuilder.addDropDown('community', true, dropdowns.community);
navbarBuilder.addDropDown('team', true, dropdowns.team);
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', getRouteLoginPage());

export const navbarMenuDesktop = navbarBuilder.build();
