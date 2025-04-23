'use client';
import { useSelector } from 'react-redux';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import { useGetLeaderboardQuery } from '@/entities/Clan';
import { selectIsAuthenticated } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { getRouteLoginPage } from '@/shared/appLinks/RoutePaths';
import InfoWithLink from '../_components/InfoWithLink/InfoWithLink';

const LeaderboardFriends = () => {
    const { t } = useClientTranslation('leaderboard');
    const isAuthenticated = useSelector(selectIsAuthenticated);
    // this is a workaround to avoid passing undefined to the query
    const voidValue: void = undefined;
    const pointsLeaderboard = useGetLeaderboardQuery(voidValue, { skip: !isAuthenticated });
    const activityLeaderboard = useGetLeaderboardQuery(voidValue, { skip: !isAuthenticated });

    return isAuthenticated ? (
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
    ) : (
        <InfoWithLink
            text={t('friends_not_logged_in')}
            linkText={t('login')}
            linkPath={getRouteLoginPage()}
        />
    );
};

export default LeaderboardFriends;
