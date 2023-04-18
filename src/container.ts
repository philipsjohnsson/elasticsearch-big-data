import { asClass, createContainer } from "awilix"
import { scopePerRequest } from "awilix-express"
import { Application } from "express"
import { TaskService } from "./services/TaskService"
import { ITaskService } from "./services/ITaskService"
import { ElasticsearchClient } from "./util/ElasticsearchClient"
import { IElasticsearchClient } from './util/IElasticsearchClient'

export const loadContainer = (app: Application) => {
  const container = createContainer({
  injectionMode: 'CLASSIC'
  })
  .register<ITaskService>('TaskService', asClass(TaskService).singleton())
  .register<IElasticsearchClient>('ElasticsearchClient', asClass(ElasticsearchClient).singleton())

  app.use(scopePerRequest(container))
}
