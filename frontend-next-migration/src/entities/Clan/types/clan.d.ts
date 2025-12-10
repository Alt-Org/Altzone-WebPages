export type GetClansResponse = ResponseShapeArray<'Clan', IClan>;
export type GetClanResponse = ResponseShapeOne<'Clan', IClan>;
export type GetClanPositionResponse = ResponseShapeOne<'Object', IClanPosition>;

export type IClan = {
    _id: string;
    name: string;
    gameCoins: number;
    playerCount: number;
    stockCount: number;
    itemCount: number;
    tag: string;
    admin_ids: string[];
    Player: Array[];
    isOpen: boolean;
    phrase: string;
    labels: Array[];
    positionLeaderboard?: number;

    IClanRole: Array[];
    goal: string;
    clanLogo: string;
    battlePoints: number;
    language: string;
    points: number;
    ageRange: string;
};

export type IClanRole = {
    _id: string;
    name: string;
    clanRoleType: string;
};

export type IClanPosition = {
    position: number;
};

export type ICreateClanResponse = {
    data: {
        Clan: IClan;
    };
    metaData: {
        dataKey: string;
        modelName: string;
        dataType: string;
        dataCount: number;
    };
};

export type IJoin = {
    clan_id: string;
    player_id: string;
};

export type IClanCreateDto = Pick<IClan, 'name' | 'tag' | 'phrase' | 'labels' | 'isOpen'>;

export type IClanUpdateDto = Pick<IClan, '_id' | 'name' | 'tag' | 'phrase' | 'labels' | 'isOpen'>;

export type IJoinDto = Pick<IJoin, 'clan_id' | 'player_id'>;

export type IClanRoleDto = Pick<IClanRole, '_id' | 'name' | 'clanRoleType'>;
