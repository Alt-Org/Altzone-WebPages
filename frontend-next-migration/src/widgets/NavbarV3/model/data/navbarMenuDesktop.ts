import img from '@/shared/assets/images/altLogo.png';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';
import {
    getRouteTeamPage,
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteComingSoonPage,
    getRouteGalleryPage,
} from '@/shared/appLinks/RoutePaths';
import { NavbarBuilder } from './NavbarBuilder';

const galleryDropdownItems = [
    {
        elementText: 'makingOfGraphics',
        link: { path: getRouteGalleryPage(), isExternal: false },
    },
    dropdowns.gallery[0],
    {
        elementText: 'soulCastleFurniture',
        link: { path: getRouteComingSoonPage(), isExternal: false },
    },
    dropdowns.gallery[4],
];

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLogo('Nav logo', img as unknown as string, getRouteMainPage());
navbarBuilder.addLink('news', getRouteAllNewsPage());
navbarBuilder.addDropDown('game', dropdowns.game);
navbarBuilder.addDropDown('gallery', galleryDropdownItems);
navbarBuilder.addDropDown('education', dropdowns.gameart);
navbarBuilder.addDropDown('community', dropdowns.community);
navbarBuilder.addLink('contactUs', getRouteTeamPage());

export const navbarMenuDesktop = navbarBuilder.build();
