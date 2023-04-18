/**
 * The Taskservice of the application.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { ITaskService } from "./ITaskService"
import { ElasticsearchClient } from "../util/ElasticsearchClient"
import { Request, Response, NextFunction } from "express"

export class TaskService implements ITaskService {
  constructor(private ElasticsearchClient: ElasticsearchClient) {
    this.ElasticsearchClient = ElasticsearchClient
  }
  
  async getMoviesBasedOnSpecificYear(req: Request, res: Response, next: NextFunction) {
    return await this.ElasticsearchClient.getMoviesBasedOnSpecificYear(req, res, next)
  }
}