import { ObjectId } from "mongoose"

export interface IRating {
    userId?: ObjectId
    flatId?: ObjectId,
    rating: {
        total: number,
        price: number,
        clearfull: number,
        modern: number,
        amenities: number,
        publicTransport: number,
        neighbours: number,
        neighbourhood: number,
        building: number,
        tenantment: number,
        realState: number,
        views: number
    }
}

export interface IRatingModel extends IRating, Document { }