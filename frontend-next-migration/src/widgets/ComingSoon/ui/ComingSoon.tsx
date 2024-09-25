'use client';
import cls from './ComingSoon.module.scss';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { classNames } from '@/shared/lib/classNames/classNames';

export type Props = {
  lng: string;
};

export const ComingSoon = memo(({ lng }: Props) => {
  const { t } = useTranslation('coming');
  const [title, setTitle] = useState(t('title'));
  const [text, setText] = useState(t('text'));
  const [backText, setBackText] = useState(t('backText'));
  const router = useRouter();

  useEffect(() => {
    setTitle(t('title'));
    setText(t('text'));
    setBackText(t('backText'));
  }, [lng, t]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className={cls.main}>
      <div className={cls.container}>
        <h1>{title}</h1>
        <div className={cls.text}>
          <h3>{text}</h3>
          <div
            className={classNames(cls.NavGoBackButton, {}, [])}
            onClick={handleGoBack}>
            <p>{backText}</p>
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
