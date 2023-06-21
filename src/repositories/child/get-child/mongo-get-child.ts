import { IGetChildRepository } from "../../../controllers/child/get-child/protocols";
import { MongoClient } from "../../../database/mongo";
import { Child } from "../../../models/child";
import { MongoChild } from "../../mongo-protocols";

export class MongoGetChildRepository implements IGetChildRepository {
  async getChild(): Promise<Child[]> {
    const childs = await MongoClient.db
      .collection<MongoChild>("childs")
      .find({})
      .toArray();

    return childs.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
