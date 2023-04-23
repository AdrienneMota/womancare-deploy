import { Router } from "express";
import validateSchema from "../middlewares/validateschema.middleware";
import authenticationSchema from "../schemas/authentication.schema";
import authenticationController from "../controllers/authentication.controller";
import { authenticateToken } from "../middlewares/authentication.middleware";

const authenticationRouter = Router()

authenticationRouter.post('/signin', validateSchema(authenticationSchema), authenticationController.signInPost)
authenticationRouter.delete('/signout', authenticateToken, authenticationController.signOutDelete)

export default authenticationRouter