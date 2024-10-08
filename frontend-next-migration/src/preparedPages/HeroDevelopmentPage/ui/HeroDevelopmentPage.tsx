'use client';
import cls from './HeroDevelopmentPage.module.scss';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import { ReactNode } from 'react';
import { ComingSoon } from '@/widgets/ComingSoon';

export type Props = {
  title: string;
  text: ReactNode;
};

const HeroDevelopmentPage = (props: Props) => {
  const { title, text } = props;

  return (
    <div className={cls.pageWrapper}>
      <ComingSoon />
      {/* TODO: Remember to Remove ComingSoon component.*/}
    </div>
  );
};

export default withBackgroundImage<Props>({
  alt: 'Tile bg image',
  imagePath: bgPicture as unknown as string,
})(HeroDevelopmentPage);
