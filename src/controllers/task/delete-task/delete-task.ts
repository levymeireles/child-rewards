import { Task } from "../../../models/task";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteTaskRepository } from "./protocols";

export class DeleteTaskController implements IController {
  constructor(private readonly deleteTaskRepository: IDeleteTaskRepository) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<Task | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) {
        return badRequest("Missing task id");
      }

      const task = await this.deleteTaskRepository.deleteTask(id);

      return ok<Task>(task);
    } catch (error) {
      return serverError();
    }
  }
}
