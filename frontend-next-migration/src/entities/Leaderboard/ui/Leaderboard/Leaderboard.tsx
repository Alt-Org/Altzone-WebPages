import { memo } from 'react';
import LeaderboardPodiums from '../LeaderboardPodiums/LeaderboardPodiums';
import LeaderboardCard from '../LeaderboardCard/LeaderboardCard';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './Leaderboard.module.scss';

interface LeaderboardProps {
    leaders: LeaderboardItem[];
    path?: string;
    className?: string;
}

const Leaderboard = memo(({ leaders, path, className }: LeaderboardProps) => {
    return (
        <div className={className}>
            <LeaderboardPodiums
                leaders={leaders.slice(0, 3)}
                path={path}
                className={cls.LeaderboardPodiums}
            />
            {leaders.slice(3).map((leader, index) => (
                <LeaderboardCard
                    key={index}
                    path={path}
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
