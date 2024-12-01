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
                    style={{ fontSize: '1.2rem', paddingLeft: '1.2rem' }} // Font size needs to be placed here instead in scss.
                >
                    - {t('teaching-material')}
                </a>,
                <a
                    key={2}
                    href="/"
                    style={{ fontSize: '1.2rem', paddingLeft: '1.2rem' }} // Font size needs to be placed here instead in scss.
                >
                    - {t('game-analysis')}
                </a>,
            ],
        },
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
            <a
                href="/"
                className={cls.bottomItems}
            >
                {t('feedback-and-development')}
            </a>
        </div>
    );
};
