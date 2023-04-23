import * as jwt from "jsonwebtoken";
import { giver as Giver } from "@prisma/client";

import { createSession } from "./factories/sessions-factory";
import { prisma } from "../src/database";
import { createGiver } from "./factories/giver-factory";

export async function cleanDb() {
  await prisma.session.deleteMany({});
  await prisma.product_request.deleteMany({});
  await prisma.request.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.donatory.deleteMany({});
  await prisma.giver.deleteMany({});
}

export async function generateValidToken(giver?: Giver) {
  const incomingGiver = giver || (await createGiver());
  const token = jwt.sign({ userId: incomingGiver.id }, process.env.JWT_SECRET);

  await createSession(token, incomingGiver.id);

  return token;
}
