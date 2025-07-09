import { NewsCategorySlug } from '@/entities/NewsV2/model/types/types';

// map english name to slug
export const categoryNameToSlugMap: Record<string, string> = {
    Update: NewsCategorySlug.UPDATE,
    Announcement: NewsCategorySlug.ANNOUNCEMENT,
    'Game Update': NewsCategorySlug.GAME_UPDATE,
};

export const slugToCategoryNameMap = Object.fromEntries(
    Object.entries(categoryNameToSlugMap).map(([name, slug]) => [slug, name]),
);
