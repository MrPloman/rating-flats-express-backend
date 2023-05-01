import { TypedResponse } from '@/interfaces/generic/ResponseInterface'
import { CreateFlat } from '../application/create-flat'
import { generateJsonResponse } from '@/services/ResponseGeneratorService'

export class FlatController {
    constructor(private readonly createFlat: CreateFlat) {}
    async run(req: Request, res: TypedResponse<any>) {
        if (req.body) {
            const { flat } = req.body
            await this.createFlat.run(flat)
            res.json(generateJsonResponse(req.method, { flat: flat }, undefined, 200, 'Accepted body values. Flat created properly :: createFlat'))
        }
    }
}
