import {NavbarLinkObject, NavLogoObject,NavbarLinkFakeObject, Position,} from "./types";


export function isNavbarLinkFakeObject(obj: any): obj is NavbarLinkFakeObject {
    return obj.name !== undefined && obj.type === 'navLinkFake';
}

export function isNavbarLinkObject(obj: any): obj is NavbarLinkObject {
    return obj.path !== undefined && obj.type === 'navLink';
}

export function isNavLogoObject(obj: any): obj is NavLogoObject {
    return obj.src !== undefined && obj.type === 'navLogo';
}

export function isLeftSide(position: Position): position is "left" {
    return position === "left";
}

export function isRightSide(position: Position): position is "right" {
    return position === "right";
}

export function isCenter(position: Position): position is "center" {
    return position === "center";
}
