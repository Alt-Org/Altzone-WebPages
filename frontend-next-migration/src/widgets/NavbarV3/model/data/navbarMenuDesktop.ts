import img from '@/shared/assets/images/altLogo.png';
import {
    getRouteTeamPage,
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteDefenseGalleryPage,
    getRouteGalleryPage,
    getRouteGameArtPage,
    getRouteAboutPage,
} from '@/shared/appLinks/RoutePaths';
import { NavbarBuilder } from './NavbarBuilder';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLogo('Nav logo', img as unknown as string, getRouteMainPage());
navbarBuilder.addLink('news', getRouteAllNewsPage(), true);
navbarBuilder.addLink('game', getRouteDefenseGalleryPage(), true);
navbarBuilder.addLink('gallery', getRouteGalleryPage(), true);
navbarBuilder.addLink('education', getRouteGameArtPage(), true);
navbarBuilder.addLink('prg', getRouteAboutPage(), true);
navbarBuilder.addLink('contactUs', getRouteTeamPage(), true);

export const navbarMenuDesktop = navbarBuilder.build();
