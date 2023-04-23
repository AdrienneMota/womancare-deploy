import { prisma } from "../database";
import { CreateTokenParams } from "../protocols/authentication.protocal";

async function findUserbyEmail(email: string) {
    return prisma.giver.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            user_name: true,
            email: true,
            password: true
        }
    })
}

async function createUserToken(data: CreateTokenParams) {
   return await prisma.session.create({
        data
   })
}

async function deleteSessionById(id: number) {
    await prisma.session.delete({
        where: {
            id
        }
    })
}

async function findSessionByUserId(giver_id: number) {
    return prisma.session.findFirst({
        where: {
            giver_id
        }
    })
}

const authenticationRepository = {
    findUserbyEmail,
    createUserToken,
    deleteSessionById,
    findSessionByUserId
}

export default authenticationRepository
