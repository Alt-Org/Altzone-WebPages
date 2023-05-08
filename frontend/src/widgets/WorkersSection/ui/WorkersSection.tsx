import cls from "./WorkersSection.module.scss";
import {groupsWithWorkersLocally, GroupWithWorkman, Workman} from "@/entities/Worker";
import {FC, memo} from "react";
import {ScrollBottomButton} from "@/features/ScrollBottom";
import {classNames} from "@/shared/lib/classNames/classNames";
import githubLogo from "@/shared/assets/images/githubLogo.png"
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";

interface WorkersSectionProps  {
    className?: string;
}

export const WorkersSection = ({className = ''}: WorkersSectionProps) => {
    return (
        <div className={classNames(cls.WorkersSection,{},[className])}>

            <ScrollBottomButton className={cls.scrollBottomButton}/>
            {
                groupsWithWorkersLocally.map(group=>(
                    <GroupWithWorkmanComponent key={group.group} groupWithWorkman={group}/>
                ))
            }
        </div>
    );
};

interface GroupWithWorkmanProps{
    groupWithWorkman: GroupWithWorkman;
}

const GroupWithWorkmanComponent: FC<GroupWithWorkmanProps> = memo(({groupWithWorkman}) => {
    return (
        <div className={cls.groupComponent}>
            <h2>{groupWithWorkman.group}</h2>
            <ul>
                {groupWithWorkman.workers.map((worker) => (
                    <li key={worker.id}>
                        <WorkmanComponent workman={worker} />
                    </li>
                ))}
            </ul>
        </div>
    );
});


interface WorkmanProps {
    workman: Workman;
}


const WorkmanComponent: FC<WorkmanProps> = memo(({ workman }) => {
    return (
        <div className={cls.workmanComponent}>
            {workman.imgSrc && <img src={workman.imgSrc} alt={workman.name + ' logo' }/>}
            <h3>{workman.name} </h3>
            <ul>
                {workman.role &&  <li><strong>Rooli:</strong> {`${workman.role}`}</li> }
                {workman.github &&  <li className={cls.githubLogo}> <img onClick={() => openLinkInNewTab(`https://github.com/${workman.github}`)} src={githubLogo} alt="githubLogo"/></li> }
                {workman.status &&  <li><strong>Status:</strong> {`${workman.status}`}</li> }
                {workman.workPeriod &&  <li><strong>Työjakso:</strong> {`${workman.workPeriod}`}</li> }
                {workman.email &&  <li><strong>Email:</strong> {`${workman.email}`}</li> }
                {workman.phone &&  <li><strong>Puhelinnumero:</strong> {`${workman.phone}`}</li> }
                {workman.trello &&  <li><strong>Trello:</strong> {`${workman.trello}`}</li> }
                {workman.discord &&  <li><strong>Discord:</strong> {`${workman.discord}`}</li> }
            </ul>
        </div>
    );
});


