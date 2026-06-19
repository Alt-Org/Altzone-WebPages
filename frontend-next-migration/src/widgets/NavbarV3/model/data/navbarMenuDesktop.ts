import img from '@/shared/assets/images/altLogo.png';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';
import {
    getRouteTeamPage,
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteGameArtPage,
} from '@/shared/appLinks/RoutePaths';
import { NavbarBuilder } from './NavbarBuilder';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLogo('Nav logo', img as unknown as string, getRouteMainPage());
navbarBuilder.addLink('news', getRouteAllNewsPage());
navbarBuilder.addDropDown('game', dropdowns.game);
navbarBuilder.addDropDown('gallery', dropdowns.gallery);
navbarBuilder.addDropDown('education', dropdowns.gameart, getRouteGameArtPage());
navbarBuilder.addDropDown('community', dropdowns.community);
navbarBuilder.addLink('contactUs', getRouteTeamPage());

export const navbarMenuDesktop = navbarBuilder.build();
