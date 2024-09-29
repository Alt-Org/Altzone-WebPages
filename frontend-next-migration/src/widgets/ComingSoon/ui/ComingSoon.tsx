'use client';
import cls from './ComingSoon.module.scss';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import {useParams, useRouter} from 'next/navigation';
import { classNames } from '@/shared/lib/classNames/classNames';
import {memo} from "react";
import {useClientTranslation} from "@/shared/i18n";

export type Props = {
};

export const ComingSoon = memo(() => {

  const params = useParams();
  const lng = params.lng as string;
  const { t } = useClientTranslation(lng,'coming');

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
      <main className={cls.main}>
        <div className={cls.container}>
          <h1>{t('title')}</h1>
          <div className={cls.text}>
            <h3>{t('text')}</h3>
            <div
                className={classNames(cls.NavGoBackButton, {}, [])}
                onClick={handleGoBack}>
              <p>{t('backText')}</p>
            </div>
          </div>
        </div>
      </main>
  );
});


ComingSoon.displayName = 'ComingSoon';

export default withBackgroundImage<Props>({
  alt: 'Tile bg image',
  imagePath: bgPicture as unknown as string,
})(ComingSoon);
