import { Child } from "../../../models/child";

export interface IGetChildRepository {
  getChild(): Promise<Child[]>;
}
