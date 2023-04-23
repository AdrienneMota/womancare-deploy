import { prisma } from "../database";
import { CreateGiverParams } from "../protocols/user.protocol";

async function createUserGiver(data : CreateGiverParams) {
    return prisma.giver.create({
        data
    })
}

async function findUserGiverbyEmail(email: string) {
    return prisma.giver.findFirst({
        where: {
            email
        }
    })
}
const userGiverRepository = {
    createUserGiver,
    findUserGiverbyEmail
}

export default userGiverRepository