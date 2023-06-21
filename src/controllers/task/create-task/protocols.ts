import { Task } from "../../../models/task";

export interface CreateTaskParams {
  name: string;
  createdDate: Date;
  startDate: Date;
  endDate: Date;
  interval: Int32Array,
  done: boolean;
}

export interface ICreateTaskRepository {
  createTask(params: CreateTaskParams): Promise<Task>;
}
