'use client';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { NewsPageNavMenuAsDropdown } from '@/features/NavigateNewsPage';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    const { t } = useClientTranslation('search');
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    return (
        <div>
            {isTouchDevice ? (
                <div>
                    <PageTitle
                        titleText={t('newsTitle')}
                        searchVisible={false}
                        alternate={true}
                    />
                    <LayoutWithSidebars
                        leftTopSidebar={{
                            component: <NewsPageNavMenuAsDropdown />,
                        }}
                    >
                        {children}
                    </LayoutWithSidebars>
                </div>
            ) : (
                <div>
                    <LayoutWithSidebars
                        leftTopSidebar={{
                            component: <NewsPageNavMenuAsDropdown />,
                        }}
                    >
                        <PageTitle
                            titleText={t('newsTitle')}
                            searchVisible={false}
                            alternate={true}
                        />
                        {children}
                    </LayoutWithSidebars>
                </div>
            )}
        </div>
    );
}
