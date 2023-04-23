import { Router } from "express"
import userGiverController from "../controllers/user.giver.controller"
import validateSchema from "../middlewares/validateschema.middleware"
import userSchema from "../schemas/user.schema"
const userGiverRouter = Router()

userGiverRouter.post('/signup', validateSchema(userSchema), userGiverController.createUserGiver)

export default userGiverRouter