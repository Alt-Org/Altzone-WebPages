// import Image from 'next/image';
// import { memo } from 'react';
// import { useUserPermissionsV2 } from '@/entities/Auth';
// import { useClientTranslation } from '@/shared/i18n';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
// import { DropdownWrapper } from '@/shared/ui/DropdownWrapper';
// import { NavbarBuild, NavbarMenuItem } from '../../model/types';
// import cls from './NavbarDesktop.module.scss';
//
// type NavItemProps = {
//     item: NavbarMenuItem;
//     className?: string;
//     navbarBuild: NavbarBuild;
// };
//
// const NavItem = memo((props: NavItemProps) => {
//     const { item, className = '', navbarBuild } = props;
//     const { type: itemType } = item;
//
//     const { t } = useClientTranslation('navbar');
//     const { checkPermissionFor } = useUserPermissionsV2();
//
//     if (itemType === 'navLink') {
//         return (
//             <li
//                 key={item.path}
//                 className={classNames(cls.navItem, {}, [className])}
//             >
//                 <AppLink
//                     theme={AppLinkTheme.PRIMARY}
//                     to={item.path}
//                     key={item.path}
//                 >
//                     <span>{t(`${item.name}`)}</span>
//                 </AppLink>
//             </li>
//         );
//     }
//     if (itemType === 'navDropDown') {
//         const canUserSeeOwnClan = checkPermissionFor('clan:seeOwn').isGranted;
//         const localizedElements = item.elements
//             .map((element) => {
//                 // @ts-ignore todo add guard
//                 if (element.elementText === 'clanpage' && !canUserSeeOwnClan) {
//                     return null;
//                 }
//                 return {
//                     // @ts-ignore todo add guard
//                     ...element,
//                     // @ts-ignore todo add guard
//                     elementText: t(`${element.elementText}`),
//                 };
//             })
//             .filter((element) => element !== null);
//         return (
//             <li
//                 key={item.name}
//                 className={classNames('', {}, [className])}
//             >
//                 <DropdownWrapper
//                     elements={localizedElements}
//                     contentAbsolute={true}
//                     mouseOverLeaveMode={true}
//                     contentClassName={cls.itemNavbarDropDownContent}
//                 >
//                     <div>{t(`${item.name}`)}</div>
//                 </DropdownWrapper>
//             </li>
//         );
//     }
//
//     if (itemType === 'navLogo') {
//         return (
//             <li
//                 key={item.src}
//                 className={className}
//             >
//                 <AppLink
//                     theme={AppLinkTheme.PRIMARY}
//                     to={item.path}
//                     className={classNames(cls.appLink, {}, [cls.appLinkLogo])}
//                 >
//                     <Image
//                         priority={true}
//                         loading={'eager'}
//                         alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
//                         src={navbarBuild?.namedMenu?.navLogo?.src || ''}
//                         width={120}
//                         height={0}
//                         className={cls.itemLogoImg}
//                     />
//                 </AppLink>
//             </li>
//         );
//     }
// });
//
// NavItem.displayName = 'NavItem';
//
// export default NavItem;

'use client';
import Image from 'next/image';
import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { useUserPermissionsV2 } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import { NavbarBuild, NavbarMenuItem } from '../../model/types';
import cls from './NavbarDesktop.module.scss';

type NavItemProps = {
    item: NavbarMenuItem;
    className?: string;
    navbarBuild: NavbarBuild;
};

const NavItem = memo((props: NavItemProps) => {
    const { item, className = '', navbarBuild } = props;
    const { type: itemType } = item;
    const { t } = useClientTranslation('navbar');
    const { checkPermissionFor } = useUserPermissionsV2();
    const pathname = usePathname();

    const isActive = itemType === 'navLink' && pathname === item.path;

    // console.log(pathname)
    // console.log(item)

    if (itemType === 'navLink') {
        return (
            <li
                key={item.path}
                className={classNames(cls.navItem, { [cls.active]: isActive }, [className])}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    key={item.path}
                >
                    <span>{t(`${item.name}`)}</span>
                </AppLink>
            </li>
        );
    }

    if (itemType === 'navDropDown') {
        const canUserSeeOwnClan = checkPermissionFor('clan:seeOwn').isGranted;
        const localizedElements = item.elements
            .map((element) => {
                // @ts-ignore
                if (element.elementText === 'clanpage' && !canUserSeeOwnClan) {
                    return null;
                }
                return {
                    // @ts-ignore
                    ...element,
                    // @ts-ignore
                    elementText: t(`${element.elementText}`),
                };
            })
            .filter((element) => element !== null);
        return (
            <li
                key={item.name}
                className={classNames(cls.navItem, {}, [className])}
            >
                <DropdownWrapper
                    elements={localizedElements}
                    contentAbsolute={true}
                    mouseOverLeaveMode={true}
                    contentClassName={cls.itemNavbarDropDownContent}
                >
                    <div>{t(`${item.name}`)}</div>
                </DropdownWrapper>
            </li>
        );
    }

    if (itemType === 'navLogo') {
        return (
            <li
                key={item.src}
                className={className}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    className={classNames(cls.appLink, {}, [cls.appLinkLogo])}
                >
                    <Image
                        priority={true}
                        loading={'eager'}
                        alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                        src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                        width={120}
                        height={0}
                        className={cls.itemLogoImg}
                    />
                </AppLink>
            </li>
        );
    }
});

NavItem.displayName = 'NavItem';

export default NavItem;
