import { TypedResponse } from './../interfaces/generic/ResponseInterface';
// import { Flat } from '../models/FlatModel';
import { Request } from "express";
import { Flat } from '../models/FlatModel';


const getFlatById = (req: Request, res: TypedResponse<any>) => {
    console.log(req.params.id);
    res.json("NOT IMPLEMENTED: GETFLAT");
};

const createFlat = (req: Request, res: TypedResponse<any>) => {
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


exports.update_flat_by_id = (_req: Request, res: any) => {
    res.send()("NOT IMPLEMENTED: Author list");
};

exports.remove_flat_by_id = (_req: Request, res: any) => {
    res.send()("NOT IMPLEMENTED: Author list");
};

exports.get_flat_list = (_req: Request, res: any) => {
    res.send()("NOT IMPLEMENTED: Author list");
};
module.exports = {
    getFlatById,
    createFlat

}