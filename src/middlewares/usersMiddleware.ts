import { JSONResponseInterface } from '../interfaces/generic/JSONResponseInterface'
import { TypedResponse } from '../interfaces/generic/ResponseInterface'
import { generateJsonResponse } from '../services/ResponseGeneratorService'
import { NextFunction } from 'express'
import { Request } from 'express'

export class usersMiddleware {
    public sesionStatus(_req: Request, res: TypedResponse<JSONResponseInterface>, next: NextFunction) {
        if (!_req.body || !_req.body.token) next()
        else {
            res.json(generateJsonResponse(_req.method, undefined, undefined, 400, 'Token please'))
        }
    }
    public userPermissions(_req: Request, res: TypedResponse<JSONResponseInterface>, next: NextFunction): void {
        if (!_req.body.user) res.json(generateJsonResponse(_req.method, undefined, undefined, 400, 'User information required'))
        else if (_req.body.user) {
            next()
        }
    }
}
