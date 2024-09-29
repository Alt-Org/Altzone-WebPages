import cls from './NewsPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ComingSoon } from '@/widgets/ComingSoon';

const NewsPage = () => {
  return (
    <main className={classNames(cls.NewsPage)}>
      <ComingSoon />
    </main>
  );
};

export default NewsPage;
