import { Request, Response,NextFunction } from "express";

export interface IElasticsearchClient {
    getMoviesBasedOnSpecificYear(req: Request, res: Response, next: NextFunction): void
}