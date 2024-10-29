import { NavbarBuilder } from '@/widgets/Navbar/model/data/NavbarBuilder';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';
import { ArtGameSections } from '@/entities/PresentationPackages/model/data/artGameSections';
import { CookiesSections } from '@/entities/PresentationPackages/model/data/cookiesSections';
import { PrivacySections } from '@/entities/PresentationPackages/model/data/privacySections';
import {
    getMainPageRoute,
    getAllNewsPageRoute,
    getTeamPageRoute,
    getLoginPageRoute,
} from '@/shared/appLinks/RoutePaths';
import img from '@/shared/assets/images/altLogo.png';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLink('main', getMainPageRoute(), false);
navbarBuilder.addLink('news', getAllNewsPageRoute(), true);
navbarBuilder.addDropDown('game', false, dropdowns.game);
navbarBuilder.addDropDown('gallery', false, dropdowns.gallery);
navbarBuilder.addDropDown('gameart', false, dropdowns.gameart);
navbarBuilder.addDropDown('community', false, dropdowns.community);
navbarBuilder.addLink('team', getTeamPageRoute(), false);
navbarBuilder.addLogo('main', img as unknown as string, getMainPageRoute());
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', getLoginPageRoute());

export const navbarMenuMobile = navbarBuilder.build();

const navbarGameArtBuilder = new NavbarBuilder();
navbarGameArtBuilder.addLogo('main', img as unknown as string, getMainPageRoute());
navbarGameArtBuilder.addLink('main', getMainPageRoute(), false);
ArtGameSections.forEach((section) => {
    navbarGameArtBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarGameArtMobile = navbarGameArtBuilder.build();

const navbarCookiesBuilder = new NavbarBuilder();
navbarCookiesBuilder.addLogo('main', img as unknown as string, getMainPageRoute());
navbarCookiesBuilder.addLink('main', getMainPageRoute(), false);
CookiesSections.forEach((section) => {
    navbarCookiesBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarCookiesMobile = navbarCookiesBuilder.build();

const navbarPrivacyBuilder = new NavbarBuilder();
navbarPrivacyBuilder.addLogo('main', img as unknown as string, getMainPageRoute());
navbarPrivacyBuilder.addLink('main', getMainPageRoute(), false);
PrivacySections.forEach((section) => {
    navbarPrivacyBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarPrivacyMobile = navbarPrivacyBuilder.build();
