import { Request, Response, NextFunction } from "express"

export interface ITaskService {
  getMoviesBasedOnSpecificYear(req: Request, res: Response, next: NextFunction): object
}