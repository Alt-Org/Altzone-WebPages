import { NavbarBuilder } from './NavbarBuilder';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteGalleryPage,
    getRouteAllFurnitureCollectionItemsPage,
    getRouteJoinUsPage,
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
        link: { path: getRouteAllFurnitureCollectionItemsPage(), isExternal: false },
    },
    dropdowns.gallery[4],
];

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLink('news', getRouteAllNewsPage());
navbarBuilder.addDropDown('game', dropdowns.game);
navbarBuilder.addDropDown('gallery', galleryDropdownItems, getRouteGalleryPage());
navbarBuilder.addDropDown('education', dropdowns.gameart);
navbarBuilder.addDropDown('community', dropdowns.community);
navbarBuilder.addLink('contactUs', getRouteJoinUsPage());
navbarBuilder.addLogo('main', img as unknown as string, getRouteMainPage());

export const navbarMenuMobile = navbarBuilder.build();
