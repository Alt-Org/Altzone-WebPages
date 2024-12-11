export type IProfile<Player> = {
    _id: string | null;
    username: string | null;
    Player: Player | null;
};

export type ProfileSchema = {
    profile?: IProfile<IPlayer>;
};

export type IUpdateProfileDto = {
    username: string;
    password: string;
};
