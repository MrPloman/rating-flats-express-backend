import { IRating } from './../interfaces/RatingInterface';
import { JSONResponseInterface } from "@/interfaces/generic/JSONResponseInterface";
import { TypedResponse } from "@/interfaces/generic/ResponseInterface";
import { generateJsonResponse } from "@/services/ResponseGenerator";
import { Request } from "express";
import Rating from '../models/RatingModel';

const rating = Rating;
export class RatingController {
    public getRatingsByMailboxId(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.params.id) res.json(generateJsonResponse('GET', undefined, undefined, 400, 'Required valid id'))
        else {
            rating.find({ flat: req.params.id }, async (_err: Error, ratingsFound: IRating) => {
                if (!!_err) await res.json(generateJsonResponse('GET', undefined, _err, 404, `Id "${req.params.id}" not found in Flats collection`));
                if (!!ratingsFound) await res.json(generateJsonResponse('GET', ratingsFound, undefined, 200, `Flat with ${req.params.id} found in Flats collection`));
            })

        }
    }

}
