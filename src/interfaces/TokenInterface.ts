import { ObjectId } from 'mongoose'

export interface IToken {
    userId: ObjectId
    token: string
    method: string
    type: string
    creationDate: Date
    expirationDate: Date
}

export interface ITokenModel extends IToken, Document {}
