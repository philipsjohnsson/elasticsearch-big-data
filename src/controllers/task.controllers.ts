import { GET, route } from "awilix-express"
import { NextFunction, Request, Response } from "express"
import { TaskService } from "../services/TaskService"
import { ITaskService } from "../services/ITaskService"


@route('/tasks')
export class TaskController {
  constructor(private TaskService: TaskService) {
    this.TaskService = TaskService
  }
  @GET()
async getHelloTask(req: Request, res: Response, next: NextFunction) {
  console.log('TEST')
  // this.TaskService.test(req, res, next)
  const viewData = await this.TaskService.getMoviesBasedOnSpecificYear(req, res, next)

  // return res.json({mssg: 'hello task'})
  res.render('index', { viewData })
  // res.render('index', { title: 'My Website' })
}

}
