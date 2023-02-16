import { IFlat } from './../interfaces/FlatInterface';
import { JSONResponseInterface } from '../interfaces/generic/JSONResponseInterface';
import { TypedResponse } from './../interfaces/generic/ResponseInterface';
// import { Flat } from '../models/FlatModel';
import { Request } from "express";
import Flat from '../models/FlatModel';
import { Error, Model } from 'mongoose';
import { IFlatModel } from '@/interfaces/FlatInterface';

const flat: Model<IFlatModel> = Flat;
const { generateJsonResponse } = require('@/services/ResponseGenerator')
let JSONresponse: JSONResponseInterface = {
    data: undefined,
    status: null,
    method: '',
    statusText: '',
    error: undefined
}
export class FlatController {
    /**
     * 
     * @param req 
     * @param res 
     */
    public getFlatById(req: Request, res: TypedResponse<JSONResponseInterface>) {

        if (!req.params.id) {
            res.json(generateJsonResponse('GET', undefined, undefined, 400, 'Required valid id'))
        }
        else {
            try {
                flat.findById(req.params.id, async (_err: Error, data: IFlat) => {
                    if (!!_err) {
                        await res.json(generateJsonResponse('GET', undefined, _err, 404, `Id "${req.params.id}" not found in Flats collection`));
                    }
                    if (!!data) {
                        await res.json(generateJsonResponse('GET', data, undefined, 200, `Flat with ${req.params.id} found in Flats collection`));
                    }
                })
            } catch (error: any) {
                if (!!error) res.json(generateJsonResponse('GET', undefined, error, 500, "Something went wrong..."));
            }
        }
    };
    /**
     * 
     * @param req 
     * @param res 
     */
    public async createFlat(req: Request, res: TypedResponse<any>) {
        JSONresponse = {
            data: undefined,
            status: 400,
            method: 'POST',
            statusText: 'Required a valid body',
            error: undefined
        }
        if (!req || !req.body || !req.body.flat) {
            res.json(JSONresponse);
        }
        else {
            try {
                flat.findOne({ "location.lat": req.body.flat.location.lat, "location.lng": req.body.flat.location.lng }, async (_err: Error, flatFound: IFlat) => {
                    if (!!flatFound) {
                        JSONresponse.data = undefined;
                        JSONresponse.statusText = "Values from location.lng and location.lat are being already used, please select other coordinates"
                        JSONresponse.status = 406
                        await res.json(JSONresponse);
                    }
                    else if (!!_err) {
                        JSONresponse.data = undefined;
                        JSONresponse.statusText = "Error in the query"
                        JSONresponse.status = 406
                        JSONresponse.error = _err;
                        await res.json(_err);
                    }
                    else if (!_err && !flatFound) {
                        await flat.create(req.body.flat, async (_err: Error, flatCreated: IFlat) => {
                            if (!!_err || !flatCreated) {
                                JSONresponse.data = undefined;
                                JSONresponse.status = 406;
                                JSONresponse.error = _err;
                                JSONresponse.statusText = "Not acceptable values in some fields of BODY"
                                await res.json(JSONresponse);
                            }
                            if (!!flatCreated) {
                                JSONresponse.error = undefined;
                                JSONresponse.status = 201;
                                JSONresponse.data = { flat: flatCreated }
                                JSONresponse.statusText = "Accepted body values. Flat created properly"
                                await res.json(JSONresponse);
                            }
                        })
                    }
                })
            } catch (error) {
                JSONresponse.data = undefined;
                JSONresponse.statusText = "Internal Server Error";
                JSONresponse.error = error;
                JSONresponse.status = 500;
                res.json(JSONresponse);
            }
        }
    };
}


