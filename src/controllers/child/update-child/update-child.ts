import { Child } from "../../../models/child";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateChildRepository, UpdateChildParams } from "./protocols";

export class UpdateChildController implements IController {
  constructor(private readonly updateChildRepository: IUpdateChildRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateChildParams>
  ): Promise<HttpResponse<Child | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing user id");
      }

      const allowedFieldsToUpdate: (keyof UpdateChildParams)[] = [
        "name",
        "photo",
        "points",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateChildParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const child = await this.updateChildRepository.updateChild(id, body);

      return ok<Child>(child);
    } catch (error) {
      return serverError();
    }
  }
}
