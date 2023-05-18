import {Navbar} from "@/widgets/Navbar";
import cls from './MembersPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {MembersSection} from "@/widgets/MembersSection";

const MembersPage = () => {
    return (
        <div>
            <FeedbackSideButton/>
            <Navbar  className={cls.navbar} />

            {/*<div style={{marginTop: '200px'}}>*/}

            {/*</div>*/}
           <MembersSection  className={cls.workersSection}/>
        </div>
    );
};

export default MembersPage;
