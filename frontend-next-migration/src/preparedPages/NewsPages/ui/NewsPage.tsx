import { ComingSoon } from '@/widgets/ComingSoon';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NewsPage.module.scss';

const NewsPage = () => {
    return (
        <main className={classNames(cls.NewsPage)}>
            <ComingSoon />
        </main>
    );
};

export default NewsPage;
