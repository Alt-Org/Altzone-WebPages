import { IPlayer } from "@/entities/User";
import { IProfile } from "@/entities/Profile";

export type IPlayerRegisterPartDto = Pick<IPlayer, "name" | "backpackCapacity" | "uniqueIdentifier" | "above13">

export type IUserRegisterDto = Pick<IProfile, 'username'> & {
    password: string,
    repeatPassword: string,
    Player: IPlayerRegisterPartDto
};

export type IUserLoginDto = Pick<IProfile, 'username'> & { password: string };

export type ILoginResponse = & IProfile & {
    accessToken: string
}

export type AccessTokenInfoResponse = {
    accessToken: string,
    accessTokenExpiresInSecIn: number
}

type AccessTokenInfo = {
    accessToken: string,
    accessTokenExpiresAt: number
}

export type AuthUserSchema = {
    profile?: IProfile,
    accessTokenInfo?: AccessTokenInfo
    isSessionExpired: boolean
}
