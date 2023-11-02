import cls from "./MembersSection.module.scss";
import {groupsWithMembersLocally, GroupWithMember, Member} from "@/entities/Member";
import {FC, memo, useMemo} from "react";
import {ScrollBottomButton} from "@/features/ScrollBottom";
import {classNames} from "@/shared/lib/classNames/classNames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {Container} from "@/shared/ui/Container";




interface WorkersSectionProps  {
    className?: string;
}


export const MembersSection = ({className = ''}: WorkersSectionProps) => {

    const memoizedGroupsWithWorkers = useMemo(() => groupsWithMembersLocally, []);

    return (
        <div className={classNames(cls.MembersSection,{},[className])}>

            <ScrollBottomButton className={cls.scrollBottomButton}/>


            <Container className={cls.membersListContainer}>
                {
                    memoizedGroupsWithWorkers.map(group=>(
                        <GroupWithWorkmanComponent key={group.group} groupWithMember={group}/>
                    ))
                }
            </Container>

        </div>
    );
};

interface GroupWithWorkmanProps{
    groupWithMember: GroupWithMember;
}

const GroupWithWorkmanComponent: FC<GroupWithWorkmanProps> = memo(({groupWithMember}) => {
    return (
        <div className={cls.groupComponent}>
            <h1>{groupWithMember.group}</h1>
            <ul>
                {groupWithMember.workers.map((member) => (
                    <li key={member.id}>
                        <MemberComponent member={member} />
                    </li>
                ))}
            </ul>
        </div>
    );
});


interface WorkmanProps {
    member: Member;
}


const MemberComponent: FC<WorkmanProps> = memo(({ member }) => {
    return (
        <div className={cls.workmanComponent}>
            {member.imgSrc && <img src={member.imgSrc} alt={member.name + ' logo' }/>}
            <h3>{member.name} </h3>
            <ul>
                {member.role &&  <li><strong>Rooli:</strong> {`${member.role}`}</li> }

                {member.site &&
                <li className={cls.clickableLogo}>
                    <FontAwesomeIcon icon={faGlobe} size={"xl"} onClick={() => openLinkInNewTab(member?.site)} />
                </li>
                }
                {member.github &&
                <li className={cls.clickableLogo}>
                    <FontAwesomeIcon icon={faGithub}  size={"xl"} onClick={() => openLinkInNewTab(`https://github.com/${member.github}`)} />
                </li>
                }

                {member.linkedin &&
                <li className={cls.clickableLogo}>
                    <FontAwesomeIcon icon={faLinkedin} size={"xl"} onClick={() => openLinkInNewTab(member?.linkedin)} />
                </li>
                }

                {member.status &&  <li><strong>Status:</strong> {`${member.status}`}</li> }
                {member.workPeriod &&  <li><strong>Työjakso:</strong> {`${member.workPeriod}`}</li> }
                {member.email &&  <li><strong>Email:</strong> {`${member.email}`}</li> }
                {member.phone &&  <li><strong>Puhelinnumero:</strong> {`${member.phone}`}</li> }
                {member.trello &&  <li><strong>Trello:</strong> {`${member.trello}`}</li> }
                {member.discord &&  <li><strong>Discord:</strong> {`${member.discord}`}</li> }
            </ul>
        </div>
    );
});
