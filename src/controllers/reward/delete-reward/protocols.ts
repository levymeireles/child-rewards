import { Reward } from "../../../models/reward";

export interface IDeleteRewardRepository {
  deleteReward(id: string): Promise<Reward>;
}
