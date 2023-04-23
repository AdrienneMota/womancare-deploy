import { giver } from "@prisma/client";

export type CreateGiverParams = Omit < giver,'id'>
export type GenericGiverParamas = Partial <giver>
