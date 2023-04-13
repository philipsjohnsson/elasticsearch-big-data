import { GET, route } from "awilix-express"
import { Request, Response } from "express"

@route('/test')
export class TestController {
  constructor() {
    
  }
  @GET()
getHelloTask(req: Request, res: Response) {
  return res.json({mssg: 'test'})
}
}