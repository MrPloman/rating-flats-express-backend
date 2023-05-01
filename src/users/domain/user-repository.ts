import { User } from './user'

export interface UserRepository {
    getUserById(_id: string): Promise<User | null>
    getUserByEmail(email: string): Promise<User | null>
    createUser(email: string, password: string): Promise<User | null>
}
