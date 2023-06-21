import { IGetTaskRepository } from "../../../controllers/task/get-task/protocols";
import { MongoClient } from "../../../database/mongo";
import { Task } from "../../../models/task";
import { MongoTask } from "../../mongo-protocols";

export class MongoGetTaskRepository implements IGetTaskRepository {
  async getTask(): Promise<Task[]> {
    const tasks = await MongoClient.db
      .collection<MongoTask>("tasks")
      .find({})
      .toArray();

    return tasks.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
