import { User } from "./user.model";

export interface UserWithToken {
  user: User;
  access_token: string;
  expiresIn: number;
}
