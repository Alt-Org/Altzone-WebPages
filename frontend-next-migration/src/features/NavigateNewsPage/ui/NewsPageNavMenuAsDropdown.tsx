/* eslint-disable prettier/prettier */
/**
 * A component that renders a navigation menu for news categories as a dropdown.
 *
 * The component displays differently based on device type:
 * - For mobile/tablet devices: Shows a collapsible dropdown menu
 * - For desktop devices: Shows an expanded static menu
 *
 * @component
 * @param {object} props - Component properties
 * @param {string} [props.className] - Optional CSS class name for styling the container
 *
 * @example
 *
 * <NewsPageNavMenuAsDropdown className="custom-menu-class" />
 * @remarks
 * Currently using hard-coded categories as placeholders.
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
import { NewsCategorySlug } from '@/entities/NewsV2/model/types/types';

interface NewsPageNavMenuAsDropdownProps {
    className?: string;
}

const NewsPageNavMenuAsDropdown: React.FC<NewsPageNavMenuAsDropdownProps> = ({ className }) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('news');

    const { data } = useGetNewsCategoriesQuery();
    const params = useParams();
    const lng = params.lng as string;
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;

    // map english name to slug
    const categoryNameToSlugMap: Record<string, string> = {
        'Update': NewsCategorySlug.UPDATE,
        'Announcement': NewsCategorySlug.ANNOUNCEMENT,
        'Game Update': NewsCategorySlug.GAME_UPDATE,
    };

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
        elementText: category.localizedName,
        link: {
            path: `/news/category/${category.slug}`,
            isExternal: false
        },
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
        <div className={className}>
            {isTouchDevice ? (<nav>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsMobileProps}
                />
            </nav>) : (<nav>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsDesktopProps}
                />
            </nav>)}
        </div>
    );
};

export default NewsPageNavMenuAsDropdown;
