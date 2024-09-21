import { useServerTranslation } from '@/shared/i18n';
import { createPage } from '@/app/_helpers';
import { HeroDevelopmentPageProps } from '@/preparedPages/HeroDevelopmentPage';

export async function _getPage(lng: string) {
  const { t } = await useServerTranslation(lng, 'hero-development');
  return createPage<HeroDevelopmentPageProps>({
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
