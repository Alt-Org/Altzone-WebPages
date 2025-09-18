import { DropDownElement } from '@/shared/ui/DropdownWrapper';
import {
    ItemType,
    NamedMenu,
    NavAuthLogin,
    NavAuthProfile,
    NavbarBuild,
    NavbarMenuItem,
    NavLogoObject,
    Position,
} from '../types';

export class NavbarBuilder {
    private menu: NavbarMenuItem[] = [];
    private namedMenu: NamedMenu = {};

    // eslint-disable-next-line max-params
    addLink(
        name: string,
        path: string,
        isActive: boolean,
        position?: Position,
        accessErrorMsg?: string,
    ): void {
        this.menu.push({ name, path, isActive, type: ItemType.navLink, position, accessErrorMsg });
    }

    addLinkFake(name: string, position: Position, reactKey: string): void {
        this.menu.push({ name, type: ItemType.navLinkFake, position, reactKey });
    }

    // eslint-disable-next-line max-params
    addDropDown(
        name: string,
        isActive: boolean,
        elements: DropDownElement[],
        position?: Position,
        accessErrorMsg?: string,
    ): void {
        this.menu.push({
            name,
            isActive,
            elements,
            type: ItemType.navDropDown,
            position,
            accessErrorMsg,
        });
    }

    // eslint-disable-next-line max-params
    addLogo(
        name: string,
        src: string,
        path: string,
        position?: Position,
        accessErrorMsg?: string,
    ): void {
        const logoObject = {
            name,
            src,
            path,
            type: ItemType.navLogo,
            position,
            accessErrorMsg,
        } as NavLogoObject;
        this.namedMenu[ItemType.navLogo] = logoObject;
        this.menu.push(logoObject);
    }

    addAuthLogin(name: string, path: string): void {
        const authLoginObject = { name, path, type: ItemType.navAuthLogin } as NavAuthLogin;
        this.namedMenu[ItemType.navAuthLogin] = authLoginObject;
        this.menu.push(authLoginObject);
    }

    addAuthProfile(name: string, elements: DropDownElement[]): void {
        const authProfileObject = {
            name,
            elements,
            type: ItemType.navAuthProfile,
        } as NavAuthProfile;
        this.namedMenu[ItemType.navAuthProfile] = authProfileObject;
        this.menu.push({ ...authProfileObject });
    }

    build(): NavbarBuild {
        return { menu: this.menu, namedMenu: this.namedMenu };
    }
}
