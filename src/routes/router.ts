import express from 'express'
import { router as v1Router } from './api/v1/router.ts'

export const router = express.Router()

router.use('/', v1Router)

