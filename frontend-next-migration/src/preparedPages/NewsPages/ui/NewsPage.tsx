import { ComingSoon } from '@/widgets/ComingSoon';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NewsPage.module.scss';
import { WallIntroAnimation } from '@/shared/ui/WallIntroAnimation';

const NewsPage = () => {
    return (
        <WallIntroAnimation>
            <main className={classNames(cls.NewsPage)}>
                <ComingSoon />
            </main>
        </WallIntroAnimation>
    );
};

export default NewsPage;
