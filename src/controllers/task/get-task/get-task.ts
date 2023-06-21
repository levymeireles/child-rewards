import { Task } from "../../../models/task";
import { ok, serverError } from "../../helpers";
import { HttpResponse, IController } from "../../protocols";
import { IGetTaskRepository } from "./protocols";

export class GetTaskController implements IController {
  constructor(private readonly getTaskRepository: IGetTaskRepository) {}

  async handle(): Promise<HttpResponse<Task[] | string>> {
    try {
      const task = await this.getTaskRepository.getTask();

      return ok<Task[]>(task);
    } catch (error) {
      return serverError();
    }
  }
}
