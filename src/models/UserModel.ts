
import { IUserModel} from '@/interfaces/UserInterface';
import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    information: {
        username: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        surname: {
            type: String,
            required: false
        },
        avatar: {
            type: String,
            required: false
        }
    },
    creationDate: {
        type: Date,
        required: true,
    },
    updatingDate: {
        type: Date,
        required: false,
    },
    ratings: {
        type: Array<mongoose.Schema.Types.ObjectId>,
        required: false
    }
});

export default mongoose.model<IUserModel>('User', UserSchema);
