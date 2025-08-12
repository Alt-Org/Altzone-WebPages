'use client';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import ClanPositionStatus from '@/widgets/SectionLeaderboard/ui/ClanPositionStatus/ClanPositionStatus';
import { useClientTranslation } from '@/shared/i18n';
import { useGetTopPlayersQuery, useGetTopClansQuery } from '@/shared/api/leaderboardApi';
import {
    LeaderboardPlayer,
    LeaderboardClan,
} from '@/entities/Leaderboard/types/leaderboardResponses';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';

const LeaderboardClans = () => {
    const { t } = useClientTranslation('leaderboard');

    const {
        data: playersData,
        isLoading: isLoadingPlayers,
        error: errorPlayers,
    } = useGetTopPlayersQuery();

    const { data: clansData, isLoading: isLoadingClans, error: errorClans } = useGetTopClansQuery();

    const playerLeaders: LeaderboardPlayer[] = playersData?.data?.Player ?? [];
    const clanLeaders: LeaderboardClan[] = clansData?.data?.Clan ?? [];

    if (isLoadingPlayers || isLoadingClans) {
        return <div>{t('loading')}</div>;
    }

    if (errorPlayers || errorClans) {
        return <div>{t('error_loading_leaderboards')}</div>;
    }

    return (
        <div style={{ paddingBottom: '40px' }}>
            <ClanPositionStatus />

            <SectionLeaderboard
                leaderboard1={
                    playerLeaders.length > 0
                        ? {
                              title: t('top_players'),
                              leaders: playerLeaders as LeaderboardItem[],
                              path: '/players',
                          }
                        : undefined
                }
                leaderboard2={
                    clanLeaders.length > 0
                        ? {
                              title: t('top_clans'),
                              leaders: clanLeaders as LeaderboardItem[],
                              path: '/clans',
                          }
                        : undefined
                }
            />
        </div>
    );
};

export default LeaderboardClans;
