import { IPlayer } from '@/entities/User';
import { IProfile } from '@/entities/Profile';

export type IPlayerRegisterPartDto = Pick<
    IPlayer,
    'name' | 'backpackCapacity' | 'uniqueIdentifier' | 'above13'
>;

export type IUserRegisterDto = Pick<IProfile<IPlayer>, 'username'> & {
    password: string;
    repeatPassword: string;
    Player: IPlayerRegisterPartDto;
};

export type IUserLoginDto = Pick<IProfile<IPlayer>, 'username'> & { password: string };

export type ILoginResponse = IProfile<IPlayer> & {
    accessToken: string;
};

export type AccessTokenInfoResponse = {
    accessToken: string;
    accessTokenExpiresInSecIn: number;
};

type AccessTokenInfo = {
    accessToken: string;
    accessTokenExpiresAt: number;
};

export type AuthUserSchema = {
    accessTokenInfo?: AccessTokenInfo;
    isSessionExpired: boolean;
};
