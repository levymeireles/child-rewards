import { Child } from "../../../models/child";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteChildRepository } from "./protocols";

export class DeleteChildController implements IController {
  constructor(private readonly deleteChildRepository: IDeleteChildRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Child | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing child id");
      }

      const child = await this.deleteChildRepository.deleteChild(id);

      return ok<Child>(child);
    } catch (error) {
      return serverError();
    }
  }
}
