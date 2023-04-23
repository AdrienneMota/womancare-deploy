import { Request, Response } from "express";
import requestRepository from "../repositories/request.repository";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";
async function getAllRequests(req: Request, res: Response) {
    try{
        const requests = await requestRepository.getAllRequests()
        res.send(requests)
    }catch(error){
        res.sendStatus(500)
    }    
}

async function getRequestById(req: Request, res: Response) {
    const requestId = req.params.requestId

    try {
        const request = await requestRepository.getRequestById(Number(requestId))
        res.send(request)
    } catch (error) {
        res.sendStatus(500)
    }
}

async function paymentRequest(req: AuthenticatedRequest, res: Response) {
    const { userId } = req 
    const requestId = parseInt(req.params.requestId)

    try {
        await requestRepository.updateRequestGiverIdById({ id: requestId, giver_id: userId})
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500)
    }
    
}

const requestController = {
    getAllRequests,
    getRequestById,
    paymentRequest
}

export default requestController