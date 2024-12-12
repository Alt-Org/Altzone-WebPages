import { AuthUserSchema } from '@/entities/Auth';
import { ProfileSchema } from '@/entities/Profile/types/profile';
import { gameApi, strapiApi } from '@/shared/api';
import { NavBarSchema } from '@/widgets/Navbar';

export interface StateSchema {
    profile: ProfileSchema;
    authUser: AuthUserSchema;
    navbar: NavBarSchema;
    [gameApi.reducerPath]: ReturnType<typeof gameApi.reducer>;
    [strapiApi.reducerPath]: ReturnType<typeof strapiApi.reducer>;
}
