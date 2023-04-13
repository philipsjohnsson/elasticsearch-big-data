import { asClass, createContainer } from "awilix"
import { scopePerRequest } from "awilix-express"
import { Application } from "express"
import { TaskService } from "./services/TaskService"
import { TaskRepository } from "./repositories/TaskRepository"
import { ITaskService } from "./services/ITaskService"
import { ITaskRepository } from "./repositories/ITaskRepository"

export const loadContainer = (app: Application) => {
  const container = createContainer({
  injectionMode: 'CLASSIC'
  })
  /* .register({
    ITaskService: asClass(TaskService).singleton(),
    ITaskRepository: asClass(TaskRepository).singleton()
  }) */
  .register<ITaskService>('ITaskService', asClass(TaskService).singleton())
  .register<ITaskRepository>('ITaskRepository', asClass(TaskRepository).singleton())

  app.use(scopePerRequest(container))
}
