import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import tokenError from "../errors/token.error";
import { prisma } from "../database";

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");
   
    if (!authHeader){ 
        return generateUnauthorizedResponse(res)
    }

    const token = authHeader.split(" ")[1]

    if (!token) return generateUnauthorizedResponse(res)

    try {
        process.env.some
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload

        const session = await prisma.session.findFirst({
            where: {
                token,
            },
        })
        if (!session) {
            return generateUnauthorizedResponse(res)
        }
        req.userId = userId
    
        return next()
    } catch (err) {
        res.send(err)
    }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(401).send(tokenError())
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number
};
