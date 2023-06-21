import { Task } from "../../../models/task";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateTaskRepository, UpdateTaskParams } from "./protocols";

export class UpdateTaskController implements IController {
  constructor(private readonly updateTaskRepository: IUpdateTaskRepository) {}

  async handle(
    httpRequest: HttpRequest<UpdateTaskParams>
  ): Promise<HttpResponse<Task | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!id) {
        return badRequest("Missing task id");
      }

      const allowedFieldsToUpdate: (keyof UpdateTaskParams)[] = [
        "name",
        "createdDate",
        "startDate",
        "endDate",
        "interval",
        "done",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) => !allowedFieldsToUpdate.includes(key as keyof UpdateTaskParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const task = await this.updateTaskRepository.updateTask(id, body);

      return ok<Task>(task);
    } catch (error) {
      return serverError();
    }
  }
}
