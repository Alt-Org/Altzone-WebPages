import { useLayoutEffect, useRef, useState } from 'react';
import cls from './TabNavigation.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';

const DESKTOP_TAB_WIDTH = 200;

interface TabNavigationProps {
    tabs: { id: string; label: string }[];
    tabsTitle: string;
    activeTab: string;
    onTabClick: (tab: string) => void;
    tabStylesList?: React.CSSProperties[];
    mobileTabStylesList?: React.CSSProperties[];
    activeTabStyles?: React.CSSProperties;
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
    mobileTabStylesList,
    activeTabStyles,
}: TabNavigationProps) => {
    const sizes = useSizes();
    const { isMobileSize } = sizes;
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const [tabsNeedMobileStyles, setTabsNeedMobileStyles] = useState(false);
    const [mobileColumns, setMobileColumns] = useState(2);
    const useMobileStyles = isMobileSize || tabsNeedMobileStyles;

    // determine if the tabs need to use mobile styles based on the container width and number of tabs
    useLayoutEffect(() => {
        const container = tabsContainerRef.current;
        if (!container) return;

        setTabsNeedMobileStyles(container.clientWidth < tabs.length * DESKTOP_TAB_WIDTH);
    }, [sizes, tabs.length]);

    // determine the number of columns for mobile styles based on the container width and number of tabs
    useLayoutEffect(() => {
        const container = tabsContainerRef.current;
        if (!container || !useMobileStyles) return;

        const styles = getComputedStyle(container);
        const availableWidth =
            container.clientWidth -
            parseFloat(styles.paddingLeft) -
            parseFloat(styles.paddingRight);
        const gap = parseFloat(styles.columnGap);
        const minimumTabWidth = parseFloat(styles.getPropertyValue('--mobile-tab-min-width'));
        const tabsThatFit = Math.floor((availableWidth + gap) / (minimumTabWidth + gap));

        // if all tabs fit at mobile size, use tab # columns, otherwise 2
        setMobileColumns(tabsThatFit >= tabs.length ? Math.max(1, tabs.length) : 2);
    }, [sizes, tabs.length, useMobileStyles]);

    const handleTabClick = (tabId: string) => {
        onTabClick(tabId);
    };

    return (
        <div className={cls.tabNavigation}>
            {useMobileStyles && <div className={cls.tabsTitle}>{tabsTitle}</div>}
            <div
                ref={tabsContainerRef}
                className={`${cls.tabsContainer}${useMobileStyles ? ` ${cls.mobileTabs}` : ''}${useMobileStyles && mobileColumns === 2 && tabs.length > 2 ? ` ${cls.twoColumnTabs}` : ''}`}
                style={
                    useMobileStyles
                        ? {
                              gridTemplateColumns: `repeat(${mobileColumns}, minmax(0, 1fr))`,
                          }
                        : undefined
                }
            >
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        className={`${cls.tab}${activeTab === tab.id ? ` ${cls.activeTab}` : ''}`}
                        style={{
                            ...(activeTab === tab.id
                                ? activeTabStyles
                                : useMobileStyles
                                  ? mobileTabStylesList?.[
                                        index % (mobileTabStylesList?.length || 1)
                                    ]
                                  : tabStylesList?.[index % (tabStylesList?.length || 1)]),
                        }}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </div>
                ))}
            </div>
        </div>
    );
};
