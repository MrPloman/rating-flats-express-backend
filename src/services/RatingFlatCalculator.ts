import { IRating } from './../interfaces/RatingInterface';
export function ratingFlatCalculator(ratings: IRating[]): IRating | undefined {
    if (!ratings) return undefined;
    type TypeLabelRating = keyof IRating['rating'];
    const numberOfRatings: number = ratings.length;
    let averageCalculationOfRatings: IRating = {
        rating: {
            total: 0,
            price: 0,
            clearfull: 0,
            modern: 0,
            amenities: 0,
            publicTransport: 0,
            neighbours: 0,
            neighbourhood: 0,
            building: 0,
            tenantment: 0,
            realState: 0,
            views: 0
        }
    }

    // Iterate inside all ratings adding their values inside averageCalculationOfRatings, it collects global punctuation from each rating key
    ratings.forEach((ratingFound: IRating) => {
        if (!ratingFound || !ratingFound.rating) return;
        // Converting object in array to iterate inside values of every rating found
        Object.keys(ratingFound.rating).forEach((labelOfRating: any) => {
            if (!labelOfRating) return;
            // Checking type of every key just to make sure it could be possible to access it and modify
            const label: TypeLabelRating = labelOfRating;
            // If it matches add value
            averageCalculationOfRatings.rating[label] += ratingFound.rating[label];
        });
    });

    // Time to iterate once all additions were made to get the average punctuation from every key of rating
    Object.keys(averageCalculationOfRatings.rating).forEach((labelOfRating: any) => {
        if (!labelOfRating) return;
        const label: TypeLabelRating = labelOfRating;
        averageCalculationOfRatings.rating[label] = averageCalculationOfRatings.rating[label] / numberOfRatings;
    });
    return averageCalculationOfRatings;

}