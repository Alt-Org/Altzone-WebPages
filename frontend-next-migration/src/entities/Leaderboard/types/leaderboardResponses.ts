export interface ClanLogo {
    logoType: string;
    pieceColors: string[];
}

export interface PlayerClan {
    _id: string;
    name: string;
    tag: string;
    clanLogo?: ClanLogo;
    points: number;
}

export interface LeaderboardPlayer {
    _id: string;
    name: string;
    points: number;
    Clan?: PlayerClan;
}

export interface PlayerLeaderboardResponse {
    data: {
        Player: LeaderboardPlayer[];
    };
    metaData: {
        dataKey: string;
        modelName: string;
        dataType: string;
        dataCount: number;
    };
    paginationData: {
        currentPage: number;
        limit: number;
        offset: number;
        itemCount: number;
        pageCount: number;
    };
}

export interface LeaderboardClan {
    _id: string;
    name: string;
    tag: string;
    points: number;
    playerCount: number;
    phrase?: string;
    clanLogo?: ClanLogo;
}

export interface ClanLeaderboardResponse {
    data: {
        Clan: LeaderboardClan[];
    };
    metaData: {
        dataKey: string;
        modelName: string;
        dataType: string;
        dataCount: number;
    };
    paginationData: {
        currentPage: number;
        limit: number;
        offset: number;
        itemCount: number;
        pageCount: number;
    };
}

export interface ClanPositionResponse {
    data: {
        Object: {
            position: number;
        };
    };
    metaData: {
        dataKey: string;
        modelName: string;
        dataType: string;
        dataCount: number;
    };
}
