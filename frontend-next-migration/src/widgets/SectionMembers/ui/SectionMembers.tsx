import cls from './SectionMembers.module.scss';
import Image from 'next/image';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@/shared/ui/Container';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab'; // Utility to open links
import { useClientTranslation } from '@/shared/i18n';
import { useParams } from 'next/navigation';
import { FC, memo, useEffect, useState } from 'react';
import { TeamMember, fetchTeamMembers } from '../model/membersApi';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface WorkersSectionProps {
  className?: string;
}

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

const MemberComponent: FC<MemberProps> = memo(({ member }) => {
  return (
    <div className={cls.workmanComponent}>
      <h3>{member.Name}</h3>
      <ul>
        {member.Website && (
          <li className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faGlobe}
              size='xl'
              onClick={() => openLinkInNewTab(member.Website)}
            />
            <a
              href={member.Website}
              target='_blank'
              rel='noopener noreferrer'></a>
          </li>
        )}
        {member.Github && (
          <li className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faGithub}
              size='xl'
              onClick={() => openLinkInNewTab(member.Github)}
            />
            <a
              href={member.Github}
              target='_blank'
              rel='noopener noreferrer'></a>
          </li>
        )}
        {member.Linkedin && (
          <li className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faLinkedin}
              size='xl'
              onClick={() => openLinkInNewTab(member.Linkedin)}
            />
            <a
              href={member.Linkedin}
              target='_blank'
              rel='noopener noreferrer'></a>
          </li>
        )}
        {member.Email && (
          <li className={cls.clickableLogo}>
            <FontAwesomeIcon
              icon={faEnvelope}
              size='xl'
              onClick={() => openLinkInNewTab(`mailto:${member.Email}`)}
            />
            <a
              href={`mailto:${member.Email}`}
              target='_blank'
              rel='noopener noreferrer'></a>
          </li>
        )}
      </ul>
    </div>
  );
});

MemberComponent.displayName = 'MemberComponent';
