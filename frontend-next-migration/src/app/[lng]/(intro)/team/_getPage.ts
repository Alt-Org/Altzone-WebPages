import { createPage } from '@/app/_helpers/_createPage';
import { makeMembersSectionsWithI18n } from '@/entities/PresentationPackages';
import { MembersPageProps } from '@/preparedPages/MembersPage';
import { useServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'members');

    return createPage<MembersPageProps>({
        buildPage: () => ({ sections: makeMembersSectionsWithI18n(t) }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
