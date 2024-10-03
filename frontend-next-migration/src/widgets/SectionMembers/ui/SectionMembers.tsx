import cls from './SectionMembers.module.scss';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTeams } from '../../../entities/Member/api/membersApi';
import { Team } from '@/entities/Member/model/types/types';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import DepartmentItem from '../../../entities/Member/ui/DepartmentItem';
import { useClientTranslation } from '@/shared/i18n';
import MemberItem from '@/entities/Member/ui/MemberItem';

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
            <h1 className={cls.membersListContainer}>{team.name}</h1>
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
