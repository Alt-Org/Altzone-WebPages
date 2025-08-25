import { useClientTranslation } from '@/shared/i18n';
import { Category } from '@/entities/Furniture';
import React, { useMemo } from 'react';
import cls from './SwitchCategory.module.scss';
import { CustomSwitch, CustomSwitchItems, ToggleItem } from '@/shared/ui/CustomSwitch';

export interface SwitchCategoryProps {
    setState: (state: Category | 'all' | 'other') => void;
    state: Category | 'all' | 'other';
}
const SwitchCategory = (props: SwitchCategoryProps) => {
    const { setState, state } = props;
    const { t } = useClientTranslation('furniture');
    const CategorySwitchElements: ToggleItem[] = useMemo(() => {
        return [
            {
                children: <p>{t('all')}</p>,
                isOpen: state === 'all',
                onOpen: () => setState('all'),
                type: CustomSwitchItems.ToggleItem, // Tyyppi tarkasti määritelty
            },
            {
                children: <p>{t('tables')}</p>,
                isOpen: state === Category.TABLES,
                onOpen: () => setState(Category.TABLES),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('chairs')}</p>,
                isOpen: state === Category.CHAIRS,
                onOpen: () => setState(Category.CHAIRS),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('couches')}</p>,
                isOpen: state === Category.COUCHES,
                onOpen: () => setState(Category.COUCHES),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('beds')}</p>,
                isOpen: state === Category.BEDS,
                onOpen: () => setState(Category.BEDS),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('cabinets')}</p>,
                isOpen: state === Category.CABINETS,
                onOpen: () => setState(Category.CABINETS),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('lights')}</p>,
                isOpen: state === Category.LIGHTS,
                onOpen: () => setState(Category.LIGHTS),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('rugs')}</p>,
                isOpen: state === Category.RUGS,
                onOpen: () => setState(Category.RUGS),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('plants')}</p>,
                isOpen: state === Category.PLANTS,
                onOpen: () => setState(Category.PLANTS),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('decorative-items')}</p>,
                isOpen: state === Category.DECORATIONS,
                onOpen: () => setState(Category.DECORATIONS),
                type: CustomSwitchItems.ToggleItem,
            },
            {
                children: <p>{t('other')}</p>,
                isOpen: state === Category.ITEMS,
                onOpen: () => setState('other'),
                type: CustomSwitchItems.ToggleItem,
            },
        ];
    }, [state, t]);

    return (
        <CustomSwitch
            elements={CategorySwitchElements}
            className={cls.CustomSwitch}
        />
    );
};

export default SwitchCategory;
