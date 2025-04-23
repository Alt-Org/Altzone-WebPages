import { memo } from 'react';
import { LeaderboardPodiums, LeaderboardCard } from '@/entities/Leaderboard';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './Leaderboard.module.scss';

interface LeaderboardProps {
    leaders: LeaderboardItem[];
    className?: string;
}

const Leaderboard = memo(({ leaders, className }: LeaderboardProps) => {
    return (
        <div className={className}>
            <LeaderboardPodiums
                leaders={leaders.slice(0, 3)}
                className={cls.LeaderboardPodiums}
            />
            {leaders.slice(3).map((leader, index) => (
                <LeaderboardCard
                    key={index}
                    element={leader}
                    position={index + 4}
                    className={cls.LeaderboardCard}
                />
            ))}
        </div>
    );
});
Leaderboard.displayName = 'Leaderboard';

export default Leaderboard;
