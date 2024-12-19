import React, { useEffect, useState } from 'react';
import { ISidebarItem, sidebarItemType } from '@/shared/ui/Sidebar/model/items';
import { SidebarItem } from '@/shared/ui/Sidebar/ui/SidebarItem/SidebarItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SidebarForTeachersPage.module.scss';
import { useClientTranslation } from '@/shared/i18n';
import {
    getRouteGameArt,
    getRouteLessonPresentation,
    getRouteInstructions,
    getRouteTeachingMaterials,
    getRouteGameAnalysis,
    getRouteFeedbackAndDevelopment,
} from '@/shared/appLinks/RoutePaths';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { NavMenuWithDropdowns, NavMenuWithDropdownsProps } from '@/shared/ui/NavMenuWithDropdowns';
import { useRouter } from 'next/navigation';

interface SidebarForTeachersPageProps {
    sidebarClassName?: string;
}

export const SidebarForTeachersPage = ({ sidebarClassName = '' }: SidebarForTeachersPageProps) => {
    const { t } = useClientTranslation('teachersPage');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [useAlternateComponent, setUseAlternateComponent] = useState(false);

    const router = useRouter();

    function navigateToGameArt() {
        router.push(getRouteGameArt());
    }
    function navigateToFeedbackAndDevelopment() {
        router.push(getRouteGameArt());
    }
    function navigateToGameAnalysis() {
        router.push(getRouteGameArt());
    }
    function navigateToLessonPresentation() {
        router.push(getRouteGameArt());
    }
    function navigateToInstructions() {
        router.push(getRouteGameArt());
    }
    function navigateToTeachingMaterials() {
        router.push(getRouteGameArt());
    }

    // Detect screen width changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1023px)'); // Adjust the screen size as needed

        const handleMediaChange = (eee: MediaQueryListEvent) => {
            setUseAlternateComponent(eee.matches);
        };

        // Set initial state
        setUseAlternateComponent(mediaQuery.matches);

        // Add event listener
        mediaQuery.addEventListener('change', handleMediaChange);

        // Cleanup on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

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
                    elementText: `${t('teaching-material')}`,
                    link: {
                        path: getRouteTeachingMaterials(),
                        isExternal: false,
                    },
                },
                {
                    elementText: `${t('game-analysis')}`,
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

    const navMenuWithDropdownsProps: NavMenuWithDropdownsProps = {
        title: t('dropdown-navigation'),
        openByDefault: false,
        dropdownItems: [
            <div
                key={1}
                className={classNames(cls.dropDownItem)}
                onClick={() => navigateToGameArt()}
            >
                {t('game-art')}
            </div>,
            <div
                key={2}
                className={classNames(cls.dropDownItem)}
                onClick={() => navigateToLessonPresentation()}
            >
                {t('lesson-presentation')}
            </div>,
            <div
                key={3}
                className={classNames(cls.dropDownItem)}
                onClick={() => navigateToInstructions()}
            >
                {t('instructions')}
            </div>,
            <div
                key={4}
                className={classNames(cls.dropDownItem)}
                onClick={() => navigateToTeachingMaterials()}
            >
                {t('teaching-material')}
            </div>,
            <div
                key={5}
                className={classNames(cls.dropDownItem)}
                onClick={() => navigateToGameAnalysis()}
            >
                {t('game-analysis')}
            </div>,
            <div
                key={6}
                className={classNames(cls.dropDownItem)}
                onClick={() => navigateToFeedbackAndDevelopment()}
            >
                {t('feedback-and-development')}
            </div>,
        ],
    };

    const toggleSidebar = () => {
        setIsCollapsed((prevState) => !prevState);
    };

    // Render alternate component if condition is met
    if (useAlternateComponent) {
        return (
            <div style={{ marginBottom: '20%' }}>
                <NavMenuWithDropdowns {...navMenuWithDropdownsProps} />
            </div>
        );
    }

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
                    icon={faAngleLeft}
                    style={{
                        transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                        transition: 'transform 0.4s ease-in-out',
                    }}
                />
            </button>
        </div>
    );
};
