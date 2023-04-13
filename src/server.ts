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

  /* const client = new Client({
    cloud: { id: 'elastic'},
    auth: { apiKey: 'vdRb+KuI9SWQgDNkKt7H'}
  })

  

  

  console.log(client) */

  // app.set('container', container) // gör att vi kommer åt containern i router. we store container in container.

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

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
  /* app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.status === 400) {
      return res
        .status(400)
        .json({
          status_code: 400,
          message: 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).'
        })
    } else if (err.status === 401) {
      return res
        .status(401)
        .json({
          status_code: 401,
          message: 'Credentials invalid or not provided.'
        })
    } else if (err.status === 403) {
      return res
        .sendStatus(403)
    } else if (err.status === 404) {
      return res
        .sendStatus(404)
    } else if (err.status === 409) {
      return res
        .sendStatus(409)
    } else if (err.status === 500) {
      return res
        .status(500)
        .json({
          status_code: 500,
          message: 'An unexpected condition was encountered.'
        })
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }
  }) */

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`) // // https://stackoverflow.com/questions/70364944/how-can-i-make-the-cross-env-and-nodemon-work-together
    console.log('Press Ctrl-C to terminate...')


  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}