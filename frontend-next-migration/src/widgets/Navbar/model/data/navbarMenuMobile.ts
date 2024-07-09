import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import img from '@/shared/assets/images/altLogo.png';
import img2 from '@/shared/assets/images/altLogoClan.png';
import { NavbarBuilder } from '@/widgets/Navbar/model/data/NavbarBuilder';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';
import { ArtGameSections } from '@/entities/PresentationPackages/model/data/artGameSections';
import { TeachingSections } from '@/entities/PresentationPackages/model/data/teachingSections';

console.log('TeachingSections:', TeachingSections); // Debug log
console.log('ArtGameSections:', ArtGameSections); // Debug log

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLink('main', RoutePaths.MAIN, false);
navbarBuilder.addDropDown('community', false, dropdowns.community);
navbarBuilder.addDropDown('game', false, dropdowns.game);
navbarBuilder.addDropDown('art', false, dropdowns.art);
navbarBuilder.addLink('team', RoutePaths.MEMBERS, false);
navbarBuilder.addLogo('main', img as unknown as string, RoutePaths.MAIN);
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', RoutePaths.auth_login);

export const navbarMenuMobile = navbarBuilder.build();

const navbarClanBuilder = new NavbarBuilder();
navbarClanBuilder.addLogo(
  'Nav logo',
  img2 as unknown as string,
  RoutePaths.MAIN,
);
navbarClanBuilder.addLink('leaderboard', RoutePaths.CLAN_LEADERBOARD, true);
navbarClanBuilder.addLink('all_clans', RoutePaths.CLAN_ALL, true);
navbarClanBuilder.addLink('my_clan', RoutePaths.MEMBERS, true);
navbarClanBuilder.addAuthLogin('login', RoutePaths.auth_login);

export const navbarClanMobile = navbarClanBuilder.build();

const navbarTeachingBuilder = new NavbarBuilder();
navbarTeachingBuilder.addLogo(
  'main',
  img as unknown as string,
  RoutePaths.MAIN,
);
navbarTeachingBuilder.addLink('main', RoutePaths.MAIN, false);

TeachingSections.forEach((section) => {
  navbarTeachingBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarTeachingMobile = navbarTeachingBuilder.build();

const navbarGameArtBuilder = new NavbarBuilder();
navbarGameArtBuilder.addLogo('main', img as unknown as string, RoutePaths.MAIN);
navbarGameArtBuilder.addLink('main', RoutePaths.MAIN, false);
ArtGameSections.forEach((section) => {
  navbarGameArtBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarGameArtMobile = navbarGameArtBuilder.build();
