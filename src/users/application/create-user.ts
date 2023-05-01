import { User } from '../domain/user'
import { UserNotCreated } from '../domain/user-not-created'
import { UserRepository } from '../domain/user-repository'

export class CreateUserAction {
    constructor(private readonly userRepository: UserRepository) {}

    async run(email: string, password: string): Promise<User> {
        const user = await this.userRepository.createUser(email, password)

        if (!user) {
            throw new UserNotCreated(email, password)
        }

        return user
    }
}
