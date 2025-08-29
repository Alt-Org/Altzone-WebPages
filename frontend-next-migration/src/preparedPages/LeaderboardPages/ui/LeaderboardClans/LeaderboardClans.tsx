'use client';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import { useClientTranslation } from '@/shared/i18n';
import { useGetTopClansQuery } from '@/shared/api/leaderboardApi';

const LeaderboardClans = () => {
    const { t } = useClientTranslation('leaderboard');
    const { data, isLoading, error } = useGetTopClansQuery(undefined);
    return (
        <SectionLeaderboard
            leaderboard1={
                !isLoading && data
                    ? {
                        title: t('wins'),
                        leaders: data as LeaderboardItem[],
                        path: '/clans',
                    }
                    : undefined
            }
            leaderboard2={
                !isLoading && data
                    ? {
                        title: t('activity'),
                        leaders: data as LeaderboardItem[],
                        path: '/clans',
                    }
                    : undefined
            }
        />
    );
};

export default LeaderboardClans;