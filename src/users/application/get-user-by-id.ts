import { User } from '../domain/user'
import { UserByIdNotFound } from '../domain/user-by-id-not-found'
import { UserRepository } from '../domain/user-repository'

export class UserByIdFinder {
    constructor(private readonly userRepository: UserRepository) {}

    async run(_id: string): Promise<User> {
        const user = await this.userRepository.getUserById(_id)

        if (!user) {
            throw new UserByIdNotFound(_id)
        }

        return user
    }
}
