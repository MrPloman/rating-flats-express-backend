import express from 'express'

import { userGetController, userPostController } from './../dependencies'

const userRouter = express.Router()

userRouter.get('/:_id', userGetController.runFindById.bind(userGetController))
userRouter.get('/email/:email', userGetController.runFindByEmail.bind(userGetController))
userRouter.post('/register', userPostController.runCreateUser.bind(userPostController))

export { userRouter }
