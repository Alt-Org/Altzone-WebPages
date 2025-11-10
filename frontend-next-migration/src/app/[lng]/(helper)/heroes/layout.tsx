'use client';
import { ReactNode, useMemo } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { SingleHeroNavMenuAsDropdown } from '@/features/NavigateHeroes';
import { useClientTranslation } from '@/shared/i18n';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useParams } from 'next/navigation';
import { cls } from '@/preparedPages/HeroesPages';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('heroes');
    const params = useParams();
    const slug = (params?.slug as string) || '';

    const { titleText, subTitleText } = useMemo(() => {
        const heroGroups = initializeHeroGroups(t);
        for (const groupKey in heroGroups) {
            const group = heroGroups[groupKey as keyof typeof heroGroups];
            const hero = group.heroes.find((hero) => hero.slug === slug);
            if (hero) {
                return { titleText: group.name, subTitleText: hero.title };
            }
        }
        return { titleText: '', subTitleText: '' };
    }, [t, slug]);

    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <SingleHeroNavMenuAsDropdown />,
                hideOnMobile: true,
                width: '300px',
            }}
        >
            {(isTabletSize || isMobileSize) && (
                <>
                    <PageTitle
                        titleText={titleText}
                        alternate={true}
                        searchVisible={false}
                    />
                    <p className={cls.Hero}>{subTitleText}</p>
                    <SingleHeroNavMenuAsDropdown />
                </>
            )}
            {children}
        </LayoutWithSidebars>
    );
}
