import cls from './SectionMembers.module.scss';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTeams } from '../model/membersApi';
import { Team } from '../model/types';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import DepartmentItem from './DepartmentItem';
import { useClientTranslation } from '@/shared/i18n';
import MemberItem from './MemberItem';

/**
 * Props for the SectionMembers component.
 */
interface WorkersSectionProps {
  className?: string;
}

/**
 * SectionMembers component displays a list of teams, including their departments and members.
 * It fetches data from an API and renders the content dynamically based on the response.
 */
export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useClientTranslation(lng, 'team');

  {
    /*Fetch team data when the language changes*/
  }
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
      {/* Scroll button to go to the bottom of the page */}
      <ScrollBottomButton
        className={cls.scrollBottomButton}
        text={t('playButton')}
      />
      {/* Container to hold the list of teams */}
      <Container className={cls.membersListContainer}>
        {teams.map((team) => (
          <div key={team.id} className={cls.memberCard}>
            {/* Render team name */}
            <h1 className={cls.membersListContainer}>{team.name}</h1>
            {/* Render departments within the team */}
            {team.departments.length > 0 && (
              <div className={cls.departmentsSection}>
                {team.departments.map((department) => (
                  <DepartmentItem key={department.id} department={department} />
                ))}
              </div>
            )}
            {/* Render members that do not belong to any department */}
            {team.members.length > 0 && (
              <ul className={cls.membersList}>
                {team.members.map((member) => (
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
