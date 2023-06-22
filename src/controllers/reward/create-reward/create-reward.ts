
import { Reward } from "../../../models/reward";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreateRewardParams, ICreateRewardRepository } from "./protocols";

export class CreateRewardController implements IController {
  constructor(private readonly createRewardsRepository: ICreateRewardRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateRewardParams>
  ): Promise<HttpResponse<Reward | string>> {
    try {
      const requiredFields = [ "name", "percentNeeded"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateRewardParams]) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const reward = await this.createRewardsRepository.createReward(
        httpRequest.body!
      );

      return created<Reward>(reward);
    } catch (error) {
      return serverError();
    }
  }
}
