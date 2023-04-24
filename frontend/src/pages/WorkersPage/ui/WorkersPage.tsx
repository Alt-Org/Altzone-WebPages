import {WorkersSection} from "@/widgets/WorkersSection";
import {Navbar} from "@/widgets/Navbar";
import cls from './WorkersPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";

const WorkersPage = () => {
    return (
        <div>
            <FeedbackSideButton/>
            <Navbar    className={cls.navbar} />

            {/*<div style={{marginTop: '200px'}}>*/}

            {/*</div>*/}
           <WorkersSection  className={cls.workersSection}/>
        </div>
    );
};

export default WorkersPage;
