import { ObjectId } from "mongodb";

import {
  IUpdateRewardRepository,
  UpdateRewardParams,
} from "../../../controllers/reward/update-reward/protocols";
import { MongoClient } from "../../../database/mongo";
import { Reward } from "../../../models/reward";
import { MongoReward } from "../../mongo-protocols";

export class MongoUpdateRewardRepository implements IUpdateRewardRepository {
  async updateReward(id: string, params: UpdateRewardParams): Promise<Reward> {
    await MongoClient.db.collection("rewards").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const reward = await MongoClient.db
      .collection<MongoReward>("rewards")
      .findOne({ _id: new ObjectId(id) });

    if (!reward) {
      throw new Error("Reward not updated");
    }

    const { _id, ...rest } = reward;

    return { id: _id.toHexString(), ...rest };
  }
}
