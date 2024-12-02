import { useParams } from 'next/navigation';
import { FC } from 'react';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { MemberItem, useGetMembersQuery } from '@/entities/Member';
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
        data: members = [], // This is where the members' data is stored
        isError,
        isLoading,
    } = useGetMembersQuery(lng, {
        refetchOnMountOrArgChange: false,
    });

    // Helper function to render the team and department information
    const renderTeamsAndDepartments = (member: any) => {
        return (
            <div className={cls.memberDetails}>
                {/* Assuming `teams` and `departments` are populated */}
                {member.teams ? (
                    <p>
                        <strong>Team:</strong> {member.teams.name}
                    </p>
                ) : null}
                {member.departments ? (
                    <p>
                        <strong>Department:</strong> {member.departments.name}
                    </p>
                ) : null}
            </div>
        );
    };

    return (
        <div className={classNames(cls.MembersSection, {}, [className])}>
            <ScrollBottomButton
                isDisabled={isError || isLoading}
                className={classNames(cls.scrollBottomButton, { [cls.disabled]: isError })}
                text={isError ? `${t('playButton')} 🚫` : t('playButton')}
            />
            <Container className={cls.membersListContainer}>
                {isError && <p>Error fetching teams data</p>}

                {isLoading || isError ? <SkeletonLoaderWithHeader sections={5} /> : null}

                {/* Render members data once it's successfully fetched */}
                {!isLoading && !isError && members.length > 0 ? (
                    <div className={cls.membersList}>
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className={cls.memberCard}
                            >
                                <MemberItem member={member} />
                                {renderTeamsAndDepartments(member)}{' '}
                                {/* Add the team and department info */}
                            </div>
                        ))}
                    </div>
                ) : null}
            </Container>
        </div>
    );
};
