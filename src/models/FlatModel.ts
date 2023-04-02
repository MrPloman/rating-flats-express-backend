import { IFlatModel } from './../interfaces/FlatInterface'
import mongoose from 'mongoose'

const { Schema } = mongoose
const FlatSchema = new Schema({
    location: {
        street: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        floor: {
            type: Number,
            required: true,
        },
        door: {
            type: String || Number,
            required: true,
        },
        stair: {
            type: String,
            required: false,
        },
        block: {
            type: String,
            required: false,
        },
        gate: {
            type: String,
            required: false,
        },
        zip: {
            type: String || Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
    },
    specs: {
        m2: {
            type: Number,
            required: false,
        },
        roomsNumber: {
            type: Number,
            required: false,
        },
        bathroomsNumber: {
            type: Number,
            required: false,
        },
        deposit: {
            type: Number,
            required: false,
        },
        depositMonths: {
            type: Number,
            required: false,
        },
    },
    rating: {
        total: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        clearfull: {
            type: Number,
            required: true,
        },
        modern: {
            type: Number,
            required: true,
        },
        amenities: {
            type: Number,
            required: true,
        },
        publicTransport: {
            type: Number,
            required: true,
        },
        neighbours: {
            type: Number,
            required: true,
        },
        neighbourhood: {
            type: Number,
            required: true,
        },
        building: {
            type: Number,
            required: true,
        },
        tenantment: {
            type: Number,
            required: true,
        },
        realState: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            required: true,
        },
    },
    price: {
        firstPrice: {
            date: {
                type: String,
                required: false,
            },
            value: {
                type: Number,
                required: false,
            },
        },
        currentPrice: {
            date: {
                type: String,
                required: false,
            },
            value: {
                type: Number,
                required: false,
            },
        },
        averagePrice: {
            type: Number,
            required: false,
        },
    },
    others: {
        buildingYear: {
            type: Number,
            required: false,
        },
        floorsNumber: {
            type: Number,
            required: false,
        },
        elevator: {
            type: Boolean,
            required: false,
        },
        accessibility: {
            type: Boolean,
            required: false,
        },
        furnituresIncluded: {
            type: Boolean,
            required: false,
        },
        contractByRealState: {
            type: Boolean,
            required: false,
        },
        balcony: {
            type: Boolean,
            required: false,
        },
    },
})

export default mongoose.model<IFlatModel>('Flat', FlatSchema)
