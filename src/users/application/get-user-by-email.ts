import { User } from '../domain/user'
import { UserByEmailNotFound } from '../domain/user-by-email-not-found'
import { UserRepository } from '../domain/user-repository'

export class UserByEmailFinder {
    constructor(private readonly userRepository: UserRepository) {}

    async run(email: string): Promise<User> {
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) {
            throw new UserByEmailNotFound(email)
        }
        return user
    }
}
