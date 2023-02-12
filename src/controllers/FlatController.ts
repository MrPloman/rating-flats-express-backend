import { TypedResponse } from './../interfaces/generic/ResponseInterface';
import { Flat } from '../models/FlatModel';
import { Request } from "express";


const getFlatById = (req: Request, res: TypedResponse<any>) => {
    console.log(req.params.id);
    res.json("NOT IMPLEMENTED: GETFLAT");
};

const createFlat = (_req: Request, res: TypedResponse<any>) => {
    const flat = new Flat();
    console.log(flat);
    res.json(flat)

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