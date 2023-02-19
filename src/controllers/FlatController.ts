import { generateJsonResponse } from "../services/ResponseGenerator";
import { IFlat } from "./../interfaces/FlatInterface";
import { JSONResponseInterface } from "../interfaces/generic/JSONResponseInterface";
import { TypedResponse } from "./../interfaces/generic/ResponseInterface";
import { Request } from "express";
import Flat from "../models/FlatModel";
import { Error, Model } from "mongoose";
import { IFlatModel } from "@/interfaces/FlatInterface";

const flat: Model<IFlatModel> = Flat;
export class FlatController {
    /**
     *
     * @param req
     * @param res
     */
    public getFlatById(req: Request, res: TypedResponse<JSONResponseInterface>) {
        if (!req.params.id) res.json(generateJsonResponse("GET", undefined, undefined, 400, "Required valid id :: getFlatById"));
        else {
            try {
                flat.findById(req.params.id, (_err: Error, data: IFlat) => {
                    if (_err) res.json(generateJsonResponse("GET", undefined, _err, 404, `Id "${req.params.id}" not found in Flats collection :: getFlatById`));
                    if (data) res.json(generateJsonResponse("GET", data, undefined, 200, `Flat with ${req.params.id} found in Flats collection :: getFlatById`));
                });
            } catch (error: any) {
                if (error) res.json(generateJsonResponse("GET", undefined, error, 500, "Something went wrong... :: getFlatById"));
            }
        }
    }
    /**
     *
     * @param req
     * @param res
     */
    public createFlat(req: Request, res: TypedResponse<any>) {
        if (!req || !req.body || !req.body.flat) res.json(generateJsonResponse("POST", undefined, undefined, 400, "Required a valid body, missing flat in body :: createFlat"));
        else {
            try {
                flat.findOne({ "location.lat": req.body.flat.location.lat, "location.lng": req.body.flat.location.lng }, (_err: Error, flatFound: IFlat) => {
                    if (flatFound) res.json(generateJsonResponse("POST", undefined, undefined, 406, "Values from location.lng and location.lat are being already used, please select other coordinates :: createFlat"));
                    else if (_err) res.json(generateJsonResponse("POST", undefined, _err, 406, "Error in the query :: createFlat"));
                    else if (!_err && !flatFound) {
                        flat.create(req.body.flat, (_err: Error, flatCreated: IFlat) => {
                            if (_err || !flatCreated) res.json(generateJsonResponse("POST", undefined, _err, 406, "Not acceptable values in some fields of BODY :: createFlat"));
                            if (flatCreated) res.json(generateJsonResponse("POST", { flat: flatCreated }, undefined, 201, "Accepted body values. Flat created properly :: createFlat"));
                        });
                    }
                });
            } catch (error) {
                if (error) res.json(generateJsonResponse("POST", undefined, error, 500, "Internal Server Error :: createFlat"));
            }
        }
    }

    public updateFlat(req: Request, res: TypedResponse<any>) {
        if (!req || !req.body || !req.body.flat) res.json(generateJsonResponse("PUT", undefined, undefined, 400, "Required a valid body, missing flat in body :: updateFlat"));
        else {
            flat.findByIdAndUpdate(req.body.flat._id, req.body.flat, { upsert: true, new: true }, (_err: any, flatUpdated: IFlat) => {
                if (flatUpdated) res.json(generateJsonResponse("PUT", flatUpdated, undefined, 200, "Updated flat :: updateFlat"));
                else if (_err) res.json(generateJsonResponse("PUT", undefined, _err, 406, "Error in the query :: updateFlat"));
            });

        }
    }
}
