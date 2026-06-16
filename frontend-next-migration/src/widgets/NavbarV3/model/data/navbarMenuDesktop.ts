import img from '@/shared/assets/images/altLogo.png';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';
import {
    getRouteTeamPage,
    getRouteMainPage,
    getRouteAllNewsPage,
} from '@/shared/appLinks/RoutePaths';
import { NavbarBuilder } from './NavbarBuilder';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLogo('Nav logo', img as unknown as string, getRouteMainPage());
navbarBuilder.addLink('news', getRouteAllNewsPage(), true);
navbarBuilder.addDropDown('game', true, dropdowns.game);
navbarBuilder.addDropDown('gallery', true, dropdowns.gallery);
navbarBuilder.addDropDown('education', true, dropdowns.gameart);
navbarBuilder.addDropDown('community', true, dropdowns.community);
navbarBuilder.addLink('contactUs', getRouteTeamPage(), true);

export const navbarMenuDesktop = navbarBuilder.build();
