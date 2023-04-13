import { GET, route } from "awilix-express"
import { Request, Response } from "express"
import { TaskService } from "../services/TaskService"
import { ITaskService } from "../services/ITaskService"


@route('/tasks')
export class TaskController {
  constructor(private ITaskService: ITaskService) {
    this.ITaskService = ITaskService
  }
  @GET()
getHelloTask(req: Request, res: Response) {
  console.log('TEST')
  // this.ITaskService.test()

  // return res.json({mssg: 'hello task'})
  res.render('index')
  // res.render('index', { title: 'My Website' })
}
}