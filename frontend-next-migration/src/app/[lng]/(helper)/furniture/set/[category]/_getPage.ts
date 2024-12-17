import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { FurnitureOneSetPageProps } from '@/preparedPages/FurniturePages';
import { FurnitureManager } from '@/entities/Furniture';
import { notFound } from 'next/navigation';
import { capitalizeFirstLetter } from '@/shared/lib/capitalizeFirstLetter';

export async function _getPage(lng: string, category: string) {
    const { t } = await useServerTranslation(lng, 'furnitureinfo');
    const manager = new FurnitureManager();
    const set = manager.getFurnitureSet(category);

    if (!set) {
        return notFound();
    }

    const setPathName = manager.getSetTranslation(t, set.path);

    return createPage<FurnitureOneSetPageProps>({
        buildPage: () => ({
            setInfo: set,
            header:
                (typeof setPathName === 'string' && setPathName) ||
                (typeof setPathName !== 'string' && setPathName.name) ||
                'Unknown',
            textBack: `<-- ${t('text-back')}`,
        }),
        buildSeo: () => ({
            title: capitalizeFirstLetter(set.id),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
