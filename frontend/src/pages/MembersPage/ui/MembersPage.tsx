import {Navbar} from "@/widgets/Navbar";
import cls from './MembersPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {MembersSection} from "@/widgets/MembersSection";
import {classNames} from "@/shared/lib/classNames/classNames";

const MembersPage = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            <Navbar className={cls.navbar}/>
            <FeedbackSideButton/>
            <MembersSection  className={cls.workersSection}/>
        </div>
    );
};

export default MembersPage;
