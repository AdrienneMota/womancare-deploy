import { AuthenticationParams } from "../protocols/authentication.protocal";
import authenticationRepository from "../repositories/authentication.repository";
import userUnauthorizedError from "../errors/user.unauthorized.error";
import bycript from "bcrypt";
import jwt from 'jsonwebtoken';
import { userInformationsParams } from "../protocols/authentication.protocal";

async function signInPost(user: AuthenticationParams) : Promise<userInformationsParams>{
    const { email, password } = user

    const userValidated = await validateUser(email)
    await validatePassword(password, userValidated.password)
    const token = await createToken(userValidated.id)
    
    return { 
        id: userValidated.id,
        user_name: userValidated.user_name, 
        token 
    }
}

async function validateUser(email: string) {
    const userValidated = await authenticationRepository.findUserbyEmail(email)
    if(!userValidated){
        throw userUnauthorizedError()
    }
    return userValidated
}

async function validatePassword(password: string, passwordCorrect: string) {
    const passwordValidate = await bycript.compare(password, passwordCorrect)
    if(!passwordValidate){
        throw userUnauthorizedError()
    }
}

async function createToken(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET)
    const session = await authenticationRepository.createUserToken( { giver_id: userId , token } )
    return token
}

const authenticationService = {
    signInPost
}

export default authenticationService