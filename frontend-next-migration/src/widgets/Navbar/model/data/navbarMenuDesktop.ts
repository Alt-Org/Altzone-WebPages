import img from "@/shared/assets/images/altLogo.png";
import img2 from "@/shared/assets/images/altLogoClan.png"
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import { NavbarBuilder } from "./NavbarBuilder";
import { dropdowns } from "./dropdowns";
import { useSSR } from "react-i18next";
import { LoggedIn } from "@/stories/Header.stories";

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addDropDown('community', false, dropdowns.community, "left");
navbarBuilder.addDropDown('game', false, dropdowns.game, "left");
navbarBuilder.addLogo('Nav logo', img as unknown as string, RoutePaths.MAIN, "center");
navbarBuilder.addDropDown('art', false, dropdowns.art, "right");
navbarBuilder.addLink('team', RoutePaths.MEMBERS, false, "right");
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', RoutePaths.auth_login);
export const navbarMenuDesktop = navbarBuilder.build();


const navbarBuilderV2 = new NavbarBuilder();
navbarBuilderV2.addLogo('Nav logo', img as unknown as string, RoutePaths.MAIN);
navbarBuilderV2.addDropDown('community', true, dropdowns.community);
navbarBuilderV2.addDropDown('game', true, dropdowns.game);
navbarBuilderV2.addDropDown('art', true, dropdowns.art);
navbarBuilderV2.addLink('team', RoutePaths.MEMBERS, true);
navbarBuilderV2.addAuthProfile('profile', dropdowns.profile);
navbarBuilderV2.addAuthLogin('login', RoutePaths.auth_login);

export const navbarMenuDesktop2 = navbarBuilderV2.build();

const navbarClanBuilder = new NavbarBuilder();
navbarClanBuilder.addLogo('Nav logo', img2 as unknown as string, RoutePaths.MAIN);
navbarClanBuilder.addLink('leaderboard', RoutePaths.CLAN_LEADERBOARD, true);
navbarClanBuilder.addLink('all_clans', RoutePaths.CLAN_ALL, true);
navbarClanBuilder.addLink('my_clan', RoutePaths.MEMBERS, true);

export const navbarClanDesktop = navbarClanBuilder.build();