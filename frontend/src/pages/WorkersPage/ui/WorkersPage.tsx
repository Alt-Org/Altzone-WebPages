import {WorkersSection} from "@/widgets/WorkersSection";
import {Navbar} from "@/widgets/Navbar";
import cls from './WorkersPage.module.scss'

const WorkersPage = () => {
    return (
        <div>
            <Navbar    className={cls.navbar} />

            {/*<div style={{marginTop: '200px'}}>*/}

            {/*</div>*/}
           <WorkersSection/>
        </div>
    );
};

export default WorkersPage;
