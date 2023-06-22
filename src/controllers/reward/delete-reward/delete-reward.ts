import { Reward } from "../../../models/reward";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteRewardRepository } from "./protocols";

export class DeleteRewardController implements IController {
  constructor(private readonly deleteRewardsRepository: IDeleteRewardRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Reward | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing reward id");
      }

      const reward = await this.deleteRewardsRepository.deleteReward(id);

      return ok<Reward>(reward);
    } catch (error) {
      return serverError();
    }
  }
}
