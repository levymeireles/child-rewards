import {
  CreateChildParams,
  ICreateChildRepository,
} from "../../../controllers/child/create-child/protocols";
import { MongoClient } from "../../../database/mongo";
import { Child } from "../../../models/child";
import { MongoChild } from "../../mongo-protocols";

export class MongoCreateChildRepository implements ICreateChildRepository {
  async createChild(params: CreateChildParams): Promise<Child> {
    const { insertedId } = await MongoClient.db
      .collection("childs")
      .insertOne(params);

    const child = await MongoClient.db
      .collection<MongoChild>("childs")
      .findOne({ _id: insertedId });

    if (!child) {
      throw new Error("Child not created");
    }

    const { _id, ...rest } = child;

    return { id: _id.toHexString(), ...rest };
  }
}
