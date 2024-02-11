import img from "@/shared/assets/images/altLogo.png";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import { NavbarBuilder } from "./NavbarBuilder";
import { dropdowns } from "./dropdowns";

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

export const navbarMenuDesktop2 = navbarBuilderV2.build();

