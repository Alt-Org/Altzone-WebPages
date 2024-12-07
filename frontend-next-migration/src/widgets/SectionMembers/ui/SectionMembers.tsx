import { useParams } from 'next/navigation';
import { FC } from 'react';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { DepartmentItem, MemberItem, useGetTeamsQuery } from '@/entities/Member';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { useClientTranslation } from '@/shared/i18n';
import { SkeletonLoaderWithHeader } from '@/shared/ui/SkeletonLoader';
import cls from './SectionMembers.module.scss';

interface WorkersSectionProps {
    className?: string;
}

export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation('team');

    const {
        data: teams = [],
        isError,
        isLoading,
    } = useGetTeamsQuery(lng, {
        refetchOnMountOrArgChange: false,
    });

    return (
        <div className={classNames(cls.MembersSection, {}, [className])}>
            <ScrollBottomButton
                isDisabled={isError || isLoading}
                className={classNames(cls.scrollBottomButton, { [cls.disabled]: isError })}
                text={isError ? `${t('playButton')} 🚫` : t('playButton')}
            />
            <Container className={cls.membersListContainer}>
                {isError && <p>Error fetching teams data</p>}

                {isLoading || isError ? (
                    <SkeletonLoaderWithHeader sections={5} />
                ) : (
                    teams.map((team) => (
                        <div
                            key={team.id}
                            className={cls.memberCard}
                        >
                            <h1 className={cls.membersListContainer}>{team.name}</h1>
                            {team.departments.length > 0 && (
                                <div className={cls.departmentsSection}>
                                    {team.departments.map((department) => (
                                        <DepartmentItem
                                            key={department.id}
                                            department={department}
                                        />
                                    ))}
                                </div>
                            )}
                            {/* Render members that do not belong to any department */}
                            {team.members.length > 0 && (
                                <ul className={cls.membersList}>
                                    {team.members.map((member) => (
                                        <MemberItem
                                            key={member.id}
                                            member={member}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))
                )}
            </Container>
        </div>
    );
};
