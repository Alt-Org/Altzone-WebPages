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
    item: NavbarMenuItem;
    mouseOver?: boolean;
};

const CHEVRON_ITEMS = new Set(['game', 'gallery', 'gameart', 'community']);

const NavItem = memo((props: NavItemProps) => {
    const { item, mouseOver = false } = props;
    const { type: itemType } = item;
    const { t } = useClientTranslation('navbar');

    if (itemType === ItemType.navDropDown) {
        const elements = item.elements.map((el) => {
            if (el && typeof el === 'object' && 'elementText' in el) {
                return { ...el, elementText: t(`${el.elementText}`) };
            }
            return el;
        });

        return (
            <li>
                <DropdownWrapper
                    elements={elements}
                    contentAbsolute={true}
                    disableClickToggle={true}
                    isOpen={mouseOver}
                    contentItemClassName={cls.dropdownItem}
                >
                    <span className={cls.col}>{t(`${item.name}`)}</span>
                    {CHEVRON_ITEMS.has(item.name) && (
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={cls.chevron}
                        />
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
