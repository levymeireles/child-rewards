import { User } from "../../../models/user";

export interface CreateUserParams {
  name: string;
  email: string;
  photo: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
