
// LeaderboardAll.tsx
// Updated to use new API hooks for fetching leaderboard data (players & clans)
// Handles loading and empty states, and passes data to SectionLeaderboard
'use client';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import { useGetTopPlayersQuery, useGetTopClansQuery } from '@/shared/api/leaderboardApi';
import { useClientTranslation } from '@/shared/i18n';

const LeaderboardAll = () => {

    const { t } = useClientTranslation('leaderboard');
    // Fetch top players and clans using RTK Query hooks
    const { data: playerData = [], isLoading: isLoadingPlayers } = useGetTopPlayersQuery(undefined) as { data: any[], isLoading: boolean };
    const { data: clanData = [], isLoading: isLoadingClans } = useGetTopClansQuery(undefined) as { data: any[], isLoading: boolean };

    // Debug output for development
    console.log('Players:', playerData, 'Clans:', clanData);



    // Show loading or empty state as needed
    if (isLoadingPlayers || isLoadingClans) {
        return <div>Loading leaderboard...</div>;
    }

    if ((!playerData || playerData.length === 0) && (!clanData || clanData.length === 0)) {
        return <div>No leaderboard data available.</div>;
    }


    // Pass fetched data to SectionLeaderboard for display
    return (
        <SectionLeaderboard
            leaderboard1={
                playerData && playerData.length > 0
                    ? {
                          title: t('wins'),
                          leaders: playerData,
                          path: '/clans',
                      }
                    : undefined
            }
            leaderboard2={
                clanData && clanData.length > 0
                    ? {
                          title: t('activity'),
                          leaders: clanData,
                          path: '/clans',
                      }
                    : undefined
            }
        />
    );
};

export default LeaderboardAll;
