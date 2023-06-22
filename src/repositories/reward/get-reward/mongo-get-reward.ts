import { IGetRewardRepository } from "../../../controllers/reward/get-reward/protocols";
import { MongoClient } from "../../../database/mongo";
import { Reward } from "../../../models/reward";
import { MongoReward } from "../../mongo-protocols";

export class MongoGetRewardRepository implements IGetRewardRepository {
  async getReward(): Promise<Reward[]> {
    const reward = await MongoClient.db
      .collection<MongoReward>("rewards")
      .find({})
      .toArray();

    return reward.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
