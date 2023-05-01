export class UserByIdNotFound extends Error {
    constructor(_id: string) {
        super(`User not found "${_id}"`)
    }
}
