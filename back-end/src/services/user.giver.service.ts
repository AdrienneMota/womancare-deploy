import bcrypt from 'bcrypt'
import userGiverRepository from '../repositories/user.giver.repository'
import { CreateGiverParams } from '../protocols/user.protocol'
import { duplicatedEmailError } from '../errors/duplicate.email.error'

async function createUserGiver({name, user_name, email, password}: CreateGiverParams) {   
    await validateEmailUserGiver(email)
    const hashedPassword = await bcrypt.hash(password, 12)
    const data = {
        name, 
        user_name, 
        email, 
        password: hashedPassword
    }
    return await userGiverRepository.createUserGiver(data)
}

async function validateEmailUserGiver(email: string) {
      const giverWithSameEmail = await userGiverRepository.findUserGiverbyEmail(email)
      if (giverWithSameEmail) {
        throw duplicatedEmailError();
      }
}

const userGiverService = {
    createUserGiver
}

export default userGiverService