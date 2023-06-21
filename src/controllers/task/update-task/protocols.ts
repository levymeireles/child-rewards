import { Task } from "../../../models/task";

export interface UpdateTaskParams {
  name?: string;
  createdDate?: Date;
  startDate?: Date;
  endDate?: Date;
  interval?: Int32Array,
  done?: boolean;
}

export interface IUpdateTaskRepository {
  updateTask(id: string, params: UpdateTaskParams): Promise<Task>;
}
