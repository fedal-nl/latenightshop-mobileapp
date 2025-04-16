import { UserType } from './user';

export type AuthStoreType = {
    user: UserType | null;
    token: string | null;
    isLoggedIn: boolean;
  };
  