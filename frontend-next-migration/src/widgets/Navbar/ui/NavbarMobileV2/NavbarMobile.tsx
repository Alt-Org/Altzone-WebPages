import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    CSSProperties,
    memo,
    useEffect,
    useMemo,
    useState,
    useRef,
    SetStateAction,
    ReactNode,
} from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { useLogoutMutation, useUserPermissionsV2 } from '@/entities/Auth';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { sidebarItemType } from '@/shared/ui/Sidebar/model/items';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ISidebarItem, Sidebar } from '@/shared/ui/Sidebar';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { useClientTranslation } from '@/shared/i18n';
import userIcon from '@/shared/assets/icons/userIcon.svg';
import hamburgerIcon from '@/shared/assets/icons/hamburgerIcon.svg';
import { ItemType, NavbarBuild } from '../../model/types';
import { ToggleFixButton } from '../ToggleFixButton/ToggleFixButton';
import cls from './NavbarMobile.module.scss';
import { NavMenu } from '@/shared/ui/NavMenu';
import { INavMenuItem, NavMenuItemType } from '@/shared/ui/NavMenu/ui/NavMenu';
enum DropdownTypes {
    EMPTY = 'EMPTY',
    HAMBURGER = 'HAMBURGER',
    AUTH = 'AUTH',
}

type DropdownType = DropdownTypes.EMPTY | DropdownTypes.HAMBURGER | DropdownTypes.AUTH;

export interface NavbarTouchProps {
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navbarBuild?: NavbarBuild;
    side?: 'left' | 'right';
    className?: string;
    isFixed: boolean;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
    toggleFixed: () => void;
}

type DropdownElem = 'div' | 'nav';

interface DropdownBoxProps {
    as?: DropdownElem;
    callback: (ref: React.RefObject<HTMLDivElement>) => void;
    className?: string;
    children: ReactNode;
}

const DropdownBox = ({
    as: Component = 'div',
    callback,
    className,
    children,
}: DropdownBoxProps) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        callback(ref);
    });
    return (
        <Component
            ref={ref}
            className={className}
        >
            {children}
        </Component>
    );
};

const NavbarTouchComponent = (props: NavbarTouchProps) => {
    const { marginTop, navbarBuild, side = 'left', className = '', toggleFixed, isFixed } = props;

    const { t } = useClientTranslation('navbar');

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor('login');
    const permissionToLogout = checkPermissionFor('logout');

    const permissionToSeeOwnClan = checkPermissionFor('clan:seeOwn');

    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const hasScrollbar = useIsPageScrollbar();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // A crutch to reset dropdowns when closing the navbar
    const [sidebarItemsListResetKey, setSidebarItemsListResetKey] = useState(0);

    const [dropdownType, setDropdownType] = useState<DropdownType>(DropdownTypes.EMPTY);
    const [isAnimating2, setIsAnimating2] = useState(false);
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const toggleAnimation = () => {};

    useEffect(() => {
        // console.log('hello');
        if (ref.current) {
            // const observer = new ResizeObserver(() => {
            //     if(ref.current?.clientHeight && height !== ref.current?.clientHeight) {
            //         setHeight(ref.current?.offsetHeight);
            //     }
            // });
            // observer.observe(ref.current);
            // return () => observer.disconnect();
            setHeight(ref.current.clientHeight);
        }
    });
    useEffect(() => {
        if (ref.current && dropdownType !== DropdownTypes.EMPTY) {
            // ref.current.style.height = `${height}px`;
            // ref.current.style.minHeight = `${height}px`;
            ref.current.style.height = `${height}px`;
        } else if (ref.current) {
            ref.current.style = '';
        }
    }, [height]);

    const handleBurgerClick = () => {
        setIsSidebarOpen(true);
        props.onBurgerButtonClick?.(true);
    };
    const handleSidebarClose = () => {
        setIsSidebarOpen(false);
        props.onBurgerButtonClick?.(false);
        // we should give some time for animation
        setTimeout(() => setSidebarItemsListResetKey((currentKey) => currentKey + 1), 500);
    };

    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPath = pathSegments.length === 1 ? '/' : `/${pathSegments[1] || ''}`;
        setRealPath(newPath);
    }, [pathname]);

    const sidebarItemsList: INavMenuItem[] = useMemo(() => {
        return (navbarBuild?.menu || [])
            .map((item) => {
                if (item.type === ItemType.navLink) {
                    return {
                        path: item.path,
                        name: t(`${item.name}`),
                        type: NavMenuItemType.Link,
                        active: realPath === item.path,
                    };
                }
                if (item.type === ItemType.navDropDown) {
                    // Localize the elements within the dropdown, but skip if elementText equals "clanpage"
                    //todo looks like that this logic should not be here in ui component
                    const localizedElements = item.elements
                        .map((element) => {
                            if (
                                // @ts-ignore todo add guard
                                element.elementText === 'clanpage' &&
                                !permissionToSeeOwnClan.isGranted
                            ) {
                                return null; // Return null if elementText is "clanpage"
                            }
                            return {
                                // @ts-ignore todo add guard
                                ...element,
                                // @ts-ignore todo add guard
                                elementText: t(`${element.elementText}`), // Localize elementText
                                // @ts-ignore
                                active: realPath === element?.link?.path,
                            };
                        })
                        .filter((element) => element !== null); // Filter out any null elements

                    const isDropdownActive = localizedElements.some((element) => element.active);

                    // If there are no valid elements left, return null to skip this item
                    if (localizedElements.length === 0) {
                        return null;
                    }

                    return {
                        name: t(`${item.name}`),
                        elements: localizedElements,
                        active: isDropdownActive,
                        type: NavMenuItemType.Dropdown,
                    };
                }

                return null;
            })
            .filter((item) => item !== null) as INavMenuItem[];
    }, [t, navbarBuild?.menu, permissionToSeeOwnClan.isGranted, realPath]);

    const style: CSSProperties = marginTop ? { marginTop: `${marginTop}px` } : {};

    const mods: Record<string, boolean> = {
        [cls.fixed]: isFixed,
        [cls.openDropdown]: dropdownType !== DropdownTypes.EMPTY,
        // [cls.collapsed]: isCollapsed,
        [cls.collapsing]: isAnimating,
    } as Record<string, boolean>;

    const sidebarMods: Record<string, boolean> = {
        [cls.left]: side === 'left',
        [cls.right]: side === 'right',
        // [cls.collapsed]: isCollapsed,
    };

    // const handleCollapseClick = () => {
    //     if (!isAnimating) {
    //         setIsAnimating(true);
    //         toggleCollapsed();
    //     }
    // };

    const handleTransitionEnd = () => {
        setIsAnimating(false);
    };

    const dropdownContent = {
        [DropdownTypes.EMPTY]: null,
        [DropdownTypes.HAMBURGER]: (
            <NavMenu
                title="title"
                dropdownItems={sidebarItemsList}
            />
        ),
        [DropdownTypes.AUTH]: <p>auth form</p>,
    };

    const getDropdownContent = (dropdownType: DropdownType) => {
        if (dropdownType === DropdownTypes.HAMBURGER) {
            return (
                <div className={`${cls.NavbarDropdown} ${cls.oaaa}`}>
                    {dropdownContent[dropdownType]}
                </div>
            );
        }
        return dropdownContent[dropdownType];
    };

    const toggleDropdown = (dropdown: DropdownType) => {
        if (dropdown === dropdownType) {
            setDropdownType(DropdownTypes.EMPTY);
        } else {
            setDropdownType(DropdownTypes[dropdown]);
        }
    };
    return (
        <nav
            className={classNames(cls.Navbar, mods, [className])}
            style={style}
            ref={ref}
        >
            {/* <DropdownBox
        //     className={classNames(cls.Navbar, mods, [className])}
        //     style={style}
        //     ref={ref}
        // > */}
            <div className={cls.NavbarContent}>
                <div
                    className={classNames(cls.NavbarMobile__burger, sidebarMods)}
                    onClick={handleBurgerClick}
                    data-testid="burger-button"
                />
                <div onClick={() => toggleDropdown(DropdownTypes.HAMBURGER)}>
                    <Image
                        src={hamburgerIcon}
                        alt="Three vertical lines. Is svg image in the open navigation menu button."
                        width={26}
                        height={20}
                    />
                </div>
                {/* <Sidebar
                sidebarItemsListResetKey={sidebarItemsListResetKey}
                buttonClassName={classNames(
                    cls.NavbarMobile__burger + ' ' + cls.navItem,
                    sidebarMods,
                )}
                sidebarClassName={cls.sidebar}
                sidebarItemsList={sidebarItemsList}
                side={side}
                closeOnClickOutside
                onClose={handleSidebarClose}
                bottomItems={
                    <div className={cls.sidebarBottom}>
                        <LangSwitcher className={cls.langSwitcher} />
                        <div className={cls.authSection}>
                            {permissionToLogin.isGranted && (
                                <AppLink
                                    className={cls.authSectionLink}
                                    theme={AppLinkTheme.PRIMARY}
                                    to={navbarBuild?.namedMenu?.navAuthLogin?.path || ''}
                                    key={navbarBuild?.namedMenu?.navAuthLogin?.path || ''}
                                >
                                    <span>
                                        {t(`${navbarBuild?.namedMenu?.navAuthLogin?.name}`)}
                                    </span>
                                </AppLink>
                            )}
                            {permissionToLogout.isGranted && (
                                <div onClick={() => logout()}>{t(`logout`)}</div>
                            )}
                        </div>
                    </div>
                }
            /> */}
                <AppLink
                    className={classNames(
                        cls.navLogo + ' ' + cls.NavbarMobile__center + ' ' + cls.navItem,
                        // { [cls.collapsed]: isCollapsed },
                        {},
                        [],
                    )}
                    theme={AppLinkTheme.PRIMARY}
                    to={navbarBuild?.namedMenu?.navLogo?.path || ''}
                >
                    <Image
                        loading={'eager'}
                        width={180}
                        src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                        alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                    />
                </AppLink>
                <div className={cls.buttonContainer}>
                    <Image
                        src={userIcon}
                        alt="icon of a person inside a circle"
                        width={20}
                        height={20}
                        onClick={() => toggleDropdown(DropdownTypes.AUTH)}
                    />
                    {hasScrollbar && (
                        <div
                            className={classNames(
                                cls.navItem,
                                // { [cls.collapsed]: isCollapsed }
                            )}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            <ToggleFixButton
                                isFixed={isFixed}
                                onClick={toggleFixed}
                                className={cls.Button}
                            />
                        </div>
                    )}
                    {/*{isFixed && (*/}
                    {/*    <div*/}
                    {/*        className={classNames(cls.CollapseButtonWrapper, {*/}
                    {/*            [cls.collapsing]: isAnimating,*/}
                    {/*        })}*/}
                    {/*    >*/}
                    {/*        <ToggleCollapseButton*/}
                    {/*            onClick={handleCollapseClick}*/}
                    {/*            isCollapsed={isCollapsed}*/}
                    {/*            className={cls.Button}*/}
                    {/*            disabled={isAnimating}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
            {getDropdownContent(dropdownType)}
            {/* </DropdownBox> */}
        </nav>
    );
};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);
