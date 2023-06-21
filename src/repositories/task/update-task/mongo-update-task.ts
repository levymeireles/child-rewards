import { ObjectId } from "mongodb";

import {
  IUpdateTaskRepository,
  UpdateTaskParams,
} from "../../../controllers/task/update-task/protocols";
import { MongoClient } from "../../../database/mongo";
import { Task } from "../../../models/task";
import { MongoTask } from "../../mongo-protocols";

export class MongoUpdateTaskRepository implements IUpdateTaskRepository {
  async updateTask(id: string, params: UpdateTaskParams): Promise<Task> {
    await MongoClient.db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params,
        },
      }
    );

    const task = await MongoClient.db
      .collection<MongoTask>("tasks")
      .findOne({ _id: new ObjectId(id) });

    if (!task) {
      throw new Error("Task not updated");
    }

    const { _id, ...rest } = task;

    return { id: _id.toHexString(), ...rest };
  }
}
