import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";

import { GetUsersController } from "./controllers/users/get-users/get-users";
import { MongoGetUsersRepository } from "./repositories/users/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "./repositories/users/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/users/create-user/create-user";
import { MongoUpdateUserRepository } from "./repositories/users/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/users/update-user/update-user";
import { MongoDeleteUserRepository } from "./repositories/users/delete-user/mongo-delete-user";
import { DeleteUserController } from "./controllers/users/delete-user/delete-user";

import { GetChildController } from "./controllers/child/get-child/get-child";
import { MongoGetChildRepository } from "./repositories/child/get-child/mongo-get-child";
import { MongoCreateChildRepository } from "./repositories/child/create-child/mongo-create-child";
import { CreateChildController } from "./controllers/child/create-child/create-child";
import { MongoUpdateChildRepository } from "./repositories/child/update-child/mongo-update-child";
import { UpdateChildController } from "./controllers/child/update-child/update-child";
import { MongoDeleteChildRepository } from "./repositories/child/delete-child/mongo-delete-child";
import { DeleteChildController } from "./controllers/child/delete-child/delete-child";

import { GetTaskController } from "./controllers/task/get-task/get-task";
import { MongoGetTaskRepository } from "./repositories/task/get-task/mongo-get-task";
import { MongoCreateTaskRepository } from "./repositories/task/create-task/mongo-create-task";
import { CreateTaskController } from "./controllers/task/create-task/create-task";
import { MongoUpdateTaskRepository } from "./repositories/task/update-task/mongo-update-task";
import { UpdateTaskController } from "./controllers/task/update-task/update-task";
import { MongoDeleteTaskRepository } from "./repositories/task/delete-task/mongo-delete-task";
import { DeleteTaskController } from "./controllers/task/delete-task/delete-task";


const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  //USERS ROUTES
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();

    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();

    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository
    );

    const { body, statusCode } = await deleteUserController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  // CHILDS ROUTES
  app.get("/childs", async (req, res) => {
    const mongoGetChildRepository = new MongoGetChildRepository();

    const getChildController = new GetChildController(mongoGetChildRepository);

    const { body, statusCode } = await getChildController.handle();

    res.status(statusCode).send(body);
  });

  app.post("/childs", async (req, res) => {
    const mongoCreateChildRepository = new MongoCreateChildRepository();

    const createChildController = new CreateChildController(
      mongoCreateChildRepository
    );

    const { body, statusCode } = await createChildController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/childs/:id", async (req, res) => {
    const mongoUpdateChildRepository = new MongoUpdateChildRepository();

    const updateChildController = new UpdateChildController(
      mongoUpdateChildRepository
    );

    const { body, statusCode } = await updateChildController.handle({
      body: req.body,
      params: req.params,
    });

    res.status(statusCode).send(body);
  });

  app.delete("/childs/:id", async (req, res) => {
    const mongoDeleteChildRepository = new MongoDeleteChildRepository();

    const deleteChildController = new DeleteChildController(
      mongoDeleteChildRepository
    );

    const { body, statusCode } = await deleteChildController.handle({
      params: req.params,
    });

    res.status(statusCode).send(body);
  });


    // TASKS ROUTES
    app.get("/tasks", async (req, res) => {
      const mongoGetTaskRepository = new MongoGetTaskRepository();
  
      const getTaskController = new GetTaskController(mongoGetTaskRepository);
  
      const { body, statusCode } = await getTaskController.handle();
  
      res.status(statusCode).send(body);
    });
  
    app.post("/tasks", async (req, res) => {
      const mongoCreateTaskRepository = new MongoCreateTaskRepository();
  
      const createTaskController = new CreateTaskController(
        mongoCreateTaskRepository
      );
  
      const { body, statusCode } = await createTaskController.handle({
        body: req.body,
      });
  
      res.status(statusCode).send(body);
    });
  
    app.patch("/tasks/:id", async (req, res) => {
      const mongoUpdateTaskRepository = new MongoUpdateTaskRepository();
  
      const updateTaskController = new UpdateTaskController(
        mongoUpdateTaskRepository
      );
  
      const { body, statusCode } = await updateTaskController.handle({
        body: req.body,
        params: req.params,
      });
  
      res.status(statusCode).send(body);
    });
  
    app.delete("/tasks/:id", async (req, res) => {
      const mongoDeleteTaskRepository = new MongoDeleteTaskRepository();
  
      const deleteTaskController = new DeleteTaskController(
        mongoDeleteTaskRepository
      );
  
      const { body, statusCode } = await deleteTaskController.handle({
        params: req.params,
      });
  
      res.status(statusCode).send(body);
    });

  //INIT SERVER
  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}!`));
};

main();
