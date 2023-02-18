import { IRating } from './../interfaces/RatingInterface';
// import { IFlat } from './../interfaces/FlatInterface';
import { JSONResponseInterface } from "@/interfaces/generic/JSONResponseInterface";
import { TypedResponse } from "../interfaces/generic/ResponseInterface";
import { generateJsonResponse } from "../services/ResponseGenerator";
import { Request } from "express";
import Rating from '../models/RatingModel';
import Flat from '../models/FlatModel';
import { IFlat } from '@/interfaces/FlatInterface';

const rating = Rating;
const flat = Flat;

export class RatingController {
    public getAllRatingsByFlatId(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.params.flatId) res.json(generateJsonResponse('GET', undefined, undefined, 400, 'Required valid id :: getAllRatingsByFlatId'))
        else {
            rating.find({ flat: req.params.flatId }, async (_err: Error, ratingsFound: IRating) => {
                if (!!_err) await res.json(generateJsonResponse('GET', undefined, _err, 404, `Flat Id "${req.params.flatId}" not found in any rating in Rating collection :: getAllRatingsByFlatId`));
                if (!!ratingsFound) await res.json(generateJsonResponse('GET', ratingsFound, undefined, 200, `Flat with ${req.params.flatId} has following ratings :: getAllRatingsByFlatId`));
            })
        }
    };
    public createRatingOfFlat(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body.flatId) res.json(generateJsonResponse('POST', undefined, undefined, 400, 'Required body with flatId identifier defined :: createRatingOfFlat'));
        else if (!req.body.userId) res.json(generateJsonResponse('POST', undefined, undefined, 400, 'Required body with userId identifier defined :: createRatingOfFlat'));
        else if (!req.body.rating) res.json(generateJsonResponse('POST', undefined, undefined, 400, 'Required body with rating value defined :: createRatingOfFlat'));
        else {
            flat.findById(req.body.flatId, async (_err: Error, data: IFlat) => {
                if (!!_err) await res.json(generateJsonResponse('GET', undefined, _err, 404, `Id "${req.body.flatId}" not found in Flats collection :: createRatingOfFlat`));
                if (!!data) {
                    await rating.create({ flatId: req.body.flatId, userId: req.body.userId, rating: req.body.rating }, async (_err, ratingCreated) => {
                        if (!!_err) await res.json(generateJsonResponse('POST', undefined, _err, 404, `Flat Id "${req.body.flatId}" or ratings :: createRatingOfFlat`));
                        if (!!ratingCreated) await res.json(generateJsonResponse('POST', ratingCreated, undefined, 200, `Rating created properly, attached to flat with id: ${req.body.flatId} and created by user: ${req.body.userId} :: createRatingOfFlat`));
                    });
                }
            })
        }
    };
    public updateRatingOfFlat(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.body.id) res.json(generateJsonResponse('PUT', undefined, undefined, 400, 'Required valid rating id :: updateRatingOfFlat'));
        else if (!req.body.rating) res.json(generateJsonResponse('PUT', undefined, undefined, 400, 'Required a valid rating in body :: updateRatingOfFlat'));
        else {
            rating.findOneAndUpdate({ _id: req.body.id }, { rating: req.body.rating }, async (_err: Error, ratingUpdated: IRating) => {
                if (!!_err) await res.json(generateJsonResponse('PUT', undefined, _err, 404, `Rating with id: "${req.body.id}" not found, :: updateRatingOfFlat`));
                if (!!ratingUpdated) await res.json(generateJsonResponse('PUT', ratingUpdated, undefined, 200, `Rating with id: "${req.body.id}" has been updated :: updateRatingOfFlat`));
            })
        }
    }
}
