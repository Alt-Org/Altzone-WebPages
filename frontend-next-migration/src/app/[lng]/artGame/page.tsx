import GameArtPage from '@/preparedPages/GameArtPage/ui/GameArtPage';
import { useServerTranslation } from '@/shared/i18n';
import { Metadata } from 'next';
import { makeArtGameSectionsWithI18n } from '@/entities/PresentationPackages';

type Props = {
  params: { lng: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { t } = await useServerTranslation(params.lng, 'artGame');

  return {
    title: t('head-title'),
    description: t('head-description'),
    keywords: t('head-keywords'),
  };
}

export default async function DefaultPage({ params }: Props) {
  const { t } = await useServerTranslation(params.lng, 'artGame');

  const sections = makeArtGameSectionsWithI18n(t);

  return <GameArtPage sections={sections} />;
}
