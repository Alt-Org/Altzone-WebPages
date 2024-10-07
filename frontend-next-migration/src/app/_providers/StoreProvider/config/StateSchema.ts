import { AuthUserSchema } from '@/entities/Auth';
import {gameApi, strapiApi} from '@/shared/api';

export interface StateSchema {
  authUser: AuthUserSchema;
  [gameApi.reducerPath]: ReturnType<typeof gameApi.reducer>;
  [strapiApi.reducerPath]: ReturnType<typeof strapiApi.reducer>;
}
