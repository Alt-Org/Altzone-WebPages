'use client';
import React from 'react';
import { SectionLeaderboard } from '@/widgets/SectionLeaderboard';
import { LeaderboardTitle } from '@/entities/Leaderboard';
import { IPlayer } from '@/entities/User';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import { useGetLeaderboardQuery } from '@/entities/Clan';

const LeaderboardAll = () => {
    return (
        <SectionLeaderboard
            leaderboards={[
                {
                    title: 'Voitot',
                    leaders: [
                        { name: '12kirjaintaa', points: 21 },
                        { name: 'Nimi Nimi', points: 12 },
                        { name: 'Nimi Nimi', points: 4 },
                        { name: 'Nimi Nimi', points: 1 },
                    ] as LeaderboardItem[],
                },
                {
                    title: 'Aktiivisuus',
                    leaders: [
                        { name: '12kirjaintaa', points: 21 },
                        { name: 'Nimi Nimi', points: 12 },
                        { name: 'Nimi Nimi', points: 4 },
                        { name: '12kirjaintaa', points: 1 },
                    ] as LeaderboardItem[],
                },
            ]}
        />
    );
};

export default LeaderboardAll;
