export type GetClansResponse = ResponseShapeArray<"Clan",IClan>;
export type GetClanResponse = ResponseShapeOne<"Clan", IClan>;

export type IClan = {
    _id: string,
    name: string,
    gameCoins: number,
    playerCount: number,
    furnitureCount: number,
    raidRoomCount: number,
    tag: string,
    admin_ids: string[],
};

export type IClanCreateDto = Pick<IClan, "name" | "tag" | "gameCoins">;

export type IClanUpdateDto = Pick<IClan, "_id" | "name" | "tag" | "gameCoins">;