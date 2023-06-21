import { ObjectId } from "mongodb";

import {
  IUpdateChildRepository,
  UpdateChildParams,
} from "../../../controllers/child/update-child/protocols";
import { MongoClient } from "../../../database/mongo";
import { Child } from "../../../models/child";
import { MongoChild } from "../../mongo-protocols";

export class MongoUpdateChildRepository implements IUpdateChildRepository {
  async updateChild(id: string, params: UpdateChildParams): Promise<Child> {
    await MongoClient.db.collection("childs").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const child = await MongoClient.db
      .collection<MongoChild>("childs")
      .findOne({ _id: new ObjectId(id) });

    if (!child) {
      throw new Error("Child not updated");
    }

    const { _id, ...rest } = child;

    return { id: _id.toHexString(), ...rest };
  }
}
