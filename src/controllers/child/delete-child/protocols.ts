import { Child } from "../../../models/child";

export interface IDeleteChildRepository {
  deleteChild(id: string): Promise<Child>;
}
