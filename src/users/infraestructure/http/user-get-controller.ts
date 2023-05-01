import { Request, Response } from 'express'

import { UserByIdFinder } from './../../application/get-user-by-id'
import { UserByEmailFinder } from './../../application/get-user-by-email'
import { UserByIdNotFound } from './../../domain/user-by-id-not-found'
import { UserByEmailNotFound } from './../../domain/user-by-email-not-found'
import { generateJsonResponse } from './../../../services/ResponseGeneratorService'

export class UserGetController {
    constructor(private readonly userByIdFinder: UserByIdFinder, private readonly UserByEmailFinder: UserByEmailFinder) {}

    async runFindById(req: Request, res: Response) {
        const { _id } = req.params
        try {
            if (_id) {
                const user = await this.userByIdFinder.run(_id)
                return res.status(200).json(generateJsonResponse(req.method, user, undefined, 200, `User with id: "${_id}" found in Flats collection :: getFlatById`))
            } else {
                return res.status(404).json(generateJsonResponse(req.method, undefined, undefined, 404, `User with id: "${_id}" not found in Flats collection :: getFlatById`))
            }
        } catch (error) {
            if (error instanceof UserByIdNotFound) {
                return res.status(404).json(generateJsonResponse(req.method, undefined, undefined, 404, `User with id: "${_id}" not found in Flats collection :: getFlatById`))
            } else {
                return res.status(500).json(generateJsonResponse(req.method, undefined, error, 500, `Not a valid Id: "${_id}", not found in Flats collection :: getFlatById`))
            }
        }
    }

    async runFindByEmail(req: Request, res: Response) {
        const { email } = req.params
        try {
            if (email) {
                const user = await this.UserByEmailFinder.run(email)
                return res.status(200).json(generateJsonResponse(req.method, user, undefined, 200, `Email "${email}" found in Flats collection :: getFlatByEmail`))
            } else {
                return res.status(404).json(generateJsonResponse(req.method, undefined, undefined, 404, `Email "${email}" not found in Flats collection :: getFlatByEmail`))
            }
        } catch (error) {
            if (error instanceof UserByEmailNotFound) {
                return res.status(404).json(generateJsonResponse(req.method, undefined, error, 404, `Email "${email}" not found in Flats collection :: getFlatByEmail`))
            } else {
                return res.status(500).json(generateJsonResponse(req.method, undefined, error, 500, `Not a valid Email "${email}", not found in Flats collection :: getFlatByEmail`))
            }
        }
    }
}
