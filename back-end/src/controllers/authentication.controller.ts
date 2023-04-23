import { Request, Response } from "express";
import { AuthenticationParams } from "../protocols/authentication.protocal";
import authenticationService from "../services/authentication.service";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";
import authenticationRepository from "../repositories/authentication.repository";

async function signInPost(req: Request, res: Response) {
    const user = res.locals.user as AuthenticationParams
    try {
        const userAuthenticaion = await authenticationService.signInPost(user)
        res.send(userAuthenticaion)    
    } catch (error) {
        if(error.name === "UserUnauthorized"){
            return res.status(401).send(error)
        }
        
        return res.sendStatus(500)
        
    }    
}

async function signOutDelete(req: AuthenticatedRequest, res: Response){
    const giver_id = req.userId

    try {
        const { id } = await authenticationRepository.findSessionByUserId(giver_id)
        await authenticationRepository.deleteSessionById(id)
        res.sendStatus(204)    
    } catch (error) {
        res.sendStatus(500)
    }
}

const authenticationController = {
    signInPost,
    signOutDelete
}

export default authenticationController