import cls from './TabNavigation.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';

interface TabNavigationProps {
    tabs: string[];
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

    const handleTabClick = (tab: string) => {
        onTabClick(tab);
    };

    return (
        <div className={cls.tabNavigation}>
            {isMobileSize && <div className={cls.tabsTitle}>{tabsTitle}</div>}
            <div className={cls.tabsContainer}>
                {tabs.map((tab) => (
                    <div
                        key={tab}
                        className={cls.tab}
                        style={
                            activeTab === tab
                                ? activeTabStyles
                                : tabStylesList?.[tabs.indexOf(tab) % tabStylesList.length] || {}
                        }
                        onClick={() => handleTabClick(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                    </div>
                ))}
            </div>
        </div>
    );
};
