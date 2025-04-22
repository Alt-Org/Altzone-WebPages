'use client';
import React from 'react';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import { useGetLeaderboardQuery } from '@/entities/Clan';
import { useClientTranslation } from '@/shared/i18n';

const LeaderboardAll = () => {
    const { t } = useClientTranslation('leaderboard');
    const pointsLeaderboard = useGetLeaderboardQuery();
    const activityLeaderboard = useGetLeaderboardQuery();

    return (
        <SectionLeaderboard
            leaderboard1={
                pointsLeaderboard.data?.data.Clan
                    ? {
                          title: t('wins'),
                          leaders: pointsLeaderboard.data.data.Clan as LeaderboardItem[],
                      }
                    : undefined
            }
            leaderboard2={
                activityLeaderboard.data?.data.Clan
                    ? {
                          title: t('activity'),
                          leaders: activityLeaderboard.data.data.Clan as LeaderboardItem[],
                      }
                    : undefined
            }
        />
    );
};

export default LeaderboardAll;
