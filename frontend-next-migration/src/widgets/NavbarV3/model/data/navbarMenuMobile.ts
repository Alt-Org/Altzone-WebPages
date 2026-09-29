import { NavbarBuilder } from './NavbarBuilder';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteDefenseGalleryPage,
    getRouteGalleryPage,
    getRouteGameArtPage,
    getRouteTeamPage,
    getRouteComingSoonPage,
} from '@/shared/appLinks/RoutePaths';
import img from '@/shared/assets/images/altLogo.png';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';

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
navbarBuilder.addLink('news', getRouteAllNewsPage());
navbarBuilder.addLink('game', getRouteDefenseGalleryPage());
navbarBuilder.addDropDown('gallery', galleryDropdownItems, getRouteGalleryPage());
navbarBuilder.addLink('education', getRouteGameArtPage());
navbarBuilder.addLink('contactUs', getRouteTeamPage());
navbarBuilder.addLogo('main', img as unknown as string, getRouteMainPage());

export const navbarMenuMobile = navbarBuilder.build();
