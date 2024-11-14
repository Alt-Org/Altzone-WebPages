import { AuthUserSchema } from '@/entities/Auth';
import { gameApi, strapiApi } from '@/shared/api';
import { NavBarSchema } from '@/widgets/Navbar';

export interface StateSchema {
    authUser: AuthUserSchema;
    navbar: NavBarSchema;
    [gameApi.reducerPath]: ReturnType<typeof gameApi.reducer>;
    [strapiApi.reducerPath]: ReturnType<typeof strapiApi.reducer>;
}
