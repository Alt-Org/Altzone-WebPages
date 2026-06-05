'use client';
import Image from 'next/image';
import { memo } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { NavbarMenuItem } from '../../model/types';
import cls from './NavbarDesktop.module.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type NavItemProps = {
    item: NavbarMenuItem;
};

const CHEVRON_ITEMS = new Set(['game', 'gallery', 'gameart', 'community']);

const NavItem = memo((props: NavItemProps) => {
    const { item } = props;
    const { type: itemType } = item;
    const { t } = useClientTranslation('navbar');

    if (itemType === 'navLink') {
        const showChevron = 'name' in item && CHEVRON_ITEMS.has(item.name);
        return (
            <li>
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                >
                    <span className={cls.col}>{t(`${item.name}`)}</span>
                    {showChevron && (
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={cls.chevron}
                        />
                    )}
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
