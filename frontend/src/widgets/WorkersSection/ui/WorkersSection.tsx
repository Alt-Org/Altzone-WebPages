import cls from "./WorkersSection.module.scss";
import {groupsWithWorkersLocally, GroupWithWorkman, Workman} from "@/entities/Worker";
import {FC, memo} from "react";
import {ScrollBottomButton} from "@/features/ScrollBottom";


export const WorkersSection = () => {
    return (
        <div className={cls.WorkersSection}>

            <ScrollBottomButton/>
            {
                groupsWithWorkersLocally.map(group=>(
                    <GroupWithWorkmanComponent groupWithWorkman={group}/>
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
            <h3>{workman.name}</h3>
            <ul>
                {Object.entries(workman).map(([key, value]) => (
                    key !== 'name' && key !== 'id' && (
                        <li key={key}>
                            <strong>{key}: </strong>
                            {value}
                        </li>
                    )
                ))}
            </ul>
        </div>
    );
});


