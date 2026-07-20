import { NavbarBuilder } from './NavbarBuilder';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteDefenseGalleryPage,
    getRouteGalleryPage,
    getRouteGameArtPage,
    getRouteTeamPage,
} from '@/shared/appLinks/RoutePaths';
import img from '@/shared/assets/images/altLogo.png';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLink('news', getRouteAllNewsPage());
navbarBuilder.addLink('game', getRouteDefenseGalleryPage());
navbarBuilder.addLink('gallery', getRouteGalleryPage());
navbarBuilder.addLink('education', getRouteGameArtPage());
navbarBuilder.addLink('contactUs', getRouteTeamPage());
navbarBuilder.addLogo('main', img as unknown as string, getRouteMainPage());

export const navbarMenuMobile = navbarBuilder.build();
