import { NavbarBuilder } from '@/widgets/Navbar/model/data/NavbarBuilder';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';
import { ArtGameSections } from '@/entities/PresentationPackages/model/data/artGameSections';
import { CookiesSections } from '@/entities/PresentationPackages/model/data/cookiesSections';
import { PrivacySections } from '@/entities/PresentationPackages/model/data/privacySections';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import img from '@/shared/assets/images/altLogo.png';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLink('main', RoutePaths.MAIN, false);
navbarBuilder.addLink('news', RoutePaths.NEWS, true);
navbarBuilder.addDropDown('game', false, dropdowns.game);
navbarBuilder.addDropDown('gallery', false, dropdowns.gallery);
navbarBuilder.addDropDown('gameart', false, dropdowns.gameart);
navbarBuilder.addDropDown('community', false, dropdowns.community);
navbarBuilder.addLink('team', RoutePaths.MEMBERS, false);
navbarBuilder.addLogo('main', img as unknown as string, RoutePaths.MAIN);
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', RoutePaths.auth_login);

export const navbarMenuMobile = navbarBuilder.build();

const navbarGameArtBuilder = new NavbarBuilder();
navbarGameArtBuilder.addLogo('main', img as unknown as string, RoutePaths.MAIN);
navbarGameArtBuilder.addLink('main', RoutePaths.MAIN, false);
ArtGameSections.forEach((section) => {
    navbarGameArtBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarGameArtMobile = navbarGameArtBuilder.build();

const navbarCookiesBuilder = new NavbarBuilder();
navbarCookiesBuilder.addLogo('main', img as unknown as string, RoutePaths.MAIN);
navbarCookiesBuilder.addLink('main', RoutePaths.MAIN, false);
CookiesSections.forEach((section) => {
    navbarCookiesBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarCookiesMobile = navbarCookiesBuilder.build();

const navbarPrivacyBuilder = new NavbarBuilder();
navbarPrivacyBuilder.addLogo('main', img as unknown as string, RoutePaths.MAIN);
navbarPrivacyBuilder.addLink('main', RoutePaths.MAIN, false);
PrivacySections.forEach((section) => {
    navbarPrivacyBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarPrivacyMobile = navbarPrivacyBuilder.build();
