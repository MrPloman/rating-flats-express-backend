import UserModel from '../models/UserModel'
import { JSONResponseInterface } from '../interfaces/generic/JSONResponseInterface'
import { TypedResponse } from '../interfaces/generic/ResponseInterface'
import { generateJsonResponse } from '../services/ResponseGeneratorService'
import { Request } from 'express'
import { IUser } from '@/interfaces/UserInterface'
import { checkPass, encryptPass } from '../services/EncryptionService'
import { generateAccessToken, verifyAccessToken } from '../services/TokenService'
import { sendEmail } from '../services/MailerService'

const user = UserModel

export class AuthController {
    public registerUser(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body) res.json(generateJsonResponse(req.method, undefined, undefined, 404, `Please provide a valid body`))
        else {
            if (req.body.email && req.body.password) {
                try {
                    user.findOne({ email: req.body.email }, (_err: any, userFound: IUser) => {
                        if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `Uncaught exception`))
                        if (userFound) res.json(generateJsonResponse(req.method, { email: userFound.email }, undefined, 403, `Email: ${userFound.email} has already been used, please use another`))
                        else {
                            try {
                                encryptPass(req.body.password).then((resultOfEncryption: string | null | unknown) => {
                                    if (resultOfEncryption && typeof resultOfEncryption === 'string') {
                                        const userLet: IUser = {
                                            email: req.body.email,
                                            password: resultOfEncryption,
                                            creationDate: new Date(),
                                            updatingDate: new Date(),
                                            enabled: true,
                                            information: {
                                                avatar: req.body?.information?.avatar ? req.body.information.avatar : '',
                                                name: req.body?.information?.name ? req.body.information.name : '',
                                                surname: req.body?.information?.surname ? req.body.information.surname : '',
                                                username: req.body?.information?.username ? req.body.information.username : '',
                                            },
                                        }
                                        try {
                                            user.create(userLet, (_err, userCreated: IUser) => {
                                                if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `User created properly`))

                                                if (userCreated) {
                                                    // sendEmail(userCreated.email, 'Confirm Account from Rating Flats', 'confirm-account', {
                                                    //     url: '',
                                                    // })

                                                    res.json(generateJsonResponse(req.method, userCreated, undefined, 200, `Uncaught exception`))
                                                }
                                            })
                                        } catch (error) {
                                            res.json(generateJsonResponse(req.method, undefined, error, 500, `Uncaught exception`))
                                        }
                                    } else {
                                        res.json(generateJsonResponse(req.method, undefined, undefined, 500, `Error encrypting your password`))
                                    }
                                })
                            } catch (error) {
                                res.json(generateJsonResponse(req.method, undefined, error, 500, `Uncaught exception encrypting pass`))
                            }
                        }
                    })
                } catch (error) {
                    res.json(generateJsonResponse(req.method, undefined, error, 500, `Uncaught exception fetching in user collections`))
                }
            } else {
                res.json(generateJsonResponse(req.method, undefined, undefined, 400, `No password or email, please provide them to register`))
            }
        }
    }
    public loginUser(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body || !req.body.email || !req.body.password) res.json(generateJsonResponse(req.method, undefined, undefined, 404, `Please provide a valid body: email and password required`))
        else {
            try {
                user.findOne({ email: req.body.email }, (_err: Error, userFound: IUser) => {
                    if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `Error in request to user collections`))
                    if (userFound) {
                        try {
                            checkPass(req.body.password, userFound.password)
                                .then((passChecked: boolean) => {
                                    if (passChecked) {
                                        const userInfo = {
                                            email: userFound.email,
                                            information: userFound.information,
                                            token: generateAccessToken(req.body.email),
                                        }
                                        res.json(generateJsonResponse(req.method, userInfo, undefined, 200, `Uncaught exception`))
                                    } else {
                                        res.json(generateJsonResponse(req.method, {}, undefined, 403, `Access Denied, password doesn't match.`))
                                    }
                                })
                                .catch((error: Error) => {
                                    if (error) res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error: Uncaught exception in check Password function`))
                                })
                        } catch (error) {
                            res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error: Checking Password`))
                        }
                    } else {
                        res.json(generateJsonResponse(req.method, {}, undefined, 400, `Email not found`))
                    }
                })
            } catch (error) {
                res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error in Mongo Request`))
            }
        }
    }
    public getSessionStatus(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body || !req.body.token) res.json(generateJsonResponse(req.method, undefined, undefined, 403, `Please provide a valid token`))
        const status: any = verifyAccessToken(req.body.token)
        if (status.status && status.email) {
            try {
                user.findOne({ email: status.email }, (_err: Error, userFound: IUser) => {
                    if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `Error in request to user collections`))
                    if (userFound) {
                        const userInfo = {
                            email: userFound.email,
                            information: userFound.information,
                        }
                        res.json(generateJsonResponse(req.method, userInfo, undefined, 200, `Resolt ok`))
                    }
                })
            } catch (error) {
                res.json(generateJsonResponse(req.method, undefined, error, 500, `Uncaught exceptio`))
            }
        } else res.json(generateJsonResponse(req.method, status, undefined, 500, `Token invalid, plese log in`))
    }
    public updateUser(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body || !req.body.password || !req.body.email || !req.body.information)
            res.json(generateJsonResponse(req.method, undefined, undefined, 404, `Please provide a valid body, email and password required, and updated info`))
        else {
            try {
                user.findOne({ email: req.body.email }, (_err: any, userFound: IUser) => {
                    if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `Error in request to user collections`))
                    if (userFound) {
                        try {
                            checkPass(req.body.password, userFound.password)
                                .then((passChecked: boolean) => {
                                    if (passChecked) {
                                        try {
                                            user.findOneAndUpdate(
                                                { email: req.body.email },
                                                { information: req.body.information, updatingDate: new Date() },
                                                { upsert: true, new: true },
                                                (_err: any, userUpdated: IUser) => {
                                                    if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `Error in request to user collections`))
                                                    if (userUpdated) res.json(generateJsonResponse(req.method, userUpdated, undefined, 200, `Updated properly`))
                                                }
                                            )
                                        } catch (error) {
                                            res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error: Updating User`))
                                        }
                                    } else {
                                        res.json(generateJsonResponse(req.method, {}, undefined, 403, `Access Denied, password doesn't match.`))
                                    }
                                })
                                .catch((error: Error) => {
                                    if (error) res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error: Uncaught exception in check Password function`))
                                })
                        } catch (error) {
                            res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error: Checking Password`))
                        }
                    }
                })
            } catch (error) {
                res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error: Finding user by email`))
            }
        }
    }
    public recoveryPassword(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body.to) res.json(generateJsonResponse(req.method, undefined, undefined, 500, `Internal Server Error: Finding user by email`))
        else {
            try {
                user.findOne({ email: req.body.to }, (_err: Error, userFound: IUser) => {
                    if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 500, `Internal Server Error: Finding user by email`))
                    if (userFound) {
                        sendEmail(req.body.to, 'Recovery Password form Rating Flats', 'recovery-password', userFound)
                            .then(mailStatus => {
                                if (mailStatus) res.json(generateJsonResponse(req.method, mailStatus, undefined, 200, `Updated properly`))
                            })
                            .catch(err => {
                                res.json(generateJsonResponse(req.method, undefined, err, 500, `Internal Server Error: Finding user by email`))
                            })
                    }
                })
            } catch (error) {
                res.json(generateJsonResponse(req.method, undefined, error, 500, `Internal Server Error: Finding user by email`))
            }
        }
    }
    public deleteUser() {
        return null
    }
}
