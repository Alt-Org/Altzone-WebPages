'use client';
import Image from 'next/image';
import { memo } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { DropdownWrapper } from '@/shared/ui/DropdownWrapper';
import { NavbarMenuItem, ItemType } from '../../model/types';
import cls from './NavbarDesktop.module.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type NavItemProps = {
    /** The menu item to render. */
    item: NavbarMenuItem;
    /** Is the navbar being hovered? (opens dropdowns). */
    mouseOver?: boolean;
    /** This dropdown's index among all dropdowns (for horizontal positioning). */
    dropdownIndex?: number;
    /** Total number of dropdowns (for horizontal centering). */
    totalDropdowns?: number;
};

const CHEVRON_ITEMS = new Set(['game', 'gallery', 'gameart', 'community']);

/** Renders one navbar item — a link, a dropdown (optionally linked), or the logo. */
const NavItem = memo((props: NavItemProps) => {
    const { item, mouseOver = false } = props;
    const { type: itemType } = item;
    const { t } = useClientTranslation('navbar');

    if (itemType === ItemType.navDropDown) {
        const { dropdownIndex = 0, totalDropdowns = 1 } = props;
        const gap = 220;
        const offset = (dropdownIndex - (totalDropdowns - 1) / 2) * gap;
        const elements = item.elements.map((el) => {
            if (el && typeof el === 'object' && 'elementText' in el) {
                return { ...el, elementText: t(`${el.elementText}`) };
            }
            return el;
        });

        const trigger = (
            <>
                <span className={cls.col}>{t(`${item.name}`)}</span>
                {CHEVRON_ITEMS.has(item.name) && (
                    <FontAwesomeIcon
                        icon={faChevronDown}
                        className={cls.chevron}
                    />
                )}
            </>
        );

        return (
            <li style={{ '--az-dropdown-left': `calc(50% + ${offset}px)` } as React.CSSProperties}>
                <DropdownWrapper
                    elements={elements}
                    contentAbsolute={true}
                    disableClickToggle={true}
                    isOpen={mouseOver}
                    contentClassName={cls.navDropdownCenter}
                    contentItemClassName={cls.dropdownItem}
                >
                    {item.path ? (
                        <AppLink
                            theme={AppLinkTheme.PRIMARY}
                            to={item.path}
                        >
                            {trigger}
                        </AppLink>
                    ) : (
                        trigger
                    )}
                </DropdownWrapper>
            </li>
        );
    }

    if (itemType === 'navLink') {
        return (
            <li>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                >
                    <span className={cls.col}>{t(`${item.name}`)}</span>
                </AppLink>
            </li>
        );
    }

    if (itemType === 'navLogo') {
        return (
            <AppLink
                theme={AppLinkTheme.PRIMARY}
                to={item.path}
            >
                <Image
                    priority
                    loading="eager"
                    alt={item.name || ''}
                    src={item.src || ''}
                    width={109}
                    height={92}
                    style={{ objectFit: 'contain' }}
                />
            </AppLink>
        );
    }

    return null;
});

NavItem.displayName = 'NavItemV3';

export default NavItem;
