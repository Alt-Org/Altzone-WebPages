import React from 'react';
import { IPlayer } from '@/entities/User';
import { LeaderboardPodiums, LeaderboardCard } from '@/entities/Leaderboard';

interface SectionLeaderboardProps {
    leaders: IPlayer[];
    className?: string;
}

const SectionLeaderboard = ({ leaders, className }: SectionLeaderboardProps) => {
    return (
        <div>
            <LeaderboardPodiums leaders={leaders.splice(0, 3)} />
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

export default SectionLeaderboard;
