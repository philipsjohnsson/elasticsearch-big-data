import { asClass, createContainer } from "awilix"
import { scopePerRequest } from "awilix-express"
import { Application } from "express"
import { TaskService } from "./services/TaskService"
import { TaskRepository } from "./repositories/TaskRepository"
import { ITaskService } from "./services/ITaskService"
import { ITaskRepository } from "./repositories/ITaskRepository"
import { ElasticsearchClient } from "./util/ElasticsearchClient"
import { IElasticsearchClient } from './util/IElasticsearchClient'

export const loadContainer = (app: Application) => {
  const container = createContainer({
  injectionMode: 'CLASSIC'
  })
  /* .register({
    ITaskService: asClass(TaskService).singleton(),
    ITaskRepository: asClass(TaskRepository).singleton()
  }) */
  .register<ITaskService>('TaskService', asClass(TaskService).singleton())
  .register<ITaskRepository>('ITaskRepository', asClass(TaskRepository).singleton())
  .register<IElasticsearchClient>('ElasticsearchClient', asClass(ElasticsearchClient).singleton())
  // .register<IElasticsearchClient>('IElasticsearchClient', asClass(ElasticsearchClient).singleton())

  app.use(scopePerRequest(container))
}
