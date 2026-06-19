import { ItemType, NamedMenu, NavbarBuild, NavbarMenuItem, NavLogoObject } from '../types';
import { DropDownElement } from '@/shared/ui/DropdownWrapper';

/** Helps build the navbar menu config step by step. */
export class NavbarBuilder {
    private menu: NavbarMenuItem[] = [];
    private namedMenu: NamedMenu = {};

    /** Add a plain link. */
    addLink(name: string, path: string): void {
        this.menu.push({
            name,
            path,
            type: ItemType.navLink,
        });
    }

    /**
     * Add a dropdown.
     * @param path - If set, the label becomes a clickable link too.
     */
    addDropDown(name: string, elements: Array<DropDownElement>, path?: string): void {
        this.menu.push({
            name,
            path,
            elements,
            type: ItemType.navDropDown,
        });
    }

    /** Add the logo. */
    addLogo(name: string, src: string, path: string): void {
        const logoObject = {
            name,
            src,
            path,
            type: ItemType.navLogo,
        } as NavLogoObject;
        this.namedMenu[ItemType.navLogo] = logoObject;
        this.menu.push(logoObject);
    }

    /** Wrap up and return the built config. */
    build(): NavbarBuild {
        return { menu: this.menu, namedMenu: this.namedMenu };
    }
}
