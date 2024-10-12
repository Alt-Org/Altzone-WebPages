import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { ComingPageProps } from '@/preparedPages/ComingPage';

export async function _getPage(lng: string) {
  const { t } = await useServerTranslation(lng, 'coming');
  return createPage<ComingPageProps>({
    buildPage: () => ({
      title: t('title'),
      text: t('text'),
    }),
    buildSeo: () => ({
      title: t('head-title'),
      description: t('head-description'),
      keywords: t('head-keywords'),
    }),
  });
}
