
import { IRatingModel } from './../interfaces/RatingInterface';
import mongoose from 'mongoose'
const { Schema } = mongoose;

const RatingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    flat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        total: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        clearfull: {
            type: Number,
            required: true
        },
        modern: {
            type: Number,
            required: true
        },
        amenities: {
            type: Number,
            required: true
        },
        publicTransport: {
            type: Number,
            required: true
        },
        neighbours: {
            type: Number,
            required: true
        },
        neighbourhood: {
            type: Number,
            required: true
        },
        building: {
            type: Number,
            required: true
        },
        tenantment: {
            type: Number,
            required: true
        },
        realState: {
            type: Number,
            required: true
        },
        views: {
            type: Number,
            required: true
        }
    }
});

export default mongoose.model<IRatingModel>('Rating', RatingSchema);
