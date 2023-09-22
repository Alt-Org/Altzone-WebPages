import {authApi, AuthUserSchema} from "@/entities/Auth";


export interface StateSchema {
    authUser: AuthUserSchema;
    [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
    // [devicesApi.reducerPath]: ReturnType<typeof devicesApi.reducer>;
    // [usersApi.reducerPath]: ReturnType<typeof usersApi.reducer>;
    // [deviceViewsApi.reducerPath]: ReturnType<typeof deviceViewsApi.reducer>;

}

