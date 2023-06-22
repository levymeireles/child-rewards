import { Reward } from "../../../models/reward";

export interface UpdateRewardParams {
  name?: string;
  percentNeeded?: number;
}

export interface IUpdateRewardRepository {
  updateReward(id: string, params: UpdateRewardParams): Promise<Reward>;
}
