import React from 'react';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { LeaderboardTitle } from '@/entities/Leaderboard';
import { IPlayer } from '@/entities/User';

const LeaderboardAll = () => {
    return (
        <SectionLeaderboard
            leaderboards={[
                {
                    title: 'Voitot',
                    leaders: [
                        { name: 'aaaaaaaaaaaa', points: 21 },
                        { name: 'a', points: 12 },
                        { name: 'a', points: 4 },
                        { name: 'pelaaja', points: 1 },
                    ] as IPlayer[],
                },
                {
                    title: 'Aktiivisuus',
                    leaders: [
                        { name: 'aaaaaaaaaaaa', points: 21 },
                        { name: 'a', points: 12 },
                        { name: 'a', points: 4 },
                        { name: 'pelaaja', points: 1 },
                    ] as IPlayer[],
                },
            ]}
        />
    );
};

export default LeaderboardAll;
