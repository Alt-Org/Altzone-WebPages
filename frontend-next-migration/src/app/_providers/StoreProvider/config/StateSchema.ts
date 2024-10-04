import {AuthUserSchema} from "@/entities/Auth";
import {gameApi} from "@/shared/api";

export interface StateSchema {
    authUser: AuthUserSchema;
    [gameApi.reducerPath]: ReturnType<typeof gameApi.reducer>;
    // todo add here strapiApi
}

