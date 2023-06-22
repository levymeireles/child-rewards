import { Child } from "../../../models/child";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreateChildParams, ICreateChildRepository } from "./protocols";

export class CreateChildController implements IController {
  constructor(private readonly createChildRepository: ICreateChildRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateChildParams>
  ): Promise<HttpResponse<Child | string>> {
    try {
      const requiredFields = ["name", "photo", "points", "id_user"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateChildParams]) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const child = await this.createChildRepository.createChild(
        httpRequest.body!
      );

      return created<Child>(child);
    } catch (error) {
      return serverError();
    }
  }
}
