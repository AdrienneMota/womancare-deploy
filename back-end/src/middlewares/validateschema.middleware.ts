import { Request, Response, NextFunction } from "express"
import { schemaError } from "../errors/error.shema.error"
import { CreateGiverParams } from "../protocols/user.protocol"
import { AuthenticationParams } from "../protocols/authentication.protocal"

export default function validateSchema(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body as CreateGiverParams | AuthenticationParams
        
        const { error } = schema.validate(user, {abortEarly: false})

        if(error){
            const detailsError = error.details.map((d) => d.message)
            const messageError = schemaError(detailsError)
            return res.status(422).send(messageError)
        }        
        res.locals.user = user
        next()
    }
}