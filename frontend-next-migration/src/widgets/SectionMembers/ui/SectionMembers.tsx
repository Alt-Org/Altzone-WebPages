import { useParams } from 'next/navigation';
import { FC } from 'react';
// import { ScrollBottomButton } from '@/features/ScrollBottom';
import { MemberItem, useGetMembersQuery } from '@/entities/Member';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { useClientTranslation } from '@/shared/i18n';
import { SkeletonLoaderWithHeader } from '@/shared/ui/SkeletonLoader';
import cls from './SectionMembers.module.scss';
import { organizeMembers } from '@/entities/Member/api/mappers'; // Ensure correct import path

interface WorkersSectionProps {
    className?: string;
}

export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
    const params = useParams();
    const lng = params.lng as string;
    const { t: _t } = useClientTranslation('members');

    const {
        data: members = [],
        isError,
        isLoading,
    } = useGetMembersQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    const { teamsMap } = organizeMembers(members, lng);

    // If no members found, reload the page (to fix potential Directus caching issues)
    if (teamsMap.size === 0 && !isLoading && !isError) {
        location.reload();
        return <p>{_t('no-members')}</p>;
    }

    return (
        <div className={classNames(cls.MembersSection, {}, [className])}>
            {/*<ScrollBottomButton
                isDisabled={isError || isLoading}
                className={classNames(cls.scrollBottomButton, { [cls.disabled]: isError })}
                text={isError ? `${_t('page-play')} 🚫` : `${_t('page-play')} ▶`}
            />*/}
            <Container className={cls.membersListContainer}>
                {isError && <p>Error fetching data</p>}
                {isLoading ? <SkeletonLoaderWithHeader sections={5} /> : null}
                {!isLoading && !isError && (
                    <>
                        {Array.from(teamsMap.values()).map((team) => (
                            <div
                                key={team.id}
                                className={cls.teamCard}
                            >
                                <h1 id={team.name}>{team.name}</h1>
                                <ul className={cls.teamMembersList}>
                                    {team.members.map((member) => (
                                        <MemberItem
                                            key={member.id}
                                            member={member}
                                            language={lng}
                                        />
                                    ))}
                                </ul>
                                {team.departments.map((department) => (
                                    <div
                                        key={department.id}
                                        className={cls.departmentCard}
                                    >
                                        <h3>{department.name}</h3>
                                        <ul className={cls.departmentMembersList}>
                                            {department.members.map((member) => (
                                                <MemberItem
                                                    key={member.id}
                                                    member={member}
                                                    language={lng}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                )}
            </Container>
        </div>
    );
};
