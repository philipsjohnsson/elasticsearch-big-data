/**
 * The starting point of the application.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

// import { container } from './config/bootstrap.js'
import express, { Express, NextFunction, Request, Response} from 'express'
import { loadControllers } from "awilix-express"
import { loadContainer } from "./container"
import expressLayouts from 'express-ejs-layouts'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import helmet from 'helmet'
import logger from 'morgan'
import { Client } from '@elastic/elasticsearch'
import path from 'path'
// import { router } from './routes/router.js'

try {

  const app: Express = express()

  // app.set('container', container) // gör att vi kommer åt containern i router. we store container in container.

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

  app.use(helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'", "'unsafe-inline'" ,'cdn.jsdelivr.net'],
      'style-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net']
    }
  }))
  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  app.use(express.static(join(__dirname, '..', 'public')))

  const baseURL = process.env.BASE_URL || '/'

  // const directoryFullName = dirname(fileURLToPath(__filename))

  // Parse requests of the content type application/json.
  app.use(express.json())

  app.use(express.urlencoded({ extended: false }))

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))
  app.use(expressLayouts)
  app.set('layout', join(__dirname, 'views', 'layouts', 'default'))

  app.use((req: Request, res: Response, next: NextFunction) => {

    res.locals.baseURL = baseURL

    next()
  })
  // app.set('layout', 'layouts/layout')

  loadContainer(app)

  app.use(loadControllers(
  'controllers/*.ts',
  { cwd: __dirname }
  ))

  // app.enable('trust proxy')

  // Register routes.
  // app.use('/', router)

  // Error handler.
  interface CustomError extends Error {
    status?: number;
  }
  
  app.use(function (err: CustomError, req: Request, res: Response, next: NextFunction) {
      if (err.status === 404) {
      return res
        .status(404)
        .render('errors/404')
    } else if (err.status === 500) {
      return res
        .status(500)
        .render('errors/500')
    }
  
    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status || 500)
        .json({
          status: err.status || 500,
          message: err.message || 'Internal Server Error'
        });
    }
  });

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`) // // https://stackoverflow.com/questions/70364944/how-can-i-make-the-cross-env-and-nodemon-work-together
    console.log('Press Ctrl-C to terminate...')


  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}