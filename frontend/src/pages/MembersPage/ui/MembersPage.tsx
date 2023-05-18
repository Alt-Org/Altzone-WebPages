import {Navbar} from "@/widgets/Navbar";
import cls from './MembersPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {MembersSection} from "@/widgets/MembersSection";
import {classNames} from "@/shared/lib/classNames/classNames";

const MembersPage = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            <FeedbackSideButton/>
            <Navbar className={cls.navbar}/>
            <MembersSection  className={cls.workersSection}/>
        </div>

        // <div>
        //     <FeedbackSideButton/>
        //     <Navbar  className={cls.navbar} />
        //
        //     {/*<div style={{marginTop: '200px'}}>*/}
        //
        //     {/*</div>*/}
        //    {/*<MembersSection  className={cls.workersSection}/>*/}
        // </div>
    );
};

export default MembersPage;
