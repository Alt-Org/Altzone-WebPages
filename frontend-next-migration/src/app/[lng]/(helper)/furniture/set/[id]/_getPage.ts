import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { FurnitureOneSetPageProps } from '@/preparedPages/FurniturePages';
import { FurnitureManager } from '@/entities/Furniture';
import { notFound } from 'next/navigation';

export async function _getPage(lng: string, id: string) {
    const { t } = await useServerTranslation(lng, 'furnitureinfo');
    const manager = new FurnitureManager();
    const set = manager.getFurnitureSet(id);

    if (!set) {
        return notFound();
    }

    return createPage<FurnitureOneSetPageProps>({
        buildPage: () => ({
            setInfo: set,
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
