import { Reward } from "../../../models/reward";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateRewardRepository, UpdateRewardParams } from "./protocols";

export class UpdateRewardController implements IController {
  constructor(private readonly updateRewardsRepository: IUpdateRewardRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateRewardParams>
  ): Promise<HttpResponse<Reward | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing reward id");
      }

      const allowedFieldsToUpdate: (keyof UpdateRewardParams)[] = [
        "name",
        "percentNeeded",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateRewardParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const rewards = await this.updateRewardsRepository.updateReward(id, body);

      return ok<Reward>(rewards);
    } catch (error) {
      return serverError();
    }
  }
}
