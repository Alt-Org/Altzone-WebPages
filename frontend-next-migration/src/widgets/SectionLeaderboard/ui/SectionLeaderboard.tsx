import React from 'react';
import { IPlayer } from '@/entities/User';
import { LeaderboardPodiums } from '@/entities/Leaderboard';

interface SectionLeaderboardProps {
    leaders: IPlayer[];
    className?: string;
}

const SectionLeaderboard = ({ leaders, className }: SectionLeaderboardProps) => {
    return (
        <div>
            <LeaderboardPodiums leaders={leaders.splice(0, 3)} />
        </div>
    );
};

export default SectionLeaderboard;
