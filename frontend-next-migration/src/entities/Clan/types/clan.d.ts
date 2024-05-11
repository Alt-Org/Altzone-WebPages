export type GetClansResponse = ResponseShapeArray<"Clan", IClan>;
export type GetClanResponse = ResponseShapeOne<"Clan", IClan>;

export type IClan = {
    _id: string,
    name: string,
    gameCoins: number,
    playerCount: number,
    stockCount: number,
    itemCount: number,
    tag: string,
    admin_ids: string[],
    Player: Array[],
    isOpen: boolean,
};

export type IClanCreateDto = Pick<IClan, "name" | "tag" | "gameCoins" | "isOpen">;

export type IClanUpdateDto = Pick<IClan, "_id" | "name" | "tag" | "gameCoins" | "isOpen">;