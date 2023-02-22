import { JSONResponseInterface } from "@/interfaces/generic/JSONResponseInterface";
import { TypedResponse } from "@/interfaces/generic/ResponseInterface";
import { generateJsonResponse } from "@/services/ResponseGenerator";
import { Request } from "express";

export class AuthController {
  public registerUser(req: Request, res: TypedResponse<JSONResponseInterface>) {
    if (!req.body) res.json(generateJsonResponse(req.method, undefined, undefined, 404, `Please provide a valid body`));
    else {
      if (req.body.email && req.body.password) {
        try {
          res.json(generateJsonResponse(req.method, { a: "a" }, undefined, 500, `PERDo exception`));
        } catch (error) {
          res.json(generateJsonResponse(req.method, undefined, error, 500, `Uncaught exception`));
        }
      } else {
        res.json(generateJsonResponse(req.method, undefined, undefined, 400, `No password, no email`));
      }
    }
  }
  public loginUser() {}
  public updateUser() {}
  public deleteUser() {}
  public generateToken() {}
}
