import img from '@/shared/assets/images/altLogo.png';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { NavbarBuilder } from './NavbarBuilder';
import { dropdowns } from './dropdowns';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addDropDown('community', false, dropdowns.community, 'left');
navbarBuilder.addDropDown('game', false, dropdowns.game, 'left');
navbarBuilder.addLogo(
  'Nav logo',
  img as unknown as string,
  RoutePaths.MAIN,
  'center',
);
navbarBuilder.addDropDown('gameart', false, dropdowns.gameart, 'right');
navbarBuilder.addDropDown('gallery', false, dropdowns.gallery, 'right');
navbarBuilder.addLink('team', RoutePaths.MEMBERS, false, 'right');
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', RoutePaths.auth_login);
export const navbarMenuDesktop = navbarBuilder.build();

const navbarBuilderV2 = new NavbarBuilder();
navbarBuilderV2.addLogo('Nav logo', img as unknown as string, RoutePaths.MAIN);
navbarBuilderV2.addLink('news', RoutePaths.NEWS, true);
navbarBuilderV2.addDropDown('game', true, dropdowns.game);
navbarBuilderV2.addDropDown('gallery', true, dropdowns.gallery);
navbarBuilderV2.addDropDown('gameart', true, dropdowns.gameart);
navbarBuilderV2.addDropDown('community', true, dropdowns.community);
navbarBuilderV2.addLink('team', RoutePaths.MEMBERS, true);
navbarBuilderV2.addAuthProfile('profile', dropdowns.profile);
navbarBuilderV2.addAuthLogin('login', RoutePaths.auth_login);

export const navbarMenuDesktop2 = navbarBuilderV2.build();

const navbarBuilderV3 = new NavbarBuilder();
navbarBuilderV3.addLink('news', RoutePaths.NEWS, true);
navbarBuilderV3.addDropDown('game', true, dropdowns.game);
navbarBuilderV3.addDropDown('gallery', true, dropdowns.gallery);
navbarBuilderV3.addDropDown('gameart', true, dropdowns.gameart);
navbarBuilderV3.addDropDown('community', true, dropdowns.community);
navbarBuilderV3.addLink('team', RoutePaths.MEMBERS, true);
navbarBuilderV3.addAuthProfile('profile', dropdowns.profile);
navbarBuilderV3.addAuthLogin('login', RoutePaths.auth_login);

export const navbarMenuDesktop3 = navbarBuilderV3.build();

const navbarGameArtBuilder = new NavbarBuilder();
export const navbarGameArtDesktop = navbarBuilderV3.build();

const navbarCookiesBuilder = new NavbarBuilder();
export const navbarCookiesDesktop = navbarBuilderV3.build();

const navbarPrivacyBuilder = new NavbarBuilder();
export const navbarPrivacyDesktop = navbarBuilderV3.build();
