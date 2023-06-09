import { User } from "../models/user";
import { Child } from "../models/child";
import { Task } from "../models/task";
import { Reward } from "../models/reward";

export type MongoUser = Omit<User, "id">;
export type MongoChild = Omit<Child, "id">;
export type MongoTask = Omit<Task, "id">;
export type MongoReward = Omit<Reward, "id">;
