'use client';
import React, { useMemo } from 'react';
import { HeroManager, HeroSlug } from '@/entities/Hero';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropdownItem,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdowns';
import { useClientTranslation } from '@/shared/i18n';

interface HeroMenuProps {
    className?: string;
    onClickCallback: (heroSlug: HeroSlug) => void;
    selectedHero: HeroSlug;
}

const HeroMenuAsDropdown: React.FC<HeroMenuProps> = ({
    selectedHero,
    className,
    onClickCallback,
}) => {
    const { t } = useClientTranslation('heroes');
    const heroManager = new HeroManager(t);

    const allHeroGroups = heroManager.getGroupsWithHeroesAsArray();

    const dropdownItems: DropdownItem[] = useMemo(
        () =>
            allHeroGroups.map((group) => ({
                title: group.name,
                openByDefault: false,
                elements: group.heroes.map((hero) => ({
                    elementText: hero.title,
                    id: hero.id.toString(),
                    active: selectedHero === hero.slug,
                    onClickCallback: () => onClickCallback(hero.slug),
                })) as DropDownElementASTextOrLink[],
            })),
        [selectedHero],
    );
    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = useMemo(
        () => ({
            title: t('section-title'),
            openByDefault: false,
            dropdownItems: dropdownItems,
        }),
        [selectedHero],
    );

    return (
        <NavMenuWithDropdowns
            className={className}
            {...navMenuWithDropdownsProps}
        />
    );
};

export default HeroMenuAsDropdown;
