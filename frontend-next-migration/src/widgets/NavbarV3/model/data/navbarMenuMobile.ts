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
navbarBuilder.addLink('news', getRouteAllNewsPage(), true);
navbarBuilder.addLink('game', getRouteDefenseGalleryPage(), true);
navbarBuilder.addLink('gallery', getRouteGalleryPage(), true);
navbarBuilder.addLink('education', getRouteGameArtPage(), true);
navbarBuilder.addLink('contactUs', getRouteTeamPage(), true);
navbarBuilder.addLogo('main', img as unknown as string, getRouteMainPage());

export const navbarMenuMobile = navbarBuilder.build();
