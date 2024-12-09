import React, { useState } from 'react';
import { ISidebarItem, sidebarItemType } from '@/shared/ui/Sidebar/model/items';
import { SidebarItem } from '@/shared/ui/Sidebar/ui/SidebarItem/SidebarItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarForTeachersPage.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import { useRouter } from 'next/navigation';
import {
    getRouteGameArt,
    getRouteLessonPresentation,
    getRouteInstructions,
    getRouteTeachingMaterials,
    getRouteGameAnalysis,
    getRouteFeedbackAndDevelopment,
} from '@/shared/appLinks/RoutePaths';
import { link } from 'fs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

interface SidebarForTeachersPageProps {
    sidebarClassName?: string;
}

export const SidebarForTeachersPage = ({ sidebarClassName = '' }: SidebarForTeachersPageProps) => {
    const { t } = useClientTranslation('teachersPage');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarItems: ISidebarItem[] = [
        { name: t('game-art'), type: sidebarItemType.ISidebarItemBasic, path: getRouteGameArt() },
        {
            name: t('lesson-presentation'),
            type: sidebarItemType.ISidebarItemBasic,
            path: getRouteLessonPresentation(),
        },
        {
            name: t('instructions'),
            type: sidebarItemType.ISidebarItemBasic,
            path: getRouteInstructions(),
        },
        {
            name: t('lesson-preparation'),
            type: sidebarItemType.ISidebarItemDropDown,
            elements: [
                {
                    elementText: `- ${t('teaching-material')}`,
                    link: {
                        path: getRouteTeachingMaterials(),
                        isExternal: false,
                    },
                },
                {
                    elementText: `- ${t('game-analysis')}`,
                    link: {
                        path: getRouteGameAnalysis(),
                        isExternal: false,
                    },
                },
            ],
        },
    ];

    const bottomItem: ISidebarItem = {
        name: t('feedback-and-development'),
        type: sidebarItemType.ISidebarItemBasic,
        path: getRouteFeedbackAndDevelopment(),
    };

    const toggleSidebar = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    return (
        <div className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed })}>
            <div
                className={classNames(cls.SidebarContent, { [cls.collapsed]: isCollapsed }, [
                    sidebarClassName,
                ])}
            >
                <div className={classNames(cls.items, { [cls.collapsed]: isCollapsed })}>
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.name}
                            item={item}
                            collapsed={false}
                        />
                    ))}
                </div>
                <div className={classNames(cls.bottomItems, { [cls.collapsed]: isCollapsed })}>
                    <SidebarItem
                        key={bottomItem.name}
                        item={bottomItem}
                        collapsed={false}
                    />
                </div>
            </div>
            <button
                className={classNames(cls.toggleButton, { [cls.collapsed]: isCollapsed })}
                onClick={toggleSidebar}
            >
                <FontAwesomeIcon
                    size={'2xs'}
                    icon={faCaretDown}
                    style={{
                        transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(90deg)',
                        transition: 'transform 0.4s ease-in-out',
                    }}
                />
            </button>
        </div>
    );
};
