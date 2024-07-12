import { CookiesPage } from '@/preparedPages/CookiesPage';
import { useServerTranslation } from '@/shared/i18n';
import { Metadata } from 'next';
import { makeCookiesSectionsWithI18n } from '@/entities/PresentationPackages';

type Props = {
  params: { lng: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await useServerTranslation(params.lng, 'cookies');

  return {
    title: t('head-title'),
    description: t('head-description'),
    keywords: t('head-keywords'),
  };
}

export default async function DefaultPage({ params }: Props) {
  const { t } = await useServerTranslation(params.lng, 'cookies');

  const sections = makeCookiesSectionsWithI18n(t);

  return <CookiesPage sections={sections} />;
}
