'use client';
import cls from './ComingPage.module.scss';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import { ReactNode } from 'react';

export type Props = {
  title: string;
  text: ReactNode;
};

const ComingPage = (props: Props) => {
  const { title, text } = props;

  return (
    <main className={cls.main}>
      <div className={cls.container}>
        <h1>{title}</h1>
        <div className={cls.text}>{text}</div>
      </div>
    </main>
  );
};

export default withBackgroundImage<Props>({
  alt: 'Tile bg image',
  imagePath: bgPicture as unknown as string,
})(ComingPage);
