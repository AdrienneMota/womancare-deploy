import { Router } from "express";
import requestController from "../controllers/request.controller";
import { authenticateToken } from "../middlewares/authentication.middleware";
const requestRouter = Router()

requestRouter.get('/requests', requestController.getAllRequests)
requestRouter.get('/requests/:requestId', requestController.getRequestById)
requestRouter.patch('/request/payment/:requestId', authenticateToken, requestController.paymentRequest)

export default requestRouter