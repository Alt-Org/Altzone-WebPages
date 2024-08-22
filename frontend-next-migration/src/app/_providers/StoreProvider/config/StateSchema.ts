import {authApi, AuthUserSchema} from "@/entities/Auth";
import {clanApi} from "@/entities/Clan";
import {galleryApi} from "@/entities/Gallery";
import {profileApi} from "@/entities/Profile";


export interface StateSchema {
    authUser: AuthUserSchema;
    [authApi.reducerPath]: ReturnType<typeof authApi.reducer>;
    [profileApi.reducerPath]: ReturnType<typeof profileApi.reducer>;
    [clanApi.reducerPath]: ReturnType<typeof clanApi.reducer>;
    [galleryApi.reducerPath]: ReturnType<typeof galleryApi.reducer>;
}

