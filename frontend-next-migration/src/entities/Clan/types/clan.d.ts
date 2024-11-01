export type GetClansResponse = ResponseShapeArray<'Clan', IClan>;
export type GetClanResponse = ResponseShapeOne<'Clan', IClan>;

export type IClan = {
    _id: string;
    name: string;
    playerCount: number;
    stockCount: number;
    itemCount: number;
    tag: string;
    phrase: string;
    labels: ClanLabel[];
    admin_ids: string[];
    Player: Array[];
    isOpen: boolean;
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
    join_message: string;
};

export type IClanCreateDto = Pick<IClan, 'name' | 'tag' | 'phrase' | 'labels' | 'isOpen'>;

export type IClanUpdateDto = Pick<IClan, '_id' | 'name' | 'tag' | 'phrase' | 'labels' | 'isOpen'>;

export type IJoinDto = Pick<IJoin, 'clan_id' | 'player_id' | 'join_message'>;
