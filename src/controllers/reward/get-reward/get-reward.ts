import { Reward } from "../../../models/reward";
import { ok, serverError } from "../../helpers";
import { HttpResponse, IController } from "../../protocols";
import { IGetRewardRepository } from "./protocols";

export class GetRewardController implements IController {
  constructor(private readonly getRewardsRepository: IGetRewardRepository) {}

  async handle(): Promise<HttpResponse<Reward[] | string>> {
    try {
      const rewards = await this.getRewardsRepository.getReward();

      return ok<Reward[]>(rewards);
    } catch (error) {
      return serverError();
    }
  }
}
