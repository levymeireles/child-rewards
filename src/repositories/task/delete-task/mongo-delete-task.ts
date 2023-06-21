import { ObjectId } from "mongodb";

import { IDeleteTaskRepository } from "../../../controllers/task/delete-task/protocols";
import { MongoClient } from "../../../database/mongo";
import { Task } from "../../../models/task";
import { MongoTask } from "../../mongo-protocols";

export class MongoDeleteTaskRepository implements IDeleteTaskRepository {
  async deleteTask(id: string): Promise<Task> {
    const task = await MongoClient.db
      .collection<MongoTask>("tasks")
      .findOne({ _id: new ObjectId(id) });

    if (!task) {
      throw new Error("Task not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Child not deleted");
    }

    const { _id, ...rest } = task;

    return { id: _id.toHexString(), ...rest };
  }
}
