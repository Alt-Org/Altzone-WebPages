'use client';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { NewsPageNavMenuAsDropdown } from '@/features/NavigateNewsPage';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useClientTranslation } from '@/shared/i18n';

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    const { t } = useClientTranslation('search');
    return (
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
    );
}
