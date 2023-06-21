import { Child } from "../../../models/child";

export interface UpdateChildParams {
  name?: string;
  photo?: string;
  points?: Int32Array;
}

export interface IUpdateChildRepository {
  updateChild(id: string, params: UpdateChildParams): Promise<Child>;
}
