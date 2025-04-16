import { Leaderboard, LeaderboardTitle } from '@/entities/Leaderboard';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import { LeaderboardType } from '../types';

interface SectionLeaderboardProps {
    leaderboards: LeaderboardType[];
    className?: string;
}

const SectionLeaderboard = ({ leaderboards, className }: SectionLeaderboardProps) => {
    // return
    return (
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            {leaderboards.map((leaderboard, index) => (
                <div
                    key={index}
                    style={{ width: '100%' }}
                >
                    <LeaderboardTitle title={leaderboard.title} />
                    <Leaderboard leaders={leaderboard.leaders} />
                </div>
            ))}
        </div>
    );
};

export default SectionLeaderboard;
