import { Request, Response } from 'express'

import { UserByIdNotFound } from './../../domain/user-by-id-not-found'
import { generateJsonResponse } from './../../../services/ResponseGeneratorService'
import { CreateUserAction } from './../..//application/create-user'

export class UserPostController {
    constructor(private readonly createUserAction: CreateUserAction) {}

    async runCreateUser(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            if (email && password) {
                const user = await this.createUserAction.run(email, password)
                return res.status(200).json(generateJsonResponse(req.method, user, undefined, 200, `User Created, check your email`))
            } else {
                return res.status(404).json(generateJsonResponse(req.method, undefined, undefined, 400, `No password or email, please provide them to register`))
            }
        } catch (error) {
            if (error instanceof UserByIdNotFound) {
                return res.status(404).json(generateJsonResponse(req.method, undefined, error, 400, `No password or email, please provide them to register`))
            } else {
                return res.status(500).json(generateJsonResponse(req.method, undefined, error, 500, `Not a valid email: "${email}", not found in Flats collection :: createUser`))
            }
        }
    }
}
