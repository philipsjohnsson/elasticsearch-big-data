import { GET, route } from "awilix-express"
import { NextFunction, Request, Response } from "express"
import { TaskService } from "../services/TaskService"
import { ITaskService } from "../services/ITaskService"
import createError from 'http-errors'


@route('/')
export class TaskController {
  constructor(private TaskService: TaskService) {
    this.TaskService = TaskService
  }
  @GET()
async moviesBasedOnSpecificYear(req: Request, res: Response, next: NextFunction) {
  try {
    const viewData = await this.TaskService.getMoviesBasedOnSpecificYear(req, res, next)
  
    res.render('index', { viewData })
  } catch(err) {
    next(createError(500))
  }
}

@route('*')
@GET()
notFound(req: Request, res: Response, next: NextFunction) {
  console.log('felhantering')
  next(createError(404))
}
}
