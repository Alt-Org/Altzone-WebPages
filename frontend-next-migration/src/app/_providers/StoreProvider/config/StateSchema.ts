import { AuthUserSchema } from '@/entities/Auth';
import { gameApi } from '@/shared/api';
import { teamApi } from '@/entities/Member/api/membersApi';

export interface StateSchema {
  authUser: AuthUserSchema;
  [gameApi.reducerPath]: ReturnType<typeof gameApi.reducer>;
  [teamApi.reducerPath]: ReturnType<typeof teamApi.reducer>;
}
