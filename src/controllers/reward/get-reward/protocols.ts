import { Reward } from "../../../models/reward";

export interface IGetRewardRepository {
  getReward(): Promise<Reward[]>;
}
