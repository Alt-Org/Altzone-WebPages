import React from 'react';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { IPlayer } from '@/entities/User';

const LeaderboardAll = () => {
    return (
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <div style={{ width: '100%' }}>
                <SectionLeaderboard
                    leaders={
                        [
                            { name: 'aaaaaaaaaaaa', points: 21 },
                            { name: 'a', points: 12 },
                            { name: 'a', points: 4 },
                            { name: 'pelaaja', points: 1 },
                        ] as IPlayer[]
                    }
                />
            </div>

            <div style={{ width: '100%' }}>
                <SectionLeaderboard
                    leaders={
                        [
                            { name: 'aaaaaaaaaaaaaaa', points: 8321 },
                            { name: 'aaaaaaaaaaaaaaa', points: 8212 },
                            { name: 'aaaaaaaaaaaaaaa', points: 8204 },
                            { name: 'pelaajaaaaaaaaa', points: 8156 },
                        ] as IPlayer[]
                    }
                />
            </div>
        </div>
    );
};

export default LeaderboardAll;
