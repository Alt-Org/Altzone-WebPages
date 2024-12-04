import { useParams } from 'next/navigation';
import { FC } from 'react';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { MemberItem, useGetMembersQuery } from '@/entities/Member';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { useClientTranslation } from '@/shared/i18n';
import { SkeletonLoaderWithHeader } from '@/shared/ui/SkeletonLoader';
import cls from './SectionMembers.module.scss';
import { Member } from '@/entities/Member/model/types/types';

interface WorkersSectionProps {
    className?: string;
}

export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation('team');

    const {
        data: members = [],
        isError,
        isLoading,
    } = useGetMembersQuery(lng, {
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

                {isLoading || isError ? <SkeletonLoaderWithHeader sections={5} /> : null}

                {!isLoading && !isError && members.length > 0 && (
                    <div className={cls.membersList}>
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className={cls.memberCard}
                            >
                                <MemberItem
                                    member={member}
                                    language={lng}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};
