import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';

export type LeaderboardType = {
    title: string;
    leaders: LeaderboardItem[];
    path?: string;
};
