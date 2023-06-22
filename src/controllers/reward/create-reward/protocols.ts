import { Reward } from "../../../models/reward";

export interface CreateRewardParams {
  name: string;
  email: string;
  photo: string;
  password: string;
}

export interface ICreateRewardRepository {
  createReward(params: CreateRewardParams): Promise<Reward>;
}
