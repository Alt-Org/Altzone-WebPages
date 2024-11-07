export type IProfile<Player> = {
    _id: '650d422567e23912f940abe0' | null;
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
