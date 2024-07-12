import { PrivacyPage } from '@/preparedPages/PrivacyPage';
import { useServerTranslation } from '@/shared/i18n';
import { Metadata } from 'next';
import { makePrivacySectionsWithI18n } from '@/entities/PresentationPackages';

type Props = {
  params: { lng: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await useServerTranslation(params.lng, 'privacy');

  return {
    title: t('head-title'),
    description: t('head-description'),
    keywords: t('head-keywords'),
  };
}

export default async function DefaultPage({ params }: Props) {
  const { t } = await useServerTranslation(params.lng, 'privacy');

  const sections = makePrivacySectionsWithI18n(t);

  return <PrivacyPage sections={sections} />;
}
