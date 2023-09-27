export type IClan = {
    _id: string,
    name: string,
    gameCoins: number,
    tag: string
};

export type IClanCreateDto = Pick<IClan, "name" | "tag" | "gameCoins">;

export type IClanUpdateDto = Pick<IClan, "_id" | "name" | "tag" | "gameCoins">;