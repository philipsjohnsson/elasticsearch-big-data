import express from 'express'
// import createError from 'http-errors'
import { router as homeRouter } from './homeRouter.ts'

export const router = express.Router()

router.use('/', homeRouter)
// router.use('/auth', authRouter)
// router.use('/user', userRouter)

// router.use('*', (req, res, next) => next(createError(404)))