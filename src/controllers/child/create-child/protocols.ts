import { Child } from "../../../models/child";

export interface CreateChildParams {
  name: string;
  photo: string;
  id_user: string;
  points: Int32Array;
}

export interface ICreateChildRepository {
  createChild(params: CreateChildParams): Promise<Child>;
}
