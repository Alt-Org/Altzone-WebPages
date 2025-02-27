export type IProfile<Player> = {
    _id: string | null;
    username: string | null;
    Player: Player | null;
};

export type ProfileSchema = {
    Profile?: IProfile<IPlayer>;
};

export type IUpdateProfileDto = {
    username: string;
    password: string;
};

export type IGetProfileInfoResponse = {
    data?: ProfileSchema;
};
