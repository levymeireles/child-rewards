import { Task } from "../../../models/task";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { CreateTaskParams, ICreateTaskRepository } from "./protocols";

export class CreateTaskController implements IController {
  constructor(private readonly createTaskRepository: ICreateTaskRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateTaskParams>
  ): Promise<HttpResponse<Task | string>> {
    try {
      const requiredFields = ["name", "createdDate", "startDate", "endDate", "interval"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateTaskParams]) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const task = await this.createTaskRepository.createTask(
        httpRequest.body!
      );

      return created<Task>(task);
    } catch (error) {
      return serverError();
    }
  }
}
