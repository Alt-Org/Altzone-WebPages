'use client';
import { ReactNode } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';
import { cls } from '@/preparedPages/DefenseGalleryPages';
import { classNames } from '@/shared/lib/classNames/classNames';

interface Props {
    className: string;
}

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    const { isMobileSize, isTabletSize } = useSizes();
    const { t } = useClientTranslation('heroes');

    const NavMenuPlaceholder = (props: Props) => {
        const { className } = props;
        return (
            <div className={classNames(cls.NavMenu, undefined, [className])}>
                nav menu placeholder
            </div>
        );
    };
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <NavMenuPlaceholder className={cls.NavMenuSidebar} />,
                hideOnMobile: true,
                width: '160px',
            }}
        >
            {isMobileSize && <h1 className={cls.Title}>{t('section-title')}</h1>}
            {isTabletSize && <h1 className={cls.Title}>{t('defense-gallery')}</h1>}
            {isTabletSize && (
                <NavMenuPlaceholder
                    className={classNames(cls.NavMenu, undefined, [cls.DropdownTablet])}
                />
            )}
            {isMobileSize && (
                <NavMenuPlaceholder
                    className={classNames(cls.NavMenu, undefined, [cls.DropdownMobile])}
                />
            )}
            {children}
        </LayoutWithSidebars>
    );
}
