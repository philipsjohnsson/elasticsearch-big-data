import { TaskRepository } from "../repositories/TaskRepository"
import { ITaskService } from "./ITaskService"
import { ElasticsearchClient } from "../util/ElasticsearchClient"
import { Request, Response, NextFunction } from "express"

export class TaskService implements ITaskService {
  constructor(private ITaskRepository: TaskRepository, private ElasticsearchClient: ElasticsearchClient) {
    this.ITaskRepository = ITaskRepository
    this.ElasticsearchClient = ElasticsearchClient
  }
  test(req: Request, res: Response, next: NextFunction) {
    // this.ITaskRepository.hh()
    this.ElasticsearchClient.getData(req, res, next)
    next()
    console.log('TESTTEST')
  }
}