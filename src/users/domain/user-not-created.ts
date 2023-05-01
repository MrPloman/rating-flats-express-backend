export class UserNotCreated extends Error {
    constructor(email: string, password: string) {
        super(`User with creedentials "${email} and ${password}" not created`)
    }
}
