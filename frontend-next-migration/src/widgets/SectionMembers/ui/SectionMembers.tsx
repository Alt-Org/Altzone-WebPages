/* This code snippet is a TypeScript React component that displays a list of team members grouped by
their roles. Here's a breakdown of what the code is doing: */
import cls from './SectionMembers.module.scss';
import Image from 'next/image';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@/shared/ui/Container';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab';
import { useClientTranslation } from '@/shared/i18n';
import { useParams } from 'next/navigation';
import { FC, memo, useEffect, useState } from 'react';
import { TeamMember, fetchTeamMembers } from '../model/membersApi';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface WorkersSectionProps {
  className?: string;
}

/* This code snippet defines a React functional component named `SectionMembers` that takes in a prop
`className` of type string. Inside the component function, it initializes state using the `useState`
hook to store an array of `TeamMember` objects as `teamMembers`. It then retrieves parameters using
the `useParams` hook and extracts the language (`lng`) from the parameters. */
export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useClientTranslation(lng, 'team');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await fetchTeamMembers();
        setTeamMembers(data);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };
    fetchMembers();
  }, []);

  const groupedMembers = groupByRole(teamMembers);

  return (
    <div className={classNames(cls.MembersSection, {}, [className])}>
      <ScrollBottomButton
        className={cls.scrollBottomButton}
        text={t('playButton')}
      />
      <Container className={cls.membersListContainer}>
        {Object.keys(groupedMembers).map((role) => (
          <div key={role}>
            <h2>{t(role)}</h2>
            {groupedMembers[role].map((member) => (
              <GroupWithMemberComponent key={member.id} member={member} />
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
};

/**
 * The `groupByRole` function takes an array of `TeamMember` objects and groups them by their `Role`
 * property into a Record where the keys are roles and the values are arrays of team members with that
 * role.
 * @param {TeamMember[]} members - An array of TeamMember objects.
 * @returns The `groupByRole` function returns an object where each key represents a role and the
 * corresponding value is an array of `TeamMember` objects with that role.
 */
const groupByRole = (members: TeamMember[]): Record<string, TeamMember[]> => {
  return members.reduce((acc, member) => {
    if (!acc[member.Role]) {
      acc[member.Role] = [];
    }
    acc[member.Role].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);
};

interface GroupWithMemberProps {
  member: TeamMember;
}

/* The `GroupWithMemberComponent` constant is defining a React functional component that takes in a
prop `member` of type `GroupWithMemberProps`. Inside the component function, it first retrieves
parameters using the `useParams` hook and extracts the language (`lng`) from the parameters. Then,
it uses the `useClientTranslation` hook to get the translation function `t` for the 'members'
namespace. */
const GroupWithMemberComponent: FC<GroupWithMemberProps> = memo(
  ({ member }) => {
    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, 'members');

    return (
      <div className={cls.groupComponent}>
        <MemberComponent member={member} />
      </div>
    );
  },
);

GroupWithMemberComponent.displayName = 'GroupWithMemberComponent';

interface MemberProps {
  member: TeamMember;
}

/* The `MemberComponent` constant is defining a React functional component that takes in a prop
`member` of type `MemberProps`. Inside the component function, it renders a section displaying
information about a team member. Here's a breakdown of what it's doing: */
const MemberComponent: FC<MemberProps> = memo(({ member }) => {
  return (
    <div className={cls.workmanComponent}>
      <div className={cls.iconContainer}>
        <h3>{member.Name}</h3>
        {member.Website && (
          <span className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faGlobe}
              size='xl'
              onClick={() => openLinkInNewTab(member.Website)}
            />
          </span>
        )}
        {member.Github && (
          <span className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faGithub}
              size='xl'
              onClick={() => openLinkInNewTab(member.Github)}
            />
          </span>
        )}
        {member.Linkedin && (
          <span className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faLinkedin}
              size='xl'
              onClick={() => openLinkInNewTab(member.Linkedin)}
            />
          </span>
        )}
        {member.Email && (
          <span className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faEnvelope}
              size='xl'
              onClick={() => openLinkInNewTab(`mailto:${member.Email}`)}
            />
          </span>
        )}
      </div>
      <div className={cls.taskText}>
        <p>{member.Task}</p>
      </div>
    </div>
  );
});

MemberComponent.displayName = 'MemberComponent';
