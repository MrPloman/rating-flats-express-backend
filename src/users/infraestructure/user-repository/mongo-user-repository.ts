import UserModel from '../../../models/UserModel'
import { User } from '../../domain/user'
import { UserRepository } from '../../domain/user-repository'

const user = UserModel
export class MongoUserRepository implements UserRepository {
    async getUserById(_id: string): Promise<User | null> {
        try {
            return await user.findById(_id)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    async getUserByEmail(email: string): Promise<User | null> {
        try {
            return await user.findOne({ email: email })
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
    async createUser(email: string, password: string): Promise<User | null> {
        if (!email || !password) return null
        try {
            return await user.findOne({ email: email })
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    }
}
