import { ObjectId } from 'mongoose'

export interface IUser {
    email: string
    password: string
    information: {
        username: string
        name: string
        surname: string
        avatar: string
    }
    creationDate: Date
    updatingDate: Date
    enabled: boolean
    ratings?: ObjectId[]
}

export interface IUserModel extends IUser, Document {}
