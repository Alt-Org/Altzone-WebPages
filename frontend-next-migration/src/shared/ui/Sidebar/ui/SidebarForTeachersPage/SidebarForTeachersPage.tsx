import React, { ReactNode } from 'react';
import { ISidebarItem, sidebarItemType } from '@/shared/ui/Sidebar/model/items';
import { SidebarItem } from '@/shared/ui/Sidebar/ui/SidebarItem/SidebarItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarForTeachersPage.module.scss';
import { useClientTranslation } from '@/shared/i18n';

interface SidebarForTeachersPageProps {
    sidebarClassName?: string;
}

export const SidebarForTeachersPage = ({ sidebarClassName = '' }: SidebarForTeachersPageProps) => {
    const { t } = useClientTranslation('teachersPage');

    const sidebarItems: ISidebarItem[] = [
        { name: t('game-art').toString(), type: sidebarItemType.ISidebarItemBasic, path: '/' },
        { name: t('lesson-presentation'), type: sidebarItemType.ISidebarItemBasic, path: '/' },
        { name: t('instructions'), type: sidebarItemType.ISidebarItemBasic, path: '/' },
        {
            name: t('lesson-preparation'),
            type: sidebarItemType.ISidebarItemDropDown,
            elements: [
                <a
                    key={1}
                    href="/"
                >
                    - {t('teaching-material')}
                </a>,
                <a
                    key={2}
                    href="/"
                >
                    - {t('game-analysis')}
                </a>,
            ],
        },
        { name: t('feedback-and-development'), type: sidebarItemType.ISidebarItemBasic, path: '/' },
    ];

    return (
        <div className={classNames(cls.Sidebar, {}, [sidebarClassName])}>
            <div className={cls.items}>
                {sidebarItems.map((item) => (
                    <SidebarItem
                        key={item.name}
                        item={item}
                        collapsed={false}
                    />
                ))}
            </div>
            <div className={cls.bottomItems} />
        </div>
    );
};
