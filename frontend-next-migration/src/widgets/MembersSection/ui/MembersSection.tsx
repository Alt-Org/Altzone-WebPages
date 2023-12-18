import cls from "./MembersSection.module.scss";
import Image from 'next/image'
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
import {useClientTranslation} from "@/shared/i18n";
import {useParams} from "next/navigation";



interface WorkersSectionProps  {
    className?: string;
}


export const MembersSection = ({className = ''}: WorkersSectionProps) => {

    const memoizedGroupsWithWorkers = useMemo(() => groupsWithMembersLocally, []);

    const params = useParams();
    const lng = params.lng as string;


    const {t} = useClientTranslation(lng, "team");

    return (
        <div className={classNames(cls.MembersSection,{},[className])}>

            <ScrollBottomButton className={cls.scrollBottomButton} text={t("playButton")}/>


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


    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "members");

    return (
        <div className={cls.groupComponent}>
            <h1>{t(`${groupWithMember.group}`)}</h1>
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
GroupWithWorkmanComponent.displayName  = "GroupWithWorkmanComponent";


interface WorkmanProps {
    member: Member;
}


const MemberComponent: FC<WorkmanProps> = memo(({ member }) => {
    return (
        <div className={cls.workmanComponent}>
            {member.imgSrc && <Image src={member.imgSrc} alt={member.name + ' logo' }/>}
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

MemberComponent.displayName = "MemberComponent";
