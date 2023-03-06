import { ITokenModel } from '../interfaces/TokenInterface'
import mongoose from 'mongoose'
const { Schema } = mongoose

const TokenSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },

    creationDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
})

export default mongoose.model<ITokenModel>('Token', TokenSchema)
