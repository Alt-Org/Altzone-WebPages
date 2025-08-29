import { memo } from 'react';
import { LeaderboardPodiums, LeaderboardCard } from '@/entities/Leaderboard';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './Leaderboard.module.scss';

interface LeaderboardProps {
    leaders: LeaderboardItem[];
    path?: string;
    className?: string;
}

const Leaderboard = memo(({ leaders, path, className }: LeaderboardProps) => {
    return (
        // Added a new wrapper div to handle centering.
        // It applies styles from Leaderboard.module.scss to center the entire leaderboard section.
        <div className={cls.leaderboardWrapper}>
            {/* The original container div for the leaderboard content. */}
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
        </div>
    );
});
Leaderboard.displayName = 'Leaderboard';

export default Leaderboard;