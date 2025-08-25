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

    // Get the current selected category text
    const getCurrentCategoryText = () => {
        switch (state) {
            case 'all':
                return t('all');
            case 'other':
                return t('other');
            case Category.TABLES:
                return t('tables');
            case Category.CHAIRS:
                return t('chairs');
            case Category.COUCHES:
                return t('couches');
            case Category.BEDS:
                return t('beds');
            case Category.CABINETS:
                return t('cabinets');
            case Category.LIGHTS:
                return t('lights');
            case Category.RUGS:
                return t('rugs');
            case Category.PLANTS:
                return t('plants');
            case Category.DECORATIONS:
                return t('decorative-items');
            case Category.ITEMS:
                return t('other');
            default:
                return t('all');
        }
    };

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
    }, [state, t]);

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        // Use the current selected category as the title instead of "categories"
        title: getCurrentCategoryText(),
        openByDefault: false,
        dropdownItems: CategoryDropdownElements,
    };

    return <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />;
};

export default CategoryDropdown;
