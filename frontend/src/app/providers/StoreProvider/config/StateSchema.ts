import {authApi, AuthUserSchema} from "@/entities/Auth";
import {clanApi} from "@/entities/Clan";


export interface StateSchema {
    authUser: AuthUserSchema;
    [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
    [clanApi.reducerPath]: ReturnType<typeof clanApi.reducer>;


}

