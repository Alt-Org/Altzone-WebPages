import cls from './NewsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Head from 'next/head';
import { envHelper } from '@/shared/const/envHelper';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import { ComingSoon } from '@/widgets/ComingSoon';

const NewsPage = () => {
  return (
    <div className={classNames(cls.NewsPage)}>
      <ComingSoon />
      {/* TODO: Remember to Remove ComingSoon component.*/}
    </div>
  );
};

export default NewsPage;
