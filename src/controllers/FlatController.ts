import { TypedResponse } from './../interfaces/generic/ResponseInterface';
// import { Flat } from '../models/FlatModel';
import { Request } from "express";
import Flat from '../models/FlatModel';

export class FlatController {
    public async getFlatById(req: Request, res: TypedResponse<any>) {
        console.log(req.query.id);
        await res.json("NOT IMPLEMENTED: GETFLAT");
    };

    public async createFlat(req: Request, res: TypedResponse<any>) {
        if (!req || !req.body || !req.body.flat) return res.json({
            status: 400,
            statusText: 'Body required',
            data: {}
        })
        else {
            try {
                const flat: any = new Flat();
                flat.save(req.body.flat).then((result: any) => {
                    if (!result) return res.json(400);
                    else return res.json(result);
                }).catch((err: Error) => {
                    if (!err) res.json(400);
                    else res.json(err);

                });
            } catch (error) {
                res.json(error)
            }
            return res.json(400);

        }


    };
}