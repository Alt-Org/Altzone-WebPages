import cls from './TabNavigation.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';

interface TabNavigationProps {
    tabs: { id: string; label: string }[];
    tabsTitle: string;
    activeTab: string;
    onTabClick: (tab: string) => void;
    tabStylesList?: React.CSSProperties[];
    activeTabStyles?: React.CSSProperties;
}

export const TabNavigation = ({
    tabs,
    tabsTitle,
    activeTab,
    onTabClick,
    tabStylesList,
    activeTabStyles,
}: TabNavigationProps) => {
    const { isMobileSize } = useSizes();

    const handleTabClick = (tabId: string) => {
        onTabClick(tabId);
    };

    return (
        <div className={cls.tabNavigation}>
            {isMobileSize && <div className={cls.tabsTitle}>{tabsTitle}</div>}
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
