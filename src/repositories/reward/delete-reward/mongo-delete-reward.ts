import { ObjectId } from "mongodb";

import { IDeleteRewardRepository } from "../../../controllers/reward/delete-reward/protocols";
import { MongoClient } from "../../../database/mongo";
import { Reward } from "../../../models/reward";
import { MongoReward } from "../../mongo-protocols";

export class MongoDeleteRewardRepository implements IDeleteRewardRepository {
  async deleteReward(id: string): Promise<Reward> {
    const reward = await MongoClient.db
      .collection<MongoReward>("rewards")
      .findOne({ _id: new ObjectId(id) });

    if (!reward) {
      throw new Error("Reward not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("rewards")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Reward not deleted");
    }

    const { _id, ...rest } = reward;

    return { id: _id.toHexString(), ...rest };
  }
}
