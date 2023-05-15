import {Navbar} from "@/widgets/Navbar";
import cls from './NewsPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {classNames} from "@/shared/lib/classNames/classNames";

const NewsPage = () => {
    return (
        <div className={classNames(cls.NewsPage)}>
            <FeedbackSideButton/>
            <Navbar className={cls.navbar}/>
            <h1>Uutiset</h1>
        </div>
    );
};

export default NewsPage;

