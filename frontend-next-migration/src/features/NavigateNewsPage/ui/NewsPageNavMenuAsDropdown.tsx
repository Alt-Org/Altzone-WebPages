/* eslint-disable prettier/prettier */
/**
 * A component that renders a navigation menu for news categories as a dropdown.
 *
 * The component displays differently based on device type:
 * - For mobile/tablet devices: Shows a collapsible dropdown menu
 * - For desktop devices: Shows an expanded static menu
 *
 * @component
 * @returns {JSX.Element} The rendered navigation menu component.
 *
 * @example
 *
 * <NewsPageNavMenuAsDropdown/>
 */
'use client';
import React from 'react';
import cls from './NewsPageNavMenuAsDropdown.module.scss';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useGetNewsCategoriesQuery } from '@/entities/NewsV2';
import { useParams } from 'next/navigation';
import { DropDownElementASTextOrLink } from '@/shared/ui/DropdownWrapper';
import { getRouteNewsCategoryPage } from '@/shared/appLinks/RoutePaths';
import { categoryNameToSlugMap } from '@/entities/NewsV2/model/newsCategorySlugMap';

const NewsPageNavMenuAsDropdown: React.FC = () => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('news');

    const { data } = useGetNewsCategoriesQuery();
    const params = useParams();
    const lng = params.lng as string;
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;

    // Extract categories with localized names and slugs
    const categories = data
        ? data
            .map((item) => {
                const translation = item.translations.find(
                    (t: { languages_code: string }) => t.languages_code === lngCode
                );
                const englishTranslation = item.translations.find(
                    (t: { languages_code: string }) => t.languages_code === 'en-US'
                );   
                return {
                    localizedName: translation?.category ?? '',
                    slug: categoryNameToSlugMap[englishTranslation?.category] || '',
                };
            })
            .filter((item) => item.localizedName && item.slug)
        : [];
    const dropdownItems: DropDownElementASTextOrLink[] = categories.map((category) => ({
        elementText: category.localizedName.charAt(0).toUpperCase() + category.localizedName.slice(1),
        link: {
            path: getRouteNewsCategoryPage(category.slug),
            isExternal: false
        },
        active: params.slug === category.slug,
    }));
    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('category-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('category-title'),
        openByDefault: true,
        staticDropdown: true,
        dropdownItems: dropdownItems,
    };

    return (
        // Use a fragment to avoid unnecessary div wrapper
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {isTouchDevice ? (
                <NavMenuWithDropdowns
                    className={cls.WidthNewsNavMenu}
                    customActiveClassName={cls.NewsActive}
                    {...navMenuWithDropdownsMobileProps}
                />
            ) : (
                <NavMenuWithDropdowns
                    className={cls.NewsNavMenu}
                    customActiveClassName={cls.NewsActive}
                    {...navMenuWithDropdownsDesktopProps}
                />
            )}
        </>
    );
};

export default NewsPageNavMenuAsDropdown;
