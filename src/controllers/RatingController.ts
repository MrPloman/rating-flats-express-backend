import { IRating } from '../interfaces/RatingInterface'
import { JSONResponseInterface } from '../interfaces/generic/JSONResponseInterface'
import { TypedResponse } from '../interfaces/generic/ResponseInterface'
import { generateJsonResponse } from '../services/ResponseGenerator'
import { Request } from 'express'
import Rating from '../models/RatingModel'
import Flat from '../models/FlatModel'
import { IFlat } from '../interfaces/FlatInterface'
import { ratingFlatCalculator } from '../services/RatingFlatCalculator'

const rating = Rating
const flat = Flat

export class RatingController {
    public getRatingById(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.params.id) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required valid id :: getRatingById'))
        else {
            rating.findById(req.params.id, (_err: Error, ratingFound: IRating) => {
                if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 404, `Rating Id "${req.params.id}" not found in Ratings collection :: getRatingById`))
                if (ratingFound) res.json(generateJsonResponse(req.method, ratingFound, undefined, 200, `Flat with ${req.params.id} has following ratings :: getRatingById`))
            })
        }
    }
    public getAllRatingsByFlatId(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.params.flatId) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required valid id :: getAllRatingsByFlatId'))
        else {
            rating.find({ flatId: req.params.flatId }, (_err: Error, ratingsFound: IRating[]) => {
                if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 404, `Flat Id "${req.params.flatId}" not found in any rating in Rating collection :: getAllRatingsByFlatId`))
                if (ratingsFound) res.json(generateJsonResponse(req.method, ratingsFound, undefined, 200, `Flat with ${req.params.flatId} has following ratings :: getAllRatingsByFlatId`))
            })
        }
    }
    public createRatingOfFlat(req: Request, res: TypedResponse<JSONResponseInterface>) {
        const { updateAverageRatingOfFlat } = new RatingController()
        if (!req.body.flatId) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required body with flatId identifier defined :: createRatingOfFlat'))
        else if (!req.body.userId) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required body with userId identifier defined :: createRatingOfFlat'))
        else if (!req.body.rating) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required body with rating value defined :: createRatingOfFlat'))
        else {
            flat.findById(req.body.flatId, (_err: Error, data: IFlat) => {
                if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 404, `Id "${req.body.flatId}" not found in Flats collection :: createRatingOfFlat`))
                if (data) {
                    rating.create(
                        {
                            flatId: req.body.flatId,
                            userId: req.body.userId,
                            rating: req.body.rating,
                        },
                        (_err, ratingCreated) => {
                            if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 404, `Flat Id "${req.body.flatId}" or ratings :: createRatingOfFlat`))
                            if (ratingCreated) {
                                // res.json(generateJsonResponse(req.method, ratingCreated, undefined, 200, `Rating created properly, attached to flat with id: ${req.body.flatId} and created by user: ${req.body.userId} :: createRatingOfFlat`));
                                req.params.flatId = req.body.flatId
                                updateAverageRatingOfFlat(req, res)
                            }
                        }
                    )
                }
            })
        }
    }
    public updateRating(req: Request, res: TypedResponse<JSONResponseInterface>) {
        const { updateAverageRatingOfFlat } = new RatingController()

        if (!req.body.id) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required valid rating id :: updateRatingOfFlat'))
        else if (!req.body.rating) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required a valid rating in body :: updateRatingOfFlat'))
        else if (!req.body.flatId) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required a valid flatId in body :: updateRatingOfFlat'))
        else {
            rating.findOneAndUpdate({ _id: req.body.id }, { rating: req.body.rating }, { upsert: true, new: true }, (_err: any, ratingUpdated: IRating) => {
                if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 404, `Rating with id: "${req.body.id}" not found, :: updateRatingOfFlat`))
                if (ratingUpdated) {
                    req.params.flatId = req.body.flatId
                    updateAverageRatingOfFlat(req, res)
                    // res.json(generateJsonResponse(req.method, ratingUpdated, undefined, 200, `Rating with id: "${req.body.id}" has been updated :: updateRatingOfFlat`));
                }
            })
        }
    }

    public updateAverageRatingOfFlat(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.params.flatId) res.json(generateJsonResponse(req.method, undefined, undefined, 400, 'Required valid flat id :: updateAverageRatingOfFlat'))
        else {
            rating.find({ flatId: req.params.flatId }, (_err: Error, ratingsFound: IRating[]) => {
                if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 404, `Flat Id "${req.params.flatId}" not found in any rating in Rating collection :: updateAverageRatingOfFlat`))
                if (ratingsFound) {
                    const averageRating = ratingFlatCalculator(ratingsFound)
                    if (averageRating) {
                        flat.findByIdAndUpdate(req.params.flatId, { rating: averageRating.rating }, { upsert: true, new: true }, (_err: any, flatUpdated: IFlat) => {
                            if (_err) res.json(generateJsonResponse(req.method, undefined, _err, 404, `Can't update rating of mailbox: "${req.params.flatId}" :: updateAverageRatingOfFlat`))
                            if (flatUpdated)
                                res.json(
                                    generateJsonResponse(
                                        req.method,
                                        flatUpdated,
                                        undefined,
                                        200,
                                        `Mailbox with id: "${req.params.flatId}" has been updated with average rating:: updateAverageRatingOfFlat`
                                    )
                                )
                        })
                    } else {
                        res.json(generateJsonResponse(req.method, undefined, _err, 500, `Average rating operation failed...`))
                    }
                }
            })
        }
    }
}
