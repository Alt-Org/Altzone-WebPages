import React, { useState } from 'react';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useParams } from 'next/navigation';
import cls from './GameArtNavMenuAsDropdown.module.scss';
import { useClientTranslation } from '@/shared/i18n';

interface Section {
    id: string;
    label: string;
}

interface GameArtProps {
    sections: Section[];
}

export const GameArtNavMenu: React.FC<GameArtProps> = (props: GameArtProps) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('artGame');
    const { sections } = props;

    const dropdownItems: DropDownElementASTextOrLink[] = sections.map((section) => ({
        title: section.label,
        openByDefault: false,
        elementText: section.label,
        link: { path: '#' + section.id, isExternal: false },
    }));

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('section-title'),
        openByDefault: true,
        staticDropdown: true,
        dropdownItems: dropdownItems,
    };

    return (
        <div>
            <nav style={isTouchDevice ? { display: 'contents' } : { display: 'none' }}>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsMobileProps}
                />
            </nav>
            <nav style={isTouchDevice ? { display: 'none' } : { display: 'block' }}>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsDesktopProps}
                />
            </nav>
        </div>
    );
};
