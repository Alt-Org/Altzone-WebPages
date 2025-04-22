'use client';
import React from 'react';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import { useGetLeaderboardQuery } from '@/entities/Clan';

const LeaderboardAll = () => {
    const pointsLeaderboard = useGetLeaderboardQuery();
    const activityLeaderboard = useGetLeaderboardQuery();
    return (
        <SectionLeaderboard
            leaderboard1={
                pointsLeaderboard.data?.data.Clan
                    ? {
                          title: 'Voitot',
                          leaders: pointsLeaderboard.data.data.Clan as LeaderboardItem[],
                      }
                    : undefined
            }
            leaderboard2={
                activityLeaderboard.data?.data.Clan
                    ? {
                          title: 'Aktiivisuus',
                          leaders: activityLeaderboard.data.data.Clan as LeaderboardItem[],
                      }
                    : undefined
            }
        />
    );
};

export default LeaderboardAll;
