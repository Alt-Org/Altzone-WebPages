import { usePathname } from 'next/navigation';
import { CustomSwitch, CustomSwitchItems, ToggleLink } from '@/shared/ui/CustomSwitch';
import React, { useMemo } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import cls from './FurnitureSwitch.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface FurnitureSwitchProps {
    className?: string;
}

const FurnitureSwitch: React.FC<FurnitureSwitchProps> = ({ className }) => {
    const pathname = usePathname().replace(/^\/[^/]+/, '');
    const { t } = useClientTranslation('furniture');

    const CustomSwitchElements: ToggleLink[] = useMemo(() => {
        return [
            {
                children: <p>{t('sets')}</p>,
                path: `/collections/furniture`,
            },
            {
                children: <p>{t('furniture')}</p>,
                path: `/collections/furniture/all`,
            },
        ].map((elem) => {
            return {
                type: CustomSwitchItems.ToggleLink,
                isOpen: elem.path === pathname,
                ...elem,
            };
        });
    }, [pathname]);

    if (className === undefined) className = '';
    return (
        <CustomSwitch
            elements={CustomSwitchElements}
            className={classNames(className, undefined, [cls.CustomSwitch])}
        />
    );
};
export default FurnitureSwitch;
