import { prisma } from "../database";
import { RequestPaymentParams } from "../protocols/request.protocol"

async function getAllRequests() {
    const requests = await prisma.request.findMany({
        select: {
            id: true,
            total: true,
            giver_id: true,
            donatory: {
                select:{
                    user_name: true
                }
            }
        },
    })
    return requests
}

async function getRequestById(requestId: number) {
    const request = await prisma.request.findFirst({
        where: {
            id: requestId
        },
        include: {
            donatory: { 
                select: {
                    user_name: true
                }
            },
            product_request: {
                where: {
                    request_id: requestId
                },
                select: {
                    id: true,
                    unit_price: true,
                    quantity: true,
                    product: {
                        select: {
                            title: true,
                            description: true,
                            image: true
                        }
                    }
                }
            }
        }
    })
    return request
}

async function updateRequestGiverIdById(data: RequestPaymentParams) {
    await prisma.request.update({
        where: {
            id: data.id
        },
        data: {
            giver_id: data.giver_id
        }
    })
}

const requestRepository = {
    getAllRequests,
    getRequestById,
    updateRequestGiverIdById
}

export default requestRepository