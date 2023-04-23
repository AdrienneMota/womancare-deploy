import { session, giver } from '@prisma/client'

export type AuthenticationParams = Omit< giver, "id" | "name" | "user_name">
export type userInformationsParams = { "id": number, "user_name": string, "token": string }
export type CreateTokenParams = Omit< session, "id" | "createdAt">