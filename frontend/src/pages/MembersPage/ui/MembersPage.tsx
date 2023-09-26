import {Navbar} from "@/widgets/Navbar";
import cls from './MembersPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {MembersSection} from "@/widgets/MembersSection";
import {classNames} from "@/shared/lib/classNames/classNames";

const MembersPage = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            <div className={cls.backgroundOpacity}></div>
            <div className={cls.navbarWrapper}>
            <Navbar overlayed={true} className={cls.navbar}/>
            </div>
            <FeedbackSideButton/>
            <MembersSection  className={cls.workersSection}/>
        </div>
    );
};

export default MembersPage;
