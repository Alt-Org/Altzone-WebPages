import { Category } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import React, { useMemo } from 'react';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdownsV2';

export interface SwitchCategoryProps {
    setState: (state: Category | 'all' | 'other') => void;
    state: Category | 'all' | 'other';
}

const CategoryDropdown = (props: SwitchCategoryProps) => {
    const { setState, state } = props;
    const { t } = useClientTranslation('furniture');

    const keyMap: Partial<Record<Category | 'all' | 'other', string>> = {
        all: 'all',
        other: 'other',
        [Category.TABLES]: 'tables',
        [Category.CHAIRS]: 'chairs',
        [Category.COUCHES]: 'couches',
        [Category.BEDS]: 'beds',
        [Category.CABINETS]: 'cabinets',
        [Category.LIGHTS]: 'lights',
        [Category.RUGS]: 'rugs',
        [Category.PLANTS]: 'plants',
        [Category.DECORATIONS]: 'decorative-items',
        [Category.ITEMS]: 'other',
    };

    const getCurrentCategoryText = () => t(keyMap[state] ?? 'all');

    const CategoryDropdownElements: DropDownElementASTextOrLink[] = useMemo(() => {
        return [
            {
                elementText: t('all'),
                active: state === 'all',
                onClickCallback: () => setState('all'),
            },
            {
                elementText: t('tables'),
                active: state === Category.TABLES,
                onClickCallback: () => setState(Category.TABLES),
            },
            {
                elementText: t('chairs'),
                active: state === Category.CHAIRS,
                onClickCallback: () => setState(Category.CHAIRS),
            },
            {
                elementText: t('couches'),
                active: state === Category.COUCHES,
                onClickCallback: () => setState(Category.COUCHES),
            },
            {
                elementText: t('beds'),
                active: state === Category.BEDS,
                onClickCallback: () => setState(Category.BEDS),
            },
            {
                elementText: t('cabinets'),
                active: state === Category.CABINETS,
                onClickCallback: () => setState(Category.CABINETS),
            },
            {
                elementText: t('lights'),
                active: state === Category.LIGHTS,
                onClickCallback: () => setState(Category.LIGHTS),
            },
            {
                elementText: t('rugs'),
                active: state === Category.RUGS,
                onClickCallback: () => setState(Category.RUGS),
            },
            {
                elementText: t('plants'),
                active: state === Category.PLANTS,
                onClickCallback: () => setState(Category.PLANTS),
            },
            {
                elementText: t('decorative-items'),
                active: state === Category.DECORATIONS,
                onClickCallback: () => setState(Category.DECORATIONS),
            },
            {
                elementText: t('other'),
                active: state === Category.ITEMS,
                onClickCallback: () => setState('other'),
            },
        ];
    }, [state, t, setState]);

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: getCurrentCategoryText(),
        openByDefault: false,
        dropdownItems: CategoryDropdownElements,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default CategoryDropdown;
