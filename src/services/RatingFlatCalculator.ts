import { IRating } from './../interfaces/RatingInterface';
export function ratingFlatCalculator(ratings: IRating[]): IRating | any {
    if (!!ratings) return ratings;
    let averageCalculationOfRatings = {
        total: null,
        price: null,
        clearfull: null,
        modern: null,
        amenities: null,
        publicTransport: null,
        neighbours: null,
        neighbourhood: null,
        building: null,
        tenantment: null,
        realState: null,
        views: null
    }

}