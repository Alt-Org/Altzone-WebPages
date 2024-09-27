import cls from './SectionMembers.module.scss';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTeams, Team, Member } from '../model/membersApi';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab';
import { useClientTranslation } from '@/shared/i18n';
import Image from 'next/image';

// MemberItem Component to Render a Single Member
const MemberItem: FC<{ member: Member }> = ({ member }) => (
  <li key={member.id} className={cls.workmanComponent}>
    <div className={cls.memberRow}>
      <div className={cls.centerContainer}>
        <span className={cls.memberName}>{member.Name}</span>
        <span className={cls.taskText}>{member.Task}</span>
        <div className={cls.iconContainer}>
          {member.Website && (
            <span
              onClick={() => openLinkInNewTab(member.Website)}
              className={cls.clickableLogo}>
              <FontAwesomeIcon icon={faGlobe} />
            </span>
          )}
          {member.Github && (
            <span
              onClick={() => openLinkInNewTab(member.Github)}
              className={cls.clickableLogo}>
              <FontAwesomeIcon icon={faGithub} />
            </span>
          )}
          {member.Linkedin && (
            <span
              onClick={() => openLinkInNewTab(member.Linkedin)}
              className={cls.clickableLogo}>
              <FontAwesomeIcon icon={faLinkedin} />
            </span>
          )}
          {member.Facebook && (
            <span
              onClick={() => openLinkInNewTab(member.Facebook)}
              className={cls.clickableLogo}>
              <FontAwesomeIcon icon={faFacebook} />
            </span>
          )}
          {member.Instagram && (
            <span
              onClick={() => openLinkInNewTab(member.Instagram)}
              className={cls.clickableLogo}>
              <FontAwesomeIcon icon={faInstagram} />
            </span>
          )}
          {member.Email && (
            <span
              onClick={() => openLinkInNewTab(`mailto:${member.Email}`)}
              className={cls.clickableLogo}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          )}
        </div>
      </div>
    </div>
    {member.Logo && (
      <Image
        src={member.Logo}
        alt={member.Name}
        className={cls.memberLogo}
        width={50}
        height={50}
      />
    )}
  </li>
);

interface WorkersSectionProps {
  className?: string;
}

export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useClientTranslation(lng, 'team');

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const data = await fetchTeams(lng);
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };
    fetchTeamsData();
  }, [lng]);

  return (
    <div className={classNames(cls.MembersSection, {}, [className])}>
      <ScrollBottomButton
        className={cls.scrollBottomButton}
        text={t('playButton')}
      />
      <Container className={cls.membersListContainer}>
        {teams.map((team) => (
          <div key={team.id} className={cls.memberCard}>
            <h1 className={cls.membersListContainer}>{team.Name}</h1>

            {/* Check if the team has departments */}
            {team.departments.length > 0 ? (
              <div className={cls.departmentsSection}>
                {team.departments.map((department) => (
                  <div key={department.id} className={cls.departmentCard}>
                    <h2>{department.Name}</h2>
                    {department.members.length > 0 && (
                      <ul className={cls.departmentMembersList}>
                        {department.members.map((member) => (
                          <MemberItem key={member.id} member={member} />
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // If no departments, render team members directly
              <ul className={cls.membersList}>
                {team.members.length > 0 &&
                  team.members.map((member: Member) => (
                    <MemberItem key={member.id} member={member} />
                  ))}
              </ul>
            )}
          </div>
        ))}
      </Container>
    </div>
  );
};
