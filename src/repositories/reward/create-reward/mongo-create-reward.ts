import {
  CreateRewardParams,
  ICreateRewardRepository,
} from "../../../controllers/reward/create-reward/protocols";
import { MongoClient } from "../../../database/mongo";
import { Reward } from "../../../models/reward";
import { MongoReward } from "../../mongo-protocols";

export class MongoCreateRewardRepository implements ICreateRewardRepository {
  async createReward(params: CreateRewardParams): Promise<Reward> {
    const { insertedId } = await MongoClient.db
      .collection("rewards")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoReward>("rewards")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("Reward not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
