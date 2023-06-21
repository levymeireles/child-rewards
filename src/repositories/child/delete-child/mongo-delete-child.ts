import { ObjectId } from "mongodb";

import { IDeleteChildRepository } from "../../../controllers/child/delete-child/protocols";
import { MongoClient } from "../../../database/mongo";
import { Child } from "../../../models/child";
import { MongoChild } from "../../mongo-protocols";

export class MongoDeleteChildRepository implements IDeleteChildRepository {
  async deleteChild(id: string): Promise<Child> {
    const child = await MongoClient.db
      .collection<MongoChild>("childs")
      .findOne({ _id: new ObjectId(id) });

    if (!child) {
      throw new Error("Child not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("childs")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Child not deleted");
    }

    const { _id, ...rest } = child;

    return { id: _id.toHexString(), ...rest };
  }
}
