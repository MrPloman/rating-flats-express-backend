import { CreateUserAction } from '../application/create-user'
import { UserByEmailFinder } from '../application/get-user-by-email'
import { UserByIdFinder } from '../application/get-user-by-id'
import { UserRepository } from '../domain/user-repository'
import { UserGetController } from './http/user-get-controller'
import { UserPostController } from './http/user-post-controller'
import { MongoUserRepository } from './user-repository/mongo-user-repository'

const getUserRepository = (): UserRepository => {
    switch (process.env.DDBB) {
        case 'mongo':
            return new MongoUserRepository()
        default:
            throw new Error('Invalid Database type')
    }
}
const postUserRepository = (): UserRepository => {
    switch (process.env.DDBB) {
        case 'mongo':
            return new MongoUserRepository()
        default:
            throw new Error('Invalid Database type')
    }
}

const userByIdFinder = new UserByIdFinder(getUserRepository())
const userByEmailFinder = new UserByEmailFinder(getUserRepository())
const createUser = new CreateUserAction(postUserRepository())

export const userGetController = new UserGetController(userByIdFinder, userByEmailFinder)
export const userPostController = new UserPostController(createUser)
