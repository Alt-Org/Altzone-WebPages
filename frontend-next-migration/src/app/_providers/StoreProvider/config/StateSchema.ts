import { AuthUserSchema } from '@/entities/Auth';
import { ProfileSchema } from '@/entities/Profile/types/profile';
import { gameApi, strapiApi } from '@/shared/api';

export interface StateSchema {
    profile: ProfileSchema;
    authUser: AuthUserSchema;
    [gameApi.reducerPath]: ReturnType<typeof gameApi.reducer>;
    [strapiApi.reducerPath]: ReturnType<typeof strapiApi.reducer>;
}
