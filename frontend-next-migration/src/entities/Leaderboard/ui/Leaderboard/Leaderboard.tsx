import { LeaderboardPodiums, LeaderboardCard } from '@/entities/Leaderboard';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './Leaderboard.module.scss';

interface LeaderboardProps {
    leaders: LeaderboardItem[];
    className?: string;
}

const Leaderboard = ({ leaders, className }: LeaderboardProps) => {
    return (
        <div className={className}>
            <LeaderboardPodiums
                leaders={leaders.splice(0, 3)}
                className={cls.LeaderboardPodiums}
            />
            {leaders.map((leader, index) => (
                <LeaderboardCard
                    key={index}
                    element={leader}
                    position={index + 4}
                />
            ))}
        </div>
    );
};

export default Leaderboard;
