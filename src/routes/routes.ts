// IMPORT
import express from 'express'
import flatRoute from './specific/flatRoute'
import { userRouter } from '../users/infraestructure/http/user-router'
import ratingRoute from './specific/ratingRoute'

const app = express()

//  ROUTES
app.use('/api/flat', flatRoute)
app.use('/api/rating', ratingRoute)
app.use('/api/user', userRouter)

//EXPORT
export default app
