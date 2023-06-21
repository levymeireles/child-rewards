import { Task } from "../../../models/task";

export interface IGetTaskRepository {
  getTask(): Promise<Task[]>;
}
