import { User } from "../../../models/user";

export interface UpdateUserParams {
  name?: string;
  photo?: string;
  password?: string;
}

export interface IUpdateUserRepository {
  updateUser(id: string, params: UpdateUserParams): Promise<User>;
}
