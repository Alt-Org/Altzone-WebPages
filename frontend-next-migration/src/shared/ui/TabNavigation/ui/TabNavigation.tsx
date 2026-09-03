import cls from './TabNavigation.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';

interface TabNavigationProps {
    tabs: { id: string; label: string }[];
    tabsTitle: string;
    activeTab: string;
    onTabClick: (tab: string) => void;
    tabStylesList?: React.CSSProperties[];
    activeTabStyles?: React.CSSProperties;
    showTabTitle?: boolean;
}

/**
 * TabNavigation component renders a navigation bar with tabs.
 * @param tabs - An array of tab objects containing id and label.
 * @param tabsTitle - The title displayed above the tabs on mobile devices.
 * @param activeTab - The id of the currently active tab.
 * @param onTabClick - Callback function triggered when a tab is clicked.
 * @param tabStylesList - Optional array of styles for each tab.
 * @param activeTabStyles - Optional styles for the active tab.
 */
export const TabNavigation = ({
    tabs,
    tabsTitle,
    activeTab,
    onTabClick,
    tabStylesList,
    activeTabStyles,
    showTabTitle = false,
}: TabNavigationProps) => {
    const { isMobileSize } = useSizes();

    const handleTabClick = (tabId: string) => {
        onTabClick(tabId);
    };

    return (
        <div className={cls.tabNavigation}>
            {isMobileSize || showTabTitle ? <div className={cls.tabsTitle}>{tabsTitle}</div> : null}
            <div className={cls.tabsContainer}>
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={cls.tab + (activeTab === tab.id ? ` ${cls.activeTab}` : '')}
                        style={
                            activeTab === tab.id
                                ? activeTabStyles
                                : tabStylesList?.[tabs.indexOf(tab) % tabStylesList.length] || {}
                        }
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
        </div>
    );
};
