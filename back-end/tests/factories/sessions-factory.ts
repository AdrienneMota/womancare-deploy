import { session as Session } from "@prisma/client";
import { prisma } from "../../src/database";

export async function createSession(token: string, giver_id: number): Promise<Session> {

  return prisma.session.create({
    data: {
      token,
      giver_id,
    },
  });
}
