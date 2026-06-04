import { dropdowns } from './dropdowns';
import { NavbarBuilder } from './NavbarBuilder';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteLoginPage,
} from '@/shared/appLinks/RoutePaths';
import img from '@/shared/assets/images/altLogo.png';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLink('news', getRouteAllNewsPage(), true);
navbarBuilder.addDropDown('game', false, dropdowns.game);
navbarBuilder.addDropDown('gallery', false, dropdowns.gallery);
navbarBuilder.addDropDown('gameart', false, dropdowns.gameart);
navbarBuilder.addDropDown('community', false, dropdowns.community);
navbarBuilder.addDropDown('team', false, dropdowns.team);
navbarBuilder.addLogo('main', img as unknown as string, getRouteMainPage());
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', getRouteLoginPage());

export const navbarMenuMobile = navbarBuilder.build();
