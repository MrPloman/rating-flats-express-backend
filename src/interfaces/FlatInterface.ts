import { Document } from 'mongoose'
export interface IFlat {
    location: {
        street: string,
        address: string,
        number: number,
        floor: number,
        door: string | number,
        stair: string,
        block: string,
        gate: string,
        zip: string | number,
        city: string,
        province: string,
        state: string,
        country: string,
        lng: string,
        lat: string,
    },
    specs: {
        m2: number,
        roomsNumber: number,
        bathroomsNumber: number,
        deposit: number,
        depositMontsh: number
    },
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
    },
    price: {
        firstPrice: {
            date: string,
            value: number
        },
        currentPrice: {
            date: string,
            value: number
        },
        averagePrice: number
    },
    others: {
        buildingYear: number,
        floorsNumber: number,
        elevator: boolean,
        accessibility: boolean,
        furnituresIncluded: boolean,
        contractByRealState: boolean,
        balcony: boolean
    }
}
export interface IFlatModel extends IFlat, Document { }