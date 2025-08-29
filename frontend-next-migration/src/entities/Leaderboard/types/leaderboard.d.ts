export type LeaderboardItem = IPlayer | IClan;

export interface PlayerLeaderboardResponse {
  rank: number;
  name: string;
  score: number;
}

export interface ClanLeaderboardResponse {
  rank: number;
  clanName: string;
  score: number;
}

export interface ClanPositionResponse {
  rank: number;
  clanName: string;
  score: number;
}