import { ItemType, NamedMenu, NavbarBuild, NavbarMenuItem, NavLogoObject } from '../types';

export class NavbarBuilder {
    private menu: NavbarMenuItem[] = [];
    private namedMenu: NamedMenu = {};

    addLink(
        name: string,
        path: string,
        isActive: boolean = true,
        position?: string,
        accessErrorMsg?: string,
    ): void {
        this.menu.push({
            name,
            path,
            isActive: true,
            type: ItemType.navLink,
            position,
            accessErrorMsg,
        });
    }

    addLogo(
        name: string,
        src: string,
        path: string,
        position?: string,
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

    build(): NavbarBuild {
        return { menu: this.menu, namedMenu: this.namedMenu };
    }
}
