import { Child } from "../../../models/child";
import { ok, serverError } from "../../helpers";
import { HttpResponse, IController } from "../../protocols";
import { IGetChildRepository } from "./protocols";

export class GetChildController implements IController {
  constructor(private readonly getChildRepository: IGetChildRepository) {}

  async handle(): Promise<HttpResponse<Child[] | string>> {
    try {
      const child = await this.getChildRepository.getChild();

      return ok<Child[]>(child);
    } catch (error) {
      return serverError();
    }
  }
}
