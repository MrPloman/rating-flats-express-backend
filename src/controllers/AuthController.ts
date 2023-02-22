import UserModel from '../models/UserModel'
import { JSONResponseInterface } from '../interfaces/generic/JSONResponseInterface'
import { TypedResponse } from '../interfaces/generic/ResponseInterface'
import { generateJsonResponse } from '../services/ResponseGenerator'
import { Request } from 'express'
import { IUser } from '@/interfaces/UserInterface'
import { checkPass, encryptPass } from '../services/EncryptionService'

const user = UserModel

export class AuthController {
    public async registerUser(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body) res.json(generateJsonResponse(req.method, undefined, undefined, 404, `Please provide a valid body`))
        else {
            if (req.body.email && req.body.password) {
                try {
                    encryptPass(req.body.password).then((resultOfEncryption: string | null | unknown) => {
                        if (resultOfEncryption && typeof resultOfEncryption === 'string') {
                            const userLet: IUser = {
                                email: req.body.email,
                                password: resultOfEncryption,
                                creationDate: new Date(),
                                updatingDate: new Date(),
                                information: {
                                    avatar: req.body?.information?.avatar ? req.body.information.avatar : '',
                                    name: req.body?.information?.name ? req.body.information.name : '',
                                    surname: req.body?.information?.surname ? req.body.information.surname : '',
                                    username: req.body?.information?.username ? req.body.information.username : '',
                                },
                            }
                            try {
                                user.create(userLet, (_err, userCreated: IUser) => {
                                    if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `Uncaught exception`))

                                    if (userCreated) res.json(generateJsonResponse(req.method, userCreated, undefined, 200, `Uncaught exception`))
                                })
                            } catch (error) {
                                res.json(generateJsonResponse(req.method, undefined, error, 500, `Uncaught exception`))
                            }
                            // res.json(generateJsonResponse(req.method, { a: 'ac' }, undefined, 500, `PERDo exception`))
                        } else {
                            res.json(generateJsonResponse(req.method, undefined, undefined, 500, `Error encrypting your password`))
                        }
                    })
                } catch (error) {
                    res.json(generateJsonResponse(req.method, undefined, error, 500, `Uncaught exception`))
                }
            } else {
                res.json(generateJsonResponse(req.method, undefined, undefined, 400, `No password, no email`))
            }
        }
    }
    public loginUser(req: Request, res: TypedResponse<JSONResponseInterface>) {
        user.findOne({ email: req.body.email }, (_err: any, userFound: IUser) => {
            console.log(userFound)
            if (userFound) {
                checkPass(req.body.password, userFound.password).then(result => {
                    console.log(result)
                    if (result) res.json(generateJsonResponse(req.method, userFound, undefined, 200, `Uncaught exception`))
                })
            }
        })
        return null
    }
    public updateUser() {
        return null
    }
    public deleteUser() {
        return null
    }
    public generateToken() {
        return null
    }
}