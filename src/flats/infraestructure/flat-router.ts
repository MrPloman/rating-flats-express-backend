import express from 'express'
import { createFlat } from './dependencies'
const router = express.Router()

router.post('/', createFlat.run)

export default router
