import cls from './SectionMembers.module.scss';
import { FC, memo, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTeamMembers, TeamMember } from '../model/membersApi';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab';
import { useClientTranslation } from '@/shared/i18n'; // Import translation hook

interface WorkersSectionProps {
  className?: string;
}

export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useClientTranslation(lng, 'team'); // Use translation hook for locale 'team'

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await fetchTeamMembers(lng);
        setTeamMembers(data);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };
    fetchMembers();
  }, [lng]);

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
            <h2>{role}</h2>{' '}
            {/* No need to translate, role names are managed in Strapi */}
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
 * The groupByRole function takes an array of TeamMember objects and groups them by their Role
 * property into a Record where the keys are roles and the values are arrays of team members with that role.
 * @param {TeamMember[]} members - An array of TeamMember objects.
 * @returns The groupByRole function returns an object where each key represents a role and the
 * corresponding value is an array of TeamMember objects with that role.
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

/* The GroupWithMemberComponent constant is defining a React functional component that takes in a
prop member of type GroupWithMemberProps. Inside the component function, it simply renders the
information passed in by the member prop. No local translation is needed as this is already handled by Strapi. */
const GroupWithMemberComponent: FC<GroupWithMemberProps> = memo(
  ({ member }) => {
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

/* The MemberComponent constant is defining a React functional component that takes in a prop
member of type MemberProps. Inside the component function, it renders a section displaying
information about a team member, including their website, GitHub, LinkedIn, and email. */
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
              onClick={() => openLinkInNewTab(member.Email)}
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
