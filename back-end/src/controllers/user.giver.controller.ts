import { Request, Response } from "express";
import userGiverService from "../services/user.giver.service";

async function createUserGiver( req: Request, res: Response) {
    const userGiver = res.locals.user
    try {
        await userGiverService.createUserGiver(userGiver)
        return res.sendStatus(201)
    } catch (error) {
        if(error.name === "DuplicatedEmailError"){
            return res.status(409).send(error.message)
        }
    }    
}

const userGiverController = {
    createUserGiver
}

export default userGiverController